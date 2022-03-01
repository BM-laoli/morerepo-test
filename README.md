# 介绍

> 此项目的主要目标是探究和构建 ，一种Monorepo的项目的最佳实践。这其中结合了很多的社区最佳实践,  本文主要介绍了与项目耦合的 components lib 的构建和开发调试（使用dumi文档生产工具）

## 分支说明

1. master
  没有什么东西

2. only-learn  
  主要讲解了一个 function 类库的结构，类似于babel这种东西，虽然现在babel不用lerna了 哈哈哈，但是学习这种方式的lerna 对我们还是具备一定的借鉴意义的

3. learn-workspace
  这个分支中的例子 是lib 和project混合模式。 它解决了如下的问题：“一个同类型的项目使用lerna 包含 components-lib，tools-lib，project1（PC），project2（H5）”；事实上我并不是非常推荐这种开发方法，更推荐的开发方式是learn-project

4. learn-project
 前面我们也说过，我个人是比较不喜欢 把lib 和项目用monorepo的方法组合起来，我更加推崇的是“分而治之”的理念， lib 和 project分开管理。你可以 建立一个大的组织比如，antd/pro-components，antd/mobile-components , antd/pc-components ，antd/tooks-funtion.....  这些库可以放在一个learn里； Porject1/Porject2/PorjectN 可以和某一个大的项目或者规划结合起来做monorepo ，举一个最适合的例子，我想说应该就要微前端了！

## 详细说明

### only-learn

这里可以直接链接到这个博客去看，我是一次性成功的哈哈哈；说一个坑，如果publish失败请手动 publish 到npm；另外需要说明的是我把里面的项目去掉了，因为我的理念是分治，把lib 和project分开
<a herf="https://juejin.cn/post/6844904194999058440#heading-34"> 类库开发实战2 </a>

### only-workspace

> 我们这里一点点的看，先看内部，在看外部的整个lerna

#### React项目

> p1 是一个最简单的React项目（TS项目）,

具体的操作流程如下：

1. 使用cli 初始化一个react-ts项目

```shell
yarn create react-app my-app --template typescript
```

2. 然后删除其 node_modules ,可以项目cv过来， 最后修改一下  它的 package.json

```json
// 把name 给改了，让它和我们的learn的name 保持一致
  "name":"p1",
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

还有一件事，现在这个地方 有个新的问题 ，请看这个issues <https://github.com/eslint/eslint/issues/13283>，通过✅它 ，我想你应该能够处理这棘手的问题

这里我的解决方法是 采纳了“ mysticatea commented on 15 May 2020 ” 提供的建议，把yarn.lock ,node_modules 全删除，然后加一个依赖 “yarn add eslint-config-react-app”，
这里出现 这个问题的原因，应该和mysticatea 分析的一直的

#### ngmCore

> 这个项目你可以看作是以一个 lib 依赖 一个组件库 多个项目共享的东西都可以挂在这里 ，这个components-lib我参考了这篇博客，也许对你会更有参考意义 <https://github.com/shanejix/shanejix.github.io/issues/76>

```shell
mkdir src && cd src && touch index.ts # 新建源码文件夹以及入口文件
yarn add typescript --dev 
```

ts内容如下

```json
{
  "compilerOptions": {
    "baseUrl": "./",
    "target": "esnext",
    "module": "commonjs",
    "jsx": "react",
    "declaration": true,
    "declarationDir": "lib",
    "strict": true,
    "moduleResolution": "node",
    "allowSyntheticDefaultImports": true,
    "esModuleInterop": true,
    "resolveJsonModule": true
  },
  "include": ["src", "typings.d.ts"],
  "exclude": ["node_modules"]
}
```

接下来我们创建下面的项目结构

```md
alert
    ├── index.tsx           # 源文件
    └── style
        ├── index.less      # 样式文件
        └── index.ts        # 样式文件里为什么存在一个index.ts - 按需加载样式 管理样式依赖 后面章节会提到
```

```shell
yarn add react react-dom @types/react @types/react-dom --dev # 开发时依赖，宿主环境一定存在

