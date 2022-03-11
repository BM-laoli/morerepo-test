# 简介

> 续上一篇文章之后，我们现在来学习看看如何使用pnpm实现一摸一样的需求（注意⚠️ 里面有些东西，我依然回去引用上一篇文章的部分内容），lib to lib 的模式非常的简单，只需要在ptl 分支做一下延伸就好了

## 开始

### master 分支

> 这里没有什么东西

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

> 这个分支 主要是做了一个 project和 project 的混合 模式 ，以验证pnpm 可以做到诸如此类的功能，这里主要是把  morerepo-test 的 qiankun项目拿过来

实际上，对于pnpm来说非常的简单，只需要把 morerepo-test qiankun的 子包 cv到我们的packages下 ,然后保证script 脚本正常，在用pnpm install 在根目录安装一下就好了，之后就能直接run起来，非常的简单！

## 结论

> 相比之下 pnpm 还是香的，虽然不是银弹但是我希望它能最大限度的成为未来包管理的方式
