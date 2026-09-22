import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryColumn,
} from 'typeorm';
import { OrderItemsItemType } from './enums';
import { Order } from './order.entity';

@Entity({ name: 'order_items' })
@Index('idx_order_items_order', ['orderId'])
export class OrderItem {
  @PrimaryColumn({
    type: 'int',
    generated: 'increment',
    generatedIdentity: 'BY DEFAULT',
  })
  id!: number;

  @Column({ name: 'order_id', type: 'int' })
  orderId!: number;

  @Column({ name: 'line_no', type: 'int' })
  lineNo!: number;

  @Column({ name: 'sku_code', type: 'varchar', length: 50 })
  skuCode!: string;

  @Column({ name: 'sku_name', type: 'varchar', length: 255, nullable: true })
  skuName!: string | null;

  @Column({ type: 'int' })
  quantity!: number;

  @Column({ name: 'unit_price', type: 'numeric', precision: 10, scale: 2 })
  unitPrice!: string;

  @Column({ type: 'numeric', precision: 10, scale: 2, nullable: true })
  mrp!: string | null;

  @Column({ type: 'numeric', precision: 10, scale: 2 })
  subtotal!: string;

  @Column({ type: 'varchar', length: 50, nullable: true })
  status!: string | null;

  @Column({
    name: 'fulfillment_status',
    type: 'varchar',
    length: 30,
    nullable: true,
  })
  fulfillmentStatus!: string | null;

  @Column({
    name: 'refund_status',
    type: 'varchar',
    length: 20,
    nullable: true,
  })
  refundStatus!: string | null;

  @Column({ name: 'gift_note', type: 'varchar', length: 100, nullable: true })
  giftNote!: string | null;

  @Column({
    name: 'created_at',
    type: 'timestamp',
    nullable: true,
    default: () => 'now()',
  })
  createdAt!: Date | null;

  @Column({
    name: 'item_type',
    type: 'enum',
    enum: OrderItemsItemType,
    default: OrderItemsItemType.REGULAR,
  })
  itemType!: OrderItemsItemType;

  @ManyToOne(() => Order, { onDelete: 'CASCADE' })
  @JoinColumn({
    name: 'order_id',
    referencedColumnName: 'id',
    foreignKeyConstraintName: 'fk_order_items_order',
  })
  order!: Order;
}
