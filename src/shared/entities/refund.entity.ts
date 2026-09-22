import { Column, Entity, Index, PrimaryColumn } from 'typeorm';
import { RefundsReason, RefundsStatus } from './enums';

@Entity({ name: 'refunds' })
@Index('idx_refunds_order', ['orderId'])
@Index('idx_refunds_payment', ['paymentId'])
@Index('uq_refunds_razorpay_refund_id', ['razorpayRefundId'], { unique: true })
export class Refund {
  @PrimaryColumn({
    type: 'int',
    generated: 'increment',
    generatedIdentity: 'BY DEFAULT',
  })
  id!: number;

  @Column({ name: 'order_id', type: 'int' })
  orderId!: number;

  @Column({ name: 'payment_id', type: 'int' })
  paymentId!: number;

  @Column({ name: 'razorpay_payment_id', type: 'varchar', length: 50 })
  razorpayPaymentId!: string;

  @Column({
    name: 'razorpay_refund_id',
    type: 'varchar',
    length: 50,
    nullable: true,
  })
  razorpayRefundId!: string | null;

  @Column({ type: 'numeric', precision: 10, scale: 2 })
  amount!: string;

  @Column({ type: 'enum', enum: RefundsReason, default: RefundsReason.OTHER })
  reason!: RefundsReason;

  @Column({ type: 'text', nullable: true })
  note!: string | null;

  @Column({ name: 'line_nos', type: 'jsonb', nullable: true })
  lineNos!: Record<string, unknown> | null;

  @Column({
    type: 'enum',
    enum: RefundsStatus,
    default: RefundsStatus.INITIATED,
  })
  status!: RefundsStatus;

  @Column({ name: 'error_message', type: 'text', nullable: true })
  errorMessage!: string | null;

  @Column({ name: 'created_at', type: 'timestamp', default: () => 'now()' })
  createdAt!: Date;

  @Column({ name: 'updated_at', type: 'timestamp', default: () => 'now()' })
  updatedAt!: Date;
}
