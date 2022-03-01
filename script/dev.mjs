#!/usr/bin/env zx
cd ("./packages/ngmCore")

await Promise.all([
  $`yarn dev`,
  $`cd ../p1 && yarn start`,
])
