---
title: Openclaw 踩坑
aliases: ['Openclaw 踩坑']
created: 2026-02-22 01:23:54
modified: 2026-04-11 18:50:18
published: 2026-02-22 01:23:54
tags: ['llm', 'openclaw', 'public', 'writing/lab']
comments: True
draft: False
description: 我对 OpenClaw 带给我的惊喜，恰如一开始读他的提示词那样惊艳： You're not a chatbot. You're becoming someone 我完全被这句话震住了。 无法使用 openclaw devices list 修改 ~/.openclaw/devices/pending.json，从 "silent" false 到 "silent" true via https/...
---

我对 OpenClaw 带给我的惊喜，恰如一开始读他的提示词那样惊艳：

> You're not a chatbot. You're becoming someone

我完全被这句话震住了。

## 无法使用 `openclaw devices list`

```shell
[openclaw] Failed to start CLI: Error: gateway closed (1008): pairing required
```

修改 `~/.openclaw/devices/pending.json`，从 `"silent": false` 到 `"silent": true`

via: https://github.com/openclaw/openclaw/issues/4531

## Telegram 没有反应

找到 Service 文件位置

```shell
systemctl --user show -p FragmentPath openclaw-gateway.service
```

编辑文件加入代理设置

```shell
Environment="http_proxy=http://127.0.0.1:7890"
Environment="https_proxy=http://127.0.0.1:7890"
Environment="all_proxy=socks5://127.0.0.1:7890"
```

重启服务

```shell
systemctl --user daemon-reload
systemctl --user restart openclaw-gateway
```

## DS 上下文太小

```shell
⚠️ Agent failed before reply: Model context window too small (4096 tokens). Minimum is 16000.

Logs: openclaw logs --follow
```

OpenClaw 这个 Agent 的**最低要求是 16k**，OpenClaw 的 Agent 通常会自动拼接：

- system prompt（很长）
- agent persona / policy
- 历史对话
- 工具说明
- planning / scratchpad
- 你刚发的消息

使用思考模型，配置里面改一下：

```json
"providers": {
  "deepseek": {
	"baseUrl": "https://api.deepseek.com/v1",
	"apiKey": "sk-xxx",
	"api": "openai-completions",
	"models": [
		{
		"id": "deepseek-chat",
		"name": "DeepSeek Chat",
		"reasoning": false,
		"input": [
		  "text"
		],
		"cost": {
		  "input": 0,
		  "output": 0,
		  "cacheRead": 0,
		  "cacheWrite": 0
		},
		"contextWindow": 16000,
		"maxTokens": 4096
		},
		{
		  "id": "deepseek-reasoner",
		  "name": "DeepSeek Reasoner",
		  "reasoning": false,
		  "input": [
			"text"
		  ],
		  "cost": {
			"input": 0,
			"output": 0,
			"cacheRead": 0,
			"cacheWrite": 0
		  },
		  "contextWindow": 200000,
		  "maxTokens": 8192
		}
	]
  }
}
```

## 换模型

因为我有 Copilot 订阅，平时一直闲置不用，而且运行 onboard 的时候看到有这个选项，但是找不到相关文档，所以无奈只能再次通过 onboard 配置这个模型，总的来说有两种方法：

1. GitHub Copilot (GitHub device login)
2. Proxy，通过 Vscode 假设 RESTFul 节点给 OpenClaw 调用；
	1. https://marketplace.visualstudio.com/items?itemName=lewiswigmore.open-wire

我是通过第二种方法，不确定未来 Copilot 会不会封我的号，我直接入了 4o 模型，因为 Copilot 的模型非常多，并且只能选择一样，未来还不能在机器人内切换，所以就选了免费的 4o，说实话，也不心疼烧 Token。为了未来切换模型方便，我把可切换的模型放在下面：

```shell
github-copilot/claude-haiku-4.5
github-copilot/claude-opus-4.5
github-copilot/claude-opus-4.6
github-copilot/claude-sonnet-4
github-copilot/claude-sonnet-4.5
github-copilot/claude-sonnet-4.6
github-copilot/gemini-2.5-pro
github-copilot/gemini-3-flash-preview
github-copilot/gemini-3-pro-preview
github-copilot/gemini-3.1-pro-preview
github-copilot/gpt-4.1
github-copilot/gpt-4o
github-copilot/gpt-5
github-copilot/gpt-5-mini
github-copilot/gpt-5.1
github-copilot/gpt-5.1-codex
github-copilot/gpt-5.1-codex-max
github-copilot/gpt-5.1-codex-mini
github-copilot/gpt-5.2
github-copilot/gpt-5.2-codex
github-copilot/grok-code-fast-1
```

