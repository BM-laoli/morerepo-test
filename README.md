# 简介

> 续上一篇文章之后，我们现在来学习看看如何使用pnpm实现一摸一样的需求（注意⚠️ 里面有些东西，我依然回去引用上一篇文章的部分内容），lib to lib 的模式非常的简单，只需要在ptl 分支做一下延伸就好了

# 介绍

> 此项目的主要目标是探究和构建 ，一种Monorepo的项目的最佳实践。这其中结合了很多的社区最佳实践,  本文主要介绍了与项目耦合的 components lib 的构建和开发调试（使用dumi文档生产工具）

## 分支说明

1. main
  没有什么东西

2. only-learn  
  主要讲解了一个 function 类库的结构，类似于babel这种东西，虽然现在babel不用lerna了 哈哈哈，但是学习这种方式的lerna 对我们还是具备一定的借鉴意义的

3. learn-workspace
  这个分支中的例子 是lib 和project混合模式。 它解决了如下的问题：“一个同类型的项目使用lerna 包含 components-lib，tools-lib，project1（PC），project2（H5）”；事实上我并不是非常推荐这种开发方法，更推荐的开发方式是learn-project

4. learn-project
 前面我们也说过，我个人是比较不喜欢 把lib 和项目用monorepo的方法组合起来，我更加推崇的是“分而治之”的理念， lib 和 project分开管理。你可以 建立一个大的组织比如，antd/pro-components，antd/mobile-components , antd/pc-components ，antd/tooks-funtion.....  这些库可以放在一个learn里； Porject1/Porject2/PorjectN 可以和某一个大的项目或者规划结合起来做monorepo ，举一个最适合的例子，我想说应该就要微前端了！

5. ptl分支
   这个分支 主要是做了一个 project和lib的混合 模式 ，以验证pnpm 可以做到诸如此类的功能，很多东西都和lerna的时候上一致的，但是会比 lerna 更加的简单

6. ptp分支
 这个分支 主要是做了一个 project和 project 的混合 模式 ，以验证pnpm 可以做到诸如此类的功能，这里主要是把 morerepo-test的 qiankun项目拿过来

## 详细说明

### master 分支

> 这里没有什么东西

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

- 首先我们需要安装 qiankun  和 react-app-rewired +  customize-cra

qiankun无需多言，那是必要加的 只需要进入主应用（子包p1）

```shell
yarn add qiankun
```

为什么需要 react-app-rewired +  customize-cra  ？ 因为我们要对webpakc的配置做修改，因为qiankun中的某些功能和生命周期需要依赖它 比如 “”的报错，就需要通过它来处理, 这个包只需要给子应用装就好了（子包p2，p3）

```shell
yarn add react-app-rewired customize-cra -D
```

- 然后我们需要为 子应用 和主应用配置启动端口，

首先我们需要给子应用配置覆盖文件

```js
// 两个子应用用的配置是一样的，这里就不多写了
const { name } = require('./package');
const { override, } = require('customize-cra');
const paths = require('react-scripts/config/paths');

module.exports = {
  webpack: override(
    (config, env) => {
      config.output.library = `${name}-[name]`;
      config.output.libraryTarget = 'umd';
      // config.output.jsonpFunction = `webpackJsonp_${name}`; // 这是一个create-react-app对接webpack5的一个open的Bug 还没有得到解决，但是目前使用起来是没有问题
      config.output.globalObject = 'window';
      return config;
    },
  ),
};
```

```json
// 主应用不需要配置什么 只需要指定端口
  "scripts": {
    "start": "PORT=3001 react-scripts start",
    "build": "react-scripts build",
    "test": "react-scripts test",
    "eject": "react-scripts eject"
  },

// 子应用不需要配置什么 需要配置启动项和端口
  "scripts": {
    "start": "GENERATE_SOURCEMAP=false PORT=3002 react-app-rewired start",
    "build": "react-app-rewired build",
    "test": "react-app-rewired test",
    "eject": "react-scripts eject"
  },

    "scripts": {
    "start": "GENERATE_SOURCEMAP=false PORT=3003 react-app-rewired start",
    "build": "react-app-rewired build",
    "test": "react-app-rewired test",
    "eject": "react-scripts eject"
  },
```

