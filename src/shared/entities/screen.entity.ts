import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity({ name: 'screens' })
export class Screen {
  @PrimaryColumn({
    type: 'int',
    generated: 'increment',
    generatedIdentity: 'BY DEFAULT',
  })
  id!: number;

  @Column({ type: 'varchar', length: 150 })
  name!: string;

  @Column({ name: 'admin_id', type: 'int', nullable: true })
  adminId!: number | null;

  @Column({ name: 'is_homepage', type: 'boolean', default: true })
  isHomepage!: boolean;

  @Column({ name: 'draft_widgets', type: 'jsonb', default: () => "'[]'" })
  draftWidgets!: unknown[];

  @Column({ name: 'published_widgets', type: 'jsonb', nullable: true })
  publishedWidgets!: Record<string, unknown> | null;

  @Column({ name: 'published_at', type: 'timestamp', nullable: true })
  publishedAt!: Date | null;

  @Column({ name: 'created_at', type: 'timestamptz', default: () => 'now()' })
  createdAt!: Date;

  @Column({ name: 'updated_at', type: 'timestamptz', default: () => 'now()' })
  updatedAt!: Date;
}
