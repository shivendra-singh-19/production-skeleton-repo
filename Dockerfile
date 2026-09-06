# ---- build ----
FROM node:22-alpine AS build

WORKDIR /app

COPY package.json yarn.lock ./
RUN yarn install --frozen-lockfile

COPY tsconfig.json tsconfig.build.json nest-cli.json ./
COPY src ./src

RUN yarn build


# ---- runtime ----
FROM node:22-alpine AS runtime

WORKDIR /app

ENV NODE_ENV=production

# AWS CLI is required by entrypoint.sh to fetch secrets
RUN apk add --no-cache aws-cli jq

# Production dependencies only
COPY package.json yarn.lock ./
RUN yarn install --frozen-lockfile --production \
    && yarn cache clean

# Application
COPY --from=build /app/dist ./dist

# Startup script
COPY entrypoint.sh ./entrypoint.sh
RUN chmod +x ./entrypoint.sh

# Secrets are NOT copied into the image.
# entrypoint.sh fetches config.json from AWS Secrets Manager at startup.

USER node

EXPOSE 3000

ENTRYPOINT ["./entrypoint.sh"]

CMD ["node", "dist/main.js"]