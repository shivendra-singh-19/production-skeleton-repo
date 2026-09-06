import { Global, Logger, Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import Redis from 'ioredis';

import { REDIS_CLIENT } from './redis.constants';
import { RedisService } from './redis.service';

@Global()
@Module({
  providers: [
    {
      provide: REDIS_CLIENT,
      inject: [ConfigService],
      useFactory: (config: ConfigService): Redis => {
        const logger = new Logger('RedisClient');
        const host = config.getOrThrow<string>('redis.host');
        const port = config.getOrThrow<number>('redis.port');

        const client = new Redis({
          host,
          port,
          password: config.get<string | null>('redis.password') ?? undefined,
          db: config.get<number>('redis.db', 0),
          keyPrefix: config.get<string>('redis.keyPrefix', ''),
          lazyConnect: false,
          maxRetriesPerRequest: 3,
          tls: {
            servername: config.get('redis.serverUrl'),
          },
        });

        client.on('connect', () =>
          logger.log(`Connected to Redis at ${host}:${port}`),
        );
        client.on('error', (error: Error) =>
          logger.error(`Redis error: ${error.message}`),
        );

        return client;
      },
    },
    RedisService,
  ],
  exports: [RedisService, REDIS_CLIENT],
})
export class RedisModule {}
