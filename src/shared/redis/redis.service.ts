import { Inject, Injectable, Logger, OnModuleDestroy } from '@nestjs/common';
import Redis from 'ioredis';

import { REDIS_CLIENT } from './redis.constants';

@Injectable()
export class RedisService implements OnModuleDestroy {
  private readonly logger = new Logger(RedisService.name);

  constructor(@Inject(REDIS_CLIENT) private readonly client: Redis) {}

  /** Escape hatch for callers needing the raw ioredis client. */
  get raw(): Redis {
    return this.client;
  }

  /** Returns 'PONG' when the server answers. */
  async ping(): Promise<string> {
    return this.client.ping();
  }

  async set(key: string, value: string, ttlSeconds?: number): Promise<void> {
    if (ttlSeconds === undefined) {
      await this.client.set(key, value);
      return;
    }
    await this.client.set(key, value, 'EX', ttlSeconds);
  }

  async get(key: string): Promise<string | null> {
    return this.client.get(key);
  }

  async onModuleDestroy(): Promise<void> {
    this.logger.log('Closing Redis connection');
    await this.client.quit();
  }
}
