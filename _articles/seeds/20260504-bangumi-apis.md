---
title: Bangumi 两个 API 的区别
aliases: ['Bangumi 两个 API 的区别']
created: 2026-05-04 00:19:46
modified: 2026-05-16 23:37:45
published: 2026-05-04 00:19:46
tags: ['api', 'bangumi', 'public', 'writing/seed']
comments: True
draft: False
description: 这周终于把这两个 API 文档搞明白了 1. https//bangumi.github.io/api/ 2. https//next.bgm.tv/p1/#/blog 因为这周研究时间线同步的问题，一直找不到的时间线 API 在 第二个里面有两个可以访问的查询接口，但是提交接口 需要过 cloudflare 的 turnstileToken，这对于我的脚本几乎不可能，所以接入 Bangumi 时...
---

这周终于把这两个 API 文档搞明白了:

1. https://bangumi.github.io/api/
2. https://next.bgm.tv/p1/#/blog

因为这周研究时间线同步的问题，一直找不到的时间线 API 在 第二个里面有两个可以访问的查询接口，但是提交接口 [需要过 cloudflare](https://developers.cloudflare.com/turnstile/get-started/client-side-rendering/) 的 `turnstileToken`，这对于我的脚本几乎不可能，所以接入 Bangumi 时间胶囊的计划只能无限延期。

然后这两个 API 的主要区别就如同 [Bangumi 开发文档]( https://github.com/bangumi/dev-docs) 里讲的，[`bangumi/server-private`](https://github.com/bangumi/server-private) 仓库为新网站 api 后端，基于 TypeScript，实现私有 API，专为新网站前端使用。[`bangumi/api`](https://github.com/bangumi/api) 仓库包括 API 文档，用于第三方开发者查看。

两者重叠，但不冲突。