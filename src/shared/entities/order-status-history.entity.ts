import { Column, Entity, Index, PrimaryColumn } from 'typeorm';
import { OrderStatusHistoryCategory } from './enums';

@Entity({ name: 'order_status_history' })
@Index('idx_history_order', ['orderId', 'id'])
export class OrderStatusHistory {
  @PrimaryColumn({
    type: 'int',
    generated: 'increment',
    generatedIdentity: 'BY DEFAULT',
  })
  id!: number;

  @Column({ name: 'order_id', type: 'int' })
  orderId!: number;

  @Column({ type: 'enum', enum: OrderStatusHistoryCategory })
  category!: OrderStatusHistoryCategory;

  @Column({ type: 'varchar', length: 30 })
  status!: string;

  @Column({ type: 'varchar', length: 30 })
  source!: string;

  @Column({ type: 'varchar', length: 500, nullable: true })
  note!: string | null;

  @Column({ name: 'actor_name', type: 'varchar', length: 150, nullable: true })
  actorName!: string | null;

  @Column({ name: 'created_at', type: 'timestamp', default: () => 'now()' })
  createdAt!: Date;
}
