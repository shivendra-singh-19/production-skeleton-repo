# prod-skeleton-backend

NestJS + TypeScript skeleton wired to Postgres (TypeORM) and Redis (ioredis), with a health
router that exercises both dependencies.

Configuration comes from **`config.json`** — not `.env`. `ConfigModule` is registered with
`ignoreEnvFile: true` and an empty `envFilePath`, so dotenv files are never consulted.

## Setup

```bash
yarn install
cp config.example.json config.json   # then edit credentials
docker compose up -d                 # optional: local postgres + redis
yarn start:dev
```

## Configuration

`config.json` is loaded wholesale and every key is reachable by dotted path — adding a key to
the file is enough, nothing in `src/` needs updating:

```ts
constructor(private readonly config: ConfigService) {}

this.config.getOrThrow<string>('postgres.host');  // throws if absent
this.config.get<number>('redis.db', 0);           // with a fallback
```

`src/config/configuration.ts` reads and parses the file; the `Configuration` interface there is
documentation and editor autocomplete only, not a whitelist.

Set `CONFIG_PATH` to load the file from somewhere else (`CONFIG_PATH=/etc/app/config.json`). That
env var only relocates the file — it never supplies values.

`config.json` is gitignored since it holds credentials; commit changes to `config.example.json`.

| Key | Purpose |
| --- | --- |
| `app.port` | HTTP listen port |
| `app.globalPrefix` | Route prefix, e.g. `api` |
| `postgres.*` | host, port, username, password, database, synchronize, logging |
| `redis.*` | host, port, password (nullable), db, keyPrefix |

> `postgres.synchronize: true` auto-creates tables and is for local development only. Use
> migrations in production.

## Health endpoints

| Method | Route | Behaviour |
| --- | --- | --- |
| `GET` | `/api/health/live` | Liveness. Process check only, no dependencies touched. |
| `GET` | `/api/health` | Readiness. Inserts a row into `health_checks` and pings Redis. |

`GET /api/health` returns `200` when both dependencies are up and `503` when either is down; a
failing dependency is reported in the body rather than throwing, so the response always says what
broke.

```jsonc
{
  "status": "ok",
  "timestamp": "2026-09-05T10:00:00.000Z",
  "uptimeSeconds": 12,
  "dependencies": {
    "postgres": { "status": "up", "latencyMs": 8, "insertedId": "…uuid…", "totalEntries": 1 },
    "redis":    { "status": "up", "latencyMs": 1, "response": "PONG" }
  }
}
```

The Redis probe also writes `health:last-check` with a 300s TTL (under the configured
`keyPrefix`), so a successful check is observable from `redis-cli` too.

## Docker

```bash
./build.sh
docker run -p 3000:3000 -v "$(pwd)/config.json:/app/config.json:ro" prod-skeleton-backend
```

`build.sh` builds `prod-skeleton-backend:latest`. Override with `IMAGE` / `TAG`:
`IMAGE=registry.example.com/api TAG=v1.2.0 ./build.sh`.

`config.json` is **not** baked into the image (it holds credentials, and is listed in
`.dockerignore`) — mount it at runtime. Set `CONFIG_PATH` to mount it somewhere other than
`/app/config.json`.

The entrypoint `exec`s the command from `CMD`, so the Node process becomes PID 1 and receives
`SIGTERM` directly — `docker stop` triggers Nest's shutdown hooks and closes the Postgres and
Redis connections cleanly.

When the app runs in a container against services on the host, `postgres.host` / `redis.host`
must be `host.docker.internal` rather than `localhost`.

## Layout

```
src/
  config/       config.json loader + global ConfigModule wiring
  database/     TypeOrmModule.forRootAsync, reads postgres.* from config
  redis/        ioredis client provider + RedisService (ping/get/set)
  entities/     TypeORM entities (HealthCheck)
  health/       health router + service
  app.module.ts
  main.ts
db/
  schema.sql    table definitions (synchronize is off; apply this by hand)
Dockerfile      multi-stage build, runs as the non-root `node` user
entrypoint.sh   validates config.json, then execs the app
```

## Scripts

| Command | Description |
| --- | --- |
| `yarn start:dev` | Watch-mode dev server |
| `yarn build` | Compile to `dist/` |
| `yarn start:prod` | Run the compiled build |
| `yarn typecheck` | `tsc --noEmit` |
| `yarn format` | Prettier over `src/` |
