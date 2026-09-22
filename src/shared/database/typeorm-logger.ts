import type { Logger as TypeOrmLoggerInterface } from 'typeorm';

import { LoggerFactory } from '../logger/logger.service';

/**
 * Routes TypeORM's output into the app logger.
 *
 * Without this, `postgres.logging: true` makes TypeORM print colourised SQL
 * straight to stdout. The console capture does pick it up, but only as an opaque
 * line of text — the query, its parameters and its duration all mashed into one
 * `message` with no structure to filter or search on.
 *
 * Going through the logger instead puts each query in as a record of its own:
 * `context: "TypeORM"` at `debug`, with `query`, `parameters` and `durationMs`
 * as real fields.
 *
 * Note that TypeORM ignores the `logging` option once a custom logger is
 * supplied, so the flag is enforced here.
 */
export class TypeOrmLogger implements TypeOrmLoggerInterface {
  private readonly logger = LoggerFactory.create('TypeORM');

  constructor(private readonly enabled: boolean) {}

  logQuery(query: string, parameters?: unknown[]): void {
    if (!this.enabled) return;
    this.logger.debug({ message: 'Query', query, parameters });
  }

  /** Always logged, flag or not — a failing query is never noise. */
  logQueryError(
    error: string | Error,
    query: string,
    parameters?: unknown[],
  ): void {
    this.logger.error({
      message: 'Query failed',
      error,
      query,
      parameters,
    });
  }

  logQuerySlow(time: number, query: string, parameters?: unknown[]): void {
    this.logger.warn({
      message: `Slow query (${time}ms)`,
      durationMs: time,
      query,
      parameters,
    });
  }

  logSchemaBuild(message: string): void {
    if (!this.enabled) return;
    this.logger.debug({ message });
  }

  /** Always logged: applying a migration is a thing you want a record of. */
  logMigration(message: string): void {
    this.logger.log({ message });
  }

  log(level: 'log' | 'info' | 'warn', message: unknown): void {
    const text =
      typeof message === 'string' ? message : JSON.stringify(message);

    if (level === 'warn') {
      this.logger.warn({ message: text });
      return;
    }
    if (!this.enabled) return;
    this.logger.debug({ message: text });
  }
}
