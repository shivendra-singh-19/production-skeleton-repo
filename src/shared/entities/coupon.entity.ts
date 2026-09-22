import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryColumn,
} from 'typeorm';
import { CouponsDiscountType } from './enums';
import { User } from './user.entity';

@Entity({ name: 'coupons' })
@Index('idx_coupons_assigned_user', ['assignedUserId'])
@Index('idx_coupons_is_active', ['isActive'])
@Index('uq_coupons_code', ['code'], { unique: true })
export class Coupon {
  @PrimaryColumn({
    type: 'int',
    generated: 'increment',
    generatedIdentity: 'BY DEFAULT',
  })
  id!: number;

  @Column({ type: 'varchar', length: 50 })
  code!: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  description!: string | null;

  @Column({
    name: 'discount_type',
    type: 'enum',
    enum: CouponsDiscountType,
    default: CouponsDiscountType.FLAT,
  })
  discountType!: CouponsDiscountType;

  @Column({ name: 'discount_value', type: 'numeric', precision: 10, scale: 2 })
  discountValue!: string;

  @Column({
    name: 'max_discount',
    type: 'numeric',
    precision: 10,
    scale: 2,
    nullable: true,
  })
  maxDiscount!: string | null;

  @Column({ name: 'reward_points', type: 'int', nullable: true })
  rewardPoints!: number | null;

  @Column({
    name: 'min_cart_amount',
    type: 'numeric',
    precision: 10,
    scale: 2,
    default: () => '0.00',
  })
  minCartAmount!: string;

  @Column({ name: 'usage_limit', type: 'int', nullable: true })
  usageLimit!: number | null;

  @Column({ name: 'per_user_limit', type: 'int', nullable: true, default: 1 })
  perUserLimit!: number | null;

  @Column({ name: 'assigned_user_id', type: 'int', nullable: true })
  assignedUserId!: number | null;

  @Column({ type: 'varchar', length: 20, nullable: true })
  source!: string | null;

  @Column({ name: 'used_count', type: 'int', default: 0 })
  usedCount!: number;

  @Column({ name: 'starts_at', type: 'timestamp', nullable: true })
  startsAt!: Date | null;

  @Column({ name: 'expires_at', type: 'timestamp', nullable: true })
  expiresAt!: Date | null;

  @Column({ name: 'is_active', type: 'boolean', default: true })
  isActive!: boolean;

  @Column({ name: 'is_code_only', type: 'boolean', default: false })
  isCodeOnly!: boolean;

  @Column({ name: 'created_at', type: 'timestamptz', default: () => 'now()' })
  createdAt!: Date;

  @Column({ name: 'updated_at', type: 'timestamptz', default: () => 'now()' })
  updatedAt!: Date;

  @ManyToOne(() => User, { onDelete: 'SET NULL' })
  @JoinColumn({
    name: 'assigned_user_id',
    referencedColumnName: 'id',
    foreignKeyConstraintName: 'fk_coupons_assigned_user',
  })
  assignedUser!: User | null;
}
