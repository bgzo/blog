---
title: 美化 BroadcastChannel
aliases: ['美化 BroadcastChannel']
created: 2025-10-25 11:19:59
modified: 2026-04-11 18:50:20
published: 2025-10-25 11:19:59
tags: ['public', 'writing/lab']
draft: False
description: 原项目设计很新颖，用 Cloudflare / Netlify / Vercel 等平台天然支持 SSR 特性，完成了原网页 https//t.me/s/ 的代理工作。最重要的是，这些平台作为中间转发（代理），可以直接让国内访问到这部分内容（受众 ++）。 原理 之前一直以为是从 Telegram 网页端拉取数据，然后再生成动态站点，但运行一段时间之后发现不是，博文同步更新的很快，部署一次之后，没...
---

原项目设计很新颖，用 [Cloudflare](https://broadcast-channel.pages.dev/) / [Netlify](https://broadcast-channel.netlify.app/) / [Vercel](https://broadcast-channel.vercel.app/) 等平台天然支持 SSR 特性，完成了原网页 https://t.me/s/ 的代理工作。最重要的是，这些平台作为中间转发（代理），可以直接让国内访问到这部分内容（受众 ++）。

## 原理

之前一直以为是从 Telegram 网页端拉取数据，然后再生成动态站点，但运行一段时间之后发现不是，博文同步更新的很快，部署一次之后，没有什么感知。

看了源码之后，发现原来每次加载页面，服务端都会向 Telegram Web 的借口请求一次接口，然后再把数据解包，映射回 Broadcast，给应用作展示。就是这么简单，网页不能做的，这里一样不能做。

那么后来者还能做什么呢？

当然可以，目前项目还存在一些问题：

1. [ ] 一些消息格式不会展示在网页端，这里自然也不会展示；
2. [ ] 自定义样式

第一点目前还没有什么好的办法，但第二点，还是能做一些文章的，那我自己来说，博客篇幅一般要更长，内容更深，更连贯，而 Telegram Channel 我不打算这么用，从发布第一个消息的时候，我就决定把它作为社交媒体的替代物。

而中国人都熟知的社交媒体往往就是「朋友圈」，之前看过很多博主把自己的主题整成这样，其实还蛮羡慕的，比如：

- https://github.com/xiaopanglian/icefox

## 美化

说干就干，这是优化前：

![](https://img.bgzo.cc/2025/202510251122073.png)

这是优化后：

![](https://img.bgzo.cc/2025/202510251124670.png)

左侧的主体还是保持朋友圈的设计，右侧导航栏变成卡片，公告右移，必要的时候隐藏，我觉得还是蛮好看的。

### Changelog

本次改造较多，有些可能与原项目设计冲突，主要有

1. [Remove] 放弃 `PNPM`，改用 bun；
2. [Remove] 放弃 `elint`，迁移过程一直报依赖冲突；
3. [Remove] 移除原项目大部分无用的友链；
4. [Chore] 注释大部分 CSS，改用 tailwindcss；
5. [Chore] 放弃在 Vercel 后台改动变量，直接操作 `.env` 并提交；
6. [Feature] 增加黑暗模式；
7. [Feature] 增加自定义作者名称功能；
8. [Feature] 增加 Google analyse；

### 移除 `elint` 噩梦

几个月前我记得 install 不会报错，但这几个月用 `npm` 就回陷入无止尽的依赖地狱：

```shell
npm install --registry=http://registry.npm.taobao.org
(node:1730496) ExperimentalWarning: CommonJS module /home/bgzo/.nvm/versions/node/v23.3.0/lib/node_modules/npm/node_modules/debug/src/node.js is loading ES Module /home/bgzo/.nvm/versions/node/v23.3.0/lib/node_modules/npm/node_modules/supports-color/index.js using require().
Support for loading ES Module in require() is an experimental feature and might change at any time
(Use `node --trace-warnings ...` to show where the warning was created)
npm error code ERESOLVE
npm error ERESOLVE unable to resolve dependency tree
npm error
npm error While resolving: broadcast-channel@0.1.7
npm error Found: prismjs@1.30.0
npm error node_modules/prismjs
npm error   prismjs@"^1.29.0" from the root project
npm error
npm error Could not resolve dependency:
npm error peer prismjs@"1.28.0" from prismjs-components-importer@0.2.0
npm error node_modules/prismjs-components-importer
npm error   prismjs-components-importer@"^0.2.0" from the root project
npm error
npm error Fix the upstream dependency conflict, or retry
npm error this command with --force or --legacy-peer-deps
npm error to accept an incorrect (and potentially broken) dependency resolution.
npm error
npm error
npm error For a full report see:
npm error /home/bgzo/.npm/_logs/2025-10-25T04_06_35_645Z-eresolve-report.txt
npm error A complete log of this run can be found in: /home/bgzo/.npm/_logs/2025-10-25T04_06_35_645Z-debug-0.log
```

```shell
npm install --registry=http://registry.npm.taobao.org
(node:1734078) ExperimentalWarning: CommonJS module /home/bgzo/.nvm/versions/node/v23.3.0/lib/node_modules/npm/node_modules/debug/src/node.js is loading ES Module /home/bgzo/.nvm/versions/node/v23.3.0/lib/node_modules/npm/node_modules/supports-color/index.js using require().
Support for loading ES Module in require() is an experimental feature and might change at any time
(Use `node --trace-warnings ...` to show where the warning was created)
npm error code ERESOLVE
npm error ERESOLVE unable to resolve dependency tree
npm error
npm error While resolving: broadcast-channel@0.1.7
npm error Found: eslint@9.5.0
npm error node_modules/eslint
npm error   dev eslint@"9.5.0" from the root project
npm error   peer eslint@"^8.57.0 || ^9.0.0" from @eslint-react/eslint-plugin@1.53.1
npm error   node_modules/@eslint-react/eslint-plugin
npm error     peerOptional @eslint-react/eslint-plugin@"^1.19.0" from @antfu/eslint-config@3.16.0
npm error     node_modules/@antfu/eslint-config
npm error       dev @antfu/eslint-config@"^3.0.0" from the root project
npm error
npm error Could not resolve dependency:
npm error peer eslint@"^9.10.0" from @antfu/eslint-config@3.16.0
npm error node_modules/@antfu/eslint-config
npm error   dev @antfu/eslint-config@"^3.0.0" from the root project
npm error
npm error Fix the upstream dependency conflict, or retry
npm error this command with --force or --legacy-peer-deps
npm error to accept an incorrect (and potentially broken) dependency resolution.
npm error
npm error
npm error For a full report see:
npm error /home/bgzo/.npm/_logs/2025-10-25T04_11_14_348Z-eresolve-report.txt
npm error A complete log of this run can be found in: /home/bgzo/.npm/_logs/2025-10-25T04_11_14_348Z-debug-0.log
```

如果忽视冲突直接用 `--legacy-peer-deps` 当然也是可以直接安装的，或者用 `package.json` 指定的 `pnpm` 也可以。只是 `npm` 不行，比较奇怪。

就算侥幸安装上了，后面每次提交前的格式化也总是报错，导致提个代码也磕磕绊绊：

```shell
pnpm lint-staged
✔ Backed up original state in git stash (b2e494a)
⚠ Running tasks for staged files...
  ❯ package.json — 7 files
    ❯ * — 7 files
      ✖ eslint --fix [FAILED]
↓ Skipped because of errors from tasks.
✔ Reverting to original state because of errors...
✔ Cleaning up temporary files...

✖ eslint --fix:

Oops! Something went wrong! :(

ESLint: 9.5.0

Error: Cannot find module 'typescript'
Require stack:
- /home/bgzo/workspaces/BroadcastChannel/node_modules/@typescript-eslint/typescript-estree/dist/create-program/getWatchProgramsForProjects.js
- /home/bgzo/workspaces/BroadcastChannel/node_modules/@typescript-eslint/typescript-estree/dist/clear-caches.js
- /home/bgzo/workspaces/BroadcastChannel/node_modules/@typescript-eslint/typescript-estree/dist/index.js
- /home/bgzo/workspaces/BroadcastChannel/node_modules/@typescript-eslint/parser/dist/parser.js
- /home/bgzo/workspaces/BroadcastChannel/node_modules/@typescript-eslint/parser/dist/index.js
    at Function._resolveFilename (node:internal/modules/cjs/loader:1239:15)
    at Function._load (node:internal/modules/cjs/loader:1064:27)
    at TracingChannel.traceSync (node:diagnostics_channel:322:14)
    at wrapModuleLoad (node:internal/modules/cjs/loader:218:24)
    at Module.require (node:internal/modules/cjs/loader:1325:12)
    at require (node:internal/modules/helpers:136:16)
    at Object.<anonymous> (/home/bgzo/workspaces/BroadcastChannel/node_modules/@typescript-eslint/typescript-estree/dist/create-program/getWatchProgramsForPr
ojects.js:43:25)                                                                                                                                                 at Module._compile (node:internal/modules/cjs/loader:1546:14)
    at Object..js (node:internal/modules/cjs/loader:1698:10)
    at Module.load (node:internal/modules/cjs/loader:1303:32)
```

上面报错可以通过添加 typescript 解决

```shell
pnpm add -D typescript
```

我升级了全部依赖 (`npm update --legacy-peer-deps --registry=http://registry.npm.taobao.org`)，然后发现仍然不能解决这个问题，后面在添加 TailwindCSS 的时候又报版本依赖的错误了，为了最大兼容性，索性直接把 eslint 卸载了：

```shell
pnpm remove @antfu/eslint-config astro-eslint-parser eslint eslint-plugin-astro eslint-plugin-format
pnpm remove lint-staged simple-git-hooks
```

一下子清爽多了。

### 迁移 BUN

迁移很简单，理想的话，主要变更下 `package.json` 脚本

```json
{
  "packageManager": "bun@1.2.23",
  "scripts": {
    "dev": "bunx astro dev",
    "start": "bunx astro dev",
    "build": "bunx astro build",
    "preview": "bunx astro preview",
    "astro": "bunx astro",
    "postinstall": "test -d .git && true"
  }
}
```

然后删掉 `node_modules` 和 `*.lock` 文件，重新 install 即可。

### 引入 Google Analyse

官方推荐的代码直接嵌入网站无法直接在 SSR 站点上起作用，如：

```html
<!-- Google tag (gtag.js) -->
<script async src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXX"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'G-XXXXXXXXX');
</script>
```

使用 Partytown 可以解决 GA4 在网站上不生效的问题，Partytown 将第三方脚本（如 gtag）移到 Web Worker 中运行，避免阻塞主线程，并允许在 SSR 环境中安全执行客户端代码。

```html
<!-- Google tag (gtag.js) -->
<script async src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXX" type="text/partytown"></script>
<script type="text/partytown">
  window.dataLayer = window.dataLayer || [];
  window.gtag = function () {
        dataLayer.push(arguments);
    };
  window.gtag('js', new Date());
  window.gtag('config', 'G-XXXXXXXXX');
</script>
```

- `type="text/partytown"`：指示 Partytown 处理此脚本，将其移到 Worker。
- `is:inline`：确保脚本内容内联加载。
- `src="..."`：异步加载 gtag 库。

并且在 `astro.config.mjs` 添加配置允许这些函数从 Worker 转发到主线程，确保 `gtag` 调用正常工作：

```ts
import partytown from '@astrojs/partytown'

export default defineConfig({
  // ...
  integrations: [partytown({ config: { forward: ['dataLayer.push', 'gtag'] } })],
});
```

参考：

- https://shinya.click/fiddling/astro-google-tag-manager/
- https://github.com/QwikDev/partytown/issues/382#issuecomment-1667675238

大致就是这些，写完了，希望你能玩的快心，我的地址: https://cast.bgzo.cc