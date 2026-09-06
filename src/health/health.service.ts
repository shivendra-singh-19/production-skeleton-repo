import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { RedisService } from '../redis/redis.service';
import { HealthCheck } from '../entities/health-check.entity';

export interface DependencyStatus {
  status: 'up' | 'down';
  [key: string]: unknown;
}

export interface HealthReport {
  status: 'running' | 'degraded';
  timestamp: string;
  uptimeSeconds: number;
  dependencies: {
    postgres: DependencyStatus;
    redis: DependencyStatus;
  };
}

const REDIS_PROBE_KEY = 'health:last-check';

@Injectable()
export class HealthService {
  private readonly logger = new Logger(HealthService.name);

  constructor(
    @InjectRepository(HealthCheck)
    private readonly healthChecks: Repository<HealthCheck>,
    private readonly redis: RedisService,
  ) {}

  /**
   * Actively exercises both dependencies: inserts a row in Postgres and pings
   * Redis. Failures are reported per-dependency rather than thrown, so the
   * endpoint always describes what is broken.
   */
  async check(): Promise<HealthReport> {
    const [postgres, redis] = await Promise.all([
      this.checkPostgres(),
      this.checkRedis(),
    ]);

    const status =
      postgres.status === 'up' && redis.status === 'up'
        ? ('running' as const)
        : ('degraded' as const);

    return {
      status,
      timestamp: new Date().toISOString(),
      uptimeSeconds: Math.round(process.uptime()),
      dependencies: { postgres, redis },
    };
  }

  private async checkPostgres(): Promise<DependencyStatus> {
    const startedAt = Date.now();
    try {
      const entry = await this.healthChecks.save(
        this.healthChecks.create({
          source: 'health-endpoint',
          note: `sample entry at ${new Date().toISOString()}`,
        }),
      );

      return {
        status: 'up',
        latencyMs: Date.now() - startedAt,
        insertedId: entry.id,
        totalEntries: await this.healthChecks.count(),
      };
    } catch (error) {
      const message = error instanceof Error ? error.message : String(error);
      this.logger.error(`Postgres health check failed: ${message}`);
      return {
        status: 'down',
        latencyMs: Date.now() - startedAt,
        error: message,
      };
    }
  }

  private async checkRedis(): Promise<DependencyStatus> {
    const startedAt = Date.now();
    try {
      const pong = await this.redis.ping();
      await this.redis.set(REDIS_PROBE_KEY, new Date().toISOString(), 300);

      return {
        status: 'up',
        latencyMs: Date.now() - startedAt,
        response: pong,
      };
    } catch (error) {
      const message = error instanceof Error ? error.message : String(error);
      this.logger.error(`Redis health check failed: ${message}`);
      return {
        status: 'down',
        latencyMs: Date.now() - startedAt,
        error: message,
      };
    }
  }
}
