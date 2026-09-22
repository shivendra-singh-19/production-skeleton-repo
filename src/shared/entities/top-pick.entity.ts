import { Column, Entity, Index, PrimaryColumn } from 'typeorm';

@Entity({ name: 'top_picks' })
@Index('uk_top_picks_sku', ['skuCode'], { unique: true })
export class TopPick {
  @PrimaryColumn({
    type: 'int',
    generated: 'increment',
    generatedIdentity: 'BY DEFAULT',
  })
  id!: number;

  @Column({ name: 'sku_code', type: 'varchar', length: 64 })
  skuCode!: string;

  @Column({
    name: 'special_price',
    type: 'numeric',
    precision: 10,
    scale: 2,
    default: () => '0.00',
  })
  specialPrice!: string;

  @Column({ name: 'is_active', type: 'boolean', default: true })
  isActive!: boolean;

  @Column({ name: 'sort_order', type: 'int', default: 0 })
  sortOrder!: number;

  @Column({ name: 'created_at', type: 'timestamp', default: () => 'now()' })
  createdAt!: Date;

  @Column({ name: 'updated_at', type: 'timestamp', default: () => 'now()' })
  updatedAt!: Date;
}
