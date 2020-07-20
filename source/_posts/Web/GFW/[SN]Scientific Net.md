---
title: '[SN] You Know Science'
date: 2020-06-14 00:20:00
toc: true
---

### Preface

+ CCCAT: cccat.io
+ 召唤师: zhs.today/auth/register?code=ILoveMask | `优惠码: xhJWj507`
+ 蓝岸: my.v2fly.club/#/register?code=1bzRvUqk
   - 2020-04-23  最近蓝岸被“脱裤”，大家注意风险；
   - 2020-05-30  基本已经完成转移，全部接入中转；
+  极游: jiyou.world/
   - 2020-05-18  最近缺少维护，可用性低，据说机场主忙于高考，购买需谨慎；
+ Catchflying: www.catchflying.network/auth/register?code=5ATO
+ 咸鱼: salty-tuna.link/
+ NFNF
+ YTOO: ytoo.li/clientarea.php
---
+ VPS综合性能测试脚本
  + Bench.sh: https://teddysun.com/444.html / https://github.com/oooldking/script/blob/master/superbench.sh
  +  SuperBench.sh: https://www.oldking.net/350.html
  + UnixBench.sh: https://teddysun.com/245.html
  + LemonBench: https://blog.ilemonrain.com/linux/LemonBench.html
+ VPS网络测试脚本
  + speedtest-cli
  + Superspeed: https://github.com/ernisn/superspeed
  + MTR

对应的命令:

```bash
wget -qO- bench.sh | bash

wget -qO- --no-check-certificate https://raw.githubusercontent.com/oooldking/script/master/superbench.sh | bash

wget --no-check-certificate https://github.com/teddysun/across/raw/master/unixbench.sh
chmod +x unixbench.sh
./unixbench.sh

curl -fsL https://ilemonra.in/LemonBenchIntl | bash -s fast # 快速测试
curl -fsL https://ilemonra.in/LemonBenchIntl | bash -s full # 完整测试

wget -O speedtest-cli https://raw.githubusercontent.com/sivel/speedtest-cli/master/speedtest.py
chmod +x speedtest-cli
mv speedtest-cli /usr/bin/
# `speedtest-cli`
#`speedtest-cli --bytes` 以字节计算的方式来测试
# `speedtest-cli --share` 生成图片分享
# `speedtest-cli --simple` 只显示ping和上下行速度
# `speedtest-cli --help` 显示可用命令

bash <(curl -Lso- https://git.io/superspeed)

apt install mtr-tiny
mtr -rw ip # `ip` 自己替换成本地地址；参数设定可以通过`mtr -h` 查看；更详细解释请看[这篇文章](https://zhuanlan.zhihu.com/p/30591816)
```
+ 梯子搭建脚本
  + Shadowsocks：https://teddysun.com/486.html
  + ShadowsocksR：https://doub.io/ss-jc42/
  + V2Ray：https://v2ray666.com/post/1/
+ 梯子优化脚本
  + Debain 9+ 开启 BBR 等
```bash
echo "vm.swappiness = 10" >> /etc/sysctl.conf
echo "net.core.default_qdisc = fq" >> /etc/sysctl.conf
echo "net.ipv4.tcp_congestion_control = bbr" >> /etc/sysctl.conf
echo "net.ipv4.tcp_fastopen = 3" >> /etc/sysctl.conf
sed -i '$a root hard nofile 1024000\nroot soft nofile 1024000' /etc/security/limits.conf
sed -i '$a * hard nofile 1024000\n* soft nofile 1024000' /etc/security/limits.conf
ulimit -n 1024000
sysctl -p
```
  + BBR脚本：https://doub.io/wlzy-16/

```bash
wget -N --no-check-certificate https://raw.githubusercontent.com/ToyoDAdoubi/doubi/master/bbr.sh && chmod +x bbr.sh && bash bbr.sh

# 备用地址
wget -N --no-check-certificate https://raw.githubusercontent.com/WithdewHua/doubi/master/bbr.sh && chmod +x bbr.sh && bash bbr.sh
```
  +  暴力BBR脚本：https://www.moerats.com/archives/523/

```bash
wget https://raw.githubusercontent.com/iiiiiii1/tcp_nanqinlang-test/master/tcp_nanqinlang-test.sh
bash tcp_nanqinlang-test.sh
```


