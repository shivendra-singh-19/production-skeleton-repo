import { Column, Entity, Index, PrimaryColumn } from 'typeorm';

@Entity({ name: 'gifting_ladder' })
@Index('uk_gifting_ladder_sku', ['skuCode'], { unique: true })
export class GiftingLadder {
  @PrimaryColumn({
    type: 'int',
    generated: 'increment',
    generatedIdentity: 'BY DEFAULT',
  })
  id!: number;

  @Column({ name: 'sku_code', type: 'varchar', length: 64 })
  skuCode!: string;

  @Column({
    name: 'unlock_cart_value',
    type: 'numeric',
    precision: 10,
    scale: 2,
    default: () => '0.00',
  })
  unlockCartValue!: string;

  @Column({ name: 'is_active', type: 'boolean', default: true })
  isActive!: boolean;

  @Column({ name: 'created_at', type: 'timestamp', default: () => 'now()' })
  createdAt!: Date;

  @Column({ name: 'updated_at', type: 'timestamp', default: () => 'now()' })
  updatedAt!: Date;
}
