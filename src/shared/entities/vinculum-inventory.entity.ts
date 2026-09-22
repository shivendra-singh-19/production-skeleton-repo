import { Column, Entity, Index, PrimaryColumn } from 'typeorm';

@Entity({ name: 'vinculum_inventory' })
@Index('idx_inv_sku', ['skuCode'])
@Index('uq_inv_sku_loc_lot', ['skuCode', 'location', 'lot'], { unique: true })
export class VinculumInventory {
  @PrimaryColumn({
    type: 'int',
    generated: 'increment',
    generatedIdentity: 'BY DEFAULT',
  })
  id!: number;

  @Column({ name: 'sku_code', type: 'varchar', length: 100 })
  skuCode!: string;

  @Column({ type: 'varchar', length: 50 })
  location!: string;

  @Column({ type: 'varchar', length: 100, default: '' })
  lot!: string;

  @Column({ type: 'numeric', precision: 12, scale: 3, default: () => '0.000' })
  qty!: string;

  @Column({ type: 'timestamp', nullable: true })
  expiry!: Date | null;

  @Column({ name: 'client_id', type: 'varchar', length: 50, nullable: true })
  clientId!: string | null;

  @Column({ name: 'org_id', type: 'varchar', length: 50, nullable: true })
  orgId!: string | null;

  @Column({ name: 'last_synced_at', type: 'timestamp', default: () => 'now()' })
  lastSyncedAt!: Date;
}
