import { Column, Entity, Index, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'app_event_log' })
@Index('idx_app_event_log_name_occurred', ['eventName', 'occurredAt'])
@Index('idx_app_event_log_received', ['receivedAt'])
@Index('idx_app_event_log_user_session', ['userId', 'sessionId', 'occurredAt'])
@Index('uq_app_event_log_event_id', ['eventId'], { unique: true })
export class AppEventLog {
  @PrimaryGeneratedColumn({ type: 'bigint' })
  id!: string;

  @Column({ name: 'event_id', type: 'varchar', length: 191 })
  eventId!: string;

  @Column({ name: 'batch_id', type: 'varchar', length: 191 })
  batchId!: string;

  @Column({ name: 'event_name', type: 'varchar', length: 191 })
  eventName!: string;

  @Column({ name: 'occurred_at', type: 'timestamp' })
  occurredAt!: Date;

  @Column({
    name: 'received_at',
    type: 'timestamp',
    default: () => 'now()',
  })
  receivedAt!: Date;

  @Column({ type: 'varchar', length: 32 })
  platform!: string;

  @Column({ name: 'app_version', type: 'varchar', length: 64 })
  appVersion!: string;

  @Column({
    name: 'session_id',
    type: 'varchar',
    length: 191,
    nullable: true,
  })
  sessionId!: string | null;

  @Column({
    name: 'user_id',
    type: 'integer',
    nullable: true,
  })
  userId!: number | null;

  @Column({
    type: 'varchar',
    length: 64,
    nullable: true,
  })
  pincode!: string | null;

  @Column({
    name: 'customer_type',
    type: 'varchar',
    length: 32,
    nullable: true,
  })
  customerType!: string | null;

  @Column({
    name: 'resolved_page',
    type: 'varchar',
    length: 64,
    nullable: true,
  })
  resolvedPage!: string | null;

  @Column({
    name: 'device_location',
    type: 'varchar',
    length: 128,
    nullable: true,
  })
  deviceLocation!: string | null;

  @Column({
    name: 'ct_name',
    type: 'varchar',
    length: 191,
    nullable: true,
  })
  ctName!: string | null;

  @Column({
    name: 'ga4_name',
    type: 'varchar',
    length: 191,
    nullable: true,
  })
  ga4Name!: string | null;

  @Column({
    name: 'af_name',
    type: 'varchar',
    length: 191,
    nullable: true,
  })
  afName!: string | null;

  @Column({
    name: 'meta_name',
    type: 'varchar',
    length: 191,
    nullable: true,
  })
  metaName!: string | null;

  @Column({ type: 'jsonb' })
  props!: Record<string, any>;
}
