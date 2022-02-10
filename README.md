# 介绍

> 此项目的主要目标是探究和构建 ，一种Monorepo的项目的最佳实践。这其中结合了很多的社区最佳实践

- master

- leran-workspace
这个branch 适用于一般项目的开发，它包多依赖都管理到了一起，这样一来如果在项目中有 H5 PC 微信等东西的时候就能够用统一的包管理了node_module也是一起管理的，这样方便了后续的运维操作,
1. 两个前端工程项目可以直接把 项目cv过来，然后删除其node_modules , 最后修改一下package.json
```json
// 添加代码的配置，把多包共享的依赖 提取出来就好了
  "peerDependencies": {
    "@testing-library/jest-dom": "^5.16.2",
    "@testing-library/react": "^12.1.2",
    "@testing-library/user-event": "^13.5.0",
    "react": "^17.0.2",
    "react-dom": "^17.0.2",
    "react-scripts": "5.0.0",
    "web-vitals": "^2.1.4"
  },
```
2. 关于公共的 共享的 东西，我们可以放在pack同级别下，让它成为一个独立的包，然后进行 ：相互关联
```js
// 1 新建一个文件夹
// 2 配置它的package.json
// 3 配置它的项目为
```

- only-leran
这个branch 仅仅做了learn 适用于 一些公共库的开发，比如以前的老版本的babel就是采用这个方式去管理他们的库的，目前trao还在使用这个模式，但是目前我们是不推荐的了，可以使用更先进的方式去管理 pnpm
