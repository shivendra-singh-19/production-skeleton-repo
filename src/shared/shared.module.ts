import { Global, Module } from '@nestjs/common';
import { APP_INTERCEPTOR } from '@nestjs/core';

import { AppConfigModule } from './config/config.module';
import { DatabaseModule } from './database/database.module';
import { LoggingInterceptor } from './logger/logger.interceptor';
import { LoggerModule } from './logger/logger.service';
import { RedisModule } from './redis/redis.module';

/**
 * The infrastructure every feature module leans on: configuration, the database
 * connection, Redis, logging, and the entities they share.
 *
 * Global, so a feature module gets all of it by being part of the app rather
 * than by importing five things. Feature modules (health, and whatever comes
 * next) stay out of here.
 */
@Global()
@Module({
  imports: [AppConfigModule, LoggerModule, DatabaseModule, RedisModule],
  providers: [{ provide: APP_INTERCEPTOR, useClass: LoggingInterceptor }],
  exports: [AppConfigModule, DatabaseModule, RedisModule],
})
export class SharedModule {}
