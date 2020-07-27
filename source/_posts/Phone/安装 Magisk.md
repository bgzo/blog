Magisk - The Universal Systemless Interface, to create an altered mask of the system without changing the system itself.

[Magisk](https://forum.xda-developers.com/apps/magisk)

 has become popular in recent years as more Android features have been secured with Google’s [SafetyNet](https://forum.xda-developers.com/apps/magisk/guide-magisk-troubleshooting-t3641417/post73145987#post73145987) system. With Magisk (first developed by [topjohnwu](https://forum.xda-developers.com/member.php?u=4470081)

> ), you can have root and custom mods while still using services like  Google Pay. It works by leaving the system partition untouched and  modifying the boot partition. This is why it’s referred to as a**“systemless”**root method. It’s very easy to install once you have all the components in place.

## 安装 Magisk

**下载地址**：[xda 官方页面](https://forum.xda-developers.com/apps/magisk/official-magisk-v7-universal-systemless-t3473445)

**安装过程**：`进入custom recovery`-->`找到下载好的zip文件`-->`刷入`

**注意**：

- 以上我默认为你已经有了`custom recovery`（毕竟刷机必备）;
- 也有不通过第三方 recovery 的方法，`xda`上有介绍，有兴趣的可以自己尝试下；
- `xda`上的帖子把安装过程和注意事项都讲得很详细，自己尝试之前可以好好看看。

## Magisk 模块

以下是部分我正在用的模块:  
 [![img](data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAABS2lUWHRYTUw6Y29tLmFkb2JlLnhtcAAAAAAAPD94cGFja2V0IGJlZ2luPSLvu78iIGlkPSJXNU0wTXBDZWhpSHpyZVN6TlRjemtjOWQiPz4KPHg6eG1wbWV0YSB4bWxuczp4PSJhZG9iZTpuczptZXRhLyIgeDp4bXB0az0iQWRvYmUgWE1QIENvcmUgNS42LWMxMzggNzkuMTU5ODI0LCAyMDE2LzA5LzE0LTAxOjA5OjAxICAgICAgICAiPgogPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4KICA8cmRmOkRlc2NyaXB0aW9uIHJkZjphYm91dD0iIi8+CiA8L3JkZjpSREY+CjwveDp4bXBtZXRhPgo8P3hwYWNrZXQgZW5kPSJyIj8+IEmuOgAAAA1JREFUCJljePfx038ACXMD0ZVlJAYAAAAASUVORK5CYII=)](https://i.loli.net/2018/09/16/5b9e44c803ece.png)





**说明**：以下提到的模块若没有提供下载链接，则可以在`magisk manager`的`download`里面找到。

### 必备

#### Magisk Manager for Recovery Mode(mm)

用于在 recovery 中管理 Magisk 模块，若模块导致了严重问题可通过此方式删掉有问题模块。

**使用方法**：在 recovery 的终端中执行~~`/data/media/mm`~~ `sh /sdcard/mm`(2019.4.4 更新版本)。

#### Busybox for Android NDK

用于补充 Android 的 linux 指令集，不少应用需要这个，比如著名的`钛备份`。

### 功能增强

#### Tai Chi

**官网地址**：[太极](https://taichi.cool/README_CN.html)


**模块简介**：这是太极的 Magisk 模块，用来增强太极的功能。刷好模块后需安装太极 App，具体使用方法可参见[官方 Wiki](https://github.com/taichi-framework/TaiChi/wiki/如何使用)

，非常详细。  
**太极简介**：太极是一个能够运行 Xposed 模块的框架，模块能通过它改变系统和应用的行为。太极既能以传统的 Root/刷机方式运作，也能免 Root/ 免刷机运行。神器！

#### Location Report Enabler

**项目地址**：

- `Riru-Core`: [magisk-riru-core-arm-arm64 (zip, < 1MB)](https://github.com/RikkaApps/Riru/releases)

`Riru-Location Report Enabler`: [magisk-riru-location-report-enabler-arm-arm64 (zip, < 1MB)](https://github.com/RikkaApps/Riru-LocationReportEnabler/releases)

该模块用来开启 Location History，从而启用`Google Feed`等，之前也用一款`Location Report Enabler`应用且有`xposed`模块，`xposed 框架`更新缓慢，而 root 版据说会影响 volte，所以这 Magisk 版的到来解决了一大问题。

#### App Systemizer(Terminal Emulator)

该模块用来将第三方应用变为系统应用，需配合[Terminal Emulator](https://play.google.com/store/apps/details?id=jackpal.androidterm)

使用（可使用其他同类软件）。  
 [![img](data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAABS2lUWHRYTUw6Y29tLmFkb2JlLnhtcAAAAAAAPD94cGFja2V0IGJlZ2luPSLvu78iIGlkPSJXNU0wTXBDZWhpSHpyZVN6TlRjemtjOWQiPz4KPHg6eG1wbWV0YSB4bWxuczp4PSJhZG9iZTpuczptZXRhLyIgeDp4bXB0az0iQWRvYmUgWE1QIENvcmUgNS42LWMxMzggNzkuMTU5ODI0LCAyMDE2LzA5LzE0LTAxOjA5OjAxICAgICAgICAiPgogPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4KICA8cmRmOkRlc2NyaXB0aW9uIHJkZjphYm91dD0iIi8+CiA8L3JkZjpSREY+CjwveDp4bXBtZXRhPgo8P3hwYWNrZXQgZW5kPSJyIj8+IEmuOgAAAA1JREFUCJljePfx038ACXMD0ZVlJAYAAAAASUVORK5CYII=)](https://i.loli.net/2018/09/16/5b9e6699c65ce.jpg)





打开`Terminal Emulator`后依次输入以下命令`su` `systemize`, 然后按提示操作即可。

#### Debloater(Terminal Emulator)

该模块和上面的模块作用是相反的，用来卸载位于`/system`的应用，使用方法和`App Systemizer`类似，在`Terminal Emulator`中依次输入`su`、`debloat`即可看到选项表。

#### Energized Protection

- **官网**：https://energized.pro/index.html

- **简单介绍**：该模块主要用来去广告、阻止跟踪器、加速网页浏览、节省流量等作用，功能基本上类似于`adguard`、`adaway`。除了该模块外，官网上还提供了 Android 端（`non-root`、`adaway`方案）、Windows 端的 Energized Protection 方案，iOS、Linux、Mac 平台的方案也即将上线。具体可前往官网查看。
- **使用方法**：
  - 安装`Busybox for Android NDK`模块；
  - 进入 Magisk Manager 设置中打开`Systemless hosts`;
  - 进入`Terminal Emulator`后依次输入以下命令`su` `energized`，然后按照提示操作。（模块内的各命令的功能、分类以及脚本提示十分详细）。

**注意**：关于各个 pack 以及 extension 的介绍可以查看[官网介绍](https://energized.pro/#packs)

。对于 pack 来说，一共有 1-6 个 pack，包体积大小随数字递增，对机器的要求也越高，可以根据自己的机器性能水平进行选择。

#### Google Lens Enabler

**下载**：[DropMe(zip,11.4KB)](https://drop.me/oXz0Ly)

`Google lens`不少`ROM`都有，主要用这个模块来开启`google photos`的无限空间  
 [![img](data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAABS2lUWHRYTUw6Y29tLmFkb2JlLnhtcAAAAAAAPD94cGFja2V0IGJlZ2luPSLvu78iIGlkPSJXNU0wTXBDZWhpSHpyZVN6TlRjemtjOWQiPz4KPHg6eG1wbWV0YSB4bWxuczp4PSJhZG9iZTpuczptZXRhLyIgeDp4bXB0az0iQWRvYmUgWE1QIENvcmUgNS42LWMxMzggNzkuMTU5ODI0LCAyMDE2LzA5LzE0LTAxOjA5OjAxICAgICAgICAiPgogPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4KICA8cmRmOkRlc2NyaXB0aW9uIHJkZjphYm91dD0iIi8+CiA8L3JkZjpSREY+CjwveDp4bXBtZXRhPgo8P3hwYWNrZXQgZW5kPSJyIj8+IEmuOgAAAA1JREFUCJljePfx038ACXMD0ZVlJAYAAAAASUVORK5CYII=)](https://i.loli.net/2018/09/16/5b9e6eaae7dc8.jpg)





#### YouTube Vanced

我购买了`YouTube Premium`之后这个模块我就没用了，这个模块主要就是实现`YouTube Premium`的去广告、后台播放等功能，还加了暗色主题。

**注意**：

- 刷了这个模块后，要禁用或者卸载原版 YouTube；
- 还提供了 root 版和非 root 版，可以自己去[xda](https://forum.xda-developers.com/android/apps-games/app-youtube-vanced-edition-t3758757)

- 下载。

### 优化

**注意**：该部分模块慎用，若手机出现乱七八糟的问题可考虑先禁用这些模块来排查。同时，可能部分模块功能重复，可选择性地使用。

#### Sysconfig Patcher(sp)

该模块可以给`system/etc/sysconfig`打补丁，来实现对`Google Play Service`等应用的流量和耗电量的限制，打盹(`Doze`)也会对其生效。  
 [![img](data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAABS2lUWHRYTUw6Y29tLmFkb2JlLnhtcAAAAAAAPD94cGFja2V0IGJlZ2luPSLvu78iIGlkPSJXNU0wTXBDZWhpSHpyZVN6TlRjemtjOWQiPz4KPHg6eG1wbWV0YSB4bWxuczp4PSJhZG9iZTpuczptZXRhLyIgeDp4bXB0az0iQWRvYmUgWE1QIENvcmUgNS42LWMxMzggNzkuMTU5ODI0LCAyMDE2LzA5LzE0LTAxOjA5OjAxICAgICAgICAiPgogPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4KICA8cmRmOkRlc2NyaXB0aW9uIHJkZjphYm91dD0iIi8+CiA8L3JkZjpSREY+CjwveDp4bXBtZXRhPgo8P3hwYWNrZXQgZW5kPSJyIj8+IEmuOgAAAA1JREFUCJljePfx038ACXMD0ZVlJAYAAAAASUVORK5CYII=)](https://i.loli.net/2018/09/24/5ba89c9e701ed.jpg)




类似的模块有`Universal GMS Doze`。



#### LKT(legendary.kernel.tweaks)

`LKT`可以根据手机硬件来调整内核参数，从而在尽可能不影响性能的情况下达到最大的续航。

**兼容性**：

> Snapdragon 845  
> Snapdragon 835  
> Snapdragon 820-821  
> Snapdragon 810-808  
> Snapdragon 801-800-805  
> Snapdragon 660  
> Snapdragon 652-650  
> Snapdragon 636  
> Snapdragon 625-626  
> Snapdragon 615-616  
> Snapdragon 450  
> Snapdragon 435  
> Snapdragon 430  
> Snapdragon 425  
> Snapdragon 410-412  
> Snapdragon 400  
> Exynos 9810 (Samsung)  
> Exynos 8895 (Samsung)  
> Exynos 8890 (Samsung)  
> Exynos 7420 (Samsung)  
> Kirin 970 (Huawei)  
> Kirin 960 (Huawei)  
> Kirin 950-955 (Huawei)  
> kirin 650-655-658-659 (Huawei)  
> Helio x20-x25 (MT6797-MT6797T)  
> Helio x10 (MT6795-MT6795T)

**使用方法**：

- 刷入的时候会有操作提示，如没有特殊要求，两次操作提示都按音量上键即可。
- 也可以在`terminal`中使用`su`、`lkt`命令，按照提示切换**Profile**。

#### FDE.AI

该模块为 `All-in-One` 终极优化模块（感觉挺玄学，哈哈）。和 `LKT` 一样也会配置内核参数，也会对系统做一些优化。据称之后还会加入 AI 功能适应个人使用习惯以更好地优化内核和系统。

### 美化

#### ~~Pixel Experience~~ Pix3lify

> 该模块在 Magisk 仓库里已经找不到了，如有需要可以使用类似的`Pix3lify`。

这个模块可以将你的手机"变成"`pixel`，包括桌面、字体等，当然也包括`Google Lens Enabler`的作用。

类似的模块还有`Pix3lify`。

#### 筑紫 A 丸+Google Sans

**下载地址**：[Download(Zip, 41.59Mb)](https://drop.me/ogKJdJ)

（国外的文件托管服务，国内速度可能不是太好）

Magisk 里面有不少的字体模块，这个模块是将中文字体换成筑紫 A 丸，英文和数字字体换成 Google Sans。筑紫 A 丸由宁静之雨制作，更多中文字体可以关注他的微信公众号【宁静之雨】来获取。

**字体样式如图**：  
 [![img](data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAABS2lUWHRYTUw6Y29tLmFkb2JlLnhtcAAAAAAAPD94cGFja2V0IGJlZ2luPSLvu78iIGlkPSJXNU0wTXBDZWhpSHpyZVN6TlRjemtjOWQiPz4KPHg6eG1wbWV0YSB4bWxuczp4PSJhZG9iZTpuczptZXRhLyIgeDp4bXB0az0iQWRvYmUgWE1QIENvcmUgNS42LWMxMzggNzkuMTU5ODI0LCAyMDE2LzA5LzE0LTAxOjA5OjAxICAgICAgICAiPgogPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4KICA8cmRmOkRlc2NyaXB0aW9uIHJkZjphYm91dD0iIi8+CiA8L3JkZjpSREY+CjwveDp4bXBtZXRhPgo8P3hwYWNrZXQgZW5kPSJyIj8+IEmuOgAAAA1JREFUCJljePfx038ACXMD0ZVlJAYAAAAASUVORK5CYII=)](https://i.loli.net/2018/09/24/5ba8a8269e34b.jpg)





### 其他

有一些非常有名的但是我自己并没有使用，比如：

- `Greenify4Magisk`: 配合绿色守护使用；
- `ViPER4Android`、`Dolby Atmos`：都是用来调音效的；
- `XposedFramework`：Magisk 版 xposed 框架
- ······

更多的可以自己去`Downloads`里面看，有 telegram 的，推荐关注一个 telegram 频道[Magisk Modules](https://t.me/magiskmod)

，专门发 Magisk 模块。

欢迎指正和分享其他实用模块。