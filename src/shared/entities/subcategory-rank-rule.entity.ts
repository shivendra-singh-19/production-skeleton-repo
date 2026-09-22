import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryColumn,
} from 'typeorm';
import { RankRuleTemplate } from './rank-rule-template.entity';
import { Subcategory } from './subcategory.entity';

@Entity({ name: 'subcategory_rank_rules' })
@Index('idx_subcategory_rank_rules_subcategory', ['subcategoryCode'])
@Index('uq_subcategory_rank_rules', ['subcategoryCode', 'ruleTemplateId'], {
  unique: true,
})
export class SubcategoryRankRule {
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

  @Column({ name: 'sort_order', type: 'int', default: 0 })
  sortOrder!: number;

  @Column({ name: 'is_active', type: 'boolean', default: true })
  isActive!: boolean;

  @Column({ name: 'created_at', type: 'timestamptz', default: () => 'now()' })
  createdAt!: Date;

  @Column({ name: 'updated_at', type: 'timestamptz', default: () => 'now()' })
  updatedAt!: Date;

  @ManyToOne(() => Subcategory, { onDelete: 'CASCADE' })
  @JoinColumn({
    name: 'subcategory_code',
    referencedColumnName: 'subcategoryCode',
    foreignKeyConstraintName: 'fk_subcategory_rank_rules_subcategory',
  })
  subcategoryCodeRef!: Subcategory;

  @ManyToOne(() => RankRuleTemplate, { onDelete: 'CASCADE' })
  @JoinColumn({
    name: 'rule_template_id',
    referencedColumnName: 'id',
    foreignKeyConstraintName: 'fk_subcategory_rank_rules_template',
  })
  ruleTemplate!: RankRuleTemplate;
}
