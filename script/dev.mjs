#!/usr/bin/env zx
cd ("./packages/p1")

await Promise.all([
  $`yarn start`,
  $`cd ../p2 && yarn start`,
  $`cd ../p3 && yarn start`,
])
