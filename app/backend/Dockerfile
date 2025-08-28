# syntax=docker/dockerfile:1
FROM node:20.19-alpine AS builder

WORKDIR /app/src

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build

FROM node:20.19-alpine

LABEL maintainer="Caio Medeiros Pinto <caio.dona@gmail.com>"

WORKDIR /app/src

COPY --from=builder /app/src/package*.json /app/src/dist /app/src/

RUN npm install --production

ENTRYPOINT [ "node", "src/main.js" ]