### Noun


+ IPLC: IPLC是国际线路 ( International Private Leased Circuit )，即国际私有租赁线路.延迟低&速度快 专线延迟可低至25ms, 甚至低于日本CN2线路不用担心IP不可用: 真正意义上的IPLC是完全内网通讯, 流量不像普通VPS经过某些审查; 三大运营商是付费网间结算，暂时没有免费对等互联。要中继的原因一部分是三大国际出口网络质量不一样，一部分是小运营商几乎没啥国际出口，所以要借助其他表现好的。

+ 中继节点: 中继分公网中继/专线传输。公网就是还走三大统一出国，专线是国内国外两头内网传输。用户——中继入口服务器——中继服务器2——中继服务器N——落地服务器——用户访问的网站用户直接通过代理协议（ss、v2等），通过公网与中继入口服务器进行通讯。一般情况下中继入口是放在国内的，中继的入口到落地之间穿越防火墙的这一段一般会使用一些隧道协议，以实现负载均衡、高可用、防止被墙等效果。当然也有一些用单纯的端口转发过墙传输数据的，这种情况比较容易被墙。中继入口也有可能会通过IPLC/IEPL等专线出国，这种情况下连只需进行端口转发也不会被墙。

+ 隧道

### SS

+ Shadowsocks脚本：https://teddysun.com/486.html

```bash
wget --no-check-certificate -O shadowsocks-all.sh https://raw.githubusercontent.com/teddysun/shadowsocks_install/master/shadowsocks-all.sh
chmod +x shadowsocks-all.sh
./shadowsocks-all.sh 2>&1 | tee shadowsocks-all.log
#管理脚本：/etc/init.d/shadowsocks-libev start | stop | restart | status
# 配置文件：/etc/shadowsocks-libev/config.json
```

纪念大佬@clowwindy

[Ori]：https://printempw.github.io/about-clowwindy-archive/

> Two days ago the police came to me and wanted me to stop working on  this. Today they asked me to delete all the code from GitHub. I have no  choice but to obey.
>
> I hope one day I’ll live in a country where I have freedom to write any code I like without fearing.
>
> I believe you guys will make great stuff with Network Extensions.
>
> Cheers!
>
> from: https://github.com/shadowsocks/shadowsocks-iOS/issues/124


### SSR

+ ShadowsocksR脚本：https://doub.io/ss-jc42/

以teddysun的一键安装为例，如果遇到安装失败或安装后无法正常使用的情况，可以尝试另一个版本：逗比SSR一键安装脚本

服务器系统：CentOS6及以上、Debian7及以上、Ubuntu12及以上系统内存支持128M及以上，推荐256M起步。

```bash
wget --no-check-certificate -O shadowsocks-all.sh https://raw.githubusercontent.com/teddysun/shadowsocks_install/master/shadowsocks-all.shchmod +x shadowsocks-all.sh
./shadowsocks-all.sh 2>&1 | tee shadowsocks-all.log
# CentOS
yum -y install wget
apt -y install wget
```

选择SSR安装 -> 输入自定义密码后按回车，建议不要使用默认密码 -> 加密方式，如果选择chacha20的话，就输入对应序号12 -> 选择协议，建议选择自auth aes128md5 ->选择混淆方式 -> reboot
```bash
/etc/init.d/shadowsocks-r start #启动Rss
/etc/init.d/shadowsocks-r stop#退出Rss
/etc/init.d/shadowsocks-r restart #重启RSs：
/etc/init.d/shadowsocks-r status # Rss状态：
./shadowsocks-all.sh uninstall # 卸载RSS：
```
SSR的相关配置文件位置在：/etc/shadowsocks-r/config.json

---

```bash
wget -N --no-check-certificate https://softs.wtf/Bash/ssr.sh && chmod +x ssr.sh && bash ssr.sh
# 备用地址
wget -N --no-check-certificate https://raw.githubusercontent.com/WithdewHua/doubi/master/ssr.sh && chmod +x ssr.sh && bash ssr.sh
#运行脚本：bash ssr.sh
#管理脚本：/etc/init.d/ssr start| stop | restart | status
#配置文件：/etc/shadowsocksr/user-config.json
```


### V2ray

