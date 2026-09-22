import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryColumn,
} from 'typeorm';
import { PaymentsStatus } from './enums';
import { Coupon } from './coupon.entity';

@Entity({ name: 'payments' })
@Index('idx_payments_coupon_id', ['couponId'])
export class Payment {
  @PrimaryColumn({
    type: 'int',
    generated: 'increment',
    generatedIdentity: 'BY DEFAULT',
  })
  id!: number;

  @Column({ name: 'user_id', type: 'int' })
  userId!: number;

  @Column({ name: 'razorpay_order_id', type: 'varchar', length: 200 })
  razorpayOrderId!: string;

  @Column({
    name: 'razorpay_payment_id',
    type: 'varchar',
    length: 200,
    nullable: true,
  })
  razorpayPaymentId!: string | null;

  @Column({ name: 'order_id', type: 'int', nullable: true })
  orderId!: number | null;

  @Column({ name: 'finalize_claimed_at', type: 'timestamp', nullable: true })
  finalizeClaimedAt!: Date | null;

  @Column({ type: 'numeric', precision: 10, scale: 2 })
  amount!: string;

  @Column({ type: 'varchar', length: 10, default: 'INR' })
  currency!: string;

  @Column({
    type: 'enum',
    enum: PaymentsStatus,
    default: PaymentsStatus.PENDING,
  })
  status!: PaymentsStatus;

  @Column({
    name: 'created_at',
    type: 'timestamptz',
    nullable: true,
    default: () => 'now()',
  })
  createdAt!: Date | null;

  @Column({ name: 'redeemed_points', type: 'int', default: 0 })
  redeemedPoints!: number;

  @Column({ name: 'coupon_id', type: 'int', nullable: true })
  couponId!: number | null;

  @Column({
    name: 'checkout_snapshot',
    type: 'jsonb',
    nullable: true,
    comment:
      'Cart/address/delivery snapshot from /create-order for webhook finalize',
  })
  checkoutSnapshot!: Record<string, unknown> | null;

  @Column({
    name: 'appsflyer_id',
    type: 'varchar',
    length: 255,
    nullable: true,
  })
  appsflyerId!: string | null;

  @Column({
    name: 'ga_app_instance_id',
    type: 'varchar',
    length: 255,
    nullable: true,
  })
  gaAppInstanceId!: string | null;

  @Column({
    name: 'meta_anon_id',
    type: 'varchar',
    length: 255,
    nullable: true,
  })
  metaAnonId!: string | null;

  @Column({
    type: 'varchar',
    length: 10,
    nullable: true,
    comment: 'ios | android, derived from User-Agent at /create-order',
  })
  platform!: string | null;

  @ManyToOne(() => Coupon, { onDelete: 'SET NULL' })
  @JoinColumn({
    name: 'coupon_id',
    referencedColumnName: 'id',
    foreignKeyConstraintName: 'fk_payments_coupon',
  })
  coupon!: Coupon | null;
}
