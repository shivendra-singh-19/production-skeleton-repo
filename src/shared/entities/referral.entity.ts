import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryColumn,
} from 'typeorm';
import { ReferralsSenderStatus } from './enums';
import { Coupon } from './coupon.entity';
import { Order } from './order.entity';
import { User } from './user.entity';

@Entity({ name: 'referrals' })
@Index('idx_referrals_referrer', ['referrerUserId'])
@Index('idx_referrals_sender_status', ['senderStatus'])
@Index('uq_referrals_referred_user', ['referredUserId'], { unique: true })
export class Referral {
  @PrimaryColumn({
    type: 'int',
    generated: 'increment',
    generatedIdentity: 'BY DEFAULT',
  })
  id!: number;

  @Column({ name: 'referrer_user_id', type: 'int' })
  referrerUserId!: number;

  @Column({ name: 'referred_user_id', type: 'int' })
  referredUserId!: number;

  @Column({ name: 'referral_code_used', type: 'varchar', length: 20 })
  referralCodeUsed!: string;

  @Column({ name: 'receiver_coupon_id', type: 'int' })
  receiverCouponId!: number;

  @Column({ name: 'receiver_seen_at', type: 'timestamp', nullable: true })
  receiverSeenAt!: Date | null;

  @Column({
    name: 'sender_status',
    type: 'enum',
    enum: ReferralsSenderStatus,
    default: ReferralsSenderStatus.PENDING,
  })
  senderStatus!: ReferralsSenderStatus;

  @Column({ name: 'sender_coupon_id', type: 'int', nullable: true })
  senderCouponId!: number | null;

  @Column({ type: 'varchar', length: 32, default: 'onelink' })
  source!: string;

  @Column({ name: 'created_at', type: 'timestamptz', default: () => 'now()' })
  createdAt!: Date;

  @Column({ name: 'sender_granted_at', type: 'timestamp', nullable: true })
  senderGrantedAt!: Date | null;

  @Column({ name: 'sender_granted_order_id', type: 'int', nullable: true })
  senderGrantedOrderId!: number | null;

  @Column({ name: 'sender_seen_at', type: 'timestamp', nullable: true })
  senderSeenAt!: Date | null;

  @ManyToOne(() => Coupon)
  @JoinColumn({
    name: 'receiver_coupon_id',
    referencedColumnName: 'id',
    foreignKeyConstraintName: 'fk_referrals_receiver_coupon',
  })
  receiverCoupon!: Coupon;

  @ManyToOne(() => User)
  @JoinColumn({
    name: 'referred_user_id',
    referencedColumnName: 'id',
    foreignKeyConstraintName: 'fk_referrals_referred',
  })
  referredUser!: User;

  @ManyToOne(() => User)
  @JoinColumn({
    name: 'referrer_user_id',
    referencedColumnName: 'id',
    foreignKeyConstraintName: 'fk_referrals_referrer',
  })
  referrerUser!: User;

  @ManyToOne(() => Coupon)
  @JoinColumn({
    name: 'sender_coupon_id',
    referencedColumnName: 'id',
    foreignKeyConstraintName: 'fk_referrals_sender_coupon',
  })
  senderCoupon!: Coupon | null;

  @ManyToOne(() => Order)
  @JoinColumn({
    name: 'sender_granted_order_id',
    referencedColumnName: 'id',
    foreignKeyConstraintName: 'fk_referrals_sender_order',
  })
  senderGrantedOrder!: Order | null;
}
