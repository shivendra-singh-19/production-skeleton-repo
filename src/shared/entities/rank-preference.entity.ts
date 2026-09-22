import { Check, Column, Entity, PrimaryColumn } from 'typeorm';
import { RankPreferencePreference } from './enums';

@Entity({ name: 'rank_preference' })
@Check('chk_rank_preference_single_row', '((id = 1))')
export class RankPreference {
  @PrimaryColumn({ type: 'smallint', default: 1 })
  id!: number;

  @Column({
    type: 'enum',
    enum: RankPreferencePreference,
    default: RankPreferencePreference.MOST_ORDERED,
  })
  preference!: RankPreferencePreference;

  @Column({ name: 'updated_at', type: 'timestamptz', default: () => 'now()' })
  updatedAt!: Date;
}
