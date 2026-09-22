import { Column, Entity, Index, PrimaryColumn } from 'typeorm';
import { OrderItemStatusHistoryCategory } from './enums';

@Entity({ name: 'order_item_status_history' })
@Index('idx_item_history_item', ['orderItemId', 'id'])
export class OrderItemStatusHistory {
  @PrimaryColumn({
    type: 'int',
    generated: 'increment',
    generatedIdentity: 'BY DEFAULT',
  })
  id!: number;

  @Column({ name: 'order_item_id', type: 'int' })
  orderItemId!: number;

  @Column({ type: 'enum', enum: OrderItemStatusHistoryCategory })
  category!: OrderItemStatusHistoryCategory;

  @Column({ type: 'varchar', length: 30 })
  status!: string;

  @Column({ type: 'varchar', length: 30 })
  source!: string;

  @Column({ type: 'varchar', length: 500, nullable: true })
  note!: string | null;

  @Column({ name: 'actor_name', type: 'varchar', length: 100, nullable: true })
  actorName!: string | null;

  @Column({ name: 'created_at', type: 'timestamp', default: () => 'now()' })
  createdAt!: Date;
}
