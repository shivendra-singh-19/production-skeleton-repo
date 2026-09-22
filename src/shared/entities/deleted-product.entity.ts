import { Column, Entity, Index, PrimaryColumn } from 'typeorm';

@Entity({ name: 'deleted_products' })
@Index('idx_deleted_products_deleted_at', ['deletedAt'])
@Index('idx_deleted_products_sku', ['skuCode'])
export class DeletedProduct {
  @PrimaryColumn({
    type: 'int',
    generated: 'increment',
    generatedIdentity: 'BY DEFAULT',
  })
  id!: number;

  @Column({ name: 'product_id', type: 'int' })
  productId!: number;

  @Column({ name: 'sku_code', type: 'varchar', length: 100 })
  skuCode!: string;

  @Column({ type: 'jsonb' })
  snapshot!: Record<string, unknown>;

  @Column({ type: 'varchar', length: 50 })
  reason!: string;

  @Column({ name: 'missing_since', type: 'timestamp', nullable: true })
  missingSince!: Date | null;

  @Column({ name: 'deleted_at', type: 'timestamptz', default: () => 'now()' })
  deletedAt!: Date;
}
