import { Column, Entity, PrimaryColumn } from 'typeorm';
import { CatalogSyncRunsStatus } from './enums';

@Entity({ name: 'catalog_sync_runs' })
export class CatalogSyncRun {
  @PrimaryColumn({
    type: 'bigint',
    generated: 'increment',
    generatedIdentity: 'BY DEFAULT',
  })
  id!: string;

  @Column({ name: 'started_at', type: 'timestamp' })
  startedAt!: Date;

  @Column({ name: 'finished_at', type: 'timestamp', nullable: true })
  finishedAt!: Date | null;

  @Column({ name: 'date_from', type: 'timestamp', nullable: true })
  dateFrom!: Date | null;

  @Column({ name: 'date_to', type: 'timestamp', nullable: true })
  dateTo!: Date | null;

  @Column({ name: 'pages_fetched', type: 'int', default: 0 })
  pagesFetched!: number;

  @Column({ name: 'skus_fetched', type: 'int', default: 0 })
  skusFetched!: number;

  @Column({ name: 'skus_upserted', type: 'int', default: 0 })
  skusUpserted!: number;

  @Column({ name: 'inventory_refreshed', type: 'int', default: 0 })
  inventoryRefreshed!: number;

  @Column({ type: 'enum', enum: CatalogSyncRunsStatus })
  status!: CatalogSyncRunsStatus;

  @Column({ name: 'error_message', type: 'text', nullable: true })
  errorMessage!: string | null;
}
