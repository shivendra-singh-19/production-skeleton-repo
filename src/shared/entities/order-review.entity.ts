import { Check, Column, Entity, Index, PrimaryColumn } from 'typeorm';

@Entity({ name: 'order_reviews' })
@Index('idx_order_reviews_user_id', ['userId'])
@Index('uq_order_reviews_order_id', ['orderId'], { unique: true })
@Check(
  'chk_order_reviews_overall_rating',
  '(((overall_rating >= 1) AND (overall_rating <= 5)))',
)
export class OrderReview {
  @PrimaryColumn({
    type: 'int',
    generated: 'increment',
    generatedIdentity: 'BY DEFAULT',
  })
  id!: number;

  @Column({ name: 'order_id', type: 'int' })
  orderId!: number;

  @Column({ name: 'user_id', type: 'int' })
  userId!: number;

  @Column({ name: 'overall_rating', type: 'smallint' })
  overallRating!: number;

  @Column({ type: 'varchar', length: 2000, nullable: true })
  feedback!: string | null;

  @Column({ name: 'created_at', type: 'timestamp', default: () => 'now()' })
  createdAt!: Date;
}
