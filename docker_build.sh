#!/bin/sh

npm i
node cache/cache.js
npm run build
rsync -a --delete /app/build/ /build/