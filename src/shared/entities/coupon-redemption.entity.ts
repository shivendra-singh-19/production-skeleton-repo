import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryColumn,
} from 'typeorm';
import { Coupon } from './coupon.entity';
import { User } from './user.entity';

@Entity({ name: 'coupon_redemptions' })
@Index('idx_credemp_coupon_user', ['couponId', 'userId'])
export class CouponRedemption {
  @PrimaryColumn({
    type: 'int',
    generated: 'increment',
    generatedIdentity: 'BY DEFAULT',
  })
  id!: number;

  @Column({ name: 'coupon_id', type: 'int' })
  couponId!: number;

  @Column({ name: 'user_id', type: 'int' })
  userId!: number;

  @Column({ name: 'order_id', type: 'int', nullable: true })
  orderId!: number | null;

  @Column({ name: 'created_at', type: 'timestamptz', default: () => 'now()' })
  createdAt!: Date;

  @ManyToOne(() => Coupon, { onDelete: 'CASCADE' })
  @JoinColumn({
    name: 'coupon_id',
    referencedColumnName: 'id',
    foreignKeyConstraintName: 'fk_credemp_coupon',
  })
  coupon!: Coupon;

  @ManyToOne(() => User, { onDelete: 'CASCADE' })
  @JoinColumn({
    name: 'user_id',
    referencedColumnName: 'id',
    foreignKeyConstraintName: 'fk_credemp_user',
  })
  user!: User;
}
