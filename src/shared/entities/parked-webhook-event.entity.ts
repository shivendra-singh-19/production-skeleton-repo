import { Column, Entity, Index, PrimaryColumn } from 'typeorm';

@Entity({ name: 'parked_webhook_events' })
@Index('idx_pending', ['orderNo', 'drainedAt'])
@Index('uq_park', ['orderNo', 'eventType', 'transid'], { unique: true })
export class ParkedWebhookEvent {
  @PrimaryColumn({
    type: 'bigint',
    generated: 'increment',
    generatedIdentity: 'BY DEFAULT',
  })
  id!: string;

  @Column({ name: 'order_no', type: 'varchar', length: 64 })
  orderNo!: string;

  @Column({ name: 'event_type', type: 'varchar', length: 32 })
  eventType!: string;

  @Column({ type: 'varchar', length: 128, nullable: true })
  transid!: string | null;

  @Column({ name: 'event_id', type: 'int', nullable: true })
  eventId!: number | null;

  @Column({ name: 'raw_payload', type: 'jsonb' })
  rawPayload!: Record<string, unknown>;

  @Column({ name: 'parked_at', type: 'timestamptz', default: () => 'now()' })
  parkedAt!: Date;

  @Column({ name: 'drained_at', type: 'timestamptz', nullable: true })
  drainedAt!: Date | null;
}
