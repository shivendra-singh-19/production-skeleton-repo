import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        type: 'postgres' as const,
        host: config.getOrThrow<string>('postgres.host'),
        port: config.getOrThrow<number>('postgres.port'),
        username: config.getOrThrow<string>('postgres.username'),
        password: config.getOrThrow<string>('postgres.password'),
        database: config.getOrThrow<string>('postgres.database'),
        autoLoadEntities: true,
        synchronize: config.get<boolean>('postgres.synchronize', false),
        logging: config.get<boolean>('postgres.logging', false),
      }),
    }),
  ],
})
export class DatabaseModule {}
