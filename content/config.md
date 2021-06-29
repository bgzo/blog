---
title: "All Pc Software In One"
date: 2020-01-18T00:00:00+08:00
draft: false
dropcap: false
tags:
- Tool
---

说实话如果要把我找工具的经历一一记下的话可能篇幅过长, 那我尽量长话短说, 只记录要点. 长时间的寻找工具让我觉得软件间其实并没有绝对的差异, 更多时候也可以曲线救国找到临时解决方案, 过不了多久开发者就会跟近需求功能并逐一上线.

不要忘记找工具的主要目的是**提高效率**, 如果自己因为寻找工具而惶惶不可终日, 那么一定是磨刀反误砍柴工了, 因为你的目的已经不是解决需求, 而是不断的创造需求, 无穷递归的时间复杂度很大的噢! 有种新型的说法是 **productivity porn**, 专指那些热衷于寻找大量工具但是从来不会湿鞋的一群人<sup>[8](#j8)</sup>.如有[一位朋友说](https://twitter.com/XDash/status/1372355660067663875)的:

> 1、逼迫自己坚持「日更」锻炼写作，写出来的多半无病呻吟。文章合为时而作，应该是有值得分享的东西再提笔；
> 
> 2、用东拼西凑的碎片摘录，拼凑洋洋洒洒的长篇段落，就为佐证一个毫无新意的观点；
> 
> 3、不断下载和研究新工具。

<!--more-->

## Lists

- Dock
    - **Window:** 
        - [Mydockfinder](https://www.mydockfinder.com/)
        - [Utf-8 出现乱码] RocketDock.
    - **LINUX**/**Ubuntu**:
        - GTK
        - Unity
        - Gnome - Dash-to-dock: 系统和浏览器共同安装.
- **Music**
  - [Netease Music](https://music.163.com/#/download)
    - [Unlock Music 音乐解锁](https://github.com/ix64/unlock-music)
  - QQ Music
    - [QQMusic QMC Decoder (convert QMC File to MP3 or FLAC)](https://github.com/Presburger/qmc-decoder)
    - [Deepin-QQ](https://github.com/gorquan/QQMusic)
    - [X-Droid](https://www.linzhuotech.com/)
- **Works**
  - Office365 / [WPS](https://linux.wps.cn/)
  - [BaidunetDisk](https://pan.baidu.com/download)
  - [XMind](https://www.xmind.net/) + 果壳
  - Master Reader
    - [Shortcuts](https://code-industry.net/masterpdfeditor-help/keyboard_shortcuts/)
  - **Cailbre**
  - 坚果云
  - GoldenDict
  - Mircosoft To Do / [Ao](https://github.com/klaussinani/ao) 
  - [FluentRSS](https://github.com/yang991178/fluent-reader) / Justrss
  - Flowchar
  - Bookworn
  - [Audacity](https://audacity.org)  
  - OBS
  - TeamViewer
- **Painting**
  - Mypainter
  - GIMP
  - Darktable
  - Krita
      - krita-l10n
  - [Excalidraw](https://github.com/excalidraw/excalidraw)
- **Proxy**
  - **Clash**: Android / Magisk / Linux / Window
- **Chat**
  - QQ
  - Wechat
  - Telegram
- **Sys Tools**
  - PulseAudio: 音量调节
  - Blueman: 蓝牙管理器
      - [Window10] [Bluetooth Battery Monitor Lanzou](https://wwi.lanzous.com/iM1fee8ii4h)
      - [Linux] `sudo apt-get install libbluetooth-dev && git clone https://github.com/TheWeirdDev/Bluetooth_Headset_Battery_Level && cd Bluetooth_Headset_Battery_Level && chmod +x bluetooth_battery.py && ./bluetooth_battery.py BT_MAC_ADDRESS_1 ...` <sup>[1](#j1)</sup>
          - https://stackoverflow.com/questions/21597536/pybluez-installation-in-linux
  - Dconf: 系统编辑器
  - Flameshot: 截图助手
  - [**V16config Lanzou**](https://wwa.lanzous.com/icv18ob)
  - [**搜狗输入法简化版 Lanzou**](https://wwa.lanzous.com/ibsjy8f)
  - [**Fliqlo 屏保 Lanzou**](https://wwa.lanzous.com/ibsjzha)
  - [**Bandica 录屏 Lanzou**](https://wwa.lanzous.com/ibsjzjc)
  - [**Rockdock Lanzou**](https://wwa.lanzous.com/iaD3Wdbvvij)
- **Play Media**
  - Steam
    - Proxychains
  - Uplay
  - VLC
- Code
  - [GitKaken](https://www.gitkraken.com/)
  - **JetBrains**
    - Clion
    - Pycharm
  - **Typora** / MarkEditor
    - [Pandoc](https://github.com/jgm/pandoc/releases)
  - [VsCode](https://code.visualstudio.com/Download)
  - **Dev-Cpp**：[lanzou](https://wwa.lanzous.com/ifYm8diuo1g); 
  - **Vim / GVim-for-gtk**
  - [**BvSSH**](https://www.bitvise.com/ssh-client-download): [lanzou](https://wwa.lanzous.com/ibsksbi); 

## VLC<sup>[2](#j2)</sup>
| F                            | Fullscreen               |
| ---------------------------- | ------------------------ |
| Space                        | Play/Pause               |
| T                            | Show position (time)     |
| S                            | Stop                     |
| Ctrl+Q                       | Quit                     |
| +/-                          | Faster/Slower            |
| N/P                          | Next/Previous            |
| Shft+Left/Shft+Right         | Jump very short          |
| Alt+Left/Alt+Right           | Jump short               |
| Ctrl+Left/Ctrl+Right         | Jump medium              |
| Ctrl+Alt+Left/Ctrl+Alt+Right | Jump long                |
| Ctrl+Up/Ctrl+Down            | Volume up/down           |
| M                            | Mute                     |
| Ctrl+M                       | Show DVD-menu            |
| Left/Right Up/Down Enter     | DVD-menu navigation keys |



## FCITX-PINYIN<sup>[3](#j3)</sup>
可使用插件实现云输入

```bash
<div id="j1"> [1]. https://github.com/ethsonliu/stackoverflow-top-cpp </div>
```

### 双拼 

![](https://dandelionfs.oss-cn-beijing.aliyuncs.com/double-ping.webp)

#### 进阶

To be continued...

## Clash

```bash
tar -zxvf clash-linux-amd64-vXXXX.gz
sudo mv clash-linux-amd64-vXXXX /usr/local/bin/clash
sudo chmod +x /usr/local/bin/clash
clash
```

此时会在 ~/.config/clash 目录下生成两个文件：config.yaml 和 Country.mmdb；

- 保持 clash 运行，打开浏览器访问 clash.razord.top 进行策略配置、选择代理线路等等（可能需要根据提示输入IP、端口和口令，具体内容可在 config.yaml 中查看；
- 在系统网络设置中设置手动代理 Settings>Network>Network Proxy>Manual（设置>网络>代理>手动）。

如果不想一直保持终端打开，可使用 nohup clash 命令启动后台运行。或者希望开机自启动 clash，可将 nohup clash 这段命令加入到前面提到的 start-service.sh 脚本的最后. 


## Firefox & Chrome

> 2021-01-20 [多个 Linux 发行版考虑移除 Chromium 软件包 ](https://www.solidot.org/story?sid=66710), 从 3 月 15 日起 Chromium 的浏览器的 Google API 和服务 被移除, 其中最主要的是同步账号的 Chrome Sync API, 声称这是为了改进用户数据安全。

基于之前看到的 隐私大盗 和 监视资本主义, 我开始重新审视谷歌浏览器和自己的隐私, 更对国内的属于使用感到后怕, 我们不可以忘记 Google 终究是商业公司.


### 引擎API

```http
# Every 
https://www.google.com/search?q＝%s
https://www.baidu.com/s?wd=%s
https://www.dogedoge.com/results?q=%s
https://www.sogou.com/web?query＝%s
https://cn.bing.com/search?g＝%s
https://www.so.com/s?q=%s
https://search.yahoo.com/search?p=%s
https://seeres.com/search?q=%s
#mobile
https://quark.sm.cn/s?q=%s
https://yz.m.sm.cn/s?q=%s
https://m.toutiao.com/result?q=%s
# Video
https://search.bilibili.com/all?keyword=%s
#Book
https://www.douban.com/search?q=%s
https://www.amazon.cn/s?k=%s&__mk_zh_CN=%E4%BA%9A%E9%A9%AC%E9%80%8A%E7%BD%91%E7%AB%99&ref=nb_sb_noss
# Question
https://www.zhihu.com/search?q=%s
#Translate
https://translate.google.cn/#view=home&op=translate&sl=auto&tl=zh-CN&text=%s
# Code
https://github.com/search?q=%s
#hackr.io
# Wiki
https://zh.wikipedia.org/zh-cn/%s
https://baike.baidu.com/search?&word=%s
https://wiki.mbalib.com/w/index.php?title=Special:Search&search=%s
#Emoji
https://emojipedia.org/search/?q=%s&utm_source=opensearch
```

### 触控板跟手
提高跟手程度只需要把动画时间和幅度变短就好。

- Chrome参数可以改为`200.0.20.80.8.50`；
- 火狐打开`about:config`标签页找到`general.smoothScroll.mouseWheel.durationMaxMS` `general.smoothScroll.mouseWheel.durationMinMS`这两个值，分别改为200和50即可。这个和Chrome参数前面的200和0相似.


### Extension

- **[视频弹出工具-Github](https://github.com/harytfw/popup-tool )**
- **[Translation]:** 
  -  **EdgeTranslate - 1.7.2** 及以下 -> [[移步]](https://github.com/EdgeTranslate/EdgeTranslate/blob/fftf/docs/wiki/zh_CN/%E8%87%B4%E7%81%AB%E7%8B%90%E7%94%A8%E6%88%B7.md)。
  -  **Saladict - 7.6** 及以下,Firefox 一直显示包下载是损坏的…
- **Video Speed Controller**
- **OneTab**
- **SmoothScroll**
- **沙拉查词-聚合词典划词翻译**
- **Copy as Plain Text**
- **Tampermonkey**
- 捕捉网页截图 
- Dark Reader
- XDown
- **购物党自动比价工具**
- **pakku：哔哩哔哩弹幕过滤器**
- No Per-Script Font!
- Font Rendering Enhancer
- Set Character Encoding
- 安全外壳 (SSH)
- **Vimium**
- Gitako - GitHub file tree
- Telegram Share
- floccus bookmarks sync

### Chrome
- `chrome://flags/`
  - Extensions Toolbar Menu -> Dis
  - Font Access APIs -> En

### Firefox

- ~~缩放比例~~: 两者现在都已经支持默认缩放比例了，上面的设置可以修改全局的CSS字体大小，如果是笔记本的话会很好用
  - `about:config :火狐标签页，修改配置`
  - `layout.css.devPixelsPerPx ：修改缩放比例`
- Ubuntu Support H5 Play
  - `sudo apt install ubuntu-restricted-extras`

## Typora

- 页边距：相关主题下的CSS里面搜索`write`找到`max-width`就是显示的页边距，自行调整
- [Word To MD](https://www.zhihu.com/question/24170089)
  - 在线工具：https://word2md.com/
   - 项目[源码](https://github.com/benbalter/word-to-markdown).
  - [Writage](http://www.writage.com/)插件

## Gmail & Outlook

众多邮箱手机客户端可以丝滑登录Google以及代收邮件，电脑端169收费。

> 据我们的技术说，gmail被屏蔽了，但是仍有一部分地址是漏网之鱼，可以通过这些地址来接收到墙外的邮件。因为只有少部分地址是可以用的，所以你们看现在号称能够接收gmail的客户端，大多都是手机的app，不开放电脑端是因为无法承受大流量的接入，会过载。

最后放弃Gmail, Foxmail客户端, 使用Outlook, 一个是长久易用, 一个是没有ADs.

### 第三方客户端的配置

Foxmail 里面有这样的选择:

> - POP3/SMTP服务
> - IMAP/SMTP服务 
> - Exchange服务
> - CardDAV/CalDAV服务

- [POP3(Post Office Protocol - Version 3)](https://baike.baidu.com/item/POP3), 属于TCP/IP协议, 提供Https加密后变成 POPS(学生邮箱好像不允许?), POP3协议改进POP, 端口号110, 服务器上的邮件不会在转发后删除.
- [IMAP(Internet/Interactive Mail Access Protocol)](https://baike.baidu.com/item/imap), 是一个应用层协议, 应用在 TCP/IP 协议之上, 斯坦福大学发明, 端口号143, 可以直接在客户端如对服务器的邮件进行操作.
- [SMTP(Simple Mail Transfer Protocol)](https://baike.baidu.com/item/SMTP), 建立在FTP基础上, 默认端口号25, 用于系统之间的邮件系统传输, 提供来信的通知, 而SMTP可以挂月网络传输邮件, 也可以通过中继器或网关进行邮件的处理.

> SMTP是一个“推”的协议，它不允许根据需要从远程服务器上“拉”来消息。要做到这点，邮件客户端必须使用POP3或IMAP。另一个SMTP服务器可以使用ETRN在SMTP上触发一个发送。

- [Exchange Server](https://www.zhihu.com/question/24605584/answer/112250597)是微软公司邮件服务组件。加入了一系列辅助功能(语音邮件、邮件过滤筛选、OWA(基于Web的电子邮件存取))
- [CardDAV/CalDAV](https://blog.csdn.net/qq_36731677/article/details/82956977): 前者是 远程地址簿信息访问（共享）协议, 用于客户端访问共享服务器上的联系人数据。后者是 允许客户端访问共享服务器上的日程信息。两者扩展了WebDav协议的规范， 并使用iCalendar格式的数据, 但是，国内的邮件系统基本不支持日程或者联系人的订阅服务. 

### Bugs

- 改名字可以参考另外一篇[博客](../210405-wechat-name-change).
- 在 Outlook 给 Outlook 已绑定登录方式的邮箱里发邮件最后会变为自己给自己发邮件, 尚且不清楚原因
- Outlook改变发送名字只可以通过修改账户信息得以实现...

## Deepin QQ & Wechat <sup>[4](#j4)</sup>

- **[Deepin-wine Github](https://github.com/wszqkzqk/deepin-wine-ubuntu)** 

因为采用Deepin前缀, 所以不会和 Wine 产生冲突

```bash
# deepin-wine容器
sudo apt install wget g+- git
git clone "https://gitee.com/wszqkzqk/deepin-wine-for-ubuntu.git" && cd deepin-wine && sudo ./install.sh
#  Wechat 的两个版本, 自己安装的是第二个 && 最后一个是解决微信无法查看发送图片问题
sudo wget "https://mirrors.huaweicloud.com/deepin/pool/non-free/d/deepin.com.wechat/deepin.com.wechat_2.6.8.65deepin0_i386.deb""https://gitee.com/wszqkzqk/deepin-wine-containers-for-ubuntu/raw/master/deepin.com.wechat_2.6.8.65deepin0_i386.deb"  && sudo dpkg -i *wechat*deb && apt install libjpeg62:i386
# QQ(推荐, 后者Emoji会出问题)
sudo wget "https://mirrors.aliyun.com/deepin/pool/non-free/d/deepin.com.qq.im/deepin.com.qq.im_9.1.8deepin0_i386.deb"  && sudo  dpkg -i *qq.im*deb
# Tim
sudo wget "https://mirrors.aliyun.com/deepin/pool/non-free/d/deepin.com.qq.office/deepin.com.qq.office_2.0.0deepin4_i386.deb" && sudo dpkg -i *qq.office*deb
```

### QQ Image Question
- 禁用IPV6......
```bash
sudo  vim /etc/sysctl.conf

# Add IPv6 disabled
net.ipv6.conf.all.disable_ipv6 =1
net.ipv6.conf.default.disable_ipv6 =1
net.ipv6.conf.lo.disable_ipv6 =1

sudo sysctl -p && sudo touch /etc/rc.local && sudo chmod 755 /etc/rc.local

#!/bin/bash
# /etc/rc.local
/etc/sysctl.d
/etc/init.d/procps restart
exit 0
```
- 解决托盘ICONS: https://extensions.gnome.org/extension/1031/topicons/

## FlameShot
UBUNTU 开机自启动:
```bash
gnome-session-properties
```

## Android & PC Transform Films

- **Telegram**
- **Xender** : http://www.xender.com/
- Send-anywhere : https://send-anywhere.com/
-  Portal: http://portal.pushbullet.com/
-  Reep. io : https://reep.io/
-  Snapdrop: https://snapdrop.net/
-  AirMore: http://airmore.com/
-  BT Sync: https://www.getsync.com/
-  file ai: https://fileai.com
-  Pushbullet: https://www.pushbullet.com/

## Ao 

### Proxy<sup>[5](#j5)</sup>

采用和VSCode 相同的技术开发--> Electronjs. 安装完成之后, 自然在走系统代理的时候出现了问题, 如无法登录微软账户的问题；根据 项目的 ISSUE [^21] 可以执行以修复登录问题.
```bash
ao --proxy-pac-url= XXXXX
```

### ShortCut

`.ao.json` 某字段:

```json
"add-due-date": "Ctrl+Shift+T",
"add-my-day": "Ctrl+K",
"complete-todo": "Ctrl+Shift+N",
"delete-list": "Ctrl+Shift+D",
"delete-todo": "Ctrl+D",
"global-create-todo": "Ctrl+Alt+C",
"global-search-todo": "Ctrl+Alt+F",
"global-toggle-window": "Ctrl+Alt+A",
"hide-todo": "Ctrl+Shift+H",
"important": "Ctrl+I",
"my-day": "Ctrl+M",
"new-list": "Ctrl+L",
"new-todo": "Ctrl+N",
"planned": "Ctrl+P",
"rename-list": "Ctrl+Y",
"rename-todo": "Ctrl+T",
"return": "Esc",
"set-reminder": "Ctrl+Shift+E",
"settings": "Ctrl+,",
"sign-out": "Ctrl+Alt+Q",
"tasks": "Ctrl+J",
"toggle-black-mode": "Ctrl+B",
"toggle-dark-mode": "Ctrl+H",
"toggle-sepia-mode": "Ctrl+G",
"toggle-sidebar": "Ctrl+O"
```

## VMware

### 触控板滑动
> 一个有趣的现象就是 **Ubuntu 默认触控板驱动不支持双指放大, 但是Win10 的触控板驱动的参数却可以传到 Vmare 中**.  

两种解决方法：
- 直接放弃滑动，改用上下左右控制界面也不是不可以，你说呢？
- 改用管理员的模式运行来获取触控板的参数.

### 处理器数和进程数
根据自己电脑的配置进行选择，首先百科`i5-9300H`的一些参数：
1.  处理器频率介于2.4和4.1 GHz之间，并且由于超线程，可同时执行多达8个线程 。
2.  英特尔酷睿i5-9300H的性能与较旧的酷睿i7-7920HQ（3.1 – 4.1 GHz）相似 。

## Terimal

### Powershell

> PowerShell 的 pipe 传递的是 .net object，而不是 raw 字符串，于是这就打开了一扇神奇的大门，因为 PowerShell 的一切组件都可以和谐地共存，彼此不用互相猜忌，不用猜你喂给我的数据合不合法，也不用担心我喂给你的参数格式对不对。大家共享一个 CLR，拥有丰富的 metadata，自由自在地在 .net 的世界里徜徉和探索......<sup>[6](#j6)</sup>
>

[More]:

1. [收集和分享 Windows PowerShell 相关教程,技术和最新动态](www.pstips.net)
2. [Chocolatey Packages Manager](www.chocolatey.org)

#### 命令行全局快捷键设置<sup>[7](#j7)</sup>

1. **[控制面板]** Win+R -> `control`
2. **[管理工具]** 加入应用快捷方式
3. 右键属性设置全局快捷键.

打开的速度应该还是有比较大的延迟, 但是可以代替 Ubuntu 下的坏习惯.

## Draw

喜欢画画, 但是只会画火柴人, 买不起 Ipad , 入了一个 Wocam 的板子. 回来后惯性地选择了外区 - 台湾的账号,  但部分功能是失去维护的.  最后因为体验不如国内转了回来,  总结以后硬件的使用还是以国内为主吧,  比如 Apple 这类当然选择外区是相对来说好些的,  但是数位板确实选择外区没有必要.

机型:

1. Wacom Intuos S
2. Wacom Intuos S 蓝牙版
3. Wacom Intuos M
4. Wacom Intuos M 蓝牙版

随机赠送的有软件(软体)有:

1. Corel® Painter® Essentials™ 7
2. Corel® Aftershot™ 3
3. UDM Paint Pro
4. 优动漫 Paint

一共四个软件.但是碍于经费预算以及品控还是选择了 CTL-672  型号的,  必须得感谢奖学金给我这次任性的机会,  一定要好好参加竞赛 ,未来赢回来这些陪我的东西.

### 驱动问题

无法和Wacome的驱动兼容,  造成的后果就是体验不如Firefox

### 墨迹的实现

墨迹的实现是依赖一张张图片的渲染合成实现的,目录通常是

```
%appdata%/Local/Temp/msohtmlclip1/01/clip imageoo1. gif)
```



## Adobe Software

| 名字                | 用途                                                         |
| ------------------- | ------------------------------------------------------------ |
| photoshop           | 图片制作、编辑、海报设计 界面设计、后期处理修饰              |
| Illustrator         | 插画设计 图像处理 印刷出版 网站页面制作                      |
| Adobe premiere      | 电影 电视 视频的剪辑、鬼畜视频制作                           |
| Adobe After Affects | 影视特效制作、视频视觉效果  网页动画 高度灵活的2d 3d红旗合成 |
| Adobe acrobat       | PDF文档创建 编辑 合并 转换 等                                |
| Adobe Dreamweaver   | 网页制作 所见所得                                            |
| Adobe InDesign      | 排版工具 广告设计 目录制作                                   |
| Adobe lightroom     | 摄影图片后期处理 批量编辑 整理、无损图片后期编辑 处理        |
| Adobe XD            | UX UI 设计平台、移动应用 网页设计\视觉感觉 交互设计 用户体验设计 |
| Adobe animate       | 动画制作 网页视频、flash开发 视频音频动漫创作                |
| Adobe audition      | 音频 混合 编辑 控制 效果处理、                               |
| Adobe spark         | 海报制作 社交平台常用尺寸模板 主题模板                       |

## 坚果云

- [Webdav Recommend](https://www.coolapk.com/feed/22408357?shareKey=ZjMyOWU2MzUxMmI4NWZlMzEzMjg~)

## RSS

详见[Rss](../rss/)

## LINK

- [App Store for Deepin (legacy codebase) | 深度应用商店](https://github.com/linuxdeepin/deepin-appstore) 
- [Deepin-Apps-Installation](https://github.com/Jactor-Sue/Deepin-Apps-Installation)
- [awesome-things](https://github.com/ctimbai/awesome-things)

## REFERNECE

<div id ="j1">[1]. https://stackoverflow.com/questions/21597536/pybluez-installation-in-linux </div>
<div id ="j2">[2]. http://www.keyxl.com/aaa4cff/235/VLC-keyboard-shortcuts.htm </div>
<div id ="j3">[3]. https://www.zhihu.com/question/20432630/answer/161256076 </div>
<div id ="j4">[4]. https://zhuanlan.zhihu.com/p/144286142 </div> 
<div id ="j5">[5]. https://github.com/klaussinani/ao/issues/94</div>
<div id ="j6">[6]. https://www.zhihu.com/question/22611859/answer/28897482</div>
<div id ="j7">[7]. https://www.jianshu.com/p/545e3f76eece</div>
<div id ="j8">[8]. https://www.worklifepsych.com/productivity-porn-a-distraction-in-plain-sight</div>

