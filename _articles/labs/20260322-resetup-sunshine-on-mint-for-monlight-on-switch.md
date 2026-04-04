---
title: 重新设置 Sunshine 给 NS 串流用
aliases: ['重新设置 Sunshine 给 NS 串流用']
created: 2026-03-22 15:31:22
modified: 2026-03-29 10:12:00
published: 2026-03-22 15:31:22
tags: ['game/switch', 'mint', 'streaming', 'writing/lab', 'public']
draft: False
description: 最近我发现自己根本不需要什么 Win/Android/毫米波 掌机，也不需要折腾 如何在安卓模拟器上玩游戏，我有硬破的 Switch，里面就有 Moonlight，我可以直接串流到服务器上去玩游戏！ 突然感觉香起来了。 准备什么 1. 一台 24h 开机的服务器 2. 已经安装 Steam 3. https//github.com/LizardByte/Sunshine 1. https//git...
---

最近我发现自己根本不需要什么 Win/Android/毫米波 掌机，也不需要折腾 如何在安卓模拟器上玩游戏，我有硬破的 Switch，里面就有 Moonlight，我可以直接串流到服务器上去玩游戏！

突然感觉香起来了。

## 准备什么

1. 一台 24h 开机的服务器
2. 已经安装 Steam
3. https://github.com/LizardByte/Sunshine
	1. https://github.com/LizardByte/Sunshine/releases/download/v2026.323.224448/sunshine.AppImage
4. 显卡欺骗器 / 便携显示器

## 启动 Sunshine 服务器

```shell
~/.config/systemd/user > cat sunshine.service
[Unit]
Description=Self-hosted game stream host for Moonlight
StartLimitIntervalSec=500
StartLimitBurst=5
PartOf=graphical-session.target
Wants=xdg-desktop-autostart.target
After=xdg-desktop-autostart.target

[Service]
ExecStart=/home/bgzo/opt/sunshine.AppImage
Restart=on-failure
RestartSec=5s

[Install]
WantedBy=xdg-desktop-autostart.target
```

在自己本地增加如上配置文件，然后启用：

```shell
systemctl --user daemon-reload
systemctl --user start sunshine.service
systemctl --user status sunshine.service
systemctl --user enable sunshine.service
```

## 本地配置

把 Sunshine 的面板穿透到本地进行调试

```shell
ssh -L 47990:127.0.0.1:47990 bgzo@192.168.xxx.xxx
```

输入 Moonlight 显示的 Pair 码即可完美的运行:

 ![1774750031826.webp](https://raw.githack.com/bGZo/assets/dev/2026/1774750031826.webp)

> [!NOTE]
> 调试: 电脑端可以退出 **Ctrl+Alt+Shift+Q** 重新设置码率