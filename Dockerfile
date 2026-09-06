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

RUN apk add --no-cache aws-cli jq

COPY package.json yarn.lock ./
RUN yarn install --frozen-lockfile --production \
    && yarn cache clean

COPY --from=build /app/dist ./dist
COPY entrypoint.sh ./entrypoint.sh

# Create config location and explicitly give node ownership
RUN mkdir -p /app \
    && chown -R node:node /app \
    && chmod +x /app/entrypoint.sh

USER node

EXPOSE 3000

ENTRYPOINT ["/app/entrypoint.sh"]

CMD ["node", "dist/main.js"]