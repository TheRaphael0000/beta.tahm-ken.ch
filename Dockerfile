FROM node:lts-alpine

WORKDIR /app

RUN apk add rsync --no-cache

COPY ./package*.json .
COPY ./svelte.config.js .
COPY ./vite.config.ts .
COPY ./tsconfig.json .
COPY ./docker_build.sh .
COPY ./cache cache
COPY ./static static
COPY ./src src

CMD ["sh", "./docker_build.sh"]