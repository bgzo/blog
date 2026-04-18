---
title: 图床迁移 Cloudflare R2
aliases: ['图床迁移 Cloudflare R2']
created: 2026-04-12 00:55:38
modified: 2026-04-12 22:09:38
tags: ['blog', 'cloudflare', 'public', 'writing/lab']
comments: True
draft: False
published: 2026-04-12 16:23:58
description: 不得不说 CF 是互联网界的活菩萨，免费提供的对象存储量大管饱，对我这种没人看的小透明足够了： 存储：10GB/月免费，每增加 1GB/月收取 0.015 美元 A 类操作：100 万次操作/月免费，每增加 100 万次操作收取 4.50 美元 B 类操作：1000 万次操作/月免费，每增加 100 万次操作收取 0.36 美元 出口流量费全免 [!TIP] 什么意思呢？只有访问次数计入账单（A ...
---

不得不说 CF 是互联网界的活菩萨，免费提供的对象存储量大管饱，对我这种没人看的小透明足够了：

- 存储：10GB/月免费，每增加 1GB/月收取 0.015 美元
- A 类操作：100 万次操作/月免费，每增加 100 万次操作收取 4.50 美元
- B 类操作：1000 万次操作/月免费，每增加 100 万次操作收取 0.36 美元
- 出口流量费全免

> [!TIP]
> 什么意思呢？只有访问次数计入账单（A 类上传，B 类访问），无论多大的文件，流量费全免！

2026 年了，我可能是最后一个知道 Cloudflare R2 的人了吧，PicList + (Cloudflare R2) S3API，可能是博客圈的一套标准答案了。

我之前一直用 GitHub / NPM 存图片，然后用一些公共的 CDN 做图床，其实也算方便，如果 CDN 有一天不能用了，或者我挂逼了，可以直接按规则把前缀改一下，图片就都回来了。

为什么还要大动干戈，转移到 Cloudflare 呢？

因为我最近有传视频的需求了，之前我的博客很少有图片，几乎没有视频，我还能考压缩把他们压缩到 1M，512KB 内，所以最终 GitHub 仓库不会很大，还能接受。

但这次我的视频是 3M，已经不能简单的压缩了，上传 GitHub 容易引起提及暴涨，并且对 GitHub 来说，图床其实已经是算违规操作了，按最近全球去微软，GitHub Copilot 被薅羊毛的趋势，财大气粗的微软可能也不一定靠谱。

没有办法，最终选择看看 CF 吧。

大体迁移流程类似： https://zhuanlan.zhihu.com/p/2003661503337886355

我就不赘述了，我就简单说迁移前后的一些心得：

## 二次压缩

因为最开始上传 GitHub 用的 PicGo，那时还没有大小管理的概念，所以上传的图片大多比较大，这次迁移，正好可以乘次机会再压缩一遍：

我的图片大多是 PNG，可以借助 https://pngquant.org 工具通过如下命令无损压缩

```shell
pngquant --force --ext .png *.png
```

就算图片有其他格式，也可以通过 magick 转换为 PNG，执行上述操作

```shell
magick frieren.jpg frieren.png
```

如果效果不理想，那么只能牺牲品质，进行有损压缩

```shell
pngquant --force --ext .png --quality=60-80 frieren.png
```

## PicList 管理图片和上传图片配置

我不理解为什么这两个功能分开，因为部分功能有重复。

但是如果想要用两个功能（管理和上传），最简单的办法就是 TOKEN 配置的时候配置管理员读写 [^manage-func]：

[^manage-func]: 云端由于需要列出 bucket 列表，所以需要的权限比只上传图片更高，需要管理员读和写 via https://github.com/Kuingsmile/PicList/issues/473

![](https://private-user-images.githubusercontent.com/96409857/543530856-82f1df17-83b4-49b8-9ec5-36d37b7eac54.png?jwt=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJnaXRodWIuY29tIiwiYXVkIjoicmF3LmdpdGh1YnVzZXJjb250ZW50LmNvbSIsImtleSI6ImtleTUiLCJleHAiOjE3NzYwMDI2NTIsIm5iZiI6MTc3NjAwMjM1MiwicGF0aCI6Ii85NjQwOTg1Ny81NDM1MzA4NTYtODJmMWRmMTctODNiNC00OWI4LTllYzUtMzZkMzdiN2VhYzU0LnBuZz9YLUFtei1BbGdvcml0aG09QVdTNC1ITUFDLVNIQTI1NiZYLUFtei1DcmVkZW50aWFsPUFLSUFWQ09EWUxTQTUzUFFLNFpBJTJGMjAyNjA0MTIlMkZ1cy1lYXN0LTElMkZzMyUyRmF3czRfcmVxdWVzdCZYLUFtei1EYXRlPTIwMjYwNDEyVDEzNTkxMlomWC1BbXotRXhwaXJlcz0zMDAmWC1BbXotU2lnbmF0dXJlPTFiZDMzYTliYjc0ZmI3ODE0NWQxODQxYjUwOWJhMjJjNzYzMDE4ZjRkMTIzNmQ2ZjlkNjQ1MTFkYTlhOWE0ZjcmWC1BbXotU2lnbmVkSGVhZGVycz1ob3N0JnJlc3BvbnNlLWNvbnRlbnQtdHlwZT1pbWFnZSUyRnBuZyJ9.y_8O3NFJ4CmSedqDXJ0d85yC6y-2LTMynfcqn_wC0Lc)

如果仅仅是上传的话，配置第三个，对象读写的权限就完全可以胜任。

最终效果如下：

![](https://pub-89c11651a8434f18a530bd6f93e399da.r2.dev/2026/20260412220459533.webp)

## 自定义域名

我一开始有设置这个 ，但发现好像没啥必要。

因为域名也有过期的一天，如果有一天我挂逼了，链接最多活 10 年，那么 10 年后呢？你的图片还不是一样全部挂掉了？

那么怎么办呢？

还是用 CF 给的域名吧，活得比我久，也挺好的。

```shell
https://img.bgzo.cc
https://pub-89c11651a8434f18a530bd6f93e399da.r2.dev
```