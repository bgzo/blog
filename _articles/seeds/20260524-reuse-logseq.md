---
title: 发现还是有点离不开 Logseq
aliases: ['发现还是有点离不开 Logseq']
created: 2026-05-24 13:54:00
modified: 2026-05-25 21:49:17
tags: ['gtd', 'logseq', 'obsidian', 'pkm', 'public', 'writing/seed']
comments: True
draft: False
published: 2026-05-31 23:57:55
description: 最近苦恼于 Obsidian 的任务管理，基本全都是靠 Tasker 插件实现的，然后很多特性不如 Logseq，比如： 1. 任务类型，有一些任务是归属于项目，优先级理应最高，而另一些是零碎的日常任务，有两部分放在一起不易区分； 2. Schedule 的缺失，这个是最不习惯的，之前我每周给自己按周排很多任务，完成不完成另说，但我起码打开这个软件就知道这周最少达成哪些事情，但 Obsidian ...
---

最近苦恼于 Obsidian 的任务管理，基本全都是靠 Tasker 插件实现的，然后很多特性不如 Logseq，比如：

1. 任务类型，有一些任务是归属于项目，优先级理应最高，而另一些是零碎的日常任务，有两部分放在一起不易区分；
2. Schedule 的缺失，这个是最不习惯的，之前我每周给自己按周排很多任务，完成不完成另说，但我起码打开这个软件就知道这周最少达成哪些事情，但 Obsidian 也缺少这个的支持，让我不太习惯。

## Problem with Obsidian + Logseq

但是 Logseq 的问题依旧存在，可以参考我之前为什么 放弃它。昨晚继续研究了一下，想把任务管理外包给 Logseq 去做，其他保持不变，发现存在如下问题：

1. **设计理念冲突**：我们知道 Logseq 是大纲语法，而 Obsidian 则是普通的 Markdown 文件，而 Logseq 的语法在 Obsidan 来浏览就很丑、很怪。反过来也是如此，如果 Logseq 去编辑 Obsidian 排版好的文章，也会增加莫名其妙的缩进，比较烦。
2. **语法冲突**：基于上述设计理念的不同，Logseq 有自己一套的任务管理标记，比如 TODO、DONE、WAITING、SCHEDULE 等等。而这部分与 Markdown 的语法天然冲突。

## Logseq Database 的现状

网上的信息不多、讨论也并不明朗，总之，现在有两个版本：

1. Stable
2. Nightly

第二个就是数据库版本，第一个稳定版还是旧版本 Markdown 的维护版本。并且 Nightly 没有提供历史版本和 brew 源，想使用直接直接安装。在我体验一个小时之后，我全面看空 Database 的版本，因为 Obsidian 和 Logseq 合作最核心的功能：Markdown Mirror 有一大堆问题：

1. 同步不是实时性的；
2. 单向同步，Logseq 只会覆写一遍本地文件；
3. 如果你的库比较大，每次重写都比较慢，我的大概花费了 30 多秒，期间不能操作数据库；
4. 目录写死 `~/logseq/demo/`，不是导入的文件夹；
5. 文件夹的结构被拍平至 2 个了

![](https://pub-89c11651a8434f18a530bd6f93e399da.r2.dev/2026/20260524154713043.webp)

![](https://pub-89c11651a8434f18a530bd6f93e399da.r2.dev/2026/20260524155603990.webp)

每一个文件拿出来都是毁天灭地的存在，这几乎对于过去几年 Logseq 的社区实践、积累是毁灭性的，而且官方似乎还要在这条路上越走越远、越走越封闭。我不是 LogSeq 的开发者，也不会 Clojure，因此我对这个开发方向倍感绝望，且无能为力。

## Work with markdown version

看来当初 放弃 Logseq 的决定非常超前和正确，虽然我现在还是想引入 Logseq 比较优秀且习惯的任务管理，然后，在配合 `:hidden` 忽略我不想让 Logseq 看到的文件夹，就初步成功了，但是离最终使用，还要很长很长的磨合期要走：

1. 怎么禁止 BAK 的生成？
2. 怎么设置只读文件夹？
3. 任务管理属于 Logseq 的语法糖，如果没有 Logseq，将变得无法工作；
4. Logseq 的任务查询也是一坨狗屎，比如你怎么分组？怎么按某某排序？
5. 不能使用 Logseq 的语法糖，否则 Obsidian 无法识别，反之依然；
6. Logseq 又一些输入切换的 BUG，中英文切换的时候有概率无法输入中文，怎么修复？
7. 怎么设计，可以在 Obsidain 和 Logseq 做到无缝切换？
	1. 现在切换比较痛，因为 LS 无文件夹的概念，LS 也会破坏 Obsidian 的文件结构；
	2. 而且很多内容都是你中有我，我中有你的结构，最佳实践很少；

## Final work

最终还是决定引入 Logseq，因为我的日常就是碎片化的，因此，针对上述问题做出如下设计：

1. 无法完全禁止 bak 文件夹，必要的时候可能需要自己编译；
2. 完全把 logseq 隔离出去，因为它改动文件是破坏性的，因此需要权限最小化；
3. 这个无法避免，幸好 iOS 和 Mac 都有应用；
4. 放弃 Logseq 难懂的查询语法，仅仅把他当做一个 GTD/Outline/Roadmap 的工具；
5. 基于 2，两个语法糖可以继续使用，即使存在无法显示的问题；
6. 这个可能是 Mac 的 BUG，重启之后没有出现；
7. 还是基于 2，Logseq 只聚焦项目的设计路线，详细设计等等还是用 Obsidian

实现这个方案绕了不少弯路，尤其是 iOS 无法读取非自己应用的文件夹，这就注定 Logseq 和 Obsidian 的文件存储在 iOS 上是一定分离的，如果想要在 Obsidian 里面访问 Logseq，只能通过挂载，但是一般符号链接的挂载比较弱：

```shell
ln -s ~/Library/Mobile\ Documents/iCloud~com~logseq~logseq/Documents/logseq ~/Library/Mobile\ Documents/iCloud\~md\~obsidian/Documents/vault/logseq/
```

Git 无法识别，这个需要时用到 MacFuse 和 bindfs 挂载工具：

```shell
brew install bindfs-mac
```

然后，把 Logseq 的目录直接挂载在 Obsidian 里面：

```shell
bindfs ~/Library/Mobile\ Documents/iCloud~com~logseq~logseq/Documents/logseq ~/Library/Mobile\ Documents/iCloud\~md\~obsidian/Documents/vault/logseq
```

这样的实现方案有两个隐形问题：

1. 不能随便切换分支，因为每次切分支都是对 Logseq 目录的破坏，这容易造成不一致性；
2. iOS 的 Obsidian 对于 Logseq 的双向链接时不可见的，于是不能在 Obsidian 里面点开 Logseq 的链接文件；

先稳定使用一段时间再来看。