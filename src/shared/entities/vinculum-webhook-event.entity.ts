import { Column, Entity, Index, PrimaryColumn } from 'typeorm';

@Entity({ name: 'vinculum_webhook_events' })
@Index('idx_webhook_order', ['vinculumOrderNo'])
@Index('uq_webhook_transid_type', ['transid', 'eventType'], { unique: true })
export class VinculumWebhookEvent {
  @PrimaryColumn({
    type: 'int',
    generated: 'increment',
    generatedIdentity: 'BY DEFAULT',
  })
  id!: number;

  @Column({ type: 'varchar', length: 50, nullable: true })
  transid!: string | null;

  @Column({ name: 'event_type', type: 'varchar', length: 40 })
  eventType!: string;

  @Column({
    name: 'vinculum_order_no',
    type: 'varchar',
    length: 50,
    nullable: true,
  })
  vinculumOrderNo!: string | null;

  @Column({ name: 'order_id', type: 'int', nullable: true })
  orderId!: number | null;

  @Column({ name: 'raw_payload', type: 'jsonb' })
  rawPayload!: Record<string, unknown>;

  @Column({ type: 'boolean', default: false })
  processed!: boolean;

  @Column({ name: 'error_message', type: 'text', nullable: true })
  errorMessage!: string | null;

  @Column({ name: 'received_at', type: 'timestamp', default: () => 'now()' })
  receivedAt!: Date;
}
