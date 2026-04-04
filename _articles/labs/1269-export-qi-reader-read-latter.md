---
published: 2025-12-06 21:11:11
aliases: ['导出 Qi Reader 的 Read latter']
created: 2025-12-06 21:11:11
modified: 2025-12-07 12:26:16
tags: ['writing/lab', 'export-to-obsidian', 'public']
draft: False
title: 导出 Qi Reader 的 Read latter
description: 上一次写这个我记得还是给 https//rss.anyant.com/ 写的，源码在 https//github.com/bGZo/playground/tree/2022/01/rssant-backup 已经做的比较完善了，当然这种事情不太好，就没有引流，自然也没有多少人用，当时第一次抓包，写的还比较费劲哈哈哈。 官方当然有计划，但是已经快 2 年了，猜测是有什么顾虑，因为我比较急，就不等了，...
---

上一次写这个我记得还是给 https://rss.anyant.com/ 写的，源码在 https://github.com/bGZo/playground/tree/2022/01/rssant-backup

已经做的比较完善了，当然这种事情不太好，就没有引流，自然也没有多少人用，当时第一次抓包，写的还比较费劲哈哈哈。

官方当然有计划，但是已经快 2 年了，猜测是有什么顾虑，因为我比较急，就不等了，Sorry～

<iframe src='https://github.com/oxyry/qireader/issues/116' style='height:40vh;width:100%' class='iframe-radius' allow='fullscreen'></iframe>
<center>via: <a href='https://github.com/oxyry/qireader/issues/116' target='_blank' class='external-link'>https://github.com/oxyry/qireader/issues/116</a></center>

## 抓包分析

```shell
GET https://www.qireader.com/api/streams/tag-xxx?articleOrder=0&count=25&id=tag-xxx&unreadOnly=false&olderThan=1764313764608411573
```

参数猜测分析：

我的稍后阅读可能就是一个特别的标签，查看列表本质就是查看我的标签（查一个标签表），然后关联出文章；F12 看看自己的就能知道自己的 Read Latter ID 是多少。

至于文章内容，我发现 Qi Reader 默认情况下不会走网络请求，什么包都抓不到，说实话者挺奇怪的，可能最终的请求是在 Node 后端代理的吧，那数据是怎么传回前端的呢？为什么不会在控制台显示呢？

当然还有一个请求全文的接口，这个接口返回文章的内容，只不过都是 HTML 格式，如果要转换 Markdown，还需要一番功夫。根据响应结构查了一下，用的应该是这个服务： https://github.com/ArchiveBox/readability-extractor

## 备忘

看了下 git 的时间线，上次做导出还是 8 月，已经过去了快 3 个月了，很多项目的规范都忘记了，代码写了又改，比一开始浪费时间。

还是沿用 黑曜石导入计划 中的代码结构，定义 QiReader Client 对整体请求进行包装，然后跟其他的网站导出逻辑类似，过程比较顺，没遇到什么卡壳。当然为了偷懒，完全没有做登录劫持的那一步，太麻烦，直接用 `Cookie` 做的环境变量，用的时候直接 source 一遍环境变量就行，然后进行后续操作。

最终实现效果：

```shell
> pipx upgrade export_to_obsidian
> source .env
> eto qireader -t tag-xxx -o ./clippers/qireader/
```

export_to_obsidian 的版本（0.3.13） 发布 🎉