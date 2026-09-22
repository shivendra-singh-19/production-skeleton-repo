import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

import { LoggerFactory } from '../logger/logger.service';
import { dataSourceOptions } from './data-source';
import { TypeOrmLogger } from './typeorm-logger';

const logger = LoggerFactory.create('Database');

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (config: ConfigService) => {
        // Whether to apply pending migrations on boot. Read through
        // ConfigService like every other setting — config.json is the only
        // source of configuration, process.env is not consulted.
        const migrationsRun = config.get<boolean>(
          'postgres.migrationsRun',
          false,
        );

        logger.log({
          message: migrationsRun
            ? 'Applying pending migrations on boot'
            : 'Skipping migrations (postgres.migrationsRun is false)',
          database: dataSourceOptions.database,
          migrationsRun,
        });

        return {
          ...dataSourceOptions,
          autoLoadEntities: true,
          migrationsRun,
          // Replaces TypeORM's own console printer, so SQL arrives as
          // structured records instead of colourised text on stdout.
          logger: new TypeOrmLogger(
            config.get<boolean>('postgres.logging', false),
          ),
        };
      },
    }),
  ],
})
export class DatabaseModule {}