- 然后我们现在去配置 主应用 qinkun需要的配置项

首先我们需要理解 一个概念就是 “挂载容器”，它是一个子应用挂载的dom容器，需要在主应用先把“坑占了”，研究了一下 qiankun提供的例子（<https://github1s.com/umijs/qiankun/blob/HEAD/examples/react16/package.json#L12-L15> ），可以看到，主应用在index.html 中放了下面几个div 做为入口（id为 subapp-container 的dom）

```html
<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8">
  <title>QianKun Example</title>
</head>

<body>
  <div class="mainapp">
    <!-- 标题栏 -->
    <header class="mainapp-header">
      <h1>QianKun</h1>
    </header>
    <div class="mainapp-main">
      <!-- 侧边栏 -->
      <ul class="mainapp-sidemenu">
        <li onclick="push('/react16')">React16</li>
        <li onclick="push('/react15')">React15</li>
        <li onclick="push('/vue')">Vue</li>
        <li onclick="push('/vue3')">Vue3</li>
        <li onclick="push('/angular9')">Angular9</li>
        <li onclick="push('/purehtml')">Purehtml</li>
      </ul>
      <!-- 子应用  -->
      <main id="subapp-container"></main>
    </div>
  </div>

  <script>
    function push(subapp) { history.pushState(null, subapp, subapp) }
  </script>
</body>
</html>
```

再看看它的子应用注册代码（注意观察 subapp-container 配置项值）

```js

registerMicroApps(
  [
    {
      name: 'react16',
      entry: '//localhost:7100',
      container: '#subapp-viewport',
      loader,
      activeRule: '/react16',
    },
    {
      name: 'react15',
      entry: '//localhost:7102',
      container: '#subapp-viewport',
      loader,
      activeRule: '/react15',
    },
    {
      name: 'vue',
      entry: '//localhost:7101',
      container: '#subapp-viewport',
      loader,
      activeRule: '/vue',
    },
    {
      name: 'angular9',
      entry: '//localhost:7103',
      container: '#subapp-viewport',
      loader,
      activeRule: '/angular9',
    },
    {
      name: 'purehtml',
      entry: '//localhost:7104',
      container: '#subapp-viewport',
      loader,
      activeRule: '/purehtml',
    },
    {
      name: 'vue3',
      entry: '//localhost:7105',
      container: '#subapp-viewport',
      loader,
      activeRule: '/vue3',
    },
  ],
  {
    beforeLoad: [
      app => {
        console.log('[LifeCycle] before load %c%s', 'color: green;', app.name);
      },
    ],
    beforeMount: [
      app => {
        console.log('[LifeCycle] before mount %c%s', 'color: green;', app.name);
      },
    ],
    afterUnmount: [
      app => {
        console.log('[LifeCycle] after unmount %c%s', 'color: green;', app.name);
      },
    ],
  },
);
```

我们分析了 每个配置项中 container 的id，由此可见，只需要在index.html中放多个带有id的特定的div容器，就能实现同页面多app载入，于是我在p1 主应用的index.html写了下面的代码，并且注册代码如下

```html
    <div id="root"></div>
    <hr>
    <div id="micro-app1" ></div>
    <hr>
    <div id="micro-app2" ></div>
```

```tsx
// MicroApps bootstrap 主App
import { registerMicroApps, start } from 'qiankun';
registerMicroApps([
  {
    name: 'p2', // app name registered
    entry: '//localhost:3002',
    container: '#micro-app1',
    activeRule: '/app2',
  },
  {
    name: 'p3',
    entry: '//localhost:3003',
    container: '#micro-app2',
    activeRule: '/app2',
  },
]);
start();

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);
```

