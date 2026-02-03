#!/bin/sh

echo $VITE_BUILD_VERSION
npm i
node cache/cache.js
npm run build
rsync -a --delete /app/build/ /build/