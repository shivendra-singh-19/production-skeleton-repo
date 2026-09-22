import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity({ name: 'sol_score_profiles' })
export class SolScoreProfile {
  @PrimaryColumn({ type: 'varchar', length: 50 })
  code!: string;

  @Column({ type: 'varchar', length: 150 })
  name!: string;

  @Column({ name: 'base_score', type: 'int', default: 30 })
  baseScore!: number;

  @Column({
    name: 'band_high_pct',
    type: 'numeric',
    precision: 4,
    scale: 3,
    default: () => '0.600',
  })
  bandHighPct!: string;

  @Column({
    name: 'band_medium_pct',
    type: 'numeric',
    precision: 4,
    scale: 3,
    default: () => '0.300',
  })
  bandMediumPct!: string;

  @Column({
    name: 'band_normal_pct',
    type: 'numeric',
    precision: 4,
    scale: 3,
    default: () => '0.100',
  })
  bandNormalPct!: string;

  @Column({ name: 'is_active', type: 'boolean', default: true })
  isActive!: boolean;

  @Column({ name: 'param_keys', type: 'text', nullable: true })
  paramKeys!: string | null;

  @Column({ name: 'rules_json', type: 'jsonb' })
  rulesJson!: Record<string, unknown>;

  @Column({ name: 'created_at', type: 'timestamptz', default: () => 'now()' })
  createdAt!: Date;

  @Column({ name: 'updated_at', type: 'timestamptz', default: () => 'now()' })
  updatedAt!: Date;
}