- 去配置我们子应用

这一步我们只需要配置 entry入口导出几个生命周期就好了

```tsx
// 我只列出了一项目 实际上两个文件是类似的，你应该学会举一反三
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

/**
 * bootstrap 只会在微应用初始化的时候调用一次，下次微应用重新进入时会直接调用 mount 钩子，不会再重复触发 bootstrap。
 * 通常我们可以在这里做一些全局变量的初始化，比如不会在 unmount 阶段被销毁的应用级别的缓存等。
 */
 export async function bootstrap() {
  console.log('react app bootstraped');
}

/**
 * 应用每次进入都会调用 mount 方法，通常我们在这里触发应用的渲染方法
 */
export async function mount(props:any) {
  ReactDOM.render(<App />, props.container ? props.container.querySelector('#micro-app1-root') : document.getElementById('micro-app1-root'));
}

/**
 * 应用每次 切出/卸载 会调用的方法，通常在这里我们会卸载微应用的应用实例
 */
export async function unmount(props:any) {
  ReactDOM.unmountComponentAtNode(
    props.container ? props.container.querySelector('#micro-app1-root') : document.getElementById('micro-app1-root'),
  );
}

function render() {
  ReactDOM.render(<React.StrictMode><App /></React.StrictMode>, document.getElementById('micro-app1-root'));
}

render();

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

```

别启动哈，你还没有配置完，注意看你的节点，micro-app1-root，我们去把原来的dom给改了
p2/public/index.html

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <link rel="icon" href="%PUBLIC_URL%/favicon.ico" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <meta name="theme-color" content="#000000" />
    <meta
      name="description"
      content="Web site created using create-react-app"
    />
    <link rel="apple-touch-icon" href="%PUBLIC_URL%/logo192.png" />
    <link rel="manifest" href="%PUBLIC_URL%/manifest.json" />
    <title>React App</title>
  </head>
  <body>
    <noscript>You need to enable JavaScript to run this app.</noscript>
    <div id="micro-app1-root"></div>
  </body>
</html>

```

- 最后你只需要依次（先启动主应用然后启动子应用 ）启动它就好了，非常的简单
浏览器输入 /app2  就能发现两个都载入了

### ptl分支

> 这个分支 主要是做了一个 project和lib的混合 模式 ，以验证pnpm 可以做到诸如此类的功能，很多东西都和lerna的时候上一致的，但是会比 lerna 更加的简单

- 初始化基础的文件夹结构

首先我们 mkdir 我们现在的这个根文件夹，然后以此创建，packages文件，之后从我的另一个项目 morerepo-test （<https://github.com/BM-laoli/morerepo-test/tree/leran-workspace>） 项目把 ngmCore 和p1 都cv到packages下，顺带把根目录的script拿过来就好了

```shell
# 根目录需要执行
pnpm init -y

# 如何子包依赖安装，如何全局依赖安装
cd ./子包
pnpm add xxxx

# 下面是两种全局安装的方式 一个的-d 的一个runtime的
pnpm add xxx -w 
pnpm add xxx -w -D

# 如何安装交叉依赖 假设我们有两个子包 ngmCore 和app1，app1 依赖子包 ngmCore（注意ngmCore中的name 叫做ngmcore，只是大小写问题而已）
cd ./app1

pnpm add ngmcore --workspace
```

- 然后我们配置好 pnpm-workspace.yaml

```yaml
packages:
  # 所有在 packages/ 和 components/ 子目录下的 package
  - 'packages/**'
  # 不包括在 test 文件夹下的 package
  - '!**/test/**'
```

- 配置好根package.json

 一样的道理，只需要把 另一个项目的 script cv过来就好了, 最后尝试执行一下就好了

### ptp分支

> 这个分支 主要是做了一个 project和 project 的混合 模式 ，以验证pnpm 可以做到诸如此类的功能，这里主要是把 morerepo-test的 qiankun项目拿过来 直接cv 子项目然后修改scirpt 和修改
