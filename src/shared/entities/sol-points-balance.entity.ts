import {
  Check,
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryColumn,
} from 'typeorm';
import { User } from './user.entity';

@Entity({ name: 'sol_points_balance' })
@Check('chk_solpts_balance_nonneg', '((balance >= 0))')
export class SolPointsBalance {
  @PrimaryColumn({ name: 'user_id', type: 'int' })
  userId!: number;

  @Column({ type: 'int', default: 0 })
  balance!: number;

  @Column({ name: 'updated_at', type: 'timestamp', default: () => 'now()' })
  updatedAt!: Date;

  @ManyToOne(() => User, { onDelete: 'CASCADE' })
  @JoinColumn({
    name: 'user_id',
    referencedColumnName: 'id',
    foreignKeyConstraintName: 'fk_solpts_balance_user',
  })
  user!: User;
}
