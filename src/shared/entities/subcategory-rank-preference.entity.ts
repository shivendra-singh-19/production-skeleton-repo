import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn } from 'typeorm';
import { SubcategoryRankPreferencePreference } from './enums';
import { Subcategory } from './subcategory.entity';

@Entity({ name: 'subcategory_rank_preference' })
export class SubcategoryRankPreference {
  @PrimaryColumn({ name: 'subcategory_code', type: 'varchar', length: 50 })
  subcategoryCode!: string;

  @Column({ type: 'enum', enum: SubcategoryRankPreferencePreference })
  preference!: SubcategoryRankPreferencePreference;

  @Column({ name: 'updated_at', type: 'timestamptz', default: () => 'now()' })
  updatedAt!: Date;

  @ManyToOne(() => Subcategory, { onDelete: 'CASCADE' })
  @JoinColumn({
    name: 'subcategory_code',
    referencedColumnName: 'subcategoryCode',
    foreignKeyConstraintName: 'fk_subcategory_rank_preference_subcategory',
  })
  subcategoryCodeRef!: Subcategory;
}