yarn add prop-types            # 运行时依赖，宿主环境可能不存在 安装本组件库时一起安装
```

下面的操作就是日填文件

4.Q

- @types/node 能够处理 tsc的报错 <https://stackoverflow.com/questions/57331779/typescript-duplicate-identifier-iteratorresult>
当然了 也能处理这个问题（我选择的是这个方案）

```json
"skipLibCheck": true
```

- 再接下来就能一点一点按照教程区爬就行了，然后就没有了其他的需要说明的了

#### 整体控制

> 前面我们把 package下的的东西基本上都配置好了，现在我们需要把 ，公共的Script和整体的eslint做好

- 我们如何构建build 和script脚本

  在这里我使用的nodejs  cli工具是 zxjs 谷歌爸爸开源的28k （官方文档是最好的老师）

首先我们需要明确目标，我们现在需要两个 scirpt 一个是dev的另一个的build的

./sciert/dev.mjs

```js
#!/usr/bin/env zx
cd ("./packages/ngmCore")

await Promise.all([
  $`yarn dev`,
  $`cd ../p1 && yarn start`,
])

```

./sciert/build.mjs

```js
#!/usr/bin/env zx
cd ("./packages/ngmCore")

// 这里仅仅是build 构建，如果是需要构建成docker-image
//  你可能需要结合实际的情况做CI/CD对接
await $`yarn build`
await $`cd ../p1 && yarn build`
```

对于packjson我们需要调整一下

```json
   "start": "chmod +x ./script/dev.mjs && zx ./script/dev.mjs",
    "build": "chmod +x ./script/build.mjs && zx ./script/build.mjs",
    "install": "lerna bootstrap --use-workspaces"
```

这样就好了

- 我们现在再来看一个问题就是 eslint prettier committing 的问题

由于我们是同仓库管理模式，所以 committing应该是一致的，eslint 和 prettier 应该和每一个子包相关连
？待定

### lerna-p2p

> 这个分支主要是讨论如何在learn中实现 project and project集成, 回顾一下上面我们曾经有说明 这是我认为的比较好的nomorepo集成方式; 在这个例子中，我们有三个 React-PC 项目，他们是一个大项目中的子系统。关于架构，实际上我们可以拿微前端举个例子，但是这并不是在本次讨论的范围内，可以切换到另一个分支参考 lerna-qinkun-web

这一块的话是非常非常的简单的，

- 首先我们需要新建p1 - p3的react项目，

这非常简单，但是我们这里不新建了，我们从原来的only-workspace checout -b 过来，然后把 p1中的ngmCore依赖删除，然后把ngmCore删除掉，最后把项目复制2份，注意要把子包的packagejson名字改对

- 然后我们需要调整个项目的 script 脚本

dev.mjs

```js
#!/usr/bin/env zx
cd ("./packages/p1")

await Promise.all([
  $`yarn start`,
  $`cd ../p2 && yarn start`,
  $`cd ../p3 && yarn start`,
])

```

build.mjs

```js

#!/usr/bin/env zx
cd ("./packages/p1")

// 这里仅仅是build 构建，如果是需要构建成docker-image
//  你可能需要结合实际的情况做CI/CD对接

await Promise.all([
  $`yarn build`,
  $`cd ../p2 && yarn build`,
  $`cd ../p3 && yarn build`,
])

```

- 最后由于 react-scripts start 默认启动的是3000，我们需要调整它
  来到子包项目中，我们把 start 启动改成下面的样子

```json
+++
  "scripts": {
    "start": "PORT=3002 react-scripts start",
    "build": "react-scripts build",
    "test": "react-scripts test",
    "eject": "react-scripts eject"
  },
+++
```

### lerna-qiankun-web

> 这个项目我们来把 之前lerna-p2p 分支的 三个React 项目合并一下，做成微前端的模式, ( 对于微前端的原理和底层实现以及 qiankun的分析，这里我们不扩张放到另一个专题去 ，这里只学习如何和lerna集成), 这里我们假设 p1是主应用，剩下的都是 子项目

### 关于其他

2. 关于公共的 共享的 东西，我们可以放在pack同级别下，让它成为一个独立的包，然后进行 ：相互关联 （但是我认为还是分治的原则，如果你确定多个项目只是小部分的依赖，为什么不放到component-lib中去呢？，退一步说如果你想 进行 project-（）

```js
// 1 新建一个文件夹
// 2 配置它的package.json
// 3 配置它的项目为
```

- only-leran
这个branch 仅仅做了learn 适用于 一些公共库的开发，比如以前的老版本的babel就是采用这个方式去管理他们的库的，目前trao还在使用这个模式，但是目前我们是不推荐的了，可以使用更先进的方式去管理 pnpm
