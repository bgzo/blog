---
title: "Overhead GFW"
date: 2020-02-26T23:51:37+08:00
draft: false
dropcap: false
tags:
- VPS
---

> **Warning**: This article is not suitable for anyone to read. Please exit this page in advance to end reading. The creation of this article is a personal imagination and does not have any practical significance. The author is not responsible for any violations of local laws and regulations by the parties.

Studying CS in the mainland has always become extremely difficult. Generally, I use the computer for three hours. The first two hours I have been repairing the Internet and running an agent. Finally, I can open a google after the Internet, and the progress is always lower than the classmates. Big cut, forced myself not to talk in my spare time, and often fell into self-doubt scams. I didn't say anything at the end of the day, and I was a little autistic.

......

It is very convenient to open the proxy under Windows, because there is a GUI named CFW; relatively, it is different in *nix: After closing the system proxy port, open the website `clash.razord.top/#/settings`. Execute `Clash` and find this page It will refresh automatically. It means that there is no problem with Clash's external mapping port and airport configuration. Select the node, open the proxy, and test. Common problems are:

-System proxy && `Clash` all on
-Configuration file format
   -Case of variables
   -Variable port
   -Mapping port
-The effect of `./clash -d .` & `./clash` is inconsistent.
-Package expired / the owner runs off
-......

Don't think that Clash is pulled up on *nix. CFW always crashes at 10G on my computer. The reason should be that I can't stand the concurrent proxy of too many applications and processes. In short, if I can't go to Google sometimes, I switch on and off The proxy software is fine again.

## Commands

<script src="https://gist.github.com/bGZoCg/82a76ecbebf81b556a1d20a91a6bd21a.js"></script>

## Noun U Should Know

- **IPLC**: International Private Leased Circuit, International Private Leased Circuit. Low latency, fast speed, even lower than the Japanese CN2 line, no need to worry about IP, complete intranet communication, the three major operators are paid inter-network settlement.
- **IEPL**: International Ethernet Private Line, International Ethernet Private Line, MSTP construction, SDH transmission, GFP encapsulation, protocol transparency, physical layer isolation, bandwidth guarantee, and a layer of point-to-point data private line service.
- China Telecom: The three major international outlets are Beijing, Shanghai, and Guangzhou. The national export network will eventually converge to these three outlets.
  - **ChinaNet**: 163 backbone network/AS4134, backbone network, early infrastructure, large bandwidth, cheap, and carry ordinary quality Internet services.
  - **Chinatelecom Next Carrier Network**: CNCN, CN2/AS4809. Back-in backbone network, transfer between Europe, North America and Asia, stable high speed, time delay sensitive, and more expensive.
    - **CN2 GT**: Global Transit, global Internet resource transfer, provided to communication operators around the world, telecom 163 backbone network access international Tier1/2 operators and mainstream OTT, CN2 direct connection to the international network. International exports are available Separate line, domestic link uses 163 backbone network.
    - **CN2 GIA**: Global Internet Access, provides enterprises with **China direction** Internet dedicated line access. Access to CN2, export CN2 throughout the journey, but the export bandwidth is small and there are network fluctuations. The main advantage of GIA is to return to the state Separate line, high priority, high quality, but the access price is more expensive.
      - **One way/one way CN2**
        - **Go to CN2, return to ChinaNet**: The test results are good, and the actual experience is uninspiring.
        - **Go to ChinaNet, return to CN2**: The optimal solution for comprehensive anti-DDoS, speed, and price.
      - **Two-way/two-way CN2**<sup>[1](#j1)</sup>
  - **GIS**: Global Internet Services
    - **ChinaNet Paid-Peer**: Provides the shortest route access service for China Telecom's Chinese Internet resources for operators and OTT users around the world.
    - **China Access**: Provide one-stop Chinese Internet resource access services for global customers.
- **BGP**: Border Gateway Protocol, Border Gateway Protocol. It is used for interconnection between Internet ASs, controlling the propagation of routes and choosing the best route. BGP multi-line computer room is better than dual-IP dual-line computer room. sup>[2](#j2)</sup>
- **Relay**: If the relay entrance is in the country, some tunneling protocols (load balancing/high availability/prevention of being walled) are generally used for the section that passes through the firewall between the relay entrance and the landing
  - **Public Network**: The public network is still going abroad in the three major unifications.
  - **Dedicated line**: Dedicated line is the internal network transmission at both domestic and foreign ends.
- **Quality Standard**
  - `IPLC/IEPL dedicated line> CN2 GIA> BGP transfer> ordinary tunnel relay> conventional CN2 GT> direct connection line> ordinary line`


## PROTOCOLS

### SS

The original [project](https://github.com/shadowsocks/shadowsocks-iOS) address was closed because Clowwindy was [Drinked Tea](https://github.com/shadowsocks/shadowsocks-iOS/issues/124). What happened can be [reference](https://printempw.github.io/about-clowwindy-archive/).
- Script:
  - [shadowsocks_install](https://github.com/teddysun/shadowsocks_install): Removed.
    - [Docs](https://teddysun.com/486.html)
  - [shadowsocks_install](https://github.com/heweiye/teddysunBackup): Backup.

### SSR

......

### V2ray

- Script:
  - [v2ray](https://github.com/233boy/v2ray): Removed.
    - [v2ray Turtuial](https://github.com/vkuajing/v2ray).
  - [233boy-v2ray](https://github.com/PhenTse/233boy-v2ray): Backup.

## Software

### CLASH

A proxy tool developed with `Go` that supports multiple platforms, supports `ss`/`v2ray`/`snell`, and supports rule shunting (Surge)

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

For reference only, at your own risk. If you are interested, you can see Fndroid [Understanding about the strategy group](https://github.com/Fndroid/jsbox_script/wiki/Understanding about the strategy group)

- Online Subconverter subscription conversion
  - https://acl4ssr-sub.github.io/
  - https://subcon.py6.pw/
  - https://sub.weleven11.com/
  - https://id9.cc/
  - https://subcon.dlj.tf/
  - https://sub-web.wcc.best/
  - https://api.nameless13.com/
  - https://agwa.page/
  - https://acl4ssr.netlify.app/
  - [Divine Machine Rule](https://github.com/ConnersHua/Profiles/blob/master/Clash/Pro.yaml)
  - [tindy2013/subconverter](https://github.com/tindy2013/subconverter/blob/master/README-cn.md)

![](https://z3.ax1x.com/2021/06/28/RNt0kn.png)

<div id="j1">[1]. https://www.oldking.net/751.html</div>
<div id="j2">[2]. https://www.cnblogs.com/geowo/p/13706274.html</div>
<div id="j3">[3]. https://code.visualstudio.com/docs/setup/network</div>
