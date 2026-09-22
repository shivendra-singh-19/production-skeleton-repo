import { appendFileSync, mkdirSync } from 'node:fs';
import { isAbsolute, join, resolve } from 'node:path';
import { Writable } from 'node:stream';
import { inspect } from 'node:util';

import {
  Module,
  type LoggerService,
  type OnApplicationShutdown,
} from '@nestjs/common';
// Aliased: winston exports a `format` of its own.
import { format as formatDate } from 'date-fns';
import {
  createLogger,
  format,
  transports,
  type Logger as Winston,
} from 'winston';

import { config } from '../config/configuration';

/**
 * Everything the process logs goes into `logs/production.log` — custom entries,
 * Nest's own output, anything written to the console by any library, and
 * crashes. Every record still carries its own `date` and `time`.
 *
 * The name is fixed rather than dated, so an external rotator owns the file
 * lifecycle. Use `copytruncate`, or restart, since the process holds it open.
 */

// ---------------------------------------------------------------- config

interface LoggingOptions {
  level: string;
  directory: string;
  console: boolean;
  json: boolean;
  captureConsole: boolean;
}

/**
 * `logging.*` from config.json, with defaults. The config module is imported
 * directly rather than reached through ConfigService, since logging has to be
 * live before the Nest container exists.
 */
function resolveOptions(): LoggingOptions {
  const { app, logging = {} } = config;
  const environment = app.environment ?? 'development';
  const directory = logging.directory ?? 'logs';

  return {
    level: logging.level ?? (environment === 'production' ? 'info' : 'debug'),
    directory: isAbsolute(directory)
      ? directory
      : resolve(process.cwd(), directory),
    console: logging.console !== false,
    json: logging.json !== false,
    captureConsole: logging.captureConsole !== false,
  };
}

// ---------------------------------------------------------------- stdio

// Captured before anything can patch them. The console mirror writes through
// these so its own output is not re-captured and looped.
const realStdout = process.stdout.write.bind(process.stdout);
const realStderr = process.stderr.write.bind(process.stderr);

// A closed pipe (`node dist/main | head`) surfaces as an async EPIPE. Unhandled,
// it becomes an uncaughtException and the app dies because nobody was reading.
for (const stream of [process.stdout, process.stderr]) {
  stream.on('error', (error: NodeJS.ErrnoException) => {
    if (error.code !== 'EPIPE') throw error;
  });
}

// ---------------------------------------------------------------- file naming

/** Local time, so a record reads the way the clock on the box did. */
export const DATE_FORMAT = 'yyyy-MM-dd';
export const TIME_FORMAT = 'HH:mm:ss.SSS';

