---
title: 这趟列车的终点是哪里呢？
aliases: 这趟列车的终点是哪里呢？
created: 2026-07-12 10:16:45
modified: 2026-08-11 23:09:28
tags: ['china', 'gfw', 'proxy', 'public', 'writing/seed']
comments: True
draft: False
published: 2026-08-11 21:04:57
description: 最近事情发生太多，我常看的北京 Youtuber 「张内咸」被以「寻衅滋事」拘留，这个结果虽然不意外，但发生还是这样让人措手不及。 和全球观众都一样，我也担心他的安慰，不知道还需要在里面待多久，我个人比较喜欢他讲 朝韩的一期，从来没有提过中国，但是句句不离中国，也推荐给你。 国家机器如此恐怖，迅速，令人嗔目结舌，互联网上也不少，「GFW」。 如果你折腾过「翻墙」、「科学上网」、「魔法上网」、「出海...
---

最近事情发生太多，我常看的北京 Youtuber 「张内咸」被以「寻衅滋事」拘留，这个结果虽然不意外，但发生还是这样让人措手不及。

和全球观众都一样，我也担心他的安慰，不知道还需要在里面待多久，我个人比较喜欢他讲 [朝韩的一期](https://www.youtube.com/watch?v=cAXau0tjS1g)，从来没有提过中国，但是句句不离中国，也推荐给你。

国家机器如此恐怖，迅速，令人嗔目结舌，互联网上也不少，「GFW」。

如果你折腾过「翻墙」、「科学上网」、「魔法上网」、「出海」业务，你一定熟悉这个分布式防火墙。至今为止，我们仍然不知道他的防御规则，协议也是换了又换 SS、Vless、SS2022、Tarjon、AnyTLS、Reality 等等。但个人始终面临着「封端口」、「封 IP」、「通报」、「拔线」等等威胁。

最近我的机场流量被我的自动规则耗干（长时间挂在 6X 北京的节点上，一天 50G+），我在犹豫续费和另换机场之间，选择了换机场：我的想法非常简单，直连不如我自己自建，中转太不稳定，唯有专线我自己搞不了，而且链路中不过墙，长期稳定，除非机场的专线被拔线，所以我挑机场，只看专线。

最终看了 XXX 的博客，选了一家「[老猫云](laomaourl.com)」，他们家没有试用，只能充值后在用，我没有抱着试试看的心态，充了三个月中档，但是感觉被坑了，他们家的节点全是 AnyTLS，不像是 IEPL 专线，而且我充完订阅后，发现分组非常简陋，非常不便。

因为 AnyTLS 协议比较新，老的订阅转换服务早就停更了，所以我自己的 [订阅转换服务](https://sub.bgzo.cc/) 用下来，要么丢节点，要么 PING 不通。

我之前一直用「跑路云」+ 软路由，所以很多事情我感觉不到，直到订阅链接切换到了阅后即焚（我也是因为这个，才想放弃跑路云的），镇痛才渐渐传导到我这里。没曾想，只是过去了几年的时间，原来好好的项目都删库了，协议也换了一大堆，用起来磕磕绊绊。

要说清楚，得把这几年的事情一点点罗列出来：

## 纪事

### 2023 年 11 月：删库风波

2023 年 11 月，Clash 生态经历了一场大地震：

- **Clash for Windows** 作者删除了 GitHub 仓库，项目消失
- **Clash 原版核心**（Dreamacro/clash）被归档，不再维护
- **Clash Verge**（当时最流行的跨平台 GUI）随之归档停更
- **Clash Premium** 内核停止分发

根本原因是来自于作者相继被开盒，被约谈，懂得都懂。这导致了一个后果：**所有依赖原版 Clash 核心的工具链全部断供**，甚至你没法再从官方渠道下载到 Clash 核心，也没有人再修 bug、加功能、更新协议支持。

开源嘛，死不了的

### Mihomo：Clash 的继承者

原版 Clash 归档后，社区里最有影响力的 fork 是 Clash Meta，它早在删库之前就已经存在，多了很多原版没有的特性。删库事件后，MetaCubeX 为了避免波及，改名为 Mihomo，与米哈游共生死，这些年，有如下变更：

- 2023 年底：Clash Meta 改名 Mihomo，仓库迁至 `MetaCubeX/mihomo`
- 2024 年初：v1.17.0 起，二进制文件名从 `clash-meta` 改为 `mihomo`，所有 GUI 客户端必须适配新路径
- 2024–2025：v1.18.x 系列稳定迭代，逐步重写核心组件
- 2025–2026：v1.19.x 系列大爆发，协议支持、配置系统、Provider 全面重构

从 v1.17 到 v1.19，Mihomo 已经和原版 Clash 是完全不同的两个东西了。原版停留在 2023 年的功能集，Mihomo 在这三年里新增了几百个 commit、几十个新协议、一套全新的配置体系。Mihomo 对配置格式做了大量向后不兼容的修改，主要有如下变更：

### 变更：路径安全限制

最大的是：从 v1.19.x 开始，配置文件中所有的 `path` 字段都被限制在 `workdir` 内。以前可以写：

```yaml
proxy-providers:
  my_provider:
    type: http
    url: "https://example.com/sub"
    path: /任意/绝对/路径/provider.yaml    # ❌ 新版不再允许
```

现在必须写成相对路径：

```yaml
proxy-providers:
  my_provider:
    type: http
    url: "https://example.com/sub"
    path: ./proxy_provider/provider.yaml   # ✅ 限制在 workdir 内
```

workdir 默认是 `$HOME/.config/mihomo`，可以用 `-d` 参数或 `CLASH_HOME_DIR` 环境变量指定。如果要突破路径限制，需要设置 `SAFE_PATHS` 环境变量添加白名单。这个改动还影响到了 Restful API——`/configs` 接口的 `path` 参数也受限，目录必须在 workdir 或 SAFE_PATHS 内。

### 变更： 新字段名系统。

Mihomo 引入了一套新的配置字段命名规范，和旧版 Clash 不完全兼容。

subconverter 里专门加了一个开关 `clash_use_new_field_name` 来控制这个行为。如果转换服务没开这个开关，生成的配置可能在新版 Mihomo 上无法正确加载。

如下字段也遭到了移除：

- `routing-mark` 和 `interface-name` 从 proxy-groups 中移除，改到 proxies 里直接指定
- `global-client-fingerprint` 在 v1.19.27 中被删除，改由每个 proxy 单独设置 `client-fingerprint`
- Restful API 的 `/proxies` 端点行为在 v1.19.28 中被恢复到原版 Clash 风格（破坏了一批 GUI 的兼容性）
- 新增了 `DOMAIN-WILDCARD` 规则类型、`REMATCH-NAME` 规则类型、`PASS-RULE` 内置代理类型

如果用旧版 subconverter（2023 年的版本）生成的配置文件，直接丢给 2026 年的 Mihomo 跑，很可能跑不起来 —— 不是因为 Mihomo 拉完了，而是两边的配置格式已经不兼容了。

### 变更：Provider 系统，`proxies` 到 `proxy-providers`

原版 Clash **从始至终都不支持 proxy-providers**。 节点就是写在 `proxies` 字段里的，一个萝卜一个坑。这是 Clash 最原始的设计。

Clash Premium 在 2022 年中旬（大约 6–8 月） **首次引入**了 `proxy-providers` 和 `rule-providers`。这是 Premium 内核的独占功能，开源核心没有。功能上线后在中文社区引起了讨论——2022 年 10 月有用户在论坛上发帖说 " 前几个月 Clash Premium 内核推出了 ProxyProviders 和 RuleProviders"，还吐槽这个功能过于依赖延迟测速、不能反映真实速度。

Clash Meta（Mihomo） 从项目起步阶段就瞄准了 Premium 的功能集。最早的 Meta 版本（2022 年底问世）已经完整支持 proxy-providers。

所以现在用的任何 Meta 或 Mihomo 内核，天生就有 Provider 系统。

好处当然有：

1. 订阅合并：一个机场不够用，可以同时挂好几个订阅
2. 配置与订阅分离： 你的路由规则、策略组是手写的，不受机场的订阅模板影响
3. 动态更新：provider 按 `interval` 自动拉取最新节点，不用手动刷新

坏处就是你我现在都得重新学一遍新的怎么用，如果学习算坏处的话。

### 变更：新协议

2023 年以后的翻墙协议发展速度远超之前十年。原版 Clash 停在 SS/SSR/VMess/Trojan 时代，而 Mihomo 在这三年里加入了：

- 2024–2025 年
	- **Hysteria2** — 基于 QUIC，抗丢包能力强，2024 年机场大规模普及
	- **VLESS + Reality** — Xray 阵营的协议，Mihomo 实现了完整的客户端支持
	- **AnyTLS** — 新兴协议，伪装成 TLS 流量，我这次遇到的主要痛点
	- **Tuic** — 基于 QUIC，延迟低
	- **WireGuard** — 直接作为 outbound 使用
	- **Hysteria（一代）** — 老版也支持了
- 2026 年（v1.19.21–v1.19.28）：
	- **Tailscale outbound** — 直接把 Tailscale 节点当代理出口
	- **OpenVPN outbound** — 把 OpenVPN 当代理协议用（支持 auth-user-pass 和 AES-256-GCM）
	- **GOST relay** — 一种中继协议
	- **Snell v4/v5** — Surge 阵营的协议
	- **xhttp transport** — 基于 HTTP 的传输层（支持 CDN 反代）
	- **MASQUE** — Google 推出的 QUIC 隧道协议
	- **Shadow-TLS for Snell**、**TLS mirror for VMess**、**Restls for Shadowsocks listener**
	- **mKCP + Mekya for VMess**

另外还有一个趋势：**越来越多的机场开始把 Sing-box 作为原生协议输出**，Mihomo 也在持续提升和 Sing-box 协议的兼容性。

### 订阅转换服务换代

订阅转换是整个链路里 " 最隐形但又最关键 " 的一环。它把机场给的各种格式（Base64、Sing-box、Clash、SS 等）统一转成目标格式。但如果转换器不更新，上游的新协议它一个都不认识。

原版 subconverter（tindy2013/subconverter）。 C++ 写的老牌转换器，功能稳定，但主要开发在 2021 年左右就基本停止了。支持 SS/SSR/VMess/Trojan/HTTP/SOCKS5 这些老协议没问题，但 AnyTLS、Hysteria2、VLESS Reality 这些新东西一概不认识。很多自建转换服务（包括我的 [sub.bgzo.cc](http://sub.bgzo.cc)）都用的这个版本。

有一些其他替代：

1. 社区增强版（[asdlokj1qpi23](https://github.com/asdlokj1qpi233/subconverter)）。 在原版基础上持续加新协议支持的 fork，是目前最活跃的 subconverter 分支：

### GUI 客户端换代

Clash for Windows 死后，GUI 客户端也经历了一次彻底的重新洗牌。现在形成了三个主流选项：

1. **Clash Verge Rev。** 从原 Clash Verge v1.3.8 fork，目前 GitHub 星标最多、社区最活跃。2024 年 11 月发布了 v2.0 大版本，重构了订阅切换逻辑、引入事件驱动代理管理器。现在稳定版是 v2.3.2。它只支持 Mihomo 内核，把所有 Meta 特性都暴露给了用户。
2. **Clash Nyanpasu（喵帕斯）。** 从原 Clash Verge v1.3.7 fork，走独立差异化路线。v1.6.0 使用了 React 19，设计了 Material You 风格界面。最大的特点是 **多内核支持**——可以在 Mihomo、Clash Rust、Clash Premium 之间切换。配置目录支持 `config_dir` 和 `data_dir` 分离，方便网盘同步。
3. **Clash Party（原名 Mihomo Party）。** 基于 Tauri 开发的客户端，2024 年上线，后来因为 Mihomo 内核更新了软件协议——规定使用内核的软件不得包含 "Mihomo" 关键字——于是改名为 Clash Party。主打开箱即用、高颜值、WebDav 备份。适合不想折腾的用户。

这三家都在持续更新，但有一个共同点：**它们都只围绕 Mihomo 内核。** 原版 Clash 核心已经被彻底抛弃了。你要用这些 GUI，必须先理解 Mihomo。

## 要不试试自建

说实话，最近被卡脖子难受到让我自己想走这条最难的道路，因为评论区净是吹这个怎么怎么稳定的。加上我换到了一个更不稳定的机场去，心态更炸裂了。

最坑的是，有时候半夜，或者某段时间节点会全红，会持续一晚上，第二天早上才好，我忍不了，看了很多网友的讨论，然后又退缩了，我发现还是如此困难，以至于几乎不是我想投入尽力染指的事情。

换 ip，换端口，换协议，套 cf，伪装协议等等，然后被发现了就只能换端口、换协议、换 IP，继续伪装，长时间就得耗在上面，听着就好累啊。

这不是办法，防火墙的规则一直在升级，黑名单一直在累加，剩余的空间会一直坍缩，直到最后一个 IP 难求。

所以我一直觉得直连很蠢，还是专线最好，花该花的钱，但我好像什么都没做，又回到了原点。

## References

1. [机场通报时间线-机场GO](https://jichanggo.com/tongbao/)
2. [【真理部指令】关于全面封禁海外流量及严禁翻墙业务的紧急通知](https://chinadigitaltimes.net/chinese/726411.html)
3. [2026年4月跨境网络整顿全景：中转与专线机场进入高压期 | 博客 | 川沐](https://www.cuanmu.com/blog/2026-04-cross-border-network-crackdown/#%E4%B8%BA%E4%BB%80%E4%B9%88%E4%BC%AA%E8%A3%85%E5%8D%8F%E8%AE%AE%E8%B6%8A%E6%9D%A5%E8%B6%8A%E4%B8%8D%E7%A8%B3) #llm/articels
4. [为什么你买的“纯净 IP”总被封？真相可能让你少走三年弯路 - 知识库 - Mkcloud - 合规跨境电商专线服务器，助力企业出海，加速您的业务发展](https://www.mkcloud.net/index.php/knowledgebase/79/%E4%B8%BA%E4%BB%80%E4%B9%88%E4%BD%A0%E4%B9%B0%E7%9A%84%E7%BA%AF%E5%87%80-IP%E6%80%BB%E8%A2%AB%E5%B0%81%E7%9C%9F%E7%9B%B8%E5%8F%AF%E8%83%BD%E8%AE%A9%E4%BD%A0%E5%B0%91%E8%B5%B0%E4%B8%89%E5%B9%B4%E5%BC%AF%E8%B7%AF.html)
5. [反向墙 - nyanpass](https://nyanpass.pages.dev/qzzs/fxq/)
6. [2026年4月拔线潮：一夜之间，你的机场全挂了 | 心安VPN](https://relyvpn.com/zh-cn/blog/china-vpn-crackdown-2026.html)
7. [科学上网 | 左耳朵](https://haoel.github.io)
	1. [Mass VPS hosting on Enterprise equipment - BandwagonHost VPS](https://bandwagonhost.com/order/basic/Los%20Angeles)
8. [最近威力加强了，纯自用搭建的也被墙了 · v2fly/v2ray-core · Discussion #2097](https://github.com/v2fly/v2ray-core/discussions/2097)
9. [vmess + ws + tls + cf 被墙，大佬看下这是什么手段 · v2fly/v2ray-core · Discussion #3114](https://github.com/v2fly/v2ray-core/discussions/3114)
10. [你的 IEPL 专线机场的电信入口即将被拔线，电信线路得加钱 - V2EX](https://www.v2ex.com/t/1199638)
11. [机场，拔线之后](https://www.gazzetta.xyz/jichang-baxian/)
12. [中国加强跨境数据监管 三大运营商同时收紧信号 – 普通话主页](https://www.rfa.org/mandarin/shehui/2026/04/09/china-internet-vpn-block-greatfirewall/)
13. [[BUG] 无法使用Anytls+reality协议的节点 · Issue #6043 · clash-verge-rev/clash-verge-rev](https://github.com/clash-verge-rev/clash-verge-rev/issues/6043)
14. [[Bug]: Anytls节点无法使用 · Issue #7773 · 2dust/v2rayN](https://github.com/2dust/v2rayN/issues/7773)
15. [[转发] 近日 AnyTLS 流量已被识别或通报 - V2EX](https://www.v2ex.com/t/1214944)
16. [proxy-providers的使用详解 | Hao_Tian的折腾日志](https://haotian22.top/bca01b6c.html)
17. [DNS配置 - 虚空终端 Docs](https://wiki.metacubex.one/config/dns/?h=res)