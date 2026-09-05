import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { HealthCheck } from '../entities/health-check.entity';
import { HealthController } from './health.controller';
import { HealthService } from './health.service';

@Module({
  imports: [TypeOrmModule.forFeature([HealthCheck])],
  controllers: [HealthController],
  providers: [HealthService],
})
export class HealthModule {}
