import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryColumn,
} from 'typeorm';
import { OrdersDeliveryType, OrdersFulfillmentStatusSource } from './enums';
import { User } from './user.entity';
import { UserAddress } from './user-address.entity';

@Entity({ name: 'orders' })
@Index('idx_orders_address', ['addressId'])
@Index('idx_orders_status', ['vinculumStatus'])
@Index('idx_orders_user', ['userId'])
@Index('uq_orders_external_no', ['externalOrderNo'], { unique: true })
export class Order {
  @PrimaryColumn({
    type: 'int',
    generated: 'increment',
    generatedIdentity: 'BY DEFAULT',
  })
  id!: number;

  @Column({ name: 'user_id', type: 'int', nullable: true })
  userId!: number | null;

  @Column({ name: 'address_id', type: 'int', nullable: true })
  addressId!: number | null;

  @Column({ name: 'store_id', type: 'varchar', length: 50, nullable: true })
  storeId!: string | null;

  @Column({
    name: 'order_processing',
    type: 'varchar',
    length: 16,
    nullable: true,
    default: 'B2C',
  })
  orderProcessing!: string | null;

  @Column({
    name: 'delivery_type',
    type: 'enum',
    enum: OrdersDeliveryType,
    default: OrdersDeliveryType.EXPRESS,
  })
  deliveryType!: OrdersDeliveryType;

  @Column({ name: 'slot_day', type: 'varchar', length: 30, nullable: true })
  slotDay!: string | null;

  @Column({ name: 'slot_time', type: 'varchar', length: 50, nullable: true })
  slotTime!: string | null;

  @Column({ name: 'ship_by_date', type: 'date', nullable: true })
  shipByDate!: string | null;

  @Column({
    name: 'customer_name',
    type: 'varchar',
    length: 100,
    nullable: true,
  })
  customerName!: string | null;

  @Column({ name: 'order_type', type: 'varchar', length: 20, nullable: true })
  orderType!: string | null;

  @Column({ name: 'payment_type', type: 'varchar', length: 20, nullable: true })
  paymentType!: string | null;

  @Column({
    name: 'order_currency',
    type: 'varchar',
    length: 10,
    default: 'INR',
  })
  orderCurrency!: string;

  @Column({ name: 'bill_name', type: 'varchar', length: 100, nullable: true })
  billName!: string | null;

  @Column({ name: 'bill_phone', type: 'varchar', length: 20, nullable: true })
  billPhone!: string | null;

  @Column({ name: 'bill_email', type: 'varchar', length: 100, nullable: true })
  billEmail!: string | null;

  @Column({
    name: 'bill_address1',
    type: 'varchar',
    length: 255,
    nullable: true,
  })
  billAddress1!: string | null;

  @Column({ name: 'bill_city', type: 'varchar', length: 100, nullable: true })
  billCity!: string | null;

  @Column({ name: 'bill_state', type: 'varchar', length: 100, nullable: true })
  billState!: string | null;

  @Column({ name: 'bill_pincode', type: 'varchar', length: 10, nullable: true })
  billPincode!: string | null;

  @Column({ name: 'bill_country', type: 'varchar', length: 50, nullable: true })
  billCountry!: string | null;

  @Column({ name: 'ship_name', type: 'varchar', length: 100, nullable: true })
  shipName!: string | null;

  @Column({ name: 'ship_phone', type: 'varchar', length: 20, nullable: true })
  shipPhone!: string | null;

  @Column({ name: 'ship_email', type: 'varchar', length: 100, nullable: true })
  shipEmail!: string | null;

  @Column({
    name: 'ship_address1',
    type: 'varchar',
    length: 255,
    nullable: true,
  })
  shipAddress1!: string | null;

  @Column({ name: 'ship_city', type: 'varchar', length: 100, nullable: true })
  shipCity!: string | null;

  @Column({ name: 'ship_state', type: 'varchar', length: 100, nullable: true })
  shipState!: string | null;

  @Column({ name: 'ship_pincode', type: 'varchar', length: 10, nullable: true })
  shipPincode!: string | null;

  @Column({ name: 'ship_country', type: 'varchar', length: 50, nullable: true })
  shipCountry!: string | null;

  @Column({
    name: 'ship_latitude',
    type: 'numeric',
    precision: 10,
    scale: 8,
    nullable: true,
  })
  shipLatitude!: string | null;

  @Column({
    name: 'ship_longitude',
    type: 'numeric',
    precision: 11,
    scale: 8,
    nullable: true,
  })
  shipLongitude!: string | null;

  @Column({
    name: 'delivery_fee',
    type: 'numeric',
    precision: 10,
    scale: 2,
    default: () => '30.00',
  })
  deliveryFee!: string;

  @Column({
    name: 'cart_fee',
    type: 'numeric',
    precision: 10,
    scale: 2,
    default: () => '0.00',
  })
  cartFee!: string;

