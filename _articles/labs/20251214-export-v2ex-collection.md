---
title: 导出 V2ex 的收藏主题
aliases: ['导出 V2ex 的收藏主题']
created: 2025-12-14 20:13:07
modified: 2026-04-11 18:50:19
published: 2025-12-14 20:13:07
tags: ['export-to-obsidian', 'public', 'writing/lab']
comment: True
draft: False
description: 基于几点原因有这方面的需求： 1. 复盘；写自己的周报用，总结看看最近一周摸鱼的结果； 2. 备份：V2 是个人站点，账号有被封禁的可能，并且没有导出数据的功能，你的数据可能永远消失； 实现 尽管 V2 过去已经开放过一版 API，但是缺少个人的部分，因此具体实现上还需要结合传统的 Cookie 网页，解析收藏列表，然后才可以通过 API 调用获得主题详情。还是希望未来有一天能有相关的接口，具体官...
---

基于几点原因有这方面的需求：

1. 复盘；写自己的周报用，总结看看最近一周摸鱼的结果；
2. 备份：V2 是个人站点，账号有被封禁的可能，并且没有导出数据的功能，你的数据可能永远消失；

## 实现

尽管 V2 过去已经开放过一版 API，但是缺少个人的部分，因此具体实现上还需要结合传统的 Cookie 网页，解析收藏列表，然后才可以通过 API 调用获得主题详情。还是希望未来有一天能有相关的接口，具体官方支持情况请见： https://www.v2ex.com/t/1035675, 暂时没有希望。

解析网页实现如下：

https://github.com/bGZo/playground/blob/abe661baec193a32a6fc64e1ce8b8e36ee9ddbd7/src/v2ex/mytopic.py#L32

获取主题具体信息如下：

https://github.com/bGZo/playground/blob/abe661baec193a32a6fc64e1ce8b8e36ee9ddbd7/src/v2ex/topic.py#L14

## 使用

基于上述实现缘由，除了传统 Cookie，还需要启用个人 AccessToken，去设置里面找一下，然后声明环境变量，即可导出个人的收藏主题：

```shell
pipx install export_to_obsidian
export V2EX_COOKIE='xxx'
export V2EX_ACCESS_TOKEN="xxx"
eto v2ex -o ./v2ex
```

## 反馈

项目比较个人，如果有一些通用性的意见，欢迎提 ISSUE