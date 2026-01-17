FROM node:lts-alpine AS builder

WORKDIR /app

# install node libs
COPY package*.json .
RUN npm i

# cache files
COPY cache cache
RUN node cache/cache.js

# build app
COPY src src
COPY static static
COPY svelte.config.js .
COPY vite.config.ts .
COPY tsconfig.json .
RUN npm run build

FROM alpine:latest AS data

WORKDIR /app

COPY --from=builder /app/build /app/build
COPY extract_build.sh .

CMD ["sh", "./extract_build.sh"]