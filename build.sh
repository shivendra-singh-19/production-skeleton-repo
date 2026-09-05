#!/bin/sh
set -e

IMAGE="${IMAGE:-prod-skeleton-backend}"
TAG="${TAG:-latest}"

docker build -t "$IMAGE:$TAG" .

echo "built $IMAGE:$TAG"
