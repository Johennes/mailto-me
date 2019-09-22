#!/bin/bash

pushd turndown
npm i
npm run build
popd

npm i
node_modules/web-ext/bin/web-ext build \
    --ignore-files "**/*.xcf" \
    --ignore-files "**/*.sh" \
    --overwrite-dest
