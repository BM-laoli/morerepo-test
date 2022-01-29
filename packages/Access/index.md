---
category: Components
type: 通用
title: AccessControlList 权限控制
subtitle: 权限控制
---

最细粒度的权限控制，用于配置最细粒度的权限

## 何时使用

在 V3 中，我们的 Access 采用分层设计，分化两层，一个 Router 一个页面内的所有 Function，本组件属于页面内 Function，使用非常简单只需要把你的功能的 id 使用 Access 包裹一次 并且给他对应的 id 就好了

- 控制所有 UI 组件：只需要使用 Access 吧需要控制的组件包裹起来就能实现 最细粒度的权限控制。

- 建议把所有的组件，都放在同一个 module 下管理或者建立一个 json 文件或者是一个 emu 来控制 ，你的 App 内的所有组件，这样在分散的同时也保持了内聚

## API

通过设置 AccessControlList 的属性来识别 当前用户的权限是否可以被识别，被使用

属性说明如下：

| 属性 | 说明 | 类型 | 默认值 | 版本 |
| --- | --- | --- | --- | --- |
| current | 当前组件需要验证的AuthId | Array<string> / T  | Array<string> |  |
| auth | 自定义验证的行为 |  (missList: Array<string> | T, current: Array<string> | U) => boolean;  | false |  null  |
| message | 再没有权限的时候需要提示的信息 | string | null |  |
| except | 取反 | boolean | false |  |

## FAQ

### 我可以在使用时修改其内部状态吗？

> 可以，但是我们建议是你最好不要这么做，这回导致你的状态发生混乱，如果要修改 请使用 qiankunstroe 里的方法直接去修改主 App 的状态，这样它能做到全同步。

## 设计指引
