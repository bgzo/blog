---
title: "Android"
date: 2020-05-01T17:14:48+08:00
draft: true
dropcap: false
Tags:
- Android
---

Android 是一个由 Google 主导的移动设备开源系统, 根据Android开源项目(AOSP), 手机厂商可以创建定制的Android 操作系统版本, 将设备和配件移植到 Android 平台. 

<!--more-->

## CPU

CPU架构主要分为<sup>[10](#j10)[11](#j11)[12](#j12)</sup>:

- **ARMv5**：(armeabi)(废弃),使用软件浮点运算, 兼容所有ARM设备, 通用性强, 速度慢(只支持armeabi)
- **ARMv7**(2010+)：第7代 ARM v7, 使用硬件浮点运算, 具有高级扩展功能(支持 armeabi 和 armeabi-v7a)
- **x86**(2011+)：一般用于平板,支持armeabi(性能有所损耗), 多见于 intel atom 处理器
- **MIPS**(2012年):可能有些国产厂商在用(废弃)
- **ARMv8**：第8代, 高端机型,64位
  - **AArch32**: 32bit
  - **AArch64**: 64bit(支持 armeabi-v7a、armeabi 和 arm64-v8a)
- **MIPS64**(64位)
- **x86_64**(2014+)：64位平板

## ANDROID DEV

- [LearningNotes|Enjoy Learning.](https://github.com/francistao/LearningNotes)
- [AndroidInterview-Q-A|The top Internet companies android interview questions and answers](https://github.com/JackyAndroid/AndroidInterview-Q-A)
- [android|Smartisan open source code for full build.(repo manifest xml)](https://github.com/SmartisanTech/android)
- [Markwon|Android markdown library (no WebView)](https://github.com/noties/Markwon)
- [WeiXinMPSDK](https://github.com/JeffreySu/WeiXinMPSDK)
- [](https://github.com/coder-pig/Android-Storage-Box)

......

## PHONE

### MIUI DIY

魔改必须要Root, 灰色地带的 Root 可以薅一些隐藏的羊毛, Nice! MIUI Root的两个条件：**[MI FLash](https://lanzous.com/id0jgad)解BL锁**,  + 开发版及以上/系统支持(虚拟)机, OV厂的手机可以退而求其次用虚拟机. IPhone用户越狱可以用 **[[Checkra1n](https://checkra.in/)]**

MIUI有两种刷机方式.线刷(`.gz`)和 卡刷(`.zip`), 两种刷机方式不兼容, 各有各的包, 如今线刷包越来越少, 官方卡版本, 不循序进行降级操作, 卡刷包同样无法降级, 只能在开机的时候才可以刷入. 如果将卡刷包刷入线刷后会报错:`“couldn't find script”`.<sup>[1](#j1)</sup>. 官方也有对应的教程. 如[通用线刷教程](http://www.miui.com/shuaji-393.html), [小米手机刷机教程(高通机型)](https://www.xiaomi.cn/post/5326872)

#### MIUI REPO
- [MIUI官方ROM仓库](https://roms.miuier.com/weekly/)
- [台湾镜像](https://mirom.ezbox.idv.tw/)

#### Recovery--TWRP

刷第三方Recovery: TeamWin Recovery Project; **全触控操作 + 操作便捷**(同等对比下的 CWM )

> 用CWM双清或者三清甚至是四清, 是一件很麻烦很痛苦的事情, 因为你要一个一个点, 非常不方便, 这时TWRP方便的地方就体现出来了, TWRP可以勾选多个选项, 一次性完成工作, 不需要一个一个清(当然如果你愿意, 一个一个清也是可以的)在刷机的时候, 可不单单只刷rom, 可能我还要刷补丁, 刷Gapps, 刷内核, 刷什么乱七八糟各种玩意儿, 这时用CWM又十分蛋疼了, 乖乖的一个一个选, 一个一个刷进去吧, 而TWRP也可以一次性选择多个包, 自动按顺序帮你刷进去, 十分方便. <sup>[2](#j2)</sup>

#### Magisk
> 随着SuperSu (XDA非常著名的开发者ChainFire维护的一款作品) 走向商业化(很久没有更新), 安卓5.0之后, 谷歌封堵了大量的漏洞, 一些以商业化模式运作的各种所谓的一键ROOT工具全都玩完!, 这些东西相对来说还非常危险, 因为基本任何商业化或者第三方机构给出的超级用户管理工具, 都等于是把你的手机变成别人的了, 甚至他们还可以比流氓还流氓!. 而SuperSU不一样, 它一直是保持着非商业化运作, 并且更新非常积极, 但遗憾的是在2017年10月, 开发者ChainFire发布声明不再参与维护SU, 好像是把SuperSU卖给了中国的一家商业化运作的公司, 自此更新节奏非常缓慢, 目前SuperSU已经不能实现安卓O(8.0)以上更高版本的ROOT了, 而取代这一切的, 是Magisk. Magisk 是一位中国台湾的学生 @topjohnwu 开发的 Android 框架, 它不但可以获取Root权限, 而且支持Magisk模块. 其第一个版本发布于2016年8月,  由于当时Magisk刚刚出现, 支持的模块并不多, 且SuperSu依然流行, Magisk还鲜为人知. 直到SuperSu的消亡, 人们才想起Magisk, 此后Magisk迅速流行起来, 成为每一个玩机爱好者的必备工具. <sup>[3](#j3)</sup>

- **原理** : Magisk 则另辟蹊径, 通过挂载一个与系统文件相隔离的文件系统来加载自定义内容, 为系统分区打开了一个通往平行世界的入口, 所有改动都只在那个世界(Magisk 分区)里发生, 并不直接修改系统分区, 这样大大减小了Magisk的变砖概率, 而且就算变砖也可以通过卸载Magisk来恢复原来的系统分区. 比如我们的/system/xbin中没有su, 我们可以通过刷入相应的模块, 在系统启动初期, 将su映射到/system/xbin下来获取root.
- 使用教程:
  1. 通过rec刷入Magisk(推荐)
  2. 直接安装(需要Root权限)(系统版本小于Android P, 你可能需要先解锁系统分区)
  3. 通过修补boot安装 (选中Rom解压后的boot.img, 并在rec中直接刷入修补后的boot文件. )
  4. 详见: 
      1. [教程](https://www.coolapk.com/feed/17697847?shareKey=ODg2YmRkZmRiNGRmNWY0NTExMTQ~)
      2. [**救砖**](https://mp.weixin.qq.com/s/Os8j55GNmazqSt2UYrwy1g)


#### Xposed/Taiji

> Magisk的原理简单的说就是在系统boot时将其img挂载到自己的分区下, 构建一个虚拟文件系统, 和system分区无关, 以不修改系统文件为前提, 从而达到修改系统文件的效果. 通过这种方式绕过谷歌安全机制, 系统OTA升级, 部分"被禁"软件都可以正常使用. 而Xposed相反, 框架一旦被加载就会修改系统, 改动会影响在安全机制保护下的APP, 所以一些理财软件,比如某某银行可能就无法使用, 这些应用对root权限非常敏感. 总的来说Magisk是通过systemless方式获取root, xposed则需要root才可以工作. 所以magisk虽然集合了各种功能, 但延展性上不如Xposed, 两者虽有一些相似之处, 但本质上完全不同, Magisk是创建新的分区而Xposed是直接修改系统文件. 现在最好的结果就是二者相辅相成, 按自己需要. <sup>[4](#j4)</sup>

- **Xpose**: Xposed框架的原理就是替换安卓系统的app_process文件, 从而实现对系统的接管, 通过回调模块的方式来达到不用修改APK就能改变其表现行为的目的. 用通俗的话来说就是是在任意进程启动之前, 能加载特定Xposed模块的代码, 从而控制任意进程的行为. 这些特定的Xposed模块, 能在App进程启动之前执行特定代码. app_process其实是存放在systen/bin目录下的一个程序, 其作用就是启动zygote, 在Android中, zygote是整个系统创建新进程的核心进程. Xposed框架Hook了核心进程Zygote, 而其他应用启动都是从Zygote进程fork而来, 就够达到针对系统上所有的应用程序进程的Hook. 举个例子, 比如很著名的某微信模块, 就是你在启动微信之前, 首先要运行模块内的一些脚本, 这些脚本会劫持微信这个APP里的所有行为, 所以最终能够实现微信内容防撤回, 自定义微信摇骰子和石头剪刀布. 
- **Taiji**: 详见[Taiji](https://github.com/taichi-framework/TaiChi) [Doc](https://taichi.cool/), 更加稳定.<sup>[5](#j5)</sup>
- **MODULE**:
  - [QNotified|QQ辅助性功能增强](https://github.com/ferredoxin/QNotified)
  - [Zhiliao|知乎去广告Xposed模块](https://github.com/shatyuka/Zhiliao)
  - [ChiMi|MIUI扩展插件(xposed)](https://github.com/yonghen/chimi-)
  - [其他](https://repo.xposed.info/module-overview)


### SCREEN 

- 光学胶
- 纯原触摸

| 外屏技术                     | 特点                                                        |
| ---------------------------- | ----------------------------------------------------------- |
| incell贴合技术屏幕——玻璃盖板 | (IPhone 6Plus)LCD ：背光, 比较贵                          |
| G+F贴合技术屏幕触摸屏(TP)  | (华为畅享)外挂触摸, 液晶, 屏幕厚, 触摸功能片              |
| OGS贴合技术                  | (小米4)屏幕薄、特别脆, 外屏损伤一点就不可用, 触摸(涂层) |

**注意**: 后两者容易出现的问题：IC过大, 电流乱跳不准、纯元触摸、跳触

### GOOGLE MOBILE SERVICES

> 2018年7月, 欧盟在对 Google 相关问题进行调查之后, 欧盟对谷歌处以创纪录规模的反垄断罚款, 金额将高达43亿欧元(50亿美元). 欧盟指责谷歌通过滥用其 Android 市场的主导地位, 而将自家的搜索引擎和 Chrome 应用程序捆绑到操作系统中. Google 可不吃这亏, 羊毛出在羊身上, Google 进行了反制. 2019年2月1日开始, 对欧盟手机厂商进行收费, 安装 GMS 的每台设备收 40 美元的授权费. <sup>[6](#j6)</sup>


GMS, Google应用程序和[API](https://developers.google.com/android/guides/overview)的集合.<sup>[7](#j7)</sup> 一般的用途有:

- GMS为Android上Google公司的系列应用程序提供支持. 
  - GMail.
  - Earth.
  - Play.
- Android 系统的基础框架. **虽然Android 开源, 但 GMS 仍须取得谷歌的授权**. GMS包括Google Map、Gmail、YouTube等应用, 以及应用商店Google Play, 要使用就必须获得谷歌的同意与授权, 而且不得随意修改. 

- DiFF: SMS, EMS, MMS<sup>[9](#j9)</sup>
  - SMS: Short Messaging Service, 短消息服务, 最多达160个字节, 与大约1秒钟的语音呼叫所占用的空间相当. 消息的传输总是由处于GSM外部的SMSC(Short Messaging Service Center, 短消息服务中心)进行中继, 与电子邮件类似, SMS短信只与用户终端和SMSC有关. 大家熟知的GSM及以后的网络都对SMS提供了支持. 
  - EMS: Enhanced Message Service, 增强短信业务, SMS的增强版本, 除文本外, 可发简单的图像、声音和动画等信息. 当时已有的MMS需要GPRS网络或CDMA 2000 1X(2.5G网络)普及的限制, SMS是作为一个从SMS到MMS过渡的版本而设计. EMS在GSM网络就可以发送, 应该说是在2G网络向2.5G网络过渡的一项不错的技术. 对EMS的支持需改动最大的是运营商的计费系统, 因为图像、声音和动画等所占用的字数可能相差很大, 运营商需要仔细衡量. 
  - MMS: Multimedia Messaging Service, 多媒体短信业务, 这项业务是根据3GPP和WAP论坛的标准制定的. 用术语讲多媒体短信业务是在GPRS网络或cdma2000 1X网络的支持下, 以WAP无线应用协议为载体传送视频片段、图片、声音和文字. 支持语音、因特网浏览、电子邮件、会议电视等多种高速数据业务, 实现即时的手机端到端、手机终端到互联网或互联网到手机终端的多媒体信息传送. 这种业务的出现可以替代部分电子邮件的功能, 可以作为明信片的电子版, 提供的服务内容极为丰富. 这种业务发展的最大障碍是目前2.5G网络速度的限制, 网络速度慢直接导致了资费过高, 虽然价格已经下降很多, 但仍然是大多数用户不能承受的. 

## Software

国内软件大多走双标的路线. 开拓海外市场的 app 出了两个版本(国内版/国际版). 国际版上架 Goolge Play , 接受 Google 审核的版本, 所以上架 Google Play 的 app 软件包总是容量偏小, 而且基本没有需要获取用户隐私的流氓行为. 国内版就不然了. 

中意的软件:
- [vtools](https://github.com/helloklf/vtools): Sence.
- [Termux](https://github.com/termux/termux-app): **0.90及以上** 版本需要 **Android7.0 及以上版本的系统**. 此安装包由 **F-Droid 编译并签名**, 且**保证与此源代码 tarball 保持一致**. 
- [kiwibrowser/src](https://github.com/kiwibrowser/src).

### Weread
- 下载书的目录: `/data/data/com.tencent.weread/databases/210837723/books/database`

### EMULATOR

推荐:
- BlueStack
- 海马王技术
> virtualbox+androidx86+intel libhoudini+host渲染加速
>
> **virtualbox解决emulator载体问题**, 
> **android x86**使得guest是x86架构, 在系统层面确保gust host架构相同, 免除指令模拟, 
> **intel libhoudini** 是intel提供的免费但不开源arm to x86指令翻译工具, 这个工具使得只提供了arm so的app在emulator成为可行且性能不错(由于不开源, 不知道翻译是发生在哪个阶段, 但我猜是运行时动态翻译, 文档显示翻译后性能接近直接跑x86指令, 实测的确如此！)
> **host渲染加速**基本原理是, 在guesthost间建立一条高速数据传输通道, 将guest端渲染命令打包传给host端, host端解包再执行命令, 最后把结果返回, 注意, 这里很多时候是要求同步的, 这也是为什么强调通道必须高速. 另外, 别说我为何知道这些细节, 因为我正在做这玩意！(?????说了我也不太了解,++)
- [Linux]XDroid

卡的原因<sup>[8](#j8)</sup>: 

1. Intel X86/64 上无法运行 ARM, 所以采用模拟, 模拟带来的时间损耗是数量级的. 利用QEMU转x86解释执行, 效率远低于hyper-v的x86硬件虚拟化. 
 > 这不同于virtualbox里跑linux, guest指令几乎不用模拟直接在host cpu上执行(?????) 
2. 渲染软实现, 没有 Host 端硬件加速.

对比iOS: 模拟了一个运行iOS环境的虚拟机, 所有iOS代码compiled之后都可以mac-native的速度运行. 而QE模拟了包括storage system, screen在内的几乎所有的硬件. 


#### Method
1. 保存emulator的snapshot, 具体在AVD manager中勾选 "Store a snapshot for faster startup"；
2. 使用硬件加速, 比如你在使用的电脑是基于x86架构的, 而你需要模拟的android设备也是x86架构的, 那么使用硬件加速可以很大的提升emulator的速度, 此时你需要安装 Intel’s Hardware Accelerated Execution Manager (HAXM)；


## ANDROID VS IOS


1. **硬件角度**: 
   1. CPU方面, 两者CPU型号分别为：A7和MSM8974. MSM8974拥有4核, 单核频率最高可达2.3GHz, 相比A7拥有2核, 最高频率为1.4GHz. 所以, 就单纯的CPU计算能力来讲, MSM8974要优于A7, 毕竟它单核频率比A7要高很多. 另外, 由于MSM8974有4核, 因此它处理多线程并发能力要强于A7. 工艺方面, 两者拥有相同的28nm制程, 但MSM8974频率高, 核心多, 所以密集计算情况下, 它的功耗和发热量应该要比A7高. 从CPU的Cache方面看, A7拥有64KB+64KB的L1 Cache, 1MB L2 Cache和4MB L3 Cache；相比较, MSM8974在这方面要差得多, 相信是为了节约成本, 仅仅配置了16KB+16KB L1 Cache, 2MB L2 Cache, 且没有L3 Cache. 如此小的Cache, 在实际运行过程中, 肯定会发生大量Cache Miss, 这就会导致CPU常常在“等待”外围IO(如内存), 从而白白浪费了CPU的高速计算能力. MSM8974在Cache的配置上, 犹如V8引擎的跑车, 却配置了一套四速变速箱, 让人无语. 
   2. GPU方面, A7集成PowerVR G6430 GPU, 而MSM8974集成了Adreno 330 GPU. 根据资料, G6430的图形处理性能GFLOPS为166.4-249.6, 而Adreno 330的图形处理性能GFLOPS仅为129.6-158.4. 所以, PowerVR G6430的图形性能要明显优于Adreno 330. 
   3. 内存(运存)方面, 设备配置的内存越大, 表示操作系统允许更多的应用程序驻留内存, 在不同的应用程序之间切换会更顺畅. 而且, 每个应用程序允许使用的内存也会越大, 相对来说会更流畅. 这方面Nexus的2GB内存要占优. 
2. **操作系统角度**: Apple IOS, apple开发的移动设备操作系统. IOS的内核使用的是darwin os, 该内核与linux的宏内核操作系统不同, 是一个类似于windows的混合型内核. 有点类型微内核的感觉, 不过就性能而言, 与Linux相比应该没有什么优势. 但是, 因为ios的应用程序是使用objective c编码, 最终被直接编译为ARM指令集. 因此, 在实际设备运行过程中, 应用程序相当于直接在CPU上运行, 避免了虚拟机的指令翻译开销, 所以ios的应用程序执行效率相比android要高. Google Android, 是基于Linux操作系统的一个应用程序框架. 它大致由以下几个组件组成：Linux内核、Android运行库、通用组件库、应用程序框架和应用程序本身. 最终的用户应用程序均运行在一个个隔离的“沙箱”环境中, 彼此隔离. 其中, 最重要的是, Android应用程序的指令不是机器指令, 而是dalvik虚拟机指令. 也就是说, Android提供了一个Dalvik虚拟机, 将Android应用程序的dalvik指令翻译成最终的arm机器指令. 这中间虚拟机的翻译过程是有性能损耗的. 
3. **应用程序角度**: IOS禁止应用程序在后台运行, 所有切换到后台的应用程序被操作系统自动休眠, 只有前台程序可以占用CPU；相比较, Android就开放得多, 它运行应用程序任意创建后台服务Service, 所有Service都可以在后台任意占用CPU和内存. 因此, 当Android安装的应用程序越来越多, 且应用程序毫无节制地创建后台服务的话, 系统前台应用就被迫和越来越多的后台服务共享CPU资源, 从而拖慢了整个系统的速度. 也不能说Android这种真正的多任务模式不好, 它是一把双刃剑, 给应用程序更广阔的发挥空间的前提下, 也给了应用程序滥用CPU的权限. 因此, 从这方面讲, IOS更有利于应用程序发挥流畅性, 但代价是应用程序无法再后台工作；Android更有利于发挥应用程序功能, 例如后台收离线消息, 后台下载等应用. 
4. 从**屏幕分辨率**来看, IOS只有有限几种分辨率, 最高也就1136*640, 都没有达到1080P全高清的级别. 比较而言, Nexus5的分辨率达到了1080*1920全高清级别. 为此, 应用程序需要更多资源来渲染图像, 比较而言, IOS的应用程序就可以更容易达到流畅的帧数；但Nexus5的屏幕则可以达到更锐利, 更清晰的图像. 



![](https://z3.ax1x.com/2021/06/28/RNt0kn.png)

<div id="j1">[1]. https://www.mobile01.com/topicdetail.php?f=634&t=5994087</div>
<div id="j2">[2]. http://www.oneplusbbs.com/thread-942394-1-1.html</div>
<div id="j3">[3]. https://www.coolapk.com/feed/17973123?shareKey=OTliMmY4NTlkMWNkNWY0NTExYTQ~</div>
<div id="j4">[4]. https://www.coolapk.com/feed/19489640?shareKey=MDUzNjMzMzk2ZTVmNWY0NTExNTA~</div>
<div id="j5">[5]. https://www.zhihu.com/question/316497403</div>
<div id="j6">[6]. https://www.sohu.com/a/315171197_114986</div>
<div id="j7">[7]. https://zhuanlan.zhihu.com/p/66478028</div>
<div id="j8">[8]. https://www.zhihu.com/question/33423859/answer/57133469</div>
<div id="j9">[9]. https://zhidao.baidu.com/question/21473984</div>
<div id="j10">[10]. https://blog.csdn.net/tony_vip/article/details/105889734</div>
<div id="j11">[11]. https://blog.csdn.net/u012505617/article/details/89205642</div>
<div id="j12">[12]. https://www.zhihu.com/question/63627218</div>
