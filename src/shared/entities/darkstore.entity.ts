import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity({ name: 'darkstores' })
export class Darkstore {
  @PrimaryColumn({ name: 'darkstore_id', type: 'varchar', length: 50 })
  darkstoreId!: string;

  @Column({ type: 'varchar', length: 150, nullable: true })
  name!: string | null;

  @Column({ type: 'numeric', precision: 10, scale: 7 })
  lat!: string;

  @Column({ type: 'numeric', precision: 10, scale: 7 })
  lng!: string;

  @Column({ name: 'is_active', type: 'boolean', default: true })
  isActive!: boolean;

  @Column({ name: 'created_at', type: 'timestamp', default: () => 'now()' })
  createdAt!: Date;

  @Column({ name: 'updated_at', type: 'timestamp', default: () => 'now()' })
  updatedAt!: Date;
}
