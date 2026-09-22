import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryColumn,
} from 'typeorm';
import { OrderAttributionEventsPlatform } from './enums';
import { Order } from './order.entity';

@Entity({ name: 'order_attribution_events' })
@Index('idx_order_attribution_events_order_id', ['orderId'])
@Index('idx_order_attribution_events_order_platform', ['orderId', 'platform'])
export class OrderAttributionEvent {
  @PrimaryColumn({
    type: 'int',
    generated: 'increment',
    generatedIdentity: 'BY DEFAULT',
  })
  id!: number;

  @Column({ name: 'order_id', type: 'int' })
  orderId!: number;

  @Column({ type: 'enum', enum: OrderAttributionEventsPlatform })
  platform!: OrderAttributionEventsPlatform;

  @Column({ name: 'event_name', type: 'varchar', length: 50 })
  eventName!: string;

  @Column({ type: 'boolean', default: false })
  success!: boolean;

  @Column({ name: 'http_status', type: 'int', nullable: true })
  httpStatus!: number | null;

  @Column({ name: 'request_payload', type: 'jsonb', nullable: true })
  requestPayload!: Record<string, unknown> | null;

  @Column({ name: 'response_body', type: 'text', nullable: true })
  responseBody!: string | null;

  @Column({ name: 'error_message', type: 'text', nullable: true })
  errorMessage!: string | null;

  @Column({ name: 'created_at', type: 'timestamptz', default: () => 'now()' })
  createdAt!: Date;

  @ManyToOne(() => Order, { onDelete: 'CASCADE' })
  @JoinColumn({
    name: 'order_id',
    referencedColumnName: 'id',
    foreignKeyConstraintName: 'fk_order_attribution_events_order',
  })
  order!: Order;
}
