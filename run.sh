#!/bin/bash

pushd turndown
npm i
npm run build
popd

npm i web-ext
node_modules/web-ext/bin/web-ext run --verbose
