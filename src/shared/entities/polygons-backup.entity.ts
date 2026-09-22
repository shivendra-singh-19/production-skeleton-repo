import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity({ name: 'polygons_backup' })
export class PolygonsBackup {
  @PrimaryColumn({
    type: 'int',
    generated: 'increment',
    generatedIdentity: 'BY DEFAULT',
  })
  id!: number;

  @Column({ name: 'polygon_id', type: 'int' })
  polygonId!: number;

  @Column({ type: 'varchar', length: 150, nullable: true })
  name!: string | null;

  @Column({ type: 'jsonb' })
  polygon!: Record<string, unknown>;

  @Column({ name: 'backed_up_at', type: 'timestamp', default: () => 'now()' })
  backedUpAt!: Date;
}