/** CSI SGR ("colour") sequences: ESC [ ... m */
const ANSI_PATTERN = /\u001b\[[0-9;]*m/g;

/**
 * Removes SGR escape sequences. Plenty of libraries colour their output for a
 * terminal; captured verbatim those bytes end up as escape litter in the middle
 * of a JSON string, which is neither readable nor greppable.
 */
export function stripAnsi(text: string): string {
  return text.replace(ANSI_PATTERN, '');
}

/** One file, always the same name. Rotation is left to an external rotator. */
export const LOG_FILE_NAME = 'production.log';

export function logFilePath(directory: string): string {
  return join(directory, LOG_FILE_NAME);
}

// ---------------------------------------------------------------- formats

const COLORS: Record<string, string> = {
  error: '\u001b[31m',
  warn: '\u001b[33m',
  info: '\u001b[32m',
  http: '\u001b[35m',
  debug: '\u001b[34m',
  verbose: '\u001b[36m',
};
const RESET = '\u001b[0m';

/** Fields the record renders itself; everything else is caller metadata. */
const RESERVED = new Set([
  'level',
  'message',
  'timestamp',
  'date',
  'time',
  'context',
  'stack',
  'pid',
]);

function metaOf(info: Record<string, unknown>): Record<string, unknown> {
  return Object.fromEntries(
    Object.entries(info).filter(([key]) => !RESERVED.has(key)),
  );
}

/** Local date/time plus the sortable UTC instant, stamped on every record. */
const stampFormat = format((info) => {
  const now = new Date();
  info.timestamp = now.toISOString();
  info.date = formatDate(now, DATE_FORMAT);
  info.time = formatDate(now, TIME_FORMAT);
  info.pid = process.pid;
  return info;
})();

/** One JSON object per line. */
const jsonLine = format.printf((info) => {
  const record = info as Record<string, unknown>;
  const meta = metaOf(record);

  return JSON.stringify({
    timestamp: record.timestamp,
    date: record.date,
    time: record.time,
    level: record.level,
    context: record.context ?? 'Application',
    message: record.message,
    pid: record.pid,
    ...(record.stack ? { stack: record.stack } : {}),
    ...(Object.keys(meta).length > 0 ? { meta } : {}),
  });
});

/** `2026-08-10 22:45:38.747  INFO     [HealthService]  message  { ... }` */
const textLine = (colorize: boolean) =>
  format.printf((info) => {
    const record = info as Record<string, unknown>;
    const meta = metaOf(record);
    const level = String(record.level).toUpperCase().padEnd(7);

    const parts = [
      `${String(record.date)} ${String(record.time)}`,
      colorize
        ? `${COLORS[String(record.level)] ?? ''}${level}${RESET}`
        : level,
      `[${String(record.context ?? 'Application')}]`,
      String(record.message),
    ];

    if (Object.keys(meta).length > 0) {
      parts.push(
        inspect(meta, { depth: 4, colors: colorize, breakLength: 120 }),
      );
    }
    if (typeof record.stack === 'string') {
      parts.push(`\n${record.stack}`);
    }

    return parts.join('  ');
  });

// ---------------------------------------------------------------- bootstrap

let winston: Winston | null = null;

/**
 * Brings logging up. Called first thing in main.ts, outside the Nest container:
 * a container that fails to start is exactly when the logs matter, and at that
 * point no injectable exists to write them. Idempotent.
 */
export function initLogging(): Winston {
  if (winston) return winston;

  const options = resolveOptions();
  mkdirSync(options.directory, { recursive: true });

  const base = [format.errors({ stack: true }), format.splat(), stampFormat];

  winston = createLogger({
    level: options.level,
    exitOnError: false,
    transports: [
      new transports.File({
        filename: logFilePath(options.directory),
        level: options.level,
        format: format.combine(
          ...base,
          options.json ? jsonLine : textLine(false),
        ),
      }),
    ],
  });

  if (options.console) {
    // Writes through the *real* stdout so the mirror is not re-captured below.
    const terminal = new Writable({
      write(chunk: Buffer, _encoding, callback) {
        realStdout(chunk);
        callback();
      },
    });

    winston.add(
      new transports.Stream({
        stream: terminal,
        level: options.level,
        format: format.combine(...base, textLine(true)),
      }),
    );
  }

  if (options.captureConsole) captureConsole(winston);
  installCrashHandlers(winston, options);

  return winston;
}

/** The live winston instance, created on first use. */
export function getLogger(): Winston {
  return winston ?? initLogging();
}

/** Flushes the file transport. Called on shutdown. */
export async function shutdownLogging(): Promise<void> {
  const current = winston;
  if (!current) return;

  await new Promise<void>((done) => {
    const timer = setTimeout(done, 2000);
    timer.unref();
    current.on('finish', () => {
      clearTimeout(timer);
      done();
    });
    current.end();
  });
}

// ---------------------------------------------------------------- console capture

/**
 * Routes everything written to the console into the log file — a `console.log`
 * left in a controller, TypeORM query dumps, ioredis chatter, a stack trace from
 * a library that never heard of this logger.
 *
 * `process.stdout.write` is patched rather than the `console.*` methods, since
 * console.log is built on top of it: one patch catches both, exactly once.
 */
function captureConsole(logger: Winston): void {
  let reentrant = false;

  const patch = (
    stream: NodeJS.WriteStream,
    real: typeof realStdout,
    level: 'info' | 'error',
  ): void => {
    // Writes arrive as arbitrary chunks, not lines. Buffer to the newline so
    // there is one record per actual line of output.
    let pending = '';

    stream.write = function patched(
      chunk: unknown,
      encoding?: unknown,
      callback?: unknown,
    ) {
      const done = typeof encoding === 'function' ? encoding : callback;

      // A write from inside the logger passes straight through, or capturing it
      // would recurse until the stack blows.
      if (reentrant) {
        return real(
          chunk as string,
          encoding as BufferEncoding,
          done as () => void,
        );
      }

      reentrant = true;
      try {
        pending += Buffer.isBuffer(chunk)
          ? chunk.toString('utf8')
          : String(chunk);
        const lines = pending.split('\n');
        pending = lines.pop() ?? '';
        for (const line of lines) {
          const text = stripAnsi(line).replace(/\s+$/, '');
          if (text)
            logger.log(level, text, {
              context: 'Console',
              stream: stream === process.stdout ? 'stdout' : 'stderr',
            });
        }
      } catch {
        real(chunk as string, encoding as BufferEncoding);
      } finally {
        reentrant = false;
      }

      if (typeof done === 'function') (done as () => void)();
      return true;
    } as typeof stream.write;
  };

  patch(process.stdout, realStdout, 'info');
  patch(process.stderr, realStderr, 'error');
}

// ---------------------------------------------------------------- crashes

/**
 * Crash and warning handlers.
 *
 * No SIGTERM/SIGINT listeners on purpose: Nest's `enableShutdownHooks()` removes
 * its own listener and re-raises the signal to terminate, so one left behind
 * here would swallow that and hang the container until SIGKILL.
 */
function installCrashHandlers(logger: Winston, opts: LoggingOptions): void {
  // The file transport is stream-backed and async, so a record handed to it just
  // before process.exit() is routinely lost — which is exactly the record you
  // needed. The crash path appends synchronously instead.
  const writeNow = (
    context: string,
    message: string,
    extra: Record<string, unknown>,
  ): void => {
    const now = new Date();
    const record = JSON.stringify({
      timestamp: now.toISOString(),
      date: formatDate(now, DATE_FORMAT),
      time: formatDate(now, TIME_FORMAT),
      level: 'error',
      context,
      message,
      pid: process.pid,
      ...extra,
    });

    try {
      mkdirSync(opts.directory, { recursive: true });
      appendFileSync(logFilePath(opts.directory), `${record}\n`);
    } catch {
      // Disk full or read-only mount — the stderr write below is what is left.
    }
    realStderr(`${record}\n`);
  };

  const memory = (): Record<string, number> => {
    const usage = process.memoryUsage();
    return {
      uptimeSeconds: Math.round(process.uptime()),
      heapUsedMb: Math.round(usage.heapUsed / 1024 / 1024),
      rssMb: Math.round(usage.rss / 1024 / 1024),
    };
  };

  process.on('uncaughtException', (error) => {
    writeNow('UncaughtException', error.message, {
      stack: error.stack,
      ...memory(),
    });
    process.exit(1);
  });

  // A real defect, but the process stays up — killing a healthy server over one
  // stray promise is worse. Swap in process.exit(1) to match Node's default.
  process.on('unhandledRejection', (reason) => {
    const error = reason instanceof Error ? reason : new Error(String(reason));
    logger.error(error.message, {
      context: 'UnhandledRejection',
      stack: error.stack,
      ...memory(),
    });
  });

  // Deprecations, MaxListenersExceededWarning, resource exhaustion notices.
  // Node's default handler is dropped first: it prints to stderr, which the
  // console capture would then log a second time.
  process.removeAllListeners('warning');
  process.on('warning', (warning) => {
    logger.warn(warning.message, {
      context: 'ProcessWarning',
      stack: warning.stack,
    });
  });

  process.on('exit', (code) => {
    if (code !== 0)
      writeNow('Process', `Exiting with code ${code}`, {
        exitCode: code,
        ...memory(),
      });
  });

  // When V8 aborts — "FATAL ERROR: ... JavaScript heap out of memory", an
  // internal assertion — it prints from C++ and dies without running another
  // line of JavaScript, so no handler above can see it. This report is written
  // by that same C++ layer and does survive, carrying the reason and heap stats.
  try {
    const directory = join(opts.directory, 'reports');
    mkdirSync(directory, { recursive: true });
    process.report.directory = directory;
    process.report.reportOnFatalError = true;
  } catch {
    // Reports are a bonus, not a requirement.
  }
}

// ---------------------------------------------------------------- service

/** Structured fields attached to a record, beyond the message itself. */
export type LogMeta = Record<string, unknown>;

/**
 * Every log call takes one JSON payload. `message` is required; everything else
 * you put on it is carried through as structured metadata.
 *
 *     logger.log({ message: 'Order placed', orderId, amountPaise });
 */
export interface LogPayload extends LogMeta {
  message: string;
}

/**
 * `error()` and `fatal()` additionally require an `error` key. The type is left
 * open because a `catch` binding is not an `Error` as far as the compiler is
 * concerned — what matters is that the key is there.
 */
export interface ErrorPayload extends LogPayload {
  error: unknown;
}

/** Pulls loggable fields out of whatever was thrown. */
function describeError(error: unknown): LogMeta {
  if (error instanceof Error) {
    return {
      errorName: error.name,
      errorMessage: error.message,
      stack: error.stack,
    };
  }

  return {
    errorMessage: typeof error === 'string' ? error : inspect(error),
  };
}

/**
 * The app's logger, built by `LoggerFactory.create()`.
 *
 * The signatures are deliberately strict, which is the point of going through
 * the factory rather than touching winston directly:
 *
 *  - every method takes a payload with a **required** `message`, so no record
 *    can land in the file as `undefined` or a stringified object;
 *  - `error()` and `fatal()` additionally require an **`error`**, so a failure
 *    can never be logged without its stack. If you do not have one, construct it
 *    — `new Error('payment gateway returned 502')` — which forces a real
 *    sentence and captures the call site.
 */
export class AppLogger {
  constructor(private readonly context: string) {}

  /** Ordinary application events. */
  log(payload: LogPayload): void {
    this.write('info', payload);
  }

  /** Alias of `log`, for callers that prefer the level name. */
  info(payload: LogPayload): void {
    this.write('info', payload);
  }

  warn(payload: LogPayload): void {
    this.write('warn', payload);
  }

  debug(payload: LogPayload): void {
    this.write('debug', payload);
  }

  verbose(payload: LogPayload): void {
    this.write('verbose', payload);
  }

  /** Request lines, kept off `info` so they can be filtered out. */
  http(payload: LogPayload): void {
    this.write('http', payload);
  }

  /** The `error` key is required — a failure without it is not worth logging. */
  error({ error, ...payload }: ErrorPayload): void {
    this.write('error', { ...payload, ...describeError(error) });
  }

  /** For conditions the process is not expected to survive. */
  fatal({ error, ...payload }: ErrorPayload): void {
    this.write('error', { ...payload, fatal: true, ...describeError(error) });
  }

  private write(level: string, payload: LogPayload): void {
    const { message, ...meta } = payload;
    getLogger().log(level, message, { context: this.context, ...meta });
  }
}

/**
 * Where loggers come from:
 *
 * ```ts
 * export class OrdersService {
 *   private readonly logger = LoggerFactory.create(OrdersService.name);
 *
 *   place(order: Order) {
 *     this.logger.log({ message: 'Order placed', orderId: order.id });
 *     ...
 *     this.logger.error({ message: 'Could not charge card', error, orderId: order.id });
 *   }
 * }
 * ```
 *
 * A plain factory rather than a Nest provider, so the same logger works in code
 * the container never sees — main.ts, scripts, migrations.
 */
export const LoggerFactory = {
  /** A logger tagged with `context`, conventionally the class name. */
  create(context: string): AppLogger {
    return new AppLogger(context);
  },
};

// ---------------------------------------------------------------- nest adapter

/**
 * Bridges Nest's own logging onto this logger.
 *
 * Nest calls `log(message, context)` and `error(message, stack, context)` with
 * loose `any` arguments, which is exactly what `AppLogger` refuses to accept.
 * Keeping the framework's calls in a separate adapter is what lets the
 * application-facing API stay strict.
 *
 * Wired up once in main.ts: `app.useLogger(new NestLoggerAdapter())`.
 */
export class NestLoggerAdapter implements LoggerService {
  log(message: unknown, ...params: unknown[]): void {
    this.write('info', message, params);
  }

  error(message: unknown, ...params: unknown[]): void {
    this.write('error', message, params);
  }

  warn(message: unknown, ...params: unknown[]): void {
    this.write('warn', message, params);
  }

  debug(message: unknown, ...params: unknown[]): void {
    this.write('debug', message, params);
  }

  verbose(message: unknown, ...params: unknown[]): void {
    this.write('verbose', message, params);
  }

  /** There is no level above `error`, so Nest's `fatal` maps onto one. */
  fatal(message: unknown, ...params: unknown[]): void {
    this.write('error', message, params);
  }

  /** Accepted and ignored — the floor lives in config.json's `logging.level`. */
  setLogLevels(): void {
    /* no-op */
  }

  /** Trailing strings are Nest's stack/context; objects are merged as metadata. */
  private write(level: string, message: unknown, params: unknown[]): void {
    const meta: LogMeta = { context: 'Nest' };
    const strings: string[] = [];

    for (const param of params) {
      if (param === undefined || param === null) continue;
      if (typeof param === 'string') strings.push(param);
      else if (param instanceof Error) meta.stack = param.stack;
      else if (typeof param === 'object') Object.assign(meta, param);
      else strings.push(String(param));
    }

    if (strings.length > 0) meta.context = strings[strings.length - 1];
    if (strings.length > 1) meta.stack = strings.slice(0, -1).join('\n');

    if (message instanceof Error) {
      meta.stack ??= message.stack;
      getLogger().log(level, message.message, meta);
      return;
    }

    getLogger().log(
      level,
      typeof message === 'string' ? message : inspect(message),
      meta,
    );
  }
}

// ---------------------------------------------------------------- module

/**
 * The transports were already created by `initLogging()` in main.ts, long before
 * the container existed, and loggers come from the factory rather than DI — so
 * all this module does is flush the file on shutdown.
 */
@Module({})
export class LoggerModule implements OnApplicationShutdown {
  /** Runs on SIGTERM via `app.enableShutdownHooks()`. */
  async onApplicationShutdown(): Promise<void> {
    await shutdownLogging();
  }
}
