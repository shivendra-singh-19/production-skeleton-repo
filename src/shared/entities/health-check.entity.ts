import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity({ name: 'health_checks' })
export class HealthCheck {
  // Postgres fills this in: TypeORM sends DEFAULT for generated uuid keys
  // rather than generating one in JS, so the column needs a real DB default.
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column({ type: 'varchar', length: 64 })
  source!: string;

  @Column({ type: 'varchar', length: 255 })
  note!: string;

  // No `default:` here — a JS value would be evaluated once at module load and
  // frozen into the schema. CreateDateColumn supplies the value per insert.
  @CreateDateColumn({ type: 'timestamptz', name: 'created_at' })
  createdAt!: Date;
}
