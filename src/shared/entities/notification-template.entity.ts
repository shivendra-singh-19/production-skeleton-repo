import { Column, Entity, Index, PrimaryColumn } from 'typeorm';
import { NotificationTemplatesDaypart } from './enums';

@Entity({ name: 'notification_templates' })
@Index('idx_notification_templates_category', ['category'])
export class NotificationTemplate {
  @PrimaryColumn({
    type: 'int',
    generated: 'increment',
    generatedIdentity: 'BY DEFAULT',
  })
  id!: number;

  @Column({ type: 'varchar', length: 64 })
  category!: string;

  @Column({ type: 'enum', enum: NotificationTemplatesDaypart, nullable: true })
  daypart!: NotificationTemplatesDaypart | null;

  @Column({
    name: 'suggested_send_time',
    type: 'varchar',
    length: 100,
    nullable: true,
  })
  suggestedSendTime!: string | null;

  @Column({ type: 'varchar', length: 240 })
  body!: string;

  @Column({ name: 'created_by', type: 'int', nullable: true })
  createdBy!: number | null;

  @Column({ name: 'created_at', type: 'timestamptz', default: () => 'now()' })
  createdAt!: Date;

  @Column({ name: 'updated_at', type: 'timestamptz', default: () => 'now()' })
  updatedAt!: Date;
}