  @Column({
    name: 'discount_amount',
    type: 'numeric',
    precision: 10,
    scale: 2,
    default: () => '0.00',
  })
  discountAmount!: string;

  @Column({
    name: 'promotions_discount',
    type: 'numeric',
    precision: 10,
    scale: 2,
    default: () => '0.00',
  })
  promotionsDiscount!: string;

  @Column({
    name: 'discount_code',
    type: 'varchar',
    length: 50,
    nullable: true,
  })
  discountCode!: string | null;

  @Column({
    name: 'referral_discount_code',
    type: 'varchar',
    length: 50,
    nullable: true,
  })
  referralDiscountCode!: string | null;

  @Column({
    name: 'delivery_instructions',
    type: 'text',
    nullable: true,
    comment:
      'Delivery instruction chips + free-text, joined as a single string',
  })
  deliveryInstructions!: string | null;

  @Column({
    name: 'requested_items',
    type: 'text',
    nullable: true,
    comment: 'Cart field: Request for items that you could not find',
  })
  requestedItems!: string | null;

  @Column({
    name: 'sol_points_redeemed',
    type: 'numeric',
    precision: 10,
    scale: 2,
    default: () => '0.00',
  })
  solPointsRedeemed!: string;

  @Column({
    name: 'items_total',
    type: 'numeric',
    precision: 10,
    scale: 2,
    default: () => '0.00',
  })
  itemsTotal!: string;

  @Column({
    name: 'tax_amount',
    type: 'numeric',
    precision: 10,
    scale: 2,
    default: () => '0.00',
  })
  taxAmount!: string;

  @Column({
    name: 'order_total',
    type: 'numeric',
    precision: 10,
    scale: 2,
    default: () => '0.00',
  })
  orderTotal!: string;

  @Column({
    name: 'external_order_no',
    type: 'varchar',
    length: 50,
    nullable: true,
  })
  externalOrderNo!: string | null;

  @Column({
    name: 'vinculum_status',
    type: 'varchar',
    length: 20,
    default: 'QUEUED',
  })
  vinculumStatus!: string;

  @Column({
    name: 'vinculum_order_no',
    type: 'varchar',
    length: 50,
    nullable: true,
  })
  vinculumOrderNo!: string | null;

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

  @Column({
    name: 'fulfillment_status_source',
    type: 'enum',
    enum: OrdersFulfillmentStatusSource,
    nullable: true,
    default: OrdersFulfillmentStatusSource.VINCULUM,
  })
  fulfillmentStatusSource!: OrdersFulfillmentStatusSource | null;

  @Column({ name: 'retry_count', type: 'int', default: 0 })
  retryCount!: number;

  @Column({ name: 'error_message', type: 'text', nullable: true })
  errorMessage!: string | null;

  @Column({ name: 'created_at', type: 'timestamp', default: () => 'now()' })
  createdAt!: Date;

  @Column({ name: 'updated_at', type: 'timestamp', default: () => 'now()' })
  updatedAt!: Date;

  @Column({
    name: 'invoice_number',
    type: 'varchar',
    length: 50,
    nullable: true,
  })
  invoiceNumber!: string | null;

  @Column({ name: 'invoice_date', type: 'timestamp', nullable: true })
  invoiceDate!: Date | null;

  @Column({ name: 'shipped_at', type: 'timestamp', nullable: true })
  shippedAt!: Date | null;

  @Column({
    name: 'tracking_number',
    type: 'varchar',
    length: 100,
    nullable: true,
  })
  trackingNumber!: string | null;

  @Column({
    name: 'tracking_url',
    type: 'varchar',
    length: 500,
    nullable: true,
  })
  trackingUrl!: string | null;

  @Column({ name: 'delivered_at', type: 'timestamp', nullable: true })
  deliveredAt!: Date | null;

  @Column({
    name: 'delivery_remark',
    type: 'varchar',
    length: 500,
    nullable: true,
  })
  deliveryRemark!: string | null;

  @Column({ name: 'pod_urls', type: 'jsonb', nullable: true })
  podUrls!: Record<string, unknown> | null;

  @Column({
    type: 'varchar',
    length: 20,
    nullable: true,
    comment:
      'app_ios | app_android | app (platform unknown) | NULL = pre-existing/unknown',
  })
  channel!: string | null;

  @ManyToOne(() => UserAddress, { onDelete: 'SET NULL', onUpdate: 'CASCADE' })
  @JoinColumn({
    name: 'address_id',
    referencedColumnName: 'id',
    foreignKeyConstraintName: 'fk_orders_address',
  })
  address!: UserAddress | null;

  @ManyToOne(() => User, { onDelete: 'SET NULL' })
  @JoinColumn({
    name: 'user_id',
    referencedColumnName: 'id',
    foreignKeyConstraintName: 'fk_orders_user',
  })
  user!: User | null;
}
