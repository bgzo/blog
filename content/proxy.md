---
title: "Proxy"
date: 2020-02-26T23:51:37+08:00
draft: false
dropcap: false
tags:
- VPS
---

提前说明, 本文不适合任何人阅读. 在校园内用三个小时电脑, 一般两个小时在修网, 好不容易修好网络了, 开个 `google` 高兴一下, 然后就没时间了, 一天下来等于什么都没干...... 总结一下命令行修网经验(无GUI): 一般关闭系统代理端口转发后打开`clash.razord.top/#/settings`. 执行Clash, 发现此页面会刷新. 表示 Clash 的外部映射端口几次场子的配置问题没有问题. 选择节点, 开启代理, 进行测试. 常见问题有:

- 开了系统代理 && `Clash` 全部开启
- 配置文件格式有问题
- 变量的大小写问题
- 变量的端口的有无
- 映射端口是否对应
- `./clash -d .` & `./clash` 的效果不一致.
- 套餐过期/场主跑路

......

<!--more-->

## NOUN

- **IPLC**: International Private Leased Circuit, 国际私有租赁线路. 延迟低, 速度快, 甚至低于日本CN2线路, 不用担心IP, 完全内网通讯, 三大运营商是付费网间结算.
- **IEPL**: International Ethernet Private Line, 国际以太网专线, MSTP构建, SDH传输, GFP封装, 协议透明，物理层隔离，带宽保证，提供一层点对点数据专线服务. 
- 中国电信(China Telecom): 三大国际出口分别是，北京，上海，广州，全国的出口网络最后都会汇集到这三个出口点
  - **ChinaNet**: 163骨干网/AS4134, 骨干网, 基建早, 带宽大, 便宜, 承载普通质量的互联网业务.
  - **Chinatelecom Next Carrier Network**: CNCN, CN2/AS4809. 后进骨干网, 欧洲, 北美和亚洲间的转接, 稳定高速, 时延敏感, 价格更贵.
    - **CN2 GT**: Global Transit, 全球互联网资源转接, 提供给全球的通讯运营商, 电信163骨干网接入国际Tier1/2 运营商以及主流OTT, CN2直连国际网. 国际出口有单独线路，国内的链路使用163骨干网.
    - **CN2 GIA**: Global Internet Access, 为企业提供**中国方向**互联网专线接入. 接入CN2，出口全程CN2, 但出口带宽小, 有网络波动. GIA 的主要优势是回国有单独的线路，高优先级，高质量，但接入价格较贵。
      - **单程/单向 CN2**
        - **去CN2, 回ChinaNet**: 测试效果好, 实际体验无感.
        - **去ChinaNet, 回CN2**: 综合抗DDoS, 速度, 价格的最优解.
      - **双程/双向 CN2**<sup>[1](#j1)</sup>
  - **GIS**: Global Internet Services
    - **ChinaNet Paid-Peer**: 为全世界运营商和OTT用户提供中国电信中文互联网资源的最短路由接入服务。
    - **China Access**: 为全球客户提供一站式的中文互联网资源接入服务。
- **BGP**: Border Gateway Protocol, 边界网关协议. 用于互联网AS间的互联, 控制路由的传播和选择最好的路由, BGP多线机房相较于双IP双线机房更优.<sup>[2](#j2)</sup>
- **中继**: 中继入口在国内的，中继的入口到落地之间穿越防火墙的这一段一般会使用一些隧道协议(负载均衡/高可用/防止被墙)
  - **公网**: 公网就是还走三大统一出国.
  - **专线**: 专线是国内国外两头内网传输.
- **质量标准**
  - `IPLC/IEPL专线 > CN2 GIA > BGP中转 > 普通隧道中继 > 常规CN2 GT > 直连线路 > 普通线路`

## PROTOCOLS

### SS

原[项目](https://github.com/shadowsocks/shadowsocks-iOS)地址, 因clowwindy被[喝茶](https://github.com/shadowsocks/shadowsocks-iOS/issues/124)而关闭. 事情经过可以[参考](https://printempw.github.io/about-clowwindy-archive/).

- Script:
  - [shadowsocks_install](https://github.com/teddysun/shadowsocks_install): Removed.
    - [Docs](https://teddysun.com/486.html)
  - [shadowsocks_install](https://github.com/heweiye/teddysunBackup): Backup.

### SSR

......

### V2ray

- Script:
  - [v2ray](https://github.com/233boy/v2ray): Removed.
    - [v2ray 教程](https://github.com/vkuajing/v2ray).
  - [233boy-v2ray](https://github.com/PhenTse/233boy-v2ray): Backup.

## Software

### CLASH

一款用`Go`开发的支持多平台的代理工具，支持 `ss`/`v2ray`/`snell`，支持规则分流(Surge)


- [Clash](https://github.com/Dreamacro/clash).
  - [Clash Mirror](https://tmpclashpremiumbindary.cf/).

Download:
- [ClashX For Mac](https://github.com/yichengchen/clashX/).
- [Clash For Windows](https://github.com/Fndroid/clash_for_windows_pkg) By [Fndroid](https://github.com/Fndroid)
  - [Docs](https://docs.cfw.lbyczf.com/).
- Clash For Android
  - [Clash For Magisk](https://github.com/Kr328/ClashForMagisk).
  - [Clash Premium For Magisk](https://github.com/kalasutra/Clash_Premium_For_Magisk).
- [MMDB](https://github.com/alecthw/mmdb_china_ip_list).

### 规则

仅供参考，安全自负. 有兴趣可以看 Fndroid [关于策略组的理解](https://github.com/Fndroid/jsbox_script/wiki/关于策略组的理解)

- 在线Subconverter订阅转换
  - https://acl4ssr-sub.github.io/
  - https://subcon.py6.pw/
  - https://sub.weleven11.com/
  - https://id9.cc/
  - https://subcon.dlj.tf/
  - https://sub-web.wcc.best/
  - https://api.nameless13.com/
  - https://agwa.page/
  - https://acl4ssr.netlify.app/
  - [神机规则](https://github.com/ConnersHua/Profiles/blob/master/Clash/Pro.yaml)
  - [tindy2013/subconverter](https://github.com/tindy2013/subconverter/blob/master/README-cn.md)

![](https://z3.ax1x.com/2021/06/28/RNt0kn.png)

<div id="j1">[1]. https://www.oldking.net/751.html</div>
<div id="j2">[2]. https://www.cnblogs.com/geowo/p/13706274.html</div>
<div id="j3">[3]. https://code.visualstudio.com/docs/setup/network</div>
