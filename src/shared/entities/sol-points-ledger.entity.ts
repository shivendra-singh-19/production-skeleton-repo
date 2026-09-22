import {
  Check,
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryColumn,
} from 'typeorm';
import { SolPointsLedgerEntryType } from './enums';
import { User } from './user.entity';

@Entity({ name: 'sol_points_ledger' })
@Index('idx_solpts_order', ['orderId'])
@Index('idx_solpts_user', ['userId'])
@Index('uq_solpts_idem', ['idempotencyKey'], { unique: true })
@Check('chk_solpts_points_pos', '((points > 0))')
export class SolPointsLedger {
  @PrimaryColumn({
    type: 'int',
    generated: 'increment',
    generatedIdentity: 'BY DEFAULT',
  })
  id!: number;

  @Column({ name: 'user_id', type: 'int' })
  userId!: number;

  @Column({ name: 'order_id', type: 'int', nullable: true })
  orderId!: number | null;

  @Column({ name: 'entry_type', type: 'enum', enum: SolPointsLedgerEntryType })
  entryType!: SolPointsLedgerEntryType;

  @Column({ type: 'int' })
  points!: number;

  @Column({ name: 'balance_after', type: 'int' })
  balanceAfter!: number;

  @Column({ type: 'varchar', length: 100 })
  reason!: string;

  @Column({ name: 'idempotency_key', type: 'varchar', length: 120 })
  idempotencyKey!: string;

  @Column({ name: 'created_at', type: 'timestamp', default: () => 'now()' })
  createdAt!: Date;

  @ManyToOne(() => User, { onDelete: 'CASCADE' })
  @JoinColumn({
    name: 'user_id',
    referencedColumnName: 'id',
    foreignKeyConstraintName: 'fk_solpts_ledger_user',
  })
  user!: User;
}
