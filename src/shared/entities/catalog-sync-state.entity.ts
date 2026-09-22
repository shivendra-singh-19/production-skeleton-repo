import { Column, Entity, PrimaryColumn } from 'typeorm';
import { CatalogSyncStateLastRunStatus } from './enums';

@Entity({ name: 'catalog_sync_state' })
export class CatalogSyncState {
  @PrimaryColumn({ type: 'smallint', default: 1 })
  id!: number;

  @Column({
    name: 'last_successful_sync_at',
    type: 'timestamp',
    nullable: true,
  })
  lastSuccessfulSyncAt!: Date | null;

  @Column({ name: 'last_run_at', type: 'timestamp', nullable: true })
  lastRunAt!: Date | null;

  @Column({
    name: 'last_run_status',
    type: 'enum',
    enum: CatalogSyncStateLastRunStatus,
    default: CatalogSyncStateLastRunStatus.IDLE,
  })
  lastRunStatus!: CatalogSyncStateLastRunStatus;

  @Column({ name: 'last_error', type: 'text', nullable: true })
  lastError!: string | null;
}
