import { Column, Entity, Index, PrimaryColumn } from 'typeorm';
import { PolygonsZoneType } from './enums';

@Entity({ name: 'polygons' })
@Index('idx_polygons_active', ['isActive'])
export class Polygon {
  @PrimaryColumn({
    type: 'int',
    generated: 'increment',
    generatedIdentity: 'BY DEFAULT',
  })
  id!: number;

  @Column({ type: 'varchar', length: 150, nullable: true })
  name!: string | null;

  @Column({
    name: 'zone_type',
    type: 'enum',
    enum: PolygonsZoneType,
    default: PolygonsZoneType.SLOTTED,
  })
  zoneType!: PolygonsZoneType;

  @Column({ type: 'jsonb' })
  polygon!: Record<string, unknown>;

  @Column({ name: 'is_active', type: 'boolean', default: true })
  isActive!: boolean;

  @Column({ name: 'created_at', type: 'timestamp', default: () => 'now()' })
  createdAt!: Date;

  @Column({ name: 'updated_at', type: 'timestamp', default: () => 'now()' })
  updatedAt!: Date;
}
