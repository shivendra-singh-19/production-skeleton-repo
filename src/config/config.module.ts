import { Global, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { loadConfiguration } from './configuration';

/**
 * Wires config.json as the only configuration source. `ignoreEnvFile` and an
 * empty `envFilePath` keep .env files out of the resolution chain entirely.
 *
 * Consumers inject the standard ConfigService and read dotted paths:
 *   config.getOrThrow<string>('postgres.host')
 *   config.get<number>('redis.db', 0)
 */
@Global()
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      ignoreEnvFile: true,
      envFilePath: [],
      cache: true,
      load: [loadConfiguration],
    }),
  ],
  exports: [ConfigModule],
})
export class AppConfigModule {}
