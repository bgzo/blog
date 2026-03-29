---
title: NanoBot 踩坑
aliases: ['NanoBot 踩坑']
created: 2026-03-20 22:38:33
modified: 2026-03-28 18:14:59
comments: True
draft: False
tags: ['llm', 'nanobot', 'writing/lab']
description: 之前有使用 Openclaw 踩坑 的经历，用起来也还可以，但有几点问题： 1. 启动慢； 2. 配置复杂； 3. 性能； Openclaw 的代码十几万行是出了名的臭，大家都知道，所以爆火之后就接二连三出来了很多语言的平替版本，有： NonoBot (Python) PicoClaw (Golang) ZeroClaw (Rust) 考虑到我的模型是 CopilotPro，并且不想走弯路，所以最...
---


之前有使用 Openclaw 踩坑 的经历，用起来也还可以，但有几点问题：

1. 启动慢；
2. 配置复杂；
3. 性能；

Openclaw 的代码十几万行是出了名的臭，大家都知道，所以爆火之后就接二连三出来了很多语言的平替版本，有：

- NonoBot (Python)
- PicoClaw (Golang)
- ZeroClaw (Rust)

考虑到我的模型是 CopilotPro，并且不想走弯路，所以最终选择更加完善的 https://github.com/HKUDS/nanobot

整个备份过程没有任何阻碍，甚至比 OpenClaw 顺多了。

## 禁用 OpenClaw 启用 NanoBot

首先，就是备份文件

```shell
mv ~/.openclaw ~/.openclaw-backup-$(date +%Y%m%d)
```

然后，停用 OpenClaw 进程

```shell
ps aux | grep openclaw
kill -9 1432
systemctl --user stop openclaw-gateway
systemctl --user disable openclaw-gateway
```

考虑未来可能还会重新用 OpenClaw，所以跳过卸载，到这里为止。

接下来安装 NanoBot

```shell
uv tool install nanobot-ai
nanobot --version
nanobot onboard
```

然后，进行 CopilotPro 的授权

```shell
nanobot provider login github-copilot
```

接着，编辑如下内容到 `~/.nanobot/config.json`：

```json
{
  "channels": {
    "telegram": {
      "enabled": true,
      "token": "TelegramBotToken",// ← 这里改成 "token"（不是 botToken）
      "allowFrom": ["TG用户、群组ID"]// ← 完全一样（不带 @）
    }
  },
  "agents": {
    "defaults": {
      "model": "github-copilot/gpt-5-mini"
    }
  }
}
```

直接开始测试

```shell
nanobot gateway
```

没问题就增加一个后台守护进程到 `~/.config/systemd/user/nanobot-gateway.service`

```shell
[Unit]
Description=Nanobot Gateway
After=network.target

[Service]
Type=simple
ExecStart=%h/.local/bin/nanobot gateway
Restart=always
RestartSec=10
NoNewPrivileges=yes
ProtectSystem=strict
ReadWritePaths=%h

[Install]
WantedBy=default.target
```

接着启动配置：

```shell
systemctl --user daemon-reload
systemctl --user enable --now nanobot-gateway
```

接下来就可以正常使用了。

##