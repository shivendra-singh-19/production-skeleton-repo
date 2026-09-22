import { Entity, JoinColumn, ManyToOne, PrimaryColumn } from 'typeorm';
import { Darkstore } from './darkstore.entity';
import { Polygon } from './polygon.entity';

@Entity({ name: 'polygon_darkstores' })
export class PolygonDarkstore {
  @PrimaryColumn({ name: 'polygon_id', type: 'int' })
  polygonId!: number;

  @PrimaryColumn({ name: 'darkstore_id', type: 'varchar', length: 50 })
  darkstoreId!: string;

  @ManyToOne(() => Darkstore, { onDelete: 'CASCADE' })
  @JoinColumn({
    name: 'darkstore_id',
    referencedColumnName: 'darkstoreId',
    foreignKeyConstraintName: 'fk_pd_darkstore',
  })
  darkstore!: Darkstore;

  @ManyToOne(() => Polygon, { onDelete: 'CASCADE' })
  @JoinColumn({
    name: 'polygon_id',
    referencedColumnName: 'id',
    foreignKeyConstraintName: 'fk_pd_polygon',
  })
  polygon!: Polygon;
}
