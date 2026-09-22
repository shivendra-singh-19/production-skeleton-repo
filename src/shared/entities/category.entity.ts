import { Column, Entity, Index, PrimaryColumn } from 'typeorm';

@Entity({ name: 'categories' })
@Index('uq_categories_code', ['categoryCode'], { unique: true })
@Index('uq_categories_slug', ['categorySlug'], { unique: true })
export class Category {
  @PrimaryColumn({
    type: 'int',
    generated: 'increment',
    generatedIdentity: 'BY DEFAULT',
  })
  id!: number;

  @Column({ name: 'category_code', type: 'varchar', length: 20 })
  categoryCode!: string;

  @Column({ name: 'category_title', type: 'varchar', length: 255 })
  categoryTitle!: string;

  @Column({ name: 'category_slug', type: 'varchar', length: 255 })
  categorySlug!: string;

  @Column({ name: 'category_sort_order', type: 'int', default: 0 })
  categorySortOrder!: number;

  @Column({ name: 'is_active', type: 'boolean', default: true })
  isActive!: boolean;

  @Column({ name: 'image_url', type: 'varchar', length: 500, nullable: true })
  imageUrl!: string | null;

  @Column({
    name: 'sol_score_profile',
    type: 'varchar',
    length: 50,
    nullable: true,
  })
  solScoreProfile!: string | null;

  @Column({ name: 'created_at', type: 'timestamptz', default: () => 'now()' })
  createdAt!: Date;

  @Column({ name: 'updated_at', type: 'timestamptz', default: () => 'now()' })
  updatedAt!: Date;
}
