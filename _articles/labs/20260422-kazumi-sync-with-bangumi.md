---
title: Kazumi 同步 Bangumi
aliases: ['Kazumi 同步 Bangumi']
created: 2026-04-22 19:55:44
modified: 2026-05-16 23:57:51
published: 2026-05-01 23:57:51
tags: ['bangumi', 'flutter', 'kazumi', 'public', 'writing/lab']
comments: True
draft: False
description: 距离提 PR，到最终合并进主分支，一共耗时半个月吧，前一个星期把大部分功能修了下，后一个星期则在 反反复复进行修改，其实没有那么轻松。 一开始是想找一个追番软件去补旧番，我的需求比较简单： 1. 集成 Bangumi 2. 支持截图 3. 支持测载 iOS 所以压根没得选，只有 animeko 满足这些条件，实际测试中，在我的 iPad 上表现的也不如 Android/Mac（比较慢），也没事，我...
---

距离提 PR，[到最终合并进主分支](https://github.com/Predidit/Kazumi/pull/2001)，一共耗时半个月吧，前一个星期把大部分功能修了下，后一个星期则在 [反反复复进行修改](https://github.com/bgzo/Kazumi/pull/2)，其实没有那么轻松。

一开始是想找一个追番软件去补旧番，我的需求比较简单：

1. 集成 Bangumi
2. 支持截图
3. 支持测载 iOS

所以压根没得选，只有 [animeko]( https://github.com/open-ani/animeko) 满足这些条件，实际测试中，在我的 iPad 上表现的也不如 Android/Mac（比较慢），也没事，我们可以用 Mac 来看，并且 Mac/Windows 支持截图，对吗？用了才知道，Mac 上的截图按钮有 BUG，死活不成功，点了一点反应都没有，压根没法用，而且这个问题已经一年多了，完全没有人修。

没招了，Animeko 完全没法用啊，退而求其次，把目光转向 Kazumi。它虽然没有集成 Bangumi，但截图功能在手机上是好着的，有一个 [ISSUE](https://github.com/Predidit/Kazumi/issues/912) 也挂了好几年了，一直没有人做，因为我自己写了一个脚本拉取收藏到 Obsidian，所以在我看来仅仅是收藏同步的话，用 AccessToken 完全是可以做的，只是我自己没怎么写过 Flutter，18 号有了这个想法，打算下个周末进行一波 Vibe Coding。

直到周内我发现 [@melancholyFishAndWater](https://github.com/melancholyFishAndWater ) 已经做过相关工作了，暗自窃喜 😊，想着说不定等等就有人做了，直到第二天起来收到回复：

> 上面提到的问题看上去都没有得到有效的解决:D
> https://github.com/Predidit/Kazumi/issues/912

我发现好像这个功能又要无疾而终，卧槽我有点急了，不能老是这样吧。第二天下班连夜 clone melancholyFishAndWater 的代码，开始本地调试，连着两个晚上，做了一些初步的改进：

1. 加快同步速度；
2. 收藏即同步；

匆匆地拿着这个草稿去 [提 PR](https://github.com/Predidit/Kazumi/pull/2001)，虽然总得来说功能实现了，但是代码还是一坨，哈哈，顺带连学带练地就开始写 Dart 了。

---

写 PR 和改代码都比较费劲，但好在最终合并了😊，这半个月我可是一部旧番都没有看，因为看番哪有写代码爽啊～

接下来，我终于能好好用 Kazumi 看几部老番了。

