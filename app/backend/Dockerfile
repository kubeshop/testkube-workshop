# syntax=docker/dockerfile:1
FROM node:20-alpine AS builder

WORKDIR /app/src

COPY package*.json ./

RUN npm ci

COPY . .

RUN npm run build

FROM node:20-alpine

RUN addgroup -g 1001 -S nodejs && adduser -S nextjs -u 1001

WORKDIR /app/src

COPY --from=builder /app/src/package*.json ./

RUN npm ci --only=production

COPY --from=builder /app/src/dist ./dist

USER nextjs

ENTRYPOINT ["node", "dist/main.js"]
