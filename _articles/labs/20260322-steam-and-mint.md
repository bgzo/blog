---
title: Steam 和 Mint
aliases: ['Steam 和 Mint']
created: 2026-03-22 19:23:43
modified: 2026-04-11 18:50:18
published: 2026-03-22 19:23:43
tags: ['mint', 'public', 'steam', 'writing/lab']
draft: False
description: 翻看书签，看到了前半个月在 Mint 服务器上安装 Steam 的经历，想起来几个操蛋的事情： Steam 开启之后会自动进行更新，然后从更新到显示这部分时间，是什么都没有的，没有标签栏图标，后台进程没有真正启动，所以如果你的网络环境不行，实际效果就是：点和没点没区别。 很苦恼啊，怎么都打不开，难道说 Steam 依赖跟其他乱八七糟的软件冲突了？Steam 又没有提供 AppImage 的包，怎么...
---

翻看书签，看到了前半个月在 Mint 服务器上安装 Steam 的经历，想起来几个操蛋的事情：

Steam 开启之后会自动进行更新，然后从更新到显示这部分时间，是什么都没有的，没有标签栏图标，后台进程没有真正启动，所以如果你的网络环境不行，实际效果就是：点和没点没区别。

很苦恼啊，怎么都打不开，难道说 Steam 依赖跟其他乱八七糟的软件冲突了？Steam 又没有提供 AppImage 的包，怎么办呢？ 我去问 LLM

在经过了一大堆实验，包括但不限于：

1. 检测自己的硬件，驱动；
2. 检测 Steam 依赖的包是否安装；
3. 安装 Flatpak 的 Steam；
4. 菜单的 Steam 图标启动命令替换；

然后某个时刻，我发现 Steam 打开登陆界面了，我想这破问题终于解决了，然后扫码进去下了一个游戏，测试了一下，可以正常游玩，然后我就重启了一下机器（因为折腾的东西比较多）。

当我再次尝试启动的时候，发现他又没反应了，我彻底崩溃了，用 flatpak 命令启动之后

```shell
flatpak run com.valvesoftware.Steam
```

发现之前的数据都没了，当时我的状态简直要崩溃了，我之前下载的游戏和兼容层呢？

冷静了一会儿，在自己的本地目录排查了一下：

```shell
$ find ~ -type d -name steamapps 2>/dev/null

/home/bgzo/.var/app/com.valvesoftware.Steam/.local/share/Steam/steamapps
/home/bgzo/.local/share/Steam/steamapps
```

这才发现端倪，原来之前的启动的 Steam 是一开始的那个，而不是后来用 flatpak 装的这个。

最后，拷贝了下之前的目录，问题成功解决，以后就用 flatpak 的包了

```shell
rsync -av --progress ~/.local/share/Steam/steamapps/ ~/.var/app/com.valvesoftware.Steam/.local/share/Steam/steamapps/
```

一切正常运行