import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryColumn,
} from 'typeorm';
import { RankRuleTemplate } from './rank-rule-template.entity';

@Entity({ name: 'rank_rule_product_order' })
@Index('idx_rrpo_lookup', ['subcategoryCode', 'ruleTemplateId'])
@Index(
  'uniq_rrpo_subcat_rule_sku',
  ['subcategoryCode', 'ruleTemplateId', 'skuCode'],
  { unique: true },
)
export class RankRuleProductOrder {
  @PrimaryColumn({
    type: 'int',
    generated: 'increment',
    generatedIdentity: 'BY DEFAULT',
  })
  id!: number;

  @Column({ name: 'subcategory_code', type: 'varchar', length: 50 })
  subcategoryCode!: string;

  @Column({ name: 'rule_template_id', type: 'int' })
  ruleTemplateId!: number;

  @Column({ name: 'sku_code', type: 'varchar', length: 100 })
  skuCode!: string;

  @Column({ name: 'sort_order', type: 'int', default: 0 })
  sortOrder!: number;

  @Column({ name: 'created_at', type: 'timestamptz', default: () => 'now()' })
  createdAt!: Date;

  @Column({ name: 'updated_at', type: 'timestamptz', default: () => 'now()' })
  updatedAt!: Date;

  @ManyToOne(() => RankRuleTemplate, { onDelete: 'CASCADE' })
  @JoinColumn({
    name: 'rule_template_id',
    referencedColumnName: 'id',
    foreignKeyConstraintName: 'fk_rrpo_rule',
  })
  ruleTemplate!: RankRuleTemplate;
}
