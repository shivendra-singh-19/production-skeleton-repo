import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryColumn,
} from 'typeorm';
import { SupportChatThread } from './support-chat-thread.entity';

@Entity({ name: 'support_messages' })
@Index('idx_support_messages_thread', ['threadId', 'id'])
@Index('uk_support_messages_external', ['threadId', 'externalMessageId'], {
  unique: true,
})
export class SupportMessage {
  @PrimaryColumn({
    type: 'bigint',
    generated: 'increment',
    generatedIdentity: 'BY DEFAULT',
  })
  id!: string;

  @Column({ name: 'thread_id', type: 'int' })
  threadId!: number;

  @Column({ type: 'varchar', length: 16 })
  role!: string;

  @Column({ type: 'text' })
  text!: string;

  @Column({ name: 'agent_name', type: 'varchar', length: 150, nullable: true })
  agentName!: string | null;

  @Column({ name: 'order_ref', type: 'varchar', length: 64, nullable: true })
  orderRef!: string | null;

  @Column({
    name: 'external_message_id',
    type: 'varchar',
    length: 128,
    nullable: true,
  })
  externalMessageId!: string | null;

  @Column({
    name: 'attachment_conversation_numeric_id',
    type: 'varchar',
    length: 32,
    nullable: true,
  })
  attachmentConversationNumericId!: string | null;

  @Column({
    name: 'attachment_zoho_id',
    type: 'varchar',
    length: 64,
    nullable: true,
  })
  attachmentZohoId!: string | null;

  @Column({
    name: 'attachment_name',
    type: 'varchar',
    length: 255,
    nullable: true,
  })
  attachmentName!: string | null;

  @Column({
    name: 'attachment_mime_type',
    type: 'varchar',
    length: 100,
    nullable: true,
  })
  attachmentMimeType!: string | null;

  @Column({
    name: 'salesiq_conversation_id',
    type: 'varchar',
    length: 128,
    nullable: true,
  })
  salesiqConversationId!: string | null;

  @Column({
    name: 'created_at',
    type: 'timestamptz',
    precision: 3,
    default: () => 'now()',
  })
  createdAt!: Date;

  @ManyToOne(() => SupportChatThread, { onDelete: 'CASCADE' })
  @JoinColumn({
    name: 'thread_id',
    referencedColumnName: 'id',
    foreignKeyConstraintName: 'fk_support_messages_thread',
  })
  thread!: SupportChatThread;
}
