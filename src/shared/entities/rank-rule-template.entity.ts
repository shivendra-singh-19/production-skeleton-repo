import { Column, Entity, Index, PrimaryColumn } from 'typeorm';
import { RankRuleTemplatesField } from './enums';

@Entity({ name: 'rank_rule_templates' })
@Index('idx_rank_rule_templates_active', ['isActive'])
export class RankRuleTemplate {
  @PrimaryColumn({
    type: 'int',
    generated: 'increment',
    generatedIdentity: 'BY DEFAULT',
  })
  id!: number;

  @Column({ type: 'varchar', length: 100 })
  name!: string;

  @Column({ type: 'enum', enum: RankRuleTemplatesField })
  field!: RankRuleTemplatesField;

  @Column({ name: 'match_value', type: 'varchar', length: 255 })
  matchValue!: string;

  @Column({ name: 'is_active', type: 'boolean', default: true })
  isActive!: boolean;

  @Column({ name: 'created_at', type: 'timestamptz', default: () => 'now()' })
  createdAt!: Date;

  @Column({ name: 'updated_at', type: 'timestamptz', default: () => 'now()' })
  updatedAt!: Date;
}
