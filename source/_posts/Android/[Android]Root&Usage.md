---
title: '[Phone&Android] Root&Usage'
date: 2020-05-26 15:00:00
toc: true
---

> 我相信 Root/越狱 是手机的很重要的角色，也相信未来的矛头一定会转向 Root/越狱 这一项技术，同时相信未来更多的会是OV蓝厂那样对内核做手脚的厂商。而事实上，小米和一众国产厂商早已经开始做了。
>
> <center>……</center>
>
> 因为是灰色地带，所以有许多未被发掘的东西。暂时开一个小小的博客空间记录自己折腾历程。

</br>

### 0x00 Proface

记录一下自己搞机的过程。

MIUI Root的两个条件：**BL锁** + 开发版及以上（系统支持 —— 意思是OV请换（虚拟）机）

</br>

</br>

### 0x01 Rec

**[MI FLash]：** https://lanzous.com/id0jgad

**[Magisk]（Android Root）：**

**[Checkra1n]（IPhone越狱）：**https://checkra.in/

**[Syslock]：**

**[Termux]：**

**[ES文件浏览器]：**https://lanzous.com/icwfepi

**[MT管理器]：**

**[KWGT]：**

**[网络速度]：** https://lanzous.com/ibskluf

**[全局负一屏]：**

<br><br>

### 0x02 Usage

#### 2.1 朴厂商

如果手机厂商和其他大常合作做出来些共赢的功能模块，我想处于灰色地带的Root用户会用这个软件来方便自己的生活，譬如我。甚至用系统API来薅羊毛也是有可能的，当然只希望止步于部分爱搞机的群体来使用这部分，或者说，正是爱搞机的这部分人的灵活运用带来了实际生活上的部分便利。用我现在的心情来说的话就是：属实万幸！

</br>

#### 2.2 刷第三方Recovery

**[来源]：** http://www.oneplusbbs.com/thread-942394-1-1.html

网上查了一圈，一致地推荐第三方Recovery —— **TWRP**（TeamWin Recovery Project）

理由是：全触控操作 + 操作便捷（同等对比下的 CWM ）

> 用CWM双清或者三清甚至是四清，是一件很麻烦很痛苦的事情，因为你要一个一个点，非常不方便，这时TWRP方便的地方就体现出来了，TWRP可以勾选多个选项，一次性完成工作，不需要一个一个清（当然如果你愿意，一个一个清也是可以的）
>
> 在刷机的时候，可不单单只刷rom，可能我还要刷补丁，刷Gapps，刷内核，刷什么乱七八糟各种玩意儿，这时用CWM又十分蛋疼了，乖乖的一个一个选，一个一个刷进去吧，而TWRP也可以一次性选择多个包，自动按顺序帮你刷进去，十分方便。



</br>

</br>

### 0x03 History

#### Magisk





#### Termux

**[Github-Address]：** https://github.com/termux/termux-app

**0.90及以上** 版本需要 **Android7.0 及以上版本的系统**。此安装包由 **F-Droid 编译并签名**，且**保证与此源代码 tarball 保持一致**。







### 0x04 Wiki

Android 是一个适用于移动设备的开源操作系统，也是由 Google 主导的对应开源项目。根据Android 开源项目 (AOSP)，手机厂商可以创建定制的Android 操作系统版本，将设备和配件移植到 Android 平台。

</br>

#### Google GMS

**[来源]：**https://zhuanlan.zhihu.com/p/66478028

GMS（Google Mobile Services），Google应用程序和[API](https://link.zhihu.com/?target=https%3A//developers.google.com/android/guides/overview)的集合，跨设备的无缝协作，用户体验UP。

那么 GMS 到底干嘛用的？

1. GMS为Android上Google公司的系列应用程序提供支持。

   **GMail**：5 GB的免费存储空间，可同步手机和计算机间设置。

   **Google Earth**：提供了世界上几乎每一个城市深入准确的地图。，给出地球/卫星/街景等多种视图，允许自定义地图被保存在谷歌账户，和后来的所有设备同步。

   **Google Play**：Android平台应用软件及商品的Google官方市场。

2. 海外Android 平台发布的App严重依赖GMS，甚至很多App没有GMS就无法运行（可通过刷机获取）

   > “海外App即使通过华为商店等途径安装了，也无法运行。即使你自己安装上了，也会提示你‘缺少GMS组件，无法运行’。”
   >
   > [搜狐 - 谷歌构建安卓王国 ，一家独大引担忧](https://www.sohu.com/a/315171197_114986?scm=1002.590044.0.2744-aa)

3. 即 GMS 是 Android 系统的基础框架。



虽然Android 开源，但 GMS 仍须取得谷歌的授权。GMS包括Google Map、Gmail、YouTube等应用，以及应用商店Google Play，要使用就必须获得谷歌的同意与授权，而且不得随意修改。

> 2018年7月，欧盟在对 Google 相关问题进行调查之后，欧盟对谷歌处以创纪录规模的反垄断罚款，金额将高达 43  亿欧元（50亿美元）。欧盟指责谷歌通过滥用其 Android 市场的主导地位，而将自家的搜索引擎和 Chrome 应用程序捆绑到操作系统中。
>
> Google 可不吃这亏，羊毛出在羊身上，Google 进行了反制。2019年2月1日开始，对欧盟手机厂商进行收费，安装 GMS 的每台设备收 40 美元的授权费。

<center>国内  <===>  国外</center>
从左到右就是双标的路线。

> 大多数开拓海外市场的 app 出了两个版本，一个国内版，一个国际版。国际版上架 Goolge Play ，接受 Google 审核的版本，所以上架 Google Play 的 app 软件包总是容量偏小，而且基本没有需要获取用户隐私的流氓行为。国内版就不然了。

从右到左请付钱解决。

</br>

</br>

#### CPU 架构

aarch64

arm

×86_64

×86

Sig





### 0x05 Afterwards

> 真的很想吐槽，初中的时候人人都用安卓模拟器，安卓模拟器处于飞速发展的状态，但是0202年了，都TM开始用  **Android Studio** 了**？！** 几年前的帖子什么 **“用安卓模拟器还好意思到XXX平台发教程”** .....什么的，而我还在奔波于寻找哪个安卓模拟器支持 **Android 7.0** 。真的惭愧，说句心里话，自闭了，一个高中整得好像和时代脱轨了？？真的难以抑制心中的落差……











<br><br>