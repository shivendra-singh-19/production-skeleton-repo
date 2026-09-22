import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryColumn,
} from 'typeorm';
import { User } from './user.entity';

@Entity({ name: 'user_address' })
@Index('idx_user_address_is_default', ['userId', 'isDefault'])
@Index('idx_user_address_store_id', ['storeId'])
@Index('idx_user_address_user_id', ['userId'])
export class UserAddress {
  @PrimaryColumn({
    type: 'int',
    generated: 'increment',
    generatedIdentity: 'BY DEFAULT',
  })
  id!: number;

  @Column({ name: 'user_id', type: 'int' })
  userId!: number;

  @Column({ name: 'store_id', type: 'varchar', length: 20, nullable: true })
  storeId!: string | null;

  @Column({ type: 'varchar', length: 100 })
  label!: string;

  @Column({ name: 'formatted_address', type: 'text' })
  formattedAddress!: string;

  @Column({ type: 'numeric', precision: 10, scale: 8, nullable: true })
  latitude!: string | null;

  @Column({ type: 'numeric', precision: 11, scale: 8, nullable: true })
  longitude!: string | null;

  @Column({ name: 'place_id', type: 'varchar', length: 255, nullable: true })
  placeId!: string | null;

  @Column({ name: 'address_meta', type: 'jsonb', default: () => "'{}'" })
  addressMeta!: Record<string, unknown>;

  @Column({ name: 'is_default', type: 'boolean', default: false })
  isDefault!: boolean;

  @Column({ name: 'last_used_at', type: 'timestamptz', nullable: true })
  lastUsedAt!: Date | null;

  @Column({ name: 'created_at', type: 'timestamptz', default: () => 'now()' })
  createdAt!: Date;

  @Column({ name: 'updated_at', type: 'timestamptz', default: () => 'now()' })
  updatedAt!: Date;

  @ManyToOne(() => User, { onDelete: 'CASCADE', onUpdate: 'CASCADE' })
  @JoinColumn({
    name: 'user_id',
    referencedColumnName: 'id',
    foreignKeyConstraintName: 'fk_user_address_user',
  })
  user!: User;
}
