import { Column, Entity, Index, PrimaryColumn } from 'typeorm';
import { UserCampaignEntitlementsStatus } from './enums';

@Entity({ name: 'user_campaign_entitlements' })
@Index('idx_granted_order', ['grantedOrderId'])
@Index('uq_user_campaign', ['userId', 'campaignKey'], { unique: true })
export class UserCampaignEntitlement {
  @PrimaryColumn({
    type: 'int',
    generated: 'increment',
    generatedIdentity: 'BY DEFAULT',
  })
  id!: number;

  @Column({ name: 'user_id', type: 'int' })
  userId!: number;

  @Column({ name: 'campaign_key', type: 'varchar', length: 64 })
  campaignKey!: string;

  @Column({
    type: 'enum',
    enum: UserCampaignEntitlementsStatus,
    default: UserCampaignEntitlementsStatus.PENDING,
  })
  status!: UserCampaignEntitlementsStatus;

  @Column({ name: 'welcome_seen', type: 'boolean', default: false })
  welcomeSeen!: boolean;

  @Column({ name: 'bonus_shown', type: 'boolean', default: false })
  bonusShown!: boolean;

  @Column({ type: 'varchar', length: 32, default: 'onelink' })
  source!: string;

  @Column({ name: 'granted_at', type: 'timestamp', nullable: true })
  grantedAt!: Date | null;

  @Column({ name: 'granted_order_id', type: 'int', nullable: true })
  grantedOrderId!: number | null;

  @Column({ name: 'created_at', type: 'timestamp', default: () => 'now()' })
  createdAt!: Date;

  @Column({ name: 'updated_at', type: 'timestamp', default: () => 'now()' })
  updatedAt!: Date;
}
