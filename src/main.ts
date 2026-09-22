import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';

import { AppModule } from './app.module';
import {
  LoggerFactory,
  NestLoggerAdapter,
  initLogging,
} from './shared/logger/logger.service';

// First statement in the process: the log file, console capture and crash
// handlers must exist before any other import can log or throw.
initLogging();

const logger = LoggerFactory.create('Bootstrap');

async function bootstrap(): Promise<void> {
  // bufferLogs holds Nest's startup output until useLogger is set, so none of it
  // goes out through the default console logger and misses the file.
  const app = await NestFactory.create(AppModule, { bufferLogs: true });
  app.useLogger(new NestLoggerAdapter());

  const config = app.get(ConfigService);
  const port = config.get<number>('app.port', 3000);
  const globalPrefix = config.get<string>('app.globalPrefix', 'api');

  app.setGlobalPrefix(globalPrefix);
  app.useGlobalPipes(new ValidationPipe({ whitelist: true, transform: true }));
  app.enableShutdownHooks();

  await app.listen(port);

  logger.log({
    message: `Listening on http://localhost:${port}/${globalPrefix}`,
    port,
    globalPrefix,
  });
}

void bootstrap().catch((cause: unknown) => {
  // Startup failures never reach the Nest logger.
  logger.fatal({ message: 'Application failed to start', error: cause });
  process.exitCode = 1;
});
