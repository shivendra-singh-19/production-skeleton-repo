import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryColumn,
} from 'typeorm';
import { Category } from './category.entity';

@Entity({ name: 'subcategories' })
@Index('idx_subcategories_category_code', ['categoryCode'])
@Index('uq_subcategories_cat_slug', ['categoryCode', 'subcategorySlug'], {
  unique: true,
})
@Index('uq_subcategories_code', ['subcategoryCode'], { unique: true })
export class Subcategory {
  @PrimaryColumn({
    type: 'int',
    generated: 'increment',
    generatedIdentity: 'BY DEFAULT',
  })
  id!: number;

  @Column({ name: 'subcategory_code', type: 'varchar', length: 20 })
  subcategoryCode!: string;

  @Column({ name: 'category_code', type: 'varchar', length: 20 })
  categoryCode!: string;

  @Column({ name: 'subcategory_title', type: 'varchar', length: 255 })
  subcategoryTitle!: string;

  @Column({ name: 'category_title', type: 'varchar', length: 255 })
  categoryTitle!: string;

  @Column({ name: 'subcategory_slug', type: 'varchar', length: 255 })
  subcategorySlug!: string;

  @Column({ name: 'subcategory_sort_order', type: 'int', default: 0 })
  subcategorySortOrder!: number;

  @Column({ name: 'is_active', type: 'boolean', default: true })
  isActive!: boolean;

  @Column({ name: 'image_url', type: 'varchar', length: 500, nullable: true })
  imageUrl!: string | null;

  @Column({ name: 'created_at', type: 'timestamptz', default: () => 'now()' })
  createdAt!: Date;

  @Column({ name: 'updated_at', type: 'timestamptz', default: () => 'now()' })
  updatedAt!: Date;

  @ManyToOne(() => Category, { onDelete: 'CASCADE', onUpdate: 'CASCADE' })
  @JoinColumn({
    name: 'category_code',
    referencedColumnName: 'categoryCode',
    foreignKeyConstraintName: 'fk_subcategories_category',
  })
  categoryCodeRef!: Category;
}
