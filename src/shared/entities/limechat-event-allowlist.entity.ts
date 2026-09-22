import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity({ name: 'limechat_event_allowlist' })
export class LimechatEventAllowlist {
  @PrimaryColumn({ name: 'app_event_name', type: 'varchar', length: 191 })
  appEventName!: string;

  @Column({ type: 'boolean', default: false })
  enabled!: boolean;

  @Column({
    name: 'limechat_event_name',
    type: 'varchar',
    length: 191,
    nullable: true,
  })
  limechatEventName!: string | null;

  @Column({ type: 'varchar', length: 255, nullable: true })
  notes!: string | null;

  @Column({ name: 'updated_at', type: 'timestamp', default: () => 'now()' })
  updatedAt!: Date;
}
