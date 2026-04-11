---
title: 探索现有社交媒体 CLI 对导入 Obsidian 的可能性
aliases: ['探索现有社交媒体 CLI 对导入 Obsidian 的可能性']
created: 2026-03-21 20:12:10
modified: 2026-04-11 18:50:18
published: 2026-03-21 20:12:10
tags: ['ai/slop', 'public', 'twitter', 'writing/lab', 'xiaohongshu']
draft: False
description: 最近 X 的时间线频繁春贤一个创作者： @jackwener，他有 5 个比较有代表性的作品： bilibili-cli twitter-cli discord-cli tg-cli xiaohongshu-cli 这些全都是客户端级别的工具，面向 CLI 用户，CLI 用户是哪部份人呢？ AI。 当然也不尽然，吸引我的是这些平台的 CLI 并不好做，我正好最近在全量导出自己的数据到 Obsidi...
---

最近 X 的时间线频繁春贤一个创作者： [@jackwener](https://github.com/jackwener)，他有 5 个比较有代表性的作品：

- [bilibili-cli](https://github.com/jackwener/bilibili-cli)
- [twitter-cli](https://github.com/jackwener/twitter-cli)
- [discord-cli](https://github.com/jackwener/discord-cli)
- [tg-cli](https://github.com/jackwener/tg-cli)
- [xiaohongshu-cli](https://github.com/jackwener/xiaohongshu-cli)

这些全都是客户端级别的工具，面向 CLI 用户，CLI 用户是哪部份人呢？

AI。

当然也不尽然，吸引我的是这些平台的 CLI 并不好做，我正好最近在全量导出自己的数据到 Obsidian，最近就想想要不试试现有的轮子。

先说结论，**不行**，因为几个问题：

1. Python 项目不再维护，全面转向 Node JS 的 Playwright https://github.com/jackwener/opencli ，并且很多命令失效；
2. 墙内社交媒体封控严重，在试用小红书的时候，所有设备被强制下线，就算自己的网页浏览，也会出现如 `验证过于频繁，请稍后重试` 等消息提醒；
3. CLI 的设计，注定无法与同步程序匹配；

## Python 转 Typescript

语言其实不是问题，但是这代表两种完全不同的工作方式，原来 PY 其实是对可见 API 的模拟，而新的 Open CLI 其实是第三方辅助对原生 APP 的操控，比如通过 Chrome 插件、系统无障碍权限（MacOS）[^wechat-send-msg] 等等。

[^wechat-send-msg]: https://github.com/jackwener/opencli/blob/main/docs/adapters/desktop/wechat.md

问题是什么呢？

1. 跨平台
2. 复杂度

## 平台封控

其实无论模拟 API 还是上辅助工具，都有一定的封号风险。

尤其自 AI 无止境蒸馏互联网之后，每个平台都趋于保守，都在封堵自己数据泄漏的问题，比如，知乎关闭过无登陆浏览，Reddit、Twitter 等 API 开始收费。

就像我之前使用 XHS，被全平台踢下线之后，我就再也不敢用这些第三方工具了，自己的数据最重要。

## CLI 的设计

因为自己 XHS 被强制下线了，再次登陆网页端还是被无限验证码骚扰，所以用 Twitter 距离：

首先，登陆问题，CLI 直接从本地的缓存中读取 Cookie 数据，这个操作敏感不说，在一些服务器环境非常不友好，我 SSH 连接服务器之后，连浏览器都不想打开，何谈从浏览器获取 Cookie ？逆天的是他还不支持输入自己从浏览器获得的 Cookie。

接着，持续获取数据的能力，我的需求很简单：一个收藏夹的分页接口就行，twiiter 命令行是怎么做的呢？

```shell
~ > twitter likes --help
Usage: twitter likes [OPTIONS] SCREEN_NAME
  Show tweets liked by a user. SCREEN_NAME is the @handle (without @).
  NOTE: Twitter/X made all likes private since June 2024. You can only view
  your own likes. Querying another user's likes will return empty results.

Options:
  -n, --max INTEGER  Max number of tweets to fetch.
  --json             Output as JSON.
  --yaml             Output as YAML.
  -o, --output TEXT  Save tweets to JSON file.
  --filter           Enable score-based filtering.
  --full-text        Show full tweet text in table output.
  --help             Show this message and exit.
```

能输出简单的 JSON 格式非常好，但是分页的参数在哪里？

没有！

这意味着我得等他一次性爬 10000，然后我再去判断是否应该导出？显而易见，每次都要从头爬到 Twitter 的 API 拒绝工作，肯定不现实，听着就容易翻车封号，所以我看不出来用他的价值。

正如这些项目中写的，这些工具都是给 AI SLOP 做的，Human 和其他项目就少参合了。

## 后话

渐渐地，我有一种危机感：数据的获取难度会被这些 AI SLOP 卷上天，这些商业公司为了防止自己的成本被这些机器人爬到难以支付的地步，会无止尽的抬价，或是门槛。最终有一天，我再也无法轻易取回我的数据了。

现阶段似乎陷入了一种无论如何都解不开的状态，想象一下，你身处一个公园中，可以自由地散步、欣赏风景，或者聚在广场上，听听人们的讨论。

突然有一天，有个人带了条狗来到广场，东嗅西嗅，甚至这些狗还要学你说话，人们发笑，慢慢地，牵狗的人也多了起来，不得不说，看一只狗在那胡言乱语也挺有意思的。

但是突然有一天，一条野狗出现了，你不知道他是谁家的，但他依然能自说自话，接着不久，它甚至开始穿上我们的衣服，出现在我们面前，如果不认真分辨，根本不知道他是条狗。

现在，整座广场都是这些似人似狗的东西，你想去广场听听讨论，你挤在熙熙攘攘的广场上，认真听了一下午，才发现这些声音都参合着一些狗叫，你很疲惫，想去看看落日，才发现落日照耀下的这篇公园的基础设施，早就被这群东西毁的一团糟。

你想，狗可恶吗？不对啊，狗狗多可爱啊，多忠诚啊，能有什么坏心思呢？

但我不想跟狗聊天，不想成为狗饲料，更不想成为狗屎。