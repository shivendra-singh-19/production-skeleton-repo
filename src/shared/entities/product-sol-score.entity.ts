import { Column, Entity, Index, PrimaryColumn } from 'typeorm';

@Entity({ name: 'product_sol_scores' })
@Index('idx_sol_profile', ['solScoreProfile'])
@Index('uq_sol_sku', ['skuCode'], { unique: true })
export class ProductSolScore {
  @PrimaryColumn({
    type: 'int',
    generated: 'increment',
    generatedIdentity: 'BY DEFAULT',
  })
  id!: number;

  @Column({ name: 'sku_code', type: 'varchar', length: 100 })
  skuCode!: string;

  @Column({ name: 'sol_score_profile', type: 'varchar', length: 50 })
  solScoreProfile!: string;

  @Column({ name: 'sol_params', type: 'jsonb', nullable: true })
  solParams!: Record<string, unknown> | null;

  @Column({
    name: 'sol_params_source',
    type: 'varchar',
    length: 30,
    nullable: true,
  })
  solParamsSource!: string | null;

  @Column({ name: 'positive_score', type: 'int', default: 0 })
  positiveScore!: number;

  @Column({ name: 'negative_score', type: 'int', default: 0 })
  negativeScore!: number;

  @Column({ name: 'raw_score', type: 'int', default: 0 })
  rawScore!: number;

  @Column({ name: 'rank_in_profile', type: 'int', nullable: true })
  rankInProfile!: number | null;

  @Column({ type: 'numeric', precision: 6, scale: 4, nullable: true })
  percentile!: string | null;

  @Column({ name: 'final_score', type: 'int' })
  finalScore!: number;

  @Column({ type: 'varchar', length: 10 })
  band!: string;

  @Column({ name: 'computed_at', type: 'timestamptz', default: () => 'now()' })
  computedAt!: Date;

  @Column({ name: 'updated_at', type: 'timestamptz', default: () => 'now()' })
  updatedAt!: Date;
}
