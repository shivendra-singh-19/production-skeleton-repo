import { Column, Entity, Index, PrimaryColumn } from 'typeorm';

@Entity({ name: 'users' })
@Index('phone_number', ['phoneNumber'], { unique: true })
@Index('uq_users_referral_code', ['referralCode'], { unique: true })
export class User {
  @PrimaryColumn({
    type: 'int',
    generated: 'increment',
    generatedIdentity: 'BY DEFAULT',
  })
  id!: number;

  @Column({ name: 'phone_number', type: 'varchar', length: 20 })
  phoneNumber!: string;

  @Column({ name: 'first_name', type: 'varchar', length: 100, nullable: true })
  firstName!: string | null;

  @Column({ name: 'last_name', type: 'varchar', length: 100, nullable: true })
  lastName!: string | null;

  @Column({ type: 'varchar', length: 255, nullable: true })
  email!: string | null;

  @Column({ name: 'full_name', type: 'varchar', length: 50, nullable: true })
  fullName!: string | null;

  @Column({ name: 'contact_no', type: 'varchar', length: 15, nullable: true })
  contactNo!: string | null;

  @Column({ type: 'date', nullable: true })
  dob!: string | null;

  @Column({ type: 'varchar', length: 255, nullable: true })
  location!: string | null;

  @Column({ name: 'is_active', type: 'boolean', nullable: true, default: true })
  isActive!: boolean | null;

  @Column({ name: 'is_complete', type: 'boolean', default: false })
  isComplete!: boolean;

  @Column({ name: 'onboarding_completed', type: 'boolean', default: false })
  onboardingCompleted!: boolean;

  @Column({
    name: 'onboarding_completed_at',
    type: 'timestamp',
    nullable: true,
  })
  onboardingCompletedAt!: Date | null;

  @Column({ name: 'mindful_intro_completed', type: 'boolean', default: false })
  mindfulIntroCompleted!: boolean;

  @Column({
    name: 'mindful_intro_completed_at',
    type: 'timestamp',
    nullable: true,
  })
  mindfulIntroCompletedAt!: Date | null;

  @Column({ name: 'created_at', type: 'timestamp', default: () => 'now()' })
  createdAt!: Date;

  @Column({ name: 'updated_at', type: 'timestamp', default: () => 'now()' })
  updatedAt!: Date;

  @Column({ name: 'last_login_at', type: 'timestamp', nullable: true })
  lastLoginAt!: Date | null;

  @Column({ type: 'varchar', length: 10, nullable: true })
  platform!: string | null;

  @Column({
    name: 'referral_code',
    type: 'varchar',
    length: 20,
    nullable: true,
  })
  referralCode!: string | null;

  @Column({ name: 'rating_prompt_count', type: 'int', default: 0 })
  ratingPromptCount!: number;

  @Column({ name: 'rating_prompted', type: 'boolean', default: false })
  ratingPrompted!: boolean;
}
