---
title: 导出知乎收藏夹
aliases: ['导出知乎收藏夹']
created: 2025-12-14 20:01:18
modified: 2026-04-11 18:50:19
published: 2025-12-14 20:01:18
tags: ['public', 'writing/lab']
draft: False
description: 基于几点原因，建议你定期备份知乎收藏夹： 1. 复盘：工作日有的时候会看这个网站，会存一些收藏的技术文章； 2. 审查：有些答案会被隐藏，甚至删除，比如下面收藏夹就有这种情况，页面显示有 4 个内容，接口返回的 total 也是 4，但是实际查询到的内容一个都没有，怎么办，好难猜啊，你懂的； 所以是不是得及时做备份？ 实现 通过网页抓包如下接口： https//github.com/bGZo/en...
---

基于几点原因，建议你定期备份知乎收藏夹：

1. 复盘：工作日有的时候会看这个网站，会存一些收藏的技术文章；
2. 审查：有些答案会被隐藏，甚至删除，比如下面收藏夹就有这种情况，页面显示有 4 个内容，接口返回的 total 也是 4，但是实际查询到的内容一个都没有，怎么办，好难猜啊，你懂的；

![](https://picx.zhimg.com/100/v2-ceda296948cfd37873cb151e0eeb4953_r.jpg)

所以是不是得及时做备份？

## 实现

通过网页抓包如下接口： https://github.com/bGZo/env/blob/efd01e2e222f907c5e78c8621981fda2a78a9492/common/bruno/zhihu.com/%E6%94%B6%E8%97%8F%E5%A4%B9.bru

废话不多说，接口整体比较简单，常规的分页参数和结构，具体实现参考：

https://github.com/bGZo/playground/blob/abe661baec193a32a6fc64e1ce8b8e36ee9ddbd7/src/zhihu/collection.py#L13

## 使用

```shell
pipx install export_to_obsidian
export ZHIHU_COOKIE=""
eto zhihu -c xxx -o ./zhihu
```

## 反馈

项目比较个人，如果有一些通用性的意见，欢迎提 ISSUE