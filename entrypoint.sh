#!/bin/sh

set -eu

SECRET_ID="production"
AWS_REGION="ap-south-1"

aws secretsmanager get-secret-value \
  --secret-id "$SECRET_ID" \
  --region "$AWS_REGION" \
  --query SecretString \
  --output text > /app/config.json

exec "$@"