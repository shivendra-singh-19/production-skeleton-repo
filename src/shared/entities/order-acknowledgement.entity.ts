import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity({ name: 'order_acknowledgements' })
export class OrderAcknowledgement {
  @PrimaryColumn({ name: 'order_id', type: 'int' })
  orderId!: number;

  @Column({
    name: 'acknowledged_at',
    type: 'timestamp',
    default: () => 'now()',
  })
  acknowledgedAt!: Date;
}
