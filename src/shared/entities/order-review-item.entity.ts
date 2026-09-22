import { Check, Column, Entity, Index, PrimaryColumn } from 'typeorm';

@Entity({ name: 'order_review_items' })
@Index('idx_order_review_items_review_id', ['reviewId'])
@Index('uq_order_review_items_review_sku', ['reviewId', 'skuCode'], {
  unique: true,
})
@Check('chk_order_review_items_rating', '(((rating >= 1) AND (rating <= 5)))')
export class OrderReviewItem {
  @PrimaryColumn({
    type: 'int',
    generated: 'increment',
    generatedIdentity: 'BY DEFAULT',
  })
  id!: number;

  @Column({ name: 'review_id', type: 'int' })
  reviewId!: number;

  @Column({ name: 'sku_code', type: 'varchar', length: 64 })
  skuCode!: string;

  @Column({ type: 'smallint' })
  rating!: number;
}