+ V2Ray脚本：https://v2ray666.com/post/1/
+ V2ray软件: https://github.com/vkuajing/v2ray

1. 避免VPS没装Curl，保险起见运行一下 Curl的安装命令, 两种系统下随便用一个命令就可以。
2. 命令` bash <(curl -s -L https://git.io/v2ray.sh)
3. 一路Enter, 打开V2ray 软件:  添加 Vmess 服务器,  复制刚才复制的代码 Vmess地址,  我把这个共享在 Free SS 资源  有需要的直接拿来用，也可以用来测试下速度,  从剪切板导入URL ； 点确定,  回到V2ray 主界面，这里多了一个 新的服务器,  参数设置 2333,  点确定,  和 SS类似，右键点图标启用即可，有风险提示，就点允许,  连接完成

```bash
bash <(curl -s -L https://v2ray666.com/v2ray.sh)
#运行脚本
V2Ray
# 管理脚本
v2ray info# 查看V2Ray配置信息
v2ray config #修改V2Ray配置
v2ray link#生成V2Ray配置文件链接
vzray infolink#生成V2Ray配置信息链接
v2ray qr#生成V2Ray配置二维码链接
v2ray ss#修改Shadowsocks配置
v2ray ssinfo#查看Shadowsocks配置信息
vzray ssqr#生成Shadowsocks配置二维码链接
vzray status #查着V2Ray运行状态
v2ray start#启动V2Ray
v2ray stop#停止V2Ray
v2ray restart#重启V2Ray
v2ray log#查看V2Ray运行日志
v2ray update#更新V2Ray
v2ray update.sh#更新V2Ray管理脚本
v2ray uninstall#卸载V2Ray
#配置文件：/etc/v2ray/config.json
```


### Clash

`Clash`是一款用`Go`开发的支持多平台的代理工具，支持`ss`/`v2ray`/`snell`（不支持`ssr`），支持规则分流（类似于 Surge 的配置）。

+ Clash: https://github.com/Dreamacro/clash
+ ClashX For Mac: https://github.com/yichengchen/clashX/
+ Clash for Windows By [Fndroid](https://github.com/Fndroid): https://github.com/Fndroid/clash_for_windows_pkg

**[Tip]**：

+ 了解策略组、规则等等（特别是没有托管需要自己编辑配置文件的用户，如 [神机规则](https://github.com/ConnersHua/Profiles/blob/master/Clash/Pro.yaml)；同时推荐看下 Fndroid 大佬的[关于策略组的理解](https://github.com/Fndroid/jsbox_script/wiki/关于策略组的理解)；掌握了策略分流的概念后，Clash、Quantumult、Surge、Surfboard 等工具的使用也能更清晰明白了。
+ 如果想要使用便携模式（如将`.7z`解压至移动硬盘、U盘等），需将`config.yml`和[Country.mmdb](https://asset.10101.io/externalLinksController/chain/Country.mmdb?ckey=8hY08nReECvarf4iCbIHXFlx80mL43thUQmjf6KnKh512UdFMDeEn%2BH5I%2BkJOnl%2F)放置在软件目录下`resources/static/files`文件夹中。
+ 可点击`General`页面的`Clash for Windows`字样重启客户端，点击旁边的版本号可以检查更新，点击小猫咪可以开启暗黑模式；
+ `General`页面的信息只能通过修改`C:\Users\用户名\.config\clash\config.yml`来更改，即`profiles`中的配置文件内包含的 General 信息不会生效；
+ 若不想启用系统代理的话，需要自己配置 http 或 socks5 代理，具体端口信息可以在`General`页面找到；
+ 当 Surge 托管链接的`URL参数`在两个及以上(由`&`连接)的话，请先对托管连接进行 [URL 编码](http://tool.chinaz.com/tools/urlencode.aspx)；
图标状态显示：蓝色——默认；红色——核心启动失败；黄色——系统代理开启；
+ `v0.4.5`版本后可以自定义系统代理需要绕过的域名或 IP ，用于解决部分应用检测代理后拒绝响应的问题（如 UWP 版网易云音乐）。具体编写方法见[官方文档——绕过系统代理](https://docs.cfw.lbyczf.com/contents/bypass.html)；（建议在`C:\Users\用户名\.config\clash\config.yml`中修改，这样可以在不同的配置文件中都起到作用）
+ 如果需要 UWP 应用走系统代理的话，可以点击打开`General`页面的`EnableLoopback.exe`，然后勾选需要代理的应用后保存；对于少数不遵守系统代理的 UWP 应用，可以使用 Tap 模式(详见 [TAP 模式](https://docs.cfw.lbyczf.com/contents/tap.html))




#### Clash for Windows 界面简介

- `General（常规）`：
  - `Port`、`Socks Port`；分别为 HTTP、SOCKS 代理端口，点击终端图案可以打开一个配置了代理的命令行窗口，点击端口数字可以复制该命令；
  - `Allow LAN`：启用局域网共享代理功能，此开关仅为短暂开启，如需启用请在修改配置文件中进行修改；‘
  - `Log Level`：日志等级；
  - `Home Directory`：点击下方路径直达`C:\Users\用户名\.config\clash`文件夹；
  - `GeoIP Database`：点击下方日期可更新 GeoIP 数据库；
  - `UWP Loopback` ：可以用来使 UWP 应用解除回环代理限制；
  - `Tap Device` ：安装 cfw-tap 网卡，可用于处理不遵循系统代理的软件（实际启动 tap 模式需要更改配置文件）；
  - `Text Mode Edit`：编辑`config.yml`文件，可用于配置部分 **General** 页面内容；
  - `Dark Theme`：控制暗色模式；
  - `System Proxy`：启用系统代理；
  - `Start with Windows`：设置开机自启；
- `Proxies（代理）`：选择代理方式（Global-全局、Rule-规则、Direct-直连）及策略组节点选择；
- `Profiles（配置管理）`：
  - 用来下载远端配置文件和创建本地副本，且可在多个配置文件间切换；
  - 对配置进行节点、策略组和规则的管理（添加节点、策略组和规则在各自编辑界面选择`Add`, 调整策略组顺序、节点顺序及策略组节点使用拖拽的方式）；
- `Logs（日志）`：显示当前请求命中规则类型和策略；
- `Connections (连接)`: 显示当前的 TCP 连接，可对某个具体连接执行关闭操作；
- `Feedback（反馈）`：显示软件、作者相关信息，内含捐赠码，欢迎打赏[Fndroid](https://github.com/Fndroid)


#### 添加配置文件

有托管 / 订阅情况

- 如果机场直接提供 Clash 托管配置，复制好托管链接，下一步;
- 如果拥有 Surge 托管，可以使用大佬提供的接口转换 Surge 配置为 Clash 可用配置。  
  **接口使用方法**：`https://tgbot.lbyczf.com/surge2clash?url=Surge托管地址`；例：托管地址为`http://example.com`, 那么使用接口后的远端配置地址为`https://tgbot.lbyczf.com/surge2clash?url=http://example.com`。


#### 具体步骤

1. 打开`clash for windows`，选择`Profiles`；
2. 在`Download from a URL`中填写`Clash托管链接`或`使用接口后的Surge托管地址`，然后点击`Download`, 成功更新并启动后左下角应显示为`Connected to Clash core`，见下图①②③； 
3. 点击`Proxies`，选择`Rule`，为自己的策略组挑选节点；
4. 点击`General`, 勾选`System Proxy（系统代理）`。（可选，不懂建议勾选）

#### 注意

初次启动时自带了一个简单的配置文件，里面有一个名为`Shadowsocks`的`socks5`类型`1080`端口的本地代理，如果接口或者 Clash 托管链接被墙可以用别的软件开启代理作为 CFW 的前置代理，端口为`1080`。

#### 无托管 / 订阅情况

如果没有 Clash/Surge 托管或者 V2Ray/ss 订阅链接的话，解决方法有以下三种（方法一推荐作为小幅度修改使用，编写大量配置时方法二更为方便）：

+ 方法一：利用 UI 配置

1. 当`Profiles`中为空时，会自动生成一个`config.yml`文件的配置副本，可以直接对它进行编辑；
2. 点击对应图案分别进入节点（组）或者规则的编辑模式；  
3. 例如，点击"飞机"图案进入节点和策略组编辑界面（添加规则同理），完成后点击`Save`保存;
4. 在`Proxies`中为各个策略组选择节点使用；
5. 点击`General`, 勾选`System Proxy（系统代理）`。（可选，建议勾选）
---
+ 方法二：直接修改配置文件

有以下两种方式，推荐使用第二种方式，编辑器推荐使用 [Notepad++](https://notepad-plus-plus.org/download/v7.5.9.html)，配置格式请参考 [神机规则](https://github.com/ConnersHua/Profiles/blob/master/Clash/Pro.yaml)

（~~编写策略组时注意**被引用的策略组要放在引用它的策略组之前**~~）：

1. 编辑`C:\Users\用户名\.config\clash`文件夹下的`config.yml`文件，然后删除`profiles`文件夹，重启 CFW，则会在`Profiles`中看到生成的`config.yml`副本；
2. 由于`Profiles`功能的加入，更推荐对`C:\Users\用户名\.config\clash\profiles`文件夹下的配置文件（若为 Local 文件直接在软件`Profiles`页面点击“铅笔状”图标即可打开）进行修改。

**注意**：

- General 部分信息由`config.yml`中对应部分决定，与`Profiles`中的配置文件无关；
- 可以直接拖拽`yml`格式的配置文件到`Profiles`面板中快速导入，详见操作示例（来自 Fndroid 大佬的 [GitHub](https://github.com/Fndroid/clash_for_windows_pkg)

---
+ 方法三：利用 JSBox 脚本

iOS 用户可以利用大佬的 [JSBox](https://itunes.apple.com/us/app/jsbox-learn-to-code/id1312014438?mt=8) 脚本—— [lhie1 规则生成](https://xteko.com/install?id=77&lang=zh-Hans)——添加节点，然后将脚本目录下的`data.js`发送给托管机器人 [rules_lhie1_bot](https://telegram.me/rules_lhie1_bot)即可获取 Surge 托管链接，再按照以上[有托管 / 订阅链接情况](https://10101.io/2018/10/27/how-to-use-clash-for-windows#有托管+%2f+订阅情况)操作。

#### 自定义字段

以下字段均可在 `config.yaml` 中定义

- `cfw-profiles-path`
    用于自定义 `Profiles` 目录路径
- `cfw-tray-icon`
    用于自定义状态栏图标
  ```yaml
  cfw-tray-icon: 
    default: path/to/ico           # 默认图标
    system-proxy-on: path/to/ico   # 开启系统代理后图标
  ```
- `cfw-font-family`
    用于自定义 CFW 字体
- `cfw-proxies-order`
    用于自定义节点排序，可用参数 `default` / `latency` / `alphabet`
- `cfw-http-headers`
    用于自定义配置文件下载时的请求头

#### Error

日志（点击左下角核心状态显示可直达 log 文件夹）: `C:\Users\用户名\.config\clash\logs`

- `Can't load mmdb: error opening database: invalid MaxMind DB file`错误。  
     **解决办法**：自行下载 [Country.mmdb](https://asset.10101.io/externalLinksController/chain/Country.mmdb?ckey=8hY08nReECvarf4iCbIHXFlx80mL43thUQmjf6KnKh512UdFMDeEn%2BH5I%2BkJOnl%2F)
- 拨号连接用户IE代理正常，其他浏览器系统代理无法使用。
     **解决办法**：重命名拨号连接，将中文名更改为英文名字，然后重启。
- 打开 Profiles 界面空白无内容
     **解决办法**：打开 Home Directory，删除文件夹下所有内容后重启软件。

<br><br><br>

### Reference:

VPS 推荐

[1]. https://10101.io/2019/10/30/my-vps

[2]. https://10101.io/2019/10/27/internet-provider

脚本

[3].秋水逸冰 https://teddysun.com

[4]. Toyo233 https://doub.io

[5]. OldKing https://www.oldking.net

[6]. 南琴浪 https://github.com/tcp-nanqinlang

[7]. AI https://v2ray666.com

[8]. Clash Doc:https://docs.cfw.lbyczf.com/

[9].  https://vpsland.xyz/

[10]. https://233v2.com/

[11]. Clash Proxy Provider https://www.notion.so/Clash-Proxy-Provider-ff8d1955f6234ad3a779fecd3b3ea007

[12]. subconverter README https://github.com/tindy2013/subconverter/blob/master/README-cn.md