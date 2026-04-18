---
title: 放弃 QiReader
aliases: ['放弃 QiReader']
created: 2026-03-29 12:05:43
modified: 2026-03-29 12:57:34
tags: ['give-up', 'writing/seed', 'public']
comment: True
draft: False
published: 2026-04-17 14:52:49
description: 最近 重构 Jekyll 博客，停更一年的 https//blog.bgzo.cc 重新开始了更新，但是源拉取还是有问题，用另一个博客源排查了一下： 首先新增一篇测试文章，保证 Feed 里面有输出了，点击「Refresh」，发现没有拿到刚刚的测试文章，这才发现，原来立刻刷新的按钮不是立刻拉取源的意思。 接着观察 QiReader 多久会刷新这篇测试文章，大概有 2h 之后，这篇文章才出来。纠结了...
---

最近 重构 Jekyll 博客，停更一年的 https://blog.bgzo.cc 重新开始了更新，但是源拉取还是有问题，用另一个博客源排查了一下：

首先新增一篇测试文章，保证 Feed 里面有输出了，点击「Refresh」，发现没有拿到刚刚的测试文章，这才发现，原来立刻刷新的按钮不是立刻拉取源的意思。

接着观察 QiReader 多久会刷新这篇测试文章，大概有 2h 之后，这篇文章才出来。纠结了一会儿，还是去提了一个 ISSUE：

<iframe src='https://github.com/oxyry/qireader/issues/199' style='height:40vh;width:100%' class='iframe-radius' allow='fullscreen'></iframe>
<center>via: <a href='https://github.com/oxyry/qireader/issues/199' target='_blank' class='external-link'>https://github.com/oxyry/qireader/issues/199</a></center>

如果这个问题无法解决，那么我会放弃这个阅读器。