#!/bin/sh
set -e

# exec so the app becomes PID 1 and receives SIGTERM directly, letting Nest's
# shutdown hooks close the Postgres and Redis connections cleanly.
exec "$@"
