-- Schema for prod-skeleton-backend.
-- The app runs with postgres.synchronize = false, so tables are managed here.
-- Apply with:  psql "$DATABASE_URL" -f db/schema.sql   (idempotent)

CREATE TABLE IF NOT EXISTS health_checks (
  id         uuid         PRIMARY KEY DEFAULT gen_random_uuid(),
  source     varchar(64)  NOT NULL,
  note       varchar(255) NOT NULL,
  created_at timestamptz  NOT NULL DEFAULT now()
);

-- Realign a table created before the defaults above were in place.
-- TypeORM sends DEFAULT for a @PrimaryGeneratedColumn('uuid') instead of
-- generating the value in JS, so id MUST carry a database-side default.
-- gen_random_uuid() is built into Postgres 13+; no uuid-ossp extension needed.
ALTER TABLE health_checks ALTER COLUMN id SET DEFAULT gen_random_uuid();

ALTER TABLE health_checks
  ALTER COLUMN created_at TYPE timestamptz USING created_at::timestamptz;
ALTER TABLE health_checks ALTER COLUMN created_at SET DEFAULT now();

ALTER TABLE health_checks ALTER COLUMN note SET NOT NULL;
