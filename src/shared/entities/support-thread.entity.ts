import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryColumn,
} from 'typeorm';
import { User } from './user.entity';

@Entity({ name: 'support_threads' })
@Index('idx_support_threads_ticket', ['zohoTicketId'])
@Index('uk_support_threads_user_channel', ['userId', 'channel'], {
  unique: true,
})
export class SupportThread {
  @PrimaryColumn({
    type: 'int',
    generated: 'increment',
    generatedIdentity: 'BY DEFAULT',
  })
  id!: number;

  @Column({ name: 'user_id', type: 'int' })
  userId!: number;

  @Column({ type: 'varchar', length: 20 })
  channel!: string;

  @Column({ name: 'zoho_ticket_id', type: 'varchar', length: 64 })
  zohoTicketId!: string;

  @Column({
    name: 'zoho_ticket_number',
    type: 'varchar',
    length: 32,
    nullable: true,
  })
  zohoTicketNumber!: string | null;

  @Column({
    name: 'zoho_contact_id',
    type: 'varchar',
    length: 64,
    nullable: true,
  })
  zohoContactId!: string | null;

  @Column({
    name: 'last_pushed_thread_id',
    type: 'varchar',
    length: 64,
    nullable: true,
  })
  lastPushedThreadId!: string | null;

  @Column({ name: 'created_at', type: 'timestamptz', default: () => 'now()' })
  createdAt!: Date;

  @Column({ name: 'updated_at', type: 'timestamptz', default: () => 'now()' })
  updatedAt!: Date;

  @ManyToOne(() => User, { onDelete: 'CASCADE' })
  @JoinColumn({
    name: 'user_id',
    referencedColumnName: 'id',
    foreignKeyConstraintName: 'fk_support_threads_user',
  })
  user!: User;
}
