import { Column, Entity, Index, PrimaryColumn } from 'typeorm';

@Entity({ name: 'limechat_delivery_log' })
@Index('idx_limechat_delivery_log_name_created', [
  'limechatEventName',
  'createdAt',
])
@Index('idx_limechat_delivery_log_user', ['userId', 'createdAt'])
@Index('uq_limechat_delivery_log_dedupe_key', ['dedupeKey'], { unique: true })
export class LimechatDeliveryLog {
  @PrimaryColumn({
    type: 'bigint',
    generated: 'increment',
    generatedIdentity: 'BY DEFAULT',
  })
  id!: string;

  @Column({ name: 'dedupe_key', type: 'varchar', length: 191 })
  dedupeKey!: string;

  @Column({ name: 'app_event_name', type: 'varchar', length: 191 })
  appEventName!: string;

  @Column({ name: 'limechat_event_name', type: 'varchar', length: 191 })
  limechatEventName!: string;

  @Column({ name: 'user_id', type: 'int', nullable: true })
  userId!: number | null;

  @Column({ name: 'http_status', type: 'int', nullable: true })
  httpStatus!: number | null;

  @Column({ name: 'attempt_count', type: 'int', default: 0 })
  attemptCount!: number;

  @Column({ type: 'boolean', default: false })
  forwarded!: boolean;

  @Column({ name: 'skip_reason', type: 'varchar', length: 32, nullable: true })
  skipReason!: string | null;

  @Column({ name: 'created_at', type: 'timestamp', default: () => 'now()' })
  createdAt!: Date;

  @Column({ name: 'updated_at', type: 'timestamp', default: () => 'now()' })
  updatedAt!: Date;
}
