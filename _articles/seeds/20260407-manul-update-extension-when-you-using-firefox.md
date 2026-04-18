---
title: 用火狐还得手动更新拓展
aliases: ['用火狐还得手动更新拓展']
created: 2026-04-07 21:52:10
modified: 2026-04-07 22:01:47
tags: ['firefox', 'obsidian', 'writing/seed', 'public']
comment: True
draft: False
published: 2026-04-17 14:52:49
description: 前几周 X 上分享了这样一个 Obsidian WebClipper 的操作场景： 很好，对吧，但是我发现 Firefox 上的插件一直是旧版，完全没有更新 1.3.0，反观 Chrome 就不一样 https//addons.mozilla.org/zh-CN/firefox/addon/web-clipper-obsidian https//chromewebstore.google.com/...
---

前几周 X 上分享了这样一个 Obsidian WebClipper 的操作场景：

![](https://x.com/kepano/status/2032123160536236461)

很好，对吧，但是我发现 Firefox 上的插件一直是旧版，完全没有更新 1.3.0，反观 Chrome 就不一样

- https://addons.mozilla.org/zh-CN/firefox/addon/web-clipper-obsidian
- https://chromewebstore.google.com/detail/obsidian-web-clipper/cnjifjpddelmedmihgijeibhnjfabmlf

第一时间挺伤心的，想着说不定等几个星期就好了，然后就没管这件事情，知道我昨天发现，妈的这玩意 TM 是开源的，我能看到 Releases 就有这个 Firefox 的包！

- https://github.com/obsidianmd/obsidian-clipper/releases

费了点劲，还是成功升级到了最新版本，为什么费劲呢？因为 Firefox 提醒我这个东西没有经过审核，需要我转到 `about:config` 把 `xpinstall.signatures.required` 关闭。

- https://support.mozilla.org/zh-CN/kb/add-ons-signing-firefox

oh, Firefox, come on.