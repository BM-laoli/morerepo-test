#!/usr/bin/env zx
cd ("./packages/p1")

// 这里仅仅是build 构建，如果是需要构建成docker-image
//  你可能需要结合实际的情况做CI/CD对接

await Promise.all([
  $`yarn build`,
  $`cd ../p2 && yarn build`,
  $`cd ../p3 && yarn build`,
])
