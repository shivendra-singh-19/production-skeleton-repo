import { Column, Entity, Index, PrimaryColumn } from 'typeorm';

@Entity({ name: 'payment_order_drafts' })
@Index('uq_payment_order_drafts_razorpay_order_id', ['razorpayOrderId'], {
  unique: true,
})
export class PaymentOrderDraft {
  @PrimaryColumn({
    type: 'int',
    generated: 'increment',
    generatedIdentity: 'BY DEFAULT',
  })
  id!: number;

  @Column({ name: 'razorpay_order_id', type: 'varchar', length: 200 })
  razorpayOrderId!: string;

  @Column({ type: 'jsonb' })
  draft!: Record<string, unknown>;

  @Column({ name: 'created_at', type: 'timestamptz', default: () => 'now()' })
  createdAt!: Date;
}
