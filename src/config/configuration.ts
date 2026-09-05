import { readFileSync } from 'node:fs';
import { isAbsolute, resolve } from 'node:path';

/**
 * Shape of config.json. Purely descriptive — it documents the tree and gives
 * editors autocomplete; nothing here has to be updated for the app to read a
 * new key, since the file is loaded wholesale.
 */
export interface Configuration {
  app: {
    port: number;
    globalPrefix: string;
  };
  postgres: {
    host: string;
    port: number;
    username: string;
    password: string;
    database: string;
    synchronize: boolean;
    logging: boolean;
  };
  redis: {
    host: string;
    port: number;
    password: string | null;
    db: number;
    keyPrefix: string;
  };
}

/**
 * Path to the config file. Defaults to config.json in the project root; the
 * CONFIG_PATH env var only relocates the file, it never supplies values.
 */
export function configFilePath(): string {
  const configured = process.env.CONFIG_PATH ?? 'config.json';
  return isAbsolute(configured) ? configured : resolve(process.cwd(), configured);
}

/**
 * Loads config.json as-is. The whole tree is handed to ConfigModule, so any key
 * is reachable with a dotted path — `config.get('postgres.host')` — without
 * being enumerated here.
 */
export function loadConfiguration(): Record<string, unknown> {
  const path = configFilePath();

  try {
    return JSON.parse(readFileSync(path, 'utf8')) as Record<string, unknown>;
  } catch (error) {
    const reason = error instanceof Error ? error.message : String(error);
    throw new Error(
      `Unable to read config from ${path}: ${reason}. Copy config.example.json to config.json to get started.`,
    );
  }
}