## This group is not allowed.

1. 检查配置是否写对了
2. 把机器人移除重新加一遍

```json
{
  "channels": {
    "telegram": {
      "enabled": true,
      "dmPolicy": "pairing",
      "botToken": "xxx:xxx",
      "groupPolicy": "allowlist",
      "groupAllowFrom": [
	      // 允许群组里的这些人使用
	      "xxx1",
	      "xxx2"
	  ],
      "groups": {
	      // 群组id
	      "-xxx": {}
      },
      "streaming": "partial",
      "proxy": "http://127.0.0.1:10800"
    }
  }
}
```

## 远程开启 Web

先远程启动 web 页面

```shell
openclaw dashboard
```

然后记住端口地址，SSH 穿透

```shell
ssh -L 18789:127.0.0.1:18789 bgzo@192.168.31.20
```

## 感想

1. 随便聊了两句就花了 100 万 Token，上下文喂的太多了，看了下其他模型也有这种问题，千问尤为如此。
	1. https://www.v2ex.com/t/1152698
	2. https://www.v2ex.com/t/1171348
	3. https://www.v2ex.com/t/1179391

## 参考

1. https://zhuanlan.zhihu.com/p/2002485126714644013
2. https://club.fnnas.com/forum.php?mod=viewthread&tid=56132
3. https://zhuanlan.zhihu.com/p/2005987429828534912
4. https://www.reddit.com/r/vscode/comments/1rb8cox/i_wanted_my_openclaw_instance_to_use_copilots/
5. https://www.reddit.com/r/GithubCopilot/comments/1r6zwuv/openclaw_github_copilot/

## More

1. https://www.reddit.com/r/ArtificialSentience/comments/1qvcefb/do_not_use_openclaw/
2. https://www.reddit.com/r/google_antigravity/comments/1qykskz/account_banned_for_using_open_claw/
---
title: Openclaw 踩坑
aliases:
  - Openclaw 踩坑
created: 2026-02-22T01:23:54
modified: 2026-04-11T18:50:18
published: 2026-02-22T01:23:54
tags:
  - llm
  - openclaw
  - public
  - writing/lab
---

我对 OpenClaw 带给我的惊喜，恰如一开始读他的提示词那样惊艳：

> You're not a chatbot. You're becoming someone

我完全被这句话震住了。

## 无法使用 `openclaw devices list`

```shell
[openclaw] Failed to start CLI: Error: gateway closed (1008): pairing required
```

修改 `~/.openclaw/devices/pending.json`，从 `"silent": false` 到 `"silent": true`

via: https://github.com/openclaw/openclaw/issues/4531

## Telegram 没有反应

找到 Service 文件位置

```shell
systemctl --user show -p FragmentPath openclaw-gateway.service
```

编辑文件加入代理设置

```shell
Environment="http_proxy=http://127.0.0.1:7890"
Environment="https_proxy=http://127.0.0.1:7890"
Environment="all_proxy=socks5://127.0.0.1:7890"
```

重启服务

```shell
systemctl --user daemon-reload
systemctl --user restart openclaw-gateway
```


## DS 上下文太小

```shell
⚠️ Agent failed before reply: Model context window too small (4096 tokens). Minimum is 16000.

Logs: openclaw logs --follow
```

OpenClaw 这个 Agent 的**最低要求是 16k**，OpenClaw 的 Agent 通常会自动拼接：

- system prompt（很长）
- agent persona / policy
- 历史对话
- 工具说明
- planning / scratchpad
- 你刚发的消息

使用思考模型，配置里面改一下：

