import { join } from 'node:path';

import { DataSource, type DataSourceOptions } from 'typeorm';

import { config } from '../config/configuration';

/**
 * One set of connection options, used by both the running app and the TypeORM
 * CLI. Keeping them in the same object is the point: a CLI that reads its
 * connection from somewhere else will happily apply migrations to a different
 * database than the one the server is talking to.
 */

export const dataSourceOptions: DataSourceOptions = {
  type: 'postgres',
  host: config.postgres.host,
  port: config.postgres.port,
  username: config.postgres.username,
  password: config.postgres.password,
  database: config.postgres.database,
  synchronize: config.postgres.synchronize ?? false,
  logging: config.postgres.logging ?? false,
  // Globs rather than imports, and `{ts,js}` rather than either one, so the same
  // options resolve from src/ under the ts-node CLI and from dist/ at runtime.
  entities: [join(__dirname, '..', 'entities', '*.entity.{ts,js}')],
  migrations: [join(__dirname, 'migrations', '*.{ts,js}')],
  ...(config.app.environment === 'production'
    ? { ssl: { rejectUnauthorized: false } }
    : {}),
};

/** What `typeorm -d src/shared/database/data-source.ts` picks up. */
export default new DataSource(dataSourceOptions);
