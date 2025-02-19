FROM node:lts-alpine

WORKDIR /app

COPY package*.json .

RUN npm i

COPY . .

# RUN node cache/cache.js

RUN npm run build

CMD rm /build/* -fr && cp /app/build / -r
