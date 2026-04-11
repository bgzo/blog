---
title: Twitter 数据导出
aliases: ['Twitter 数据导出']
created: 2026-02-14 18:39:04
modified: 2026-04-11 18:50:18
published: 2026-02-14 18:39:04
tags: ['export-to-obsidian', 'public', 'twitter', 'writing/lab']
draft: False
description: 本文为 黑曜石导入计划 的一部分，理由自不必多说。 我们来看看怎么做？ 1. 官方存档； 2. API 爬取； 官方存档 官方从 Twitter 就一直有这个功能，支持下载自己的全部推文，还有账号的一些其他数据，如果里面的 README 文件所述不假，那么这个存档文件可能会超过 50GB。Of course, 一切都需要在你账号没有被彻底封禁之前请求，封掉就什么都没有了😊。 这也是一个偷懒的方法，...
---

> 本文为 黑曜石导入计划 的一部分，理由自不必多说。

我们来看看怎么做？

1. 官方存档；
2. API 爬取；

## 官方存档

官方从 Twitter 就一直有这个功能，支持下载自己的全部推文，还有账号的一些其他数据，如果里面的 README 文件所述不假，那么这个存档文件可能会超过 50GB。Of course, 一切都需要在你账号没有被彻底封禁之前请求，封掉就什么都没有了😊。

这也是一个偷懒的方法，我在 怀念逝去的 Twitter 中写过，Elon 取消了之前 Twitter 免费的 API，然后加入了更加严格的反爬限制，所以如果账号里面有几千上万的内容，最好还是先通过官方存档一份。

当然官方也不是万能的，尤其 Elon 收购 Twitter 之后大量裁员导致很多功能其实无人维护，我想，一个想到打造为西方微信的软件公司，团队规模却只有 30 个人，这太疯狂了，不过我认为他在学习 Telegram，但我还是觉得他们要比 TG 小气得多，草台得多，比如他的导出功能，其实是不包含书签的。

![](https://x.com/imbGZo/status/2022682295115878412?s=20)

所以啊，你的书签怎么办？只能自己用 API 慢慢爬了。但这不是这章的重点，先来看看哪几个存档文件有用：

- `data/like.js`: 喜欢的推文；
- `data/tweets.js`：发过的推文；

暂时就这两个有用，唯一的遗憾是，like.js 里面的推文没有用户名，没有办法做进一步的归类，比较操蛋。

## 官方 API

## 开始做

### 重新整理了 Template

- 加入了 vibe 模板
- 加入了 env 文件
	- https://stackoverflow.com/questions/19331497/set-environment-variables-from-file-of-key-value-pairs
- 加入了.vscode debug 文件
	- https://github.com/golang/vscode-go/wiki/debugging

### 用 UV 还是 Poetry？

- UV 也能打包： https://hellowac.github.io/uv-zh-cn/guides/publish/
- https://zhuanlan.zhihu.com/p/663735038

### 跑一遍测试居然如此简单

```shell
uv run ruff format --check .
uv run ruff check .
uv run pytest -q
```