import {
  Column,
  CreateDateColumn,
  Entity,
  Index,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity({ name: 'admins' })
// The unique index in production is a plain named index, not a UNIQUE
// constraint — `unique: true` on the column would make TypeORM swap them.
@Index('email', ['email'], { unique: true })
export class Admin {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ type: 'varchar', length: 255 })
  email!: string;

  @Column({ name: 'password_hash', type: 'varchar', length: 255 })
  passwordHash!: string;

  @Column({ type: 'varchar', length: 100 })
  name!: string;

  @Column({ type: 'varchar', length: 50, default: 'admin' })
  role!: string;

  @Column({ name: 'is_active', type: 'boolean', default: true })
  isActive!: boolean;

  @CreateDateColumn({
    name: 'created_at',
    type: 'timestamptz',
    default: () => 'now()',
  })
  createdAt!: Date;

  @UpdateDateColumn({
    name: 'updated_at',
    type: 'timestamptz',
    default: () => 'now()',
  })
  updatedAt!: Date;

  @Column({
    name: 'otp_hash',
    type: 'varchar',
    length: 255,
    nullable: true,
  })
  otpHash!: string | null;

  @Column({
    name: 'otp_expires_at',
    type: 'timestamptz',
    nullable: true,
  })
  otpExpiresAt!: Date | null;

  @Column({
    name: 'otp_attempts',
    type: 'integer',
    default: 0,
  })
  otpAttempts!: number;
}
