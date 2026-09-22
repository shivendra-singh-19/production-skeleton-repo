import { Column, Entity, Index, PrimaryColumn } from 'typeorm';

@Entity({ name: 'push_campaign_audit_log' })
@Index('idx_push_campaign_audit_log_campaign', ['campaignId'])
export class PushCampaignAuditLog {
  @PrimaryColumn({
    type: 'int',
    generated: 'increment',
    generatedIdentity: 'BY DEFAULT',
  })
  id!: number;

  @Column({ name: 'campaign_id', type: 'int' })
  campaignId!: number;

  @Column({ type: 'varchar', length: 20 })
  action!: string;

  @Column({ name: 'actor_admin_id', type: 'int' })
  actorAdminId!: number;

  @Column({ name: 'created_at', type: 'timestamptz', default: () => 'now()' })
  createdAt!: Date;

  @Column({ type: 'varchar', length: 500, nullable: true })
  note!: string | null;
}
