import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity({ name: 'order_no_sequence' })
export class OrderNoSequence {
  @PrimaryColumn({ type: 'smallint' })
  id!: number;

  @Column({ name: 'next_val', type: 'bigint' })
  nextVal!: string;
}
