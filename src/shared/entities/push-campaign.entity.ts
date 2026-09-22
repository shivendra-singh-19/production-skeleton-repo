import { Column, Entity, Index, PrimaryColumn } from 'typeorm';

@Entity({ name: 'push_campaigns' })
@Index('idx_push_campaigns_status', ['status'])
export class PushCampaign {
  @PrimaryColumn({
    type: 'int',
    generated: 'increment',
    generatedIdentity: 'BY DEFAULT',
  })
  id!: number;

  @Column({ type: 'varchar', length: 65 })
  title!: string;

  @Column({ type: 'varchar', length: 240 })
  body!: string;

  @Column({ name: 'deep_link', type: 'varchar', length: 255, nullable: true })
  deepLink!: string | null;

  @Column({ name: 'link_to', type: 'varchar', length: 20, nullable: true })
  linkTo!: string | null;

  @Column({ name: 'link_value', type: 'jsonb', nullable: true })
  linkValue!: Record<string, unknown> | null;

  @Column({ type: 'varchar', length: 20, default: 'ALL_USERS' })
  audience!: string;

  @Column({ name: 'is_test', type: 'boolean', default: false })
  isTest!: boolean;

  @Column({ name: 'test_user_id', type: 'int', nullable: true })
  testUserId!: number | null;

  @Column({ type: 'varchar', length: 20, default: 'DRAFT' })
  status!: string;

  @Column({ name: 'created_by', type: 'int' })
  createdBy!: number;

  @Column({ name: 'created_at', type: 'timestamptz', default: () => 'now()' })
  createdAt!: Date;

  @Column({ name: 'sent_by', type: 'int', nullable: true })
  sentBy!: number | null;

  @Column({ name: 'requested_at', type: 'timestamptz', nullable: true })
  requestedAt!: Date | null;

  @Column({ name: 'recipient_count', type: 'int', nullable: true })
  recipientCount!: number | null;

  @Column({ name: 'delivered_count', type: 'int', nullable: true })
  deliveredCount!: number | null;

  @Column({ name: 'failed_count', type: 'int', nullable: true })
  failedCount!: number | null;

  @Column({ name: 'sent_at', type: 'timestamptz', nullable: true })
  sentAt!: Date | null;

  @Column({ type: 'varchar', length: 500, nullable: true })
  error!: string | null;

  @Column({
    name: 'schedule_type',
    type: 'varchar',
    length: 20,
    default: 'INSTANT',
  })
  scheduleType!: string;

  @Column({ name: 'scheduled_at', type: 'timestamp', nullable: true })
  scheduledAt!: Date | null;

  @Column({
    name: 'platform_filter',
    type: 'varchar',
    length: 10,
    nullable: true,
  })
  platformFilter!: string | null;

  @Column({ type: 'varchar', length: 64, default: 'General' })
  category!: string;

  @Column({ name: 'repeat_count', type: 'int', nullable: true })
  repeatCount!: number | null;

  @Column({ name: 'sends_completed', type: 'int', default: 0 })
  sendsCompleted!: number;

  @Column({ name: 'interval_value', type: 'int', nullable: true })
  intervalValue!: number | null;

  @Column({
    name: 'interval_unit',
    type: 'varchar',
    length: 10,
    nullable: true,
  })
  intervalUnit!: string | null;

  @Column({ name: 'next_fire_at', type: 'timestamp', nullable: true })
  nextFireAt!: Date | null;

  @Column({ name: 'is_paused', type: 'boolean', default: false })
  isPaused!: boolean;
}