```json
"providers": {
  "deepseek": {
	"baseUrl": "https://api.deepseek.com/v1",
	"apiKey": "sk-xxx",
	"api": "openai-completions",
	"models": [
		{
		"id": "deepseek-chat",
		"name": "DeepSeek Chat",
		"reasoning": false,
		"input": [
		  "text"
		],
		"cost": {
		  "input": 0,
		  "output": 0,
		  "cacheRead": 0,
		  "cacheWrite": 0
		},
		"contextWindow": 16000,
		"maxTokens": 4096
		},
		{
		  "id": "deepseek-reasoner",
		  "name": "DeepSeek Reasoner",
		  "reasoning": false,
		  "input": [
			"text"
		  ],
		  "cost": {
			"input": 0,
			"output": 0,
			"cacheRead": 0,
			"cacheWrite": 0
		  },
		  "contextWindow": 200000,
		  "maxTokens": 8192
		}
	]
  }
}
```


## 换模型

因为我有 Copilot 订阅，平时一直闲置不用，而且运行 onboard 的时候看到有这个选项，但是找不到相关文档，所以无奈只能再次通过 onboard 配置这个模型，总的来说有两种方法：

1. GitHub Copilot (GitHub device login)
2. Proxy，通过 Vscode 假设 RESTFul 节点给 OpenClaw 调用；
	1. https://marketplace.visualstudio.com/items?itemName=lewiswigmore.open-wire

我是通过第二种方法，不确定未来 Copilot 会不会封我的号，我直接入了 4o 模型，因为 Copilot 的模型非常多，并且只能选择一样，未来还不能在机器人内切换，所以就选了免费的 4o，说实话，也不心疼烧 Token。为了未来切换模型方便，我把可切换的模型放在下面：

```shell
github-copilot/claude-haiku-4.5
github-copilot/claude-opus-4.5
github-copilot/claude-opus-4.6
github-copilot/claude-sonnet-4
github-copilot/claude-sonnet-4.5
github-copilot/claude-sonnet-4.6
github-copilot/gemini-2.5-pro
github-copilot/gemini-3-flash-preview
github-copilot/gemini-3-pro-preview
github-copilot/gemini-3.1-pro-preview
github-copilot/gpt-4.1
github-copilot/gpt-4o
github-copilot/gpt-5
github-copilot/gpt-5-mini
github-copilot/gpt-5.1
github-copilot/gpt-5.1-codex
github-copilot/gpt-5.1-codex-max
github-copilot/gpt-5.1-codex-mini
github-copilot/gpt-5.2
github-copilot/gpt-5.2-codex
github-copilot/grok-code-fast-1
```


## This group is not allowed.

1. 检查配置是否写对了
2. 把机器人移除重新加一遍

```json
{
  "channels": {
    "telegram": {
      "enabled": true,
      "dmPolicy": "pairing",
      "botToken": "xxx:xxx",
      "groupPolicy": "allowlist",
      "groupAllowFrom": [
	      // 允许群组里的这些人使用
	      "xxx1",
	      "xxx2"
	  ],
      "groups": {
	      // 群组id
	      "-xxx": {}
      },
      "streaming": "partial",
      "proxy": "http://127.0.0.1:10800"
    }
  }
}
```


## 远程开启 Web

先远程启动 web 页面

```shell
openclaw dashboard
```

然后记住端口地址，SSH 穿透

```shell
ssh -L 18789:127.0.0.1:18789 bgzo@192.168.31.20
```


## 感想

1. 随便聊了两句就花了 100 万 Token，上下文喂的太多了，看了下其他模型也有这种问题，千问尤为如此。
	1. https://www.v2ex.com/t/1152698
	2. https://www.v2ex.com/t/1171348
	3. https://www.v2ex.com/t/1179391

## 参考

1. https://zhuanlan.zhihu.com/p/2002485126714644013
2. https://club.fnnas.com/forum.php?mod=viewthread&tid=56132
3. https://zhuanlan.zhihu.com/p/2005987429828534912
4. https://www.reddit.com/r/vscode/comments/1rb8cox/i_wanted_my_openclaw_instance_to_use_copilots/
5. https://www.reddit.com/r/GithubCopilot/comments/1r6zwuv/openclaw_github_copilot/

## More

1. https://www.reddit.com/r/ArtificialSentience/comments/1qvcefb/do_not_use_openclaw/
2. https://www.reddit.com/r/google_antigravity/comments/1qykskz/account_banned_for_using_open_claw/

