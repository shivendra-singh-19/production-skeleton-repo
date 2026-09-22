import { Column, Entity, Index, PrimaryColumn } from 'typeorm';

@Entity({ name: 'razorpay_webhook_events' })
@Index('idx_rz_order', ['razorpayOrderId'])
@Index('uq_rz_event_id', ['razorpayEventId'], { unique: true })
@Index('uq_rz_payment_event', ['razorpayPaymentId', 'eventType'], {
  unique: true,
})
export class RazorpayWebhookEvent {
  @PrimaryColumn({
    type: 'int',
    generated: 'increment',
    generatedIdentity: 'BY DEFAULT',
  })
  id!: number;

  @Column({
    name: 'razorpay_event_id',
    type: 'varchar',
    length: 50,
    nullable: true,
  })
  razorpayEventId!: string | null;

  @Column({ name: 'event_type', type: 'varchar', length: 40 })
  eventType!: string;

  @Column({ name: 'razorpay_order_id', type: 'varchar', length: 50 })
  razorpayOrderId!: string;

  @Column({
    name: 'razorpay_payment_id',
    type: 'varchar',
    length: 50,
    nullable: true,
  })
  razorpayPaymentId!: string | null;

  @Column({ name: 'payment_id', type: 'int', nullable: true })
  paymentId!: number | null;

  @Column({ name: 'order_id', type: 'int', nullable: true })
  orderId!: number | null;

  @Column({ name: 'raw_payload', type: 'jsonb' })
  rawPayload!: Record<string, unknown>;

  @Column({ type: 'smallint', default: 0 })
  processed!: number;

  @Column({ name: 'error_message', type: 'text', nullable: true })
  errorMessage!: string | null;

  @Column({ name: 'received_at', type: 'timestamp', default: () => 'now()' })
  receivedAt!: Date;
}
