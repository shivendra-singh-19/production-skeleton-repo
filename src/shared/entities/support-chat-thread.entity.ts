import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryColumn,
} from 'typeorm';
import { User } from './user.entity';

@Entity({ name: 'support_chat_threads' })
@Index('idx_support_chat_threads_conversation', ['salesiqConversationId'])
@Index('uk_support_chat_threads_user', ['userId'], { unique: true })
export class SupportChatThread {
  @PrimaryColumn({
    type: 'int',
    generated: 'increment',
    generatedIdentity: 'BY DEFAULT',
  })
  id!: number;

  @Column({ name: 'user_id', type: 'int' })
  userId!: number;

  @Column({
    name: 'salesiq_conversation_id',
    type: 'varchar',
    length: 128,
    nullable: true,
  })
  salesiqConversationId!: string | null;

  @Column({
    name: 'salesiq_wms_chat_id',
    type: 'varchar',
    length: 64,
    nullable: true,
  })
  salesiqWmsChatId!: string | null;

  @Column({
    name: 'salesiq_numeric_conversation_id',
    type: 'varchar',
    length: 32,
    nullable: true,
  })
  salesiqNumericConversationId!: string | null;

  @Column({ name: 'visitor_user_id', type: 'varchar', length: 64 })
  visitorUserId!: string;

  @Column({ type: 'varchar', length: 16, default: 'open' })
  status!: string;

  @Column({ name: 'created_at', type: 'timestamptz', default: () => 'now()' })
  createdAt!: Date;

  @Column({ name: 'updated_at', type: 'timestamptz', default: () => 'now()' })
  updatedAt!: Date;

  @ManyToOne(() => User, { onDelete: 'CASCADE' })
  @JoinColumn({
    name: 'user_id',
    referencedColumnName: 'id',
    foreignKeyConstraintName: 'fk_support_chat_threads_user',
  })
  user!: User;
}
