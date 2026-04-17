---
title: 蒸汽机后时代的人们
aliases: ['蒸汽机后时代的人们']
created: 2026-02-22 15:54:03
modified: 2026-04-11 18:50:18
published: 2026-02-22 15:54:03
tags: ['llm', 'public', 'translate', 'writing/thought']
draft: False
description: 现在最像历史上什么时候呢？ 蒸汽机发明之后的英国，人们以为生产力的提升可以解放人类，释放出来更多的空闲时间，但实际上不是这样的，就像人们以为 AI 出来不会干活了，是这样吗？ 没有失业就不错了，但这只是暂时的。 2025 年 LLM 为了打消自己的焦虑，这个假期折腾了一下过去一年比较热门的技术，切入点就是 Copilot 的配置，我从一个 TW 卖客的那里学到了基础的配置 https//githu...
---

现在最像历史上什么时候呢？

蒸汽机发明之后的英国，人们以为生产力的提升可以解放人类，释放出来更多的空闲时间，但实际上不是这样的，就像人们以为 AI 出来不会干活了，是这样吗？

没有失业就不错了，但这只是暂时的。

## 2025 年 LLM

为了打消自己的焦虑，这个假期折腾了一下过去一年比较热门的技术，切入点就是 Copilot 的配置，我从一个 TW 卖客的那里学到了基础的配置

- https://github.com/doggy8088/github-copilot-configs

然后我发现网上关于这部分的资料很少，问 ChatGPT 完全没有用，他甚至都没有去搜索网页，完全的胡说八道，我很失望，然后去问 Grok，发现一个非常好玩的模式 `Gork 4.20(4 Agent)`，四个代理独立工作，给出一份覆盖范围更广的答案。

配置的过程比较曲折：我先把里面感觉有用点的文件全都靠过来，发现有些 Tools 还是无法找到，然后我把 VSCode 从 Stable 版本升级到了 Insider，有些工具还是找不到（如：`Unknown tool 'add_issue_comment'/'terminalCommand'`），猜测是迭代过程中直接直接弃用了，网上也找不到，最后直接删掉了。

一些 Agent 和 prompt 里面其实还包含了 MCP 的一些配置，如 时间和 GitHub 的相关 MCP 服务后，再多也没管，多说一句，这部分开发的人还蛮多、蛮成熟、蛮让我意外的。

升级 Insider 后，配置是独立的，本地 cp 一份配置到 insider 重新加载一遍就可以，之后重新看到了上下文窗口大小，一开始问了一个问题，直接占用 50%，我靠，一下就焦虑了，发现不同项目的上下文不应该公用，这也让我想起来国内有说自己上下文支持 1M 真的是不得了的事情，然后经过不断优化，最终上下文来到了：

```shell
Context Window
44.3K / 160K tokens • 28%
System
System Instructions 0.6%
Tool Definitions 1.7%
Reserved Output 25.2%
```

`Reserved Output` 是 Copilot 预留空间，不太能优化，最终折腾的结果是：

- https://github.com/bGZo/playground

但还没完，Obsidian 还没配置，哈哈哈。

除此之外，还发现了 TW 翻译的一些必大陆要好的专业名词，包括：

- Bit：字元
- Byte：字元组

---

- Transaction：交易
- Transactional：交易式

一瞬间感觉自己大学真是起到了帮倒忙的作用。