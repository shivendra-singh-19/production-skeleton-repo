import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreateHealthChecks1790103178922 implements MigrationInterface {
  name = 'CreateHealthChecks1790103178922';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'health_checks',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
            default: 'gen_random_uuid()',
          },
          {
            name: 'source',
            type: 'varchar',
            length: '64',
          },
          {
            name: 'note',
            type: 'varchar',
            length: '255',
          },
          {
            name: 'created_at',
            type: 'timestamptz',
            default: 'CURRENT_TIMESTAMP',
          },
        ],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "health_checks"`);
  }
}
