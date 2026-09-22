import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity({ name: 'app_settings' })
export class AppSetting {
  @PrimaryColumn({ type: 'varchar', length: 100, name: 'setting_key' })
  settingKey!: string;

  @Column({ type: 'varchar', length: 255, name: 'setting_value' })
  settingValue!: string;

  // `timestamp` (not `timestamptz`) to match `timestamp without time zone`.
  //
  // Read-only on purpose: the column is owned by the DB, filled by `now()` on
  // insert and by the trg_app_settings_updated_at trigger on update. Letting
  // TypeORM send a value too would be pointless — the trigger overwrites it —
  // and worse, a JS Date written into a naive `timestamp` column carries the app
  // server's timezone, which `now()` does not.
  //
  // The trade-off: after save() the in-memory entity still holds the value that
  // was read, not the one the trigger just wrote. Re-read the row if you need it.
  @Column({
    type: 'timestamp',
    name: 'updated_at',
    default: () => 'now()',
    insert: false,
    update: false,
  })
  updatedAt!: Date;

  @Column({ type: 'varchar', length: 191, name: 'updated_by', nullable: true })
  updatedBy!: string | null;
}
