---
title: 开源是手段而不是目的
aliases: ['开源是手段而不是目的']
created: 2026-03-24 22:18:39
modified: 2026-04-11 18:50:18
published: 2026-03-24 22:18:39
tags: ['blog', 'opensource', 'public', 'writing/thought']
comment: True
draft: False
description: "我再也不用担心 Token 泄漏、版权、审查的问题，我似乎又重新获得了创作的自由"
---

最近，我越来越对质疑开源，因为它似乎并不代表纯粹的开放、包容，尤其是在当前地缘政治冲突越来越多的现在，为什么这样讲呢？

我来简单的罗列一些事件：

- Linux Torvalds 移除俄罗斯维护者名单；[^linux-remove-developer]
- LLM 爆火之后，开源项目充满了 SLOP 的内容；[^open-source-slop]

[^linux-remove-developer]: https://t.me/aosc_os/637
[^open-source-slop]: https://x.com/ClementDelangue/status/2034294644800974908

LLM 当然也给我带来冲击，印象很深的是，我的两个知识库的 Star 数量，我的这个知识库从创作者来说就分两个部分，一部分是我蠢手写的内容，就是你看到的这些文件，另一部分就是我剪藏的部分，包含各个网站导出的数据：

- https://github.com/bGZo/vault
- https://github.com/bGZo/clippers

当然，我写的东西没人看，Start 几乎为零，这很正常，clippers 里就热闹多了，时不时就能涨一两颗，前几天我还挺自豪的，但最近我开始思考意义，把这些东西开出来真的有用吗？这些碎片化的东西，我都没什么时间，几乎不会去看，那么这些 Star 的人的动机是什么呢？

![](https://pub-89c11651a8434f18a530bd6f93e399da.r2.dev/2026/20260324232039229.webp)

这样的动机渐渐地让我转向去研究这些账号，然后我发现这些都是 spam 账号，几乎没有仓库，这只让我联想到一种可能：机器学习。

Oh, SHIT. 😦

再来，另一件事，就是最近 Openclaw 爆火之后，有非常多平替，X 上比较火的有：

- https://alma.now/
- https://devin.ai/

然后当我兴致冲冲打开 GitHub，想看看他们代码的时候，我发现他们全都是闭源软件，只提供最终的 Release 包。How could I say?

Very elegant.

Finally，我删掉了 `bgzo/clippers`，写了一个 `workflows` https://github.com/bgzo/releases/blob/main/.github/workflows/notes-publish-quartz.yml 替代之前的分发程序，这是他们教给我的唯一一件事。

我再也不用担心 Token 泄漏、版权、审查的问题，我似乎又重新获得了创作的自由。