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

# Production dependencies only — no nest-cli, typescript, or ts-node.
COPY package.json yarn.lock ./
RUN yarn install --frozen-lockfile --production && yarn cache clean

COPY --from=build /app/dist ./dist
COPY entrypoint.sh ./entrypoint.sh
RUN chmod +x ./entrypoint.sh

# config.json is deliberately NOT copied in: it holds credentials and is
# mounted at runtime. See .dockerignore.
USER node

EXPOSE 3000

CMD ["node", "dist/main.js"]
