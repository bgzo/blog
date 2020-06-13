---
title: '[Win10] Config'
date: 2020-04-03 10:21:21
toc: true
---

<center><font size =2 color=grey>Create Date: 2020-02-05 04:22:00</font></center>
</br>

## 0x00 Proface

> MicrosoftWindows操作系统是美国微软公司研发的一套操作系统，问世于1985年，起初仅仅是**Microsoft-DOS**模拟环境，后续的系统版本由于微软不断的更新升级，不但易用，也当前应用最广泛的操作系统。 Windows采用了**图形化模式GUI**，比起从前的Dos需要输入指令使用的方式，更为人性化。随着计算机硬件和软件的不断升级，微软的  Windows也在不断升级，从架构的16位、32位再到64位,系统版本从最初的 Windows1.0到大家熟知的 Windows95、  Windows98、 Windows2000、 Windows XP、 Windows Vista、  Windows7、Windows8、Windows8.1、Windows 10和 Windows  Server服务器企业级操作系统，不断持续更新，微软一直在致力于Windows操作系统的开发和完善。

</br>

## 0x01 Decoration 

使用类Macbook的[Dock](https://www.mydockfinder.com/),或者使用RocketDock插件.💻 

</br>

## 0x02 Application 

一切的操作，只是为了让自己走出去，如果你不希望自己花太多时间在磨刀上，那就请把问题聚焦在解决问题上。

> Do you know what I mean?
>
> " 尽量减少个性化设置！"

### 2.1 Youdao Note

打开自己有道云的安装路径下的这个文件：`\Youdao\YoudaoNote\theme\default\skin.xml`开始编辑。后`Ctrl+F`搜索`PanelAd`把`PanelAd Bounds`的值`0.0.0.0`(修改之前记得提前做好备份……)，

```html
<PanelAd Bounds="0,0,0,161" DockStyle="bottom"></PanelAd>
```

完成……

~~<font size =1>[吐槽]:从小米便签的编辑功能到它的待办功能，只做差不多的小米生态彻底失望了。便签反馈了三年，开卡了三年无果，真的只剩下骂街了，可能是受众小的缘故吧。待办换Microsoft的TODO，笔记换来换去还是有道云的吧，**排版的方式多、直接暴力保存网页，想要的内容点点手指就可以、关键是公司相比较靠谱……**说起来生态，又有一个经济学原理验证了——“科斯定律“，也可能我没必要要求一个手机公司在应用生态方面做的和高三个层次的Apple相比。</font>~~

</br>

### 2.2 Firefox&Chrome

#### 2.2.1 缩放比例

~~about:config :火狐标签页，修改配置~~

~~layout.css.devPixelsPerPx ：修改缩放比例~~

两者现在都已经支持默认缩放比例了，上面的设置可以修改全局的字体大小，如果是笔记本的话会很好用

</br>

#### 2.2.2 跟手程度

提高跟手程度只需要把动画时间和幅度变短就好。

像Chrome参数可以改为`200.0.20.80.8.50`；火狐打开`about:config`标签页找到`general.smoothScroll.mouseWheel.durationMaxMS
general.smoothScroll.mouseWheel.durationMinMS`这两个值，分别改为200和50即可。这个和Chrome参数前面的200和0相似，更多的细节还在Firefox的开发[源码](https://developer.mozilla.org/zh-CN/docs/Mozilla/Developer_guide/Source_Code/Downloading_Source_Archives)中，这里不再涉及。

</br>

#### 2.2.3  (^_−)☆搜索引擎入口

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

</br>

#### 2.2.4 Install SPI (火狐插件)

 **[视频弹窗]：**

详见拓展**[[视频弹出工具-Github](https://github.com/harytfw/popup-tool )]**

</br>

**[侧边翻译]:** 

1. **EdgeTranslate - 1.7.2** 及以下，详情请[[移步]](https://github.com/EdgeTranslate/EdgeTranslate/blob/fftf/docs/wiki/zh_CN/%E8%87%B4%E7%81%AB%E7%8B%90%E7%94%A8%E6%88%B7.md)。
2. **Saladict - 7.6** 及以下,Firefox 一直显示包下载是损坏的……

### 2.3 Typera
页边距：主题下的CSS里面搜索`write`找到`max-width`就是显示的页边距，自行调整

</br>

### 2.4 Gmail国内代收

众多邮箱手机客户端可以丝滑登录Google以及代收邮件，电脑端169收费。

> 据我们的技术说，gmail被屏蔽了，但是仍有一部分地址是漏网之鱼，可以通过这些地址来接收到墙外的邮件。因为只有少部分地址是可以用的，所以你们看现在号称能够接收gmail的客户端，大多都是手机的app，不开放电脑端是因为无法承受大流量的接入，会过载。

</br>

### 2.5 VSCode使用

Emmmmmm……

</br>

### 2.6 Word To MD

1. 在线工具：https://word2md.com/
   + 项目[源码](https://github.com/benbalter/word-to-markdown).
2. [Writage](http://www.writage.com/)插件

[参考]：https://www.zhihu.com/question/24170089

</br>

### 2.7 VMware

</br>

####  2.7.1 触控板滑动

两种解决方法：

1. 朴实的做法，直接放弃滑动，改用上下左右控制界面也不是不可以，你说呢？
2. 这个是属于强迫症的做法：

</br>

#### 2.7.2 处理器数和进程数

根据自己电脑的配置进行选择，首先百科`i5-9300H`的一些参数：
1.  处理器频率介于2.4和4.1 GHz之间，并且由于超线程，可同时执行多达8个线程 。
2.  英特尔酷睿i5-9300H的性能与较旧的酷睿i7-7920HQ（3.1 – 4.1 GHz）相似 。

</br>

### 2.8  添加右键命令行

**[源码来源]**：[CSDN  -  Win10添加右键打开cmd和Powershell窗口（管理员/非管理员）](https://blog.csdn.net/cxrsdn/article/details/84538767)

详细的教程可以参考上面的链接！

```shell
Windows Registry Editor Version 5.00

; 若原先有，先删除原来的
[-HKEY_CLASSES_ROOT\Directory\Background\shell\OpenCmdHere]
[-HKEY_CLASSES_ROOT\Directory\Background\shell\runas]
[-HKEY_CLASSES_ROOT\Directory\Background\shell\PowershellAdmin]
 
; 1.右键：命令行
[HKEY_CLASSES_ROOT\Directory\Background\shell\OpenCmdHere]
@="在此处打开命令行窗口"
 
[HKEY_CLASSES_ROOT\Directory\Background\shell\OpenCmdHere\command]
@="cmd.exe -noexit -command Set-Location -literalPath \"%V\"" 
 
; 2.右键：命令行（管理员）
[HKEY_CLASSES_ROOT\Directory\Background\shell\runas]
@="在此处打开命令行窗口(管理员)"
"ShowBasedOnVelocityId"=dword:00639bc8
 
[HKEY_CLASSES_ROOT\Directory\Background\shell\runas\command]
@="cmd.exe /s /k pushd \"%V\""
 
; 3.shift+右键：Powershell(管理员)
[HKEY_CLASSES_ROOT\Directory\Background\shell\PowershellAdmin]
@="在此处打开 Powershell 窗口(管理员)"
"Extended"=""
 
[HKEY_CLASSES_ROOT\Directory\Background\shell\PowershellAdmin\command]
@="\"C:\\Windows\\System32\\WindowsPowerShell\\v1.0\\powershell.exe\" -windowstyle hidden -Command $stpath = pwd; Start-Process PowerShell -ArgumentList \\\"-NoExit\\\", \\\"-Command Set-Location -literalPath '%V'\\\" -verb RunAs"
 
; 4.设置右键 管理员打开cmd的另一种方法（可用来替换上面的2）
; 通过Powershell调起，会闪过一次Powershell的窗口，去掉下面几行的[; ]可以取消注释
; [-HKEY_CLASSES_ROOT\Directory\Background\shell\OpenCmdHereAdmin]
; 
; [HKEY_CLASSES_ROOT\Directory\Background\shell\OpenCmdHereAdmin]
; @="在此处打开命令行窗口(管理员)"
; 
; [HKEY_CLASSES_ROOT\Directory\Background\shell\OpenCmdHereAdmin\command]
; @="PowerShell -windowstyle hidden -Command \"Start-Process cmd.exe -ArgumentList '/s,/k, pushd,%V' -Verb Run
```

</br>

</br>

### 2.9 QQ delete Qzone

> 一个高明的方法是该文件采用了不同形式编码集合的方式保存的文件，如果对源文件编辑会破坏部分代码，会导致部分报错，仍然可以使用

**[Loc]：**Tencent -> QQ -> Plugin -> Com.Tencent.Qzone

**[Way]：**编辑 Bundle 的标签。

**[Ver]：**9.3.3.27009

</br>

</br>

## 0x03 Shortcut🔧

### 3.1 Win

|     Operation      |                      Effects                       |      Operation      |            Effects             |
| :----------------: | :------------------------------------------------: | :-----------------: | :----------------------------: |
|     Win+Ctrl+D     |                  创建虚拟Desktop                   |        Win+Q        |              搜索              |
|  Win + Ctrl + F4   |                  关闭虚拟Desktop                   |        Win+R        |             对话框             |
| Win + Ctrl + 左/右 |                左右切换虚拟Desktop                 |        Win+X        |   “Windows移动中心”设置面板    |
|       Win+F4       |                      关闭窗口                      |       Alt+F4        |            关闭窗口            |
|       win+m        |               最小化窗口（全部窗口）               |     alt+space+n     | 单个窗口最小化（配合Dock使用） |
|       ctrl+w       |            关闭浏览器当前页（我的电脑）            |   Windows+Shift+M   |     还原窗口最小化（全部）     |
|       ctrl+t       |                    打开新标签页                    |   ctrl+alt+delete   |         打开任务管理器         |
|    ctrl+shift+t    |                恢复关闭的浏览器页面                |      alt+enter      |        查看选中文件属性        |
|      ctrl + +      |                      放大页面                      |        win+E        |         打开资源管理器         |
|       ctrl+-       |                      缩小页面                      | alt+前进/后退方向键 |       浏览器页面后退前进       |
|         F1         |         显示当前程序或者windows的帮助内容          |         F2          |  如果选中文件的话，进行重命名  |
|         F3         |                        查找                        |         F5          |         浏览器页面刷新         |
|         F6         | 使用浏览器时，地址栏获得焦点（即光标移到了地址栏） |         F11         |           浏览器全屏           |
|        F12         |              浏览器审查元素/调试界面               |        prtsc        |              截屏              |
|       win+t        |                   循环切换任务栏                   |        alt+d        |        焦点固定到地址栏        |
| Alt+Shief+Num Lock |                   用键盘控制鼠标                   |                     |                                |

</br>

### 3.2 Typera&Markdown

|     Operation      |              Effections              |
| :----------------: | :----------------------------------: |
|       Ctrl+/       |         代码和预览的快速切换         |
|   shift + enter    |                软换行                |
|       enter        |                硬换段                |
|      Ctrl + /      |            调出源代码格式            |
|      Ctrl + K      |     将选中词变为剪切板的网页索引     |
| Ctrl + Shief + 1/2 | 关闭/隐藏侧边任务栏（源码模式无效）  |
| Ctrl + Shief + 1/2 | 大纲和文件的互相切换（源码模式无效） |
|         F8         |               专注模式               |
|         F9         |               翻译模式               |
|        F11         |               全屏模式               |

</br>

### 3.3 Youdao&Markdown

有道云笔记：

|       Operation        |      Effects       |  Operation   |     Effects      |
| :--------------------: | :----------------: | :----------: | :--------------: |
|         ctrl+←         |  切换界面模块隐藏  |    ctrl+→    |       显示       |
|         ctrl+n         |      新建笔记      | ctrl+shfit+y |     激活窗口     |
| ctrl+shfit+PrintScreen | 隐藏窗口的截屏方式 |      F5      |       同步       |
|         ctrl+d         |    插入待办事项    | shift+alt+d  |   插入当前时间   |
|    ctrl+数字（1-4）    |    修改字体大小    |    ctrl+h    |    插入分割线    |
|         ctrl+w         |    关闭当前页面    |    ctrl+L    | 当前行成无序列表 |
|      ctrl+shift+L      |  当前行成有序列表  |    ctrl+y    |   返回撤销操作   |

从这里大概更新一下自己不太熟悉的Markdown语法（复杂的见后记）：

| Operation  |       Effects        | Operation | Effects  |
| :--------: | :------------------: | :-------: | :------: |
| $$E=mc^2$$ | 质能守恒公式[^LaTeX] |   - [ ]   | 待办事宜 |

</br>

最后有时间用甘特图画一下自己的应用树吧，嘿嘿

## 0x04 Bug

### 4.1 文件大小&占用内存双标

</br>

### 4.2 Net端口占用

两个情况的办法：

1. 开机的部分时间内会短暂的占用部分端口，所以请稍后重试。

2. Cmd 下命令：

```shell 
netstat -ano|findstr "XXX" #端口号，或者下面的命令
netstat -aon|findstr :XXX|findstr LISTEN（netstat -ano | findstr “XXX” ）
```

3. **[推荐]**服务 -> 手动启动

</br>



### 4.3  投屏

> Miracast是由Wi-Fi联盟于2012年所制定，以Wi-Fi直连（Wi-Fi Direct）为基础的无线显示标准。支持此标准的3C设备(如智能手机、电视、投影、电脑等)可透过无线方式分享视频画面，也就是说在此技术下，手机可以在不借助任何连接线的情况下实现与电视、电脑等大屏设备的画面投屏。

**[Way]：**

资料可知，通过和手机间的投屏是使用无线网卡来实现的，所以，如果你的电脑有无线局域网（Wi-Fi）功能，你就可以使用投屏功能。

1. **window+R**快捷键运行**dxdiag.exe** -> 保存所有信息 -> `Miracast`是否可用?(Available,withHDCP)
2. 我的问题定位到**Microsoft Wi-Fi Direct Virtual Adapter**被禁用
3. **window按钮->设备管理器->网络适配器**，找到你的网卡打开就OK
4. 其他参考： **SSDP服务和WMPNetworkSvc服务** 是否被启用或者防火墙是否开启

</br>

### 4.4  默认应用误设

**[官方回应]：**目前对这个也没有办法，感觉歧视处女情结（强迫症）的人……

![154kEn.png](https://s2.ax1x.com/2020/02/10/154kEn.png)

**[Way]：**

1. 用文本打开一个打不开的文件，会报错然后就完美了。
   1. **[推荐]**新建文本A — > 随便起个后缀 -> 用A选择默认打开误开的应用 -> 删掉A
2. 用可卸载的软件打开一遍，然后卸载这个软件。
3. 批处理代码，粘过来研究

```visual basic
@echo off
  setlocal enabledelayedexpansion
  set "ext=%~x1"
  :loop
  if defined ext set "ext=!ext:"=!"
  if defined ext goto ok
  echo 如果你不知道文件的扩展名，关闭批处理然后把文件拖到批处理文件的图标上。
  set /p "v=请输入扩展名（如txt）然后回车："
  for /f "delims=" %%i in (".!v!") do set "ext=%%~xi"
  goto loop
  :ok
  echo 扩展名：!ext!
  pause
  reg delete "HKCU\Software\Microsoft\Windows\CurrentVersion\Explorer\FileExts\!ext!" /f
  reg query "HKCR\!ext!" /ve|find /i "!ext:~1!_auto_file">nul
  if not errorlevel 1 (
  reg delete "HKCR\!ext!" /ve /f
  reg delete "HKCR\!ext:~1!_auto_file" /f
  )
  taskkill /im explorer.exe /f
  start %windir%\explorer.exe
  pause
  goto :eo
```

</br>

### 4.5  游戏本风扇异响

**[现象]：**只有放到支架上会有哒哒哒的声音，90°立正和平躺不会？！。

**[定位] :** 风扇的转轴没油了，去专卖店叫师傅滴两滴油，不必拆开以及卸风扇，风扇哪个标签貌似可以直接撕开滴油，个人也不好撕开了。

</br>

### 4.6 电量持续显示在 92%

**[定位]**：控制面板(大图标)>**电源选项**>更改计划设置>更改高级电源设置>电池

**[方案]：**说来有趣，嫌网上的方法太麻烦，直接选择了恢复默认，但是要**重新开机后**才可以回到100%。

**[延拓]：**https://zhuanlan.zhihu.com/p/114661367

</br>

</br>

## 0x05 Win&Service

送给大家一句真理：

> 像我一样的应用就是流氓。
>

CMD 命令查看自己的系统的序列号，留作备份：

```powershell
(Get-WmiObject -query 'select * from SoftwareLicensingService').OA3xOriginalProductKey
```

**[Common Loc]:** Cmd+`services.msc`

</br>



### RuntimeBroker

RuntimeBroker.exe进程Win8或者Win8.1系统中才会出现的进程，是一个重要的系统核心进程，是Win8或者Win8.1用来进行Metro App权限管理的一个进程。该程序正常情况下位于C:\Windows\System32目录下，大小一般为32.7KB。

　RuntimeBroker.exe进程，用来进行开始屏幕磁贴与桌面的后台交互，如果没有运行任何磁贴程序应用的话，可能不会出现的进程中。一般占用内存不会超过3M，如果系统出现该进程内存占用太高，应该是此贴应用没有彻底关闭(特别是Win8.1)。



### Diagnostic Policy Service

**[Bug]：**CPU

**[Affect]：**？

**[Reasult]：**任务管理的历史记录无法使用

</br>

### Microsoft Compatibility Telemetry

**[Bug]: **CPU

**[Affect]：**？

**[loc]: **我的电脑 -> 管理计算机 -> Application组包—> 关闭

[祭]：已于2020-06-06 凌晨删除

https://windows10.pro/microsoft-compatibility-telemetry-appraiser/

**https://blog.csdn.net/qubernet/article/details/82952239?utm_medium=distribute.pc_relevant.none-task-blog-baidujs-2**

</br>

### Host process for setting synchronization

**[Bug]: **CPU

**[Affect]：**同步Win的电脑设置

</br>

### Window Update

**[Affect]：**Em.......

**[Reasult]：**Mirco的软件商店会无法获取应用。

**[延拓]：**https://www.jianshu.com/p/4485107693ed

https://juejin.im/post/5e1c964de51d451c8771c590

**定期检查更新服务。**每次重启电脑或者超过两天没有关机时，打开“服务”，并检查“Windows Update”状态，确保它仍然是禁用的。虽然Windows Update服务不会经常重启，但偶尔会重新启动。

- 如果在“Windows Update”标题右侧看到“禁用”，那么Windows Update仍然是禁用的。
- 如果在“Windows Update”标题右侧看到除“禁用”以外的其他内容，再次禁用Windows Update。
- [200606] 定时任务被我删去了，暂时没有发现异常



**Win10家庭版 使用组策略：**

```cmd
@echo off
pushd "%~dp0"
dir /b C:\Windows\servicing\Packages\Microsoft-Windows-GroupPolicy-ClientExtensions-Package~3*.mum >List.txt
dir /b C:\Windows\servicing\Packages\Microsoft-Windows-GroupPolicy-ClientTools-Package~3*.mum >>List.txt
for /f %%i in ('findstr /i . List.txt 2^>nul') do dism /online /norestart /add-package:"C:\Windows\servicing\Packages\%%i"
pause
```

保存为 CMD 或 BAT 以管理员模式运行，无报错情况下 Win+R 键入 gpedit.msc 打开组策略管理。

</br>

### Host process for setting synchronization

**[Bug]: **CPU

**[Affect]：**Win10的系统设置同步选项，可在设置-> 账户 ->同步里选择关闭

### WMI Provider Host

**[Affect]：**某些应用调用这个服务，一般几秒的事，持续占后台就有问题了。

**[loc]：**参考[网上的方法-知乎](https://www.zhihu.com/question/58459318)，个人不喜动防火墙（svhost），关闭了HP Audio Switch后，找到是由于小米互传这个软件占用后台 -> 更新 ，退出后发现即使运行也不用CPU了。

</br>

### Windows Modules Installer Worker

**[Affect]：**启用Windows更新和可选组件的安装。

禁用即可。

</br>

### Window恶意软件删除工具

**[Affect]：**Windows Update 提供的该工具版本每月会在您的计算机后台运行一次。 如果找到感染，该工具将在您下一次启动计算机时显示一份状态报告。 如果您想要每月运行此工具多次，可以运行此网页提供的版本或者使用恶意软件删除工具网站上的版本。

**[延拓]：**http://www.win10jihuoma.com/archives/8207

</br>

### HP System Info HSA Service

**[Affect]：**？

</br>

### Xtuservice

**[Affect]：**处理器进行超频 降频操作的控制程序

</br>

### IP Helper

**[Affect]：**IPV6 -> IPV4

</br>

### SysinfoCap

**[Loc]**：HPSysInfoCap(HP System Info HSA Service)

**[Affect]：**获取系统的相关信息，推测是风扇的驱动之类

他会连带着下面的服务停止，我将他们设置了手动启动。

**[HPNetworkCap]** (HP Network HSA Service)、**[HPAppHelperCap]** (HP App Helper HSA Service)

其他HP(系统品牌)的服务还有：

```
HP Analytics service
HP CASL Framework Service
HP Comm Recovery
HP Omen HSA Service
```

</br>

[延拓阅读]：

1. [解决win10系统CPU占用过高](https://blog.csdn.net/sky__god/article/details/77914698)



### Software Reporter Tool

**[Sor]：** https://www.cnblogs.com/ShaYeBlog/p/10224349.html

**[Loc] :** Cmd下：——对应版本号里的Software Reporter Tool！

```powershell
%localappdata%\Google\Chrome\User Data\SwReporter
```

**[方法]：**“高级” -> “禁用继承” -> "从此对象中删除所有继承的权限".保证没有用户组可以访问SwReporter文件夹并启动Software Reporter Tool了。





## 0x06 Terimal

于2020-06-06发现在使用 Cmd 的时候命令长时间不更新，随后我乱敲打了

### Powershell

[延拓阅读]

1. [PowerShell 与 cmd 有什么不同](https://www.zhihu.com/question/22611859/answer/28897482)
2. https://chocolatey.org/packages?sortOrder=package-download-count&page=2&prerelease=False&moderatorQueue=False&moderationStatus=all-statuses
3. https://chocolatey.org/
4. https://www.zhihu.com/question/388789219/answer/1195778534





</br></br></br></br></br></br></br></br></br></br></br></br>



## 0x07 Optimization

### RAM

[来源]：[1466 - 知乎 ](https://www.zhihu.com/question/39716538/answer/883031599)

引用来源答主的一席话：

> **即 4G,8G 内存的 win10 64位系统,一般开机启动系统自身就会占用 1.5-2.5GB 内存, 16G 内存的则占用在 2.5G-3.5G ,且内存越大吃的越多,系统也越快,只有达到一定程度(比如128GB内存),系统才不会继续吃更多,而32位系统则占用的更少(理论上少一半,实际上由于各种优化存在,并不会如此)**





您好！

 

我们了解到您关于Windows 10应用商店的问题，

 

建议您先尝试清理应用商店的缓存，看看是否可以恢复正常：

 

按“Win+R”键，在运行窗口中，键入 WSReset.exe并点击“ 运行 ”。

 

如果问题依旧，建议您尝试以下方案重新部署您的应用商店：

 

在打开的“管理员：Windows Powershell”窗口中输入以下命令：

 

get-appxpackage *store* | remove-Appxpackage

 

再次安装：

 

add-appxpackage -register "C:\Program Files\WindowsApps\*Store*\AppxManifest.xml" -disabledevelopmentmode









虚拟内存

https://www.crucial.cn/learn-with-crucial/memory/how-to-set-up-virtual-memory





## Registry?!

> 以下内容来自[维基百科]( [https://zh.wikipedia.org/wiki/%E6%B3%A8%E5%86%8C%E8%A1%A8](https://zh.wikipedia.org/wiki/注册表) ).
>
> 写完注册表这一内容之后就在搭建一遍博客吧，毕竟自己和自己这样子怄气也只有自己最后会处理的吧，加油呐，自己！！！用win+regedit完成视觉学习······

### 0x01 Whats Registry

注册表（ 中国大陆译作**注册表**，台湾、港、澳译作**登录档** ） 是**Microsoft Windows**中的一个重要的**数据库**，用于存储系统和应用程序的设置信息。早在**Windows** 3.0推出**OLE**技术的时候，注册表就已经出现。随后推出的**Windows NT**是第一个从系统级别广泛使用注册表的操作系统。但是，从**Windows 95**开始，注册表才真正成为Windows用户经常接触的内容，并在其后的操作系统中继续沿用至今。 

 注册表 保存程序所需要的信息，当程序需要这些信息时，就从注册表里读出。因此，注册表最基本的功能就是保存信息: 记录安装信息 、 设置硬件 、 定制Windows以及应用软件 

> 注册表（Windows Operating System Registry）（Registry，繁体中文版Windows操作系统称之为登录档）是Microsoft Windows中的一个重要的数据库，用于存储系统和应用程序的设置信息。早在Windows 3.0推出OLE技术的时候，注册表就已经出现。随后推出的Windows NT是第一个从系统级别广泛使用注册表的操作系统。但是，从Microsoft Windows 95操作系统开始，注册表才真正成为Windows用户经常接触的内容，并在其后的操作系统中继续沿用至今。

所以现在以上就可以解释为什么你复制自己电脑上的EXE文件，但是在其他电脑上打开后，之前自己的设置（例如：关于程序使用主题的信息、主题之前基于你自己个性化的设置）会被重置，变为0。（真正意义上的从零开始）

### 0x02 注册表的结构

 由键（key，或称“项”）、子键（subkey，子项）和值项（value）构成 ， 一个键就是树状数据结构中的一个节点，而子键就是这个节点的子节点，子键也是键。一个值项则是一个键的一条属性，由名称（name）、数据类型（datatype）以及数据（data）组成。一个键可以有一个或多个值，每个值的名称各不相同，如果一个值的名称为空，则该值为该键的默认值（所以这就是为什么大多数教程里叫你把值改为0的原因）。

![15fPxg.png](https://s2.ax1x.com/2020/02/10/15fPxg.png)

 txt类型的文件在右键菜单里的“打开”一项使用的程序是“NOTEPAD.EXE”，即用记事本打开文件。 

### 0x03 数据类型

| 显示类型（在编辑器中） |   数据类型   |                             说明                             |
| :--------------------: | :----------: | :----------------------------------------------------------: |
|         REG_SZ         |  **字符串**  |                          文本字符串                          |
|       REG_BINARY       |   二进制数   |              不定长度的二进制值，以十六进制显示              |
|       REG_DWORD        |     双字     |        一个 32 位的二进制值，显示为 8 位的十六进制值         |
|      REG_MULTI_SZ      |   多字符串   | 含有多个文本值的字符串，此名来源于字符串间用 nul 分隔、结尾两个 nul |
|     REG_EXPAND_SZ      | 可扩展字符串 |                     含有环境变量的字符串                     |

 此外，注册表还有其他的数据类型，但是均不常用： 

- REG_DWORD_BIG_ENDIAN - DWORD 的[大头](https://zh.wikipedia.org/wiki/字节序)版本，下面同理
- REG_DWORD_LITTLE_ENDIAN
- REG_FULL_RESOURCE_DESCRIPTOR
- REG_QWORD - DWORD 的四字（64 位）版本
- REG_FILE_NAME

### 0x04 注册表的分支

注册表有五个一级分支，下面是这五个分支的名称及作用：

|        名称         |                             作用                             |
| :-----------------: | :----------------------------------------------------------: |
|  HKEY_CLASSES_ROOT  | 存储Windows可识别的文件的文件名后缀和与之相关联的应用程序：一类是已经注册的各类文件的扩展名、另一类是各类文件类型有关信息。 |
|  HKEY_CURRENT_USER  | 存储当前**登录用户**设置的信息。这些信息保证不同的用户登录计算机时，使用自己的个性化设置，例如自己定义的墙纸、自己的收件箱、自己的安全访问权限等 |
| HKEY_LOCAL_MACHINE  | 包括安装在**计算机**上的硬件和软件的信息，包括所安装的硬件以及软件的设置。这些信息是为所有的用户登录系统服务的。（**最庞大也是最重要的根键**） |
|     HKEY_USERS      |    包含使用计算机的用户的信息。（所有以前登录用户的信息）    |
| HKEY_CURRENT_CONFIG | 这个分支包含计算机当前的硬件配置信息。其中存放的是计算机当前设置，如显示器、打印机等外设的设置信息等。它的子键与HKDY_LOCAL_MACHINE\Config\0001分支下的数据完全一样 |

还有一个隐藏分支` HKEY_PERFOR-MANCE_DA<wbr>TA `。

| 名称                 | 作用                                                         |
| -------------------- | ------------------------------------------------------------ |
| `HKEY_DYN_DA<wbr>TA` | 保存每次系统启动时，创建的系统配置和当前性能信息。这个根键只存在于Windows 9x中。系统自带的注册表编辑器无法看到此键，但可以用专门的程序来查看此键，比如使用性能监视器。 |



### 0x05 注册表的存储方式

 存储位置随着Windows的版本变化而不同 。

 尤其是**Windows NT**（ **新技术视窗操作系统**Windows New Technology）[1] 系列操作系统和**Windows 95**系列的存储方式有很大区别。注册表被分成多个文件存储，称为Registry Hives，每一个文件被称为一个配置单元。

 在早期的Windows 3.x系列中，注册表仅包含一个reg.dat文件，所存放的内容后来演变为HKEY_CLASSES_ROOT分支。 

 Windows NT家族的配置单元文件： 

|    名称    |         注册表分支          |                             作用                             |
| :--------: | :-------------------------: | :----------------------------------------------------------: |
|   SYSTEM   |  HKEY_LOCAL_MACHINE\SYSTEM  |                  存储计算机硬件和系统的信息                  |
| NTUSER.DAT |      HKEY_CURRENT_USER      | 存储用户参数选择的信息（此文件放置于用户个人目录，和其他注册表文件是分开的） |
|    SAM     |   HKEY_LOCAL_MACHINE\SAM    |                      用户及密码的数据库                      |
|  SECURITY  | HKEY_LOCAL_MACHINE\SECURITY |                        安全性设置信息                        |
|  SOFTWARE  | HKEY_LOCAL_MACHINE\SOFTWARE |                        安装的软件信息                        |
|  DEFAULT   |     HKEY_USERS\DEFAULT      |                      缺省启动用户的信息                      |
|  USERDIFF  |         HKEY_USERS          |                  管理员对用户强行进行的设置                  |

 Windos95家族的配置文件 

|    名称    |     注册表分支     |          作用          |
| :--------: | :----------------: | :--------------------: |
|  CLASSES   | HKEY_CLASSES_ROOT  | 存储软件组件库有关信息 |
|  USER.DAT  |     HKEY_USERS     | 存储用户参数选择的信息 |
| SYSTEM.DAT | HKEY_LOCAL_MACHINE |        系统信息        |

### 0x06 编辑注册表

#### 6.1 使用注册表编辑器

用win+r+regedit调出， 位于`%systemroot%\regedit.exe`  。在Windows XP及以后的操作系统中，`regedit.exe`已经能够支持注册表安全设置了 .

 除了编辑本台计算机上注册表数据之外，注册表编辑器亦可以通过文件菜单下的“加载配置单元”菜单项编辑直接编辑文件系统上的注册表数据文件。该功能可以允许用户打开文件系统中的RegHive文件，并将其中的数据映射到`HKEY_USERS`或者`HKEY_LOCAL_MACHINE`项下的一个子项之中。 

#### 6.2 使用命令行工具（CLI）

 Windows自带了一个管理注册表的命令行工具——**reg**。只需在[命令提示符](https://zh.wikipedia.org/wiki/命令提示符)中运行并指定参数，即可以命令行的形式对注册表进行各项管理操作。支持的操作有增删改查、导入导出注册表文件（reg文件）、导入导出或加载配置单元（RegHive）等。 

#### 6.3 使用脚本

 在Windows 98以后的操作系统中，增加了一个脚本语言解释器，可以用来执行一些系统任务。它可以支持VBScript和JavaScript两种脚本语言，都提供了访问注册表的功能。某些病毒就利用这一点通过修改注册表进行传播。 

#### 6.4 使用第三方或自行编写的软件

访问注册表的系统功能对编程人员是开放的，因此有许多软件都有读写注册表的功能。事实上，Windows平台下开发的软件几乎都在不同程度上修改注册表，以便保存一些在程序多次运行之间需要保留的信息，以及让软件可以通过某种特定方式（例如，右键菜单）启动。也有一些软件是专门开发出来对注册表进行优化和设置的。

#### 6.5 使用reg文件

reg文件是根据一定格式编写的纯文本文件。熟练的用户可以直接使用文本编辑器（比如记事本）来创建自己的reg文件，这样做无需在注册表中根据路径一级一级地访问，而且可以直接对大量项目进行批量修改。

### 6.6 Registry APIs

Windows SDK提供了访问注册表的接口。创建或打开的键，必须作为当前已经打开的键的子键。HKEY_LOCAL_MACHINE, HKEY_CLASSES_ROOT, HKEY_USERS, HKEY_CURRENT_USER等预定义的键总是已经打开。使用RegOpenKeyEx打开键；使用RegCreateKeyEx创建键。注册表允许最大512层子键深度。通过一个注册表API调用允许一次打开或创建32层深度的注册表的子键。 RegCloseKey关闭已经打开的键，把数据写回注册表。RegFlushKey把内存中缓存的注册表已修改数据写回到硬盘上，因此代价高昂，要慎重调用。

RegSetValueEx把一个值项与其数据关联到一个键上。RegDeleteVaule从键上删除一个值项。RegDeleteKey删除一个键，但直到关闭相应的注册表句柄（handle）才真正完成删除操作。

RegEnumKeyEx枚举一个键下的所有子键。RegEnumValue枚举一个键下的所有值项。RegQueryValueEx获取一个值项的数据。

RegSaveKeyEx可以把一个键及所有子键保存到一个文件中。RegLoadKey把一个注册表文件装入到系统的注册表，RegUnLoadKey把系统注册表恢复到原状态。

![15WTPK.png](https://s2.ax1x.com/2020/02/10/15WTPK.png)



---

[1].  是**美国微软公司**1993年推出的纯**32位操作系统核心**。其基于OS/2 NT的基础构造。**OS/2**是由微软和**IBM**联合研制，分为微软的**Microsoft OS/2 NT**与IBM的**IBM OS/2**。由于双方在协作后来不欢而散，IBM继续向[市场](https://zh.wikipedia.org/wiki/市场)提供先前的OS/2版本；而微软则把**OS/2 NT**改名为**Windows NT**，并在1988年11月开始了对于“WinNT”（即第一代的Windows NT 3.1）的产品研发。在研发初期，“WinNT”曾一度被认为将会是原先OS/2的3.0版本，但面世之后的**Windows NT**是一种纯**32位**操作系统，采用NT核心技术。 
		Windows NT采用**用户模式**与**核心模式**的分层设计并且是**抢占式**和**可重入**的。可运行在单处理器或**对称多处理器**（SMP）上，并利用**I/O请求包与异步I/O**来处理所有的I/O请求。在**Windows 2000**（含）之前采用的Windows NT皆为32位版本的，第一个基于**IA-64**的64位Windows NT首先用于64位的**Windows XP**，而第一个基于**x86-64**的64位Windows NT则为**Windows Server 2003**。
		Windows NT采用的核心是属于**混合核心**。其体系结构包括简单内核、**硬件抽象层**（HAL）、驱动程序、服务（总称为运行体）, 这些均属于核心模式。用户模式下的程序与子系统仅能访问其可访问的资源，核心模式下的程序则可以访问所有资源与外部设备。



## Program

### 0x01 

```shell
Windows Registry Editor Version 5.00
 
; 原文链接：
; https://blog.csdn.net/cxrsdn/article/details/84538767
 
; 若原先有，先删除原来的
[-HKEY_CLASSES_ROOT\Directory\Background\shell\OpenCmdHere]
[-HKEY_CLASSES_ROOT\Directory\Background\shell\runas]
[-HKEY_CLASSES_ROOT\Directory\Background\shell\PowershellAdmin]
 
; 1.右键：命令行
[HKEY_CLASSES_ROOT\Directory\Background\shell\OpenCmdHere]
@="在此处打开命令行窗口"
 
[HKEY_CLASSES_ROOT\Directory\Background\shell\OpenCmdHere\command]
@="cmd.exe -noexit -command Set-Location -literalPath \"%V\"" 
 
; 2.右键：命令行（管理员）
[HKEY_CLASSES_ROOT\Directory\Background\shell\runas]
@="在此处打开命令行窗口(管理员)"
"ShowBasedOnVelocityId"=dword:00639bc8
 
[HKEY_CLASSES_ROOT\Directory\Background\shell\runas\command]
@="cmd.exe /s /k pushd \"%V\""
 
; 3.shift+右键：Powershell(管理员)
[HKEY_CLASSES_ROOT\Directory\Background\shell\PowershellAdmin]
@="在此处打开 Powershell 窗口(管理员)"
"Extended"=""
 
[HKEY_CLASSES_ROOT\Directory\Background\shell\PowershellAdmin\command]
@="\"C:\\Windows\\System32\\WindowsPowerShell\\v1.0\\powershell.exe\" -windowstyle hidden -Command $stpath = pwd; Start-Process PowerShell -ArgumentList \\\"-NoExit\\\", \\\"-Command Set-Location -literalPath '%V'\\\" -verb RunAs"
 
; 4.设置右键 管理员打开cmd的另一种方法（可用来替换上面的2）
; 通过Powershell调起，会闪过一次Powershell的窗口，去掉下面几行的[; ]可以取消注释
; [-HKEY_CLASSES_ROOT\Directory\Background\shell\OpenCmdHereAdmin]
; 
; [HKEY_CLASSES_ROOT\Directory\Background\shell\OpenCmdHereAdmin]
; @="在此处打开命令行窗口(管理员)"
; 
; [HKEY_CLASSES_ROOT\Directory\Background\shell\OpenCmdHereAdmin\command]
; @="PowerShell -windowstyle hidden -Command \"Start-Process cmd.exe -ArgumentList '/s,/k, pushd,%V' -Verb RunAs\""
```







原本是很早以前写在blogspot的文章，今天重新整理了一下。注册表的概述这里就不多说了，本文主要介绍如何通过.reg文件操作注册表，其他的操作方式也不是本文涉及的内容。本文主要内容包括：

1. .reg文件的语法 
2. 添加注册表项或添加和更改注册表值
3. 删除注册表项和值
4. 重命名注册表项和值
5. 需要注意的问题

.reg文件的语法

.reg文件实际上是一个文本文件，.reg 文件具有以下语法：

1:  RegistryEditorVersion 

2:  Blank line 

3:  [RegistryPath1] 

4:  "DataItemName1"="DataType1:DataValue1" 

5:  DataItemName2"="DataType2:DataValue2" 

6:  Blank line 

7:  [RegistryPath2] 

8:  "DataItemName3"="DataType3:DataValue3"

其中：
RegistryEditorVersion 是“Windows Registry Editor Version 5.00”（对于 Windows 2000、Windows XP 和 Windows Server 2003）或“REGEDIT4”（对于 Windows 98 和 Windows NT 4.0）。“REGEDIT4”表头也适用于基于 Windows 2000、Windows XP 和 Windows Server 2003 的计算机。


Blank line 就是一个空行。它标识新的注册表路径的开始。每个项或子项都是一个新的注册表路径。如果 .reg 文件中有多个项，空白行可以帮助您检查内容和排查其中的问题。


RegistryPathx 是存放要导入的第一个值的子项的路径。请用方括号将路径括起来，并用反斜杠将层次结构的各个级别隔开。例如：

[HKEY_LOCAL_ MACHINE/SOFTWARE/Policies/Microsoft/Windows/System]

一个 .reg 文件可以包含多个注册表路径。 如果注册表中不存在路径语句中底层的层次结构，将创建一个新的子项。注册表文件的内容将按照它们的输入顺序发送到注册表。因此，如果您要新建一个包含另一子项的子项，必须按正确的顺序输入行。


DataItemNamex 是要导入的数据项的名称。如果文件中的数据项在注册表中不存在，.reg 文件将添加该数据项及其值。如果数据项存在，.reg 文件中的值将覆盖现有的值。数据项的名称用引号引起来。数据项名称后紧跟着一个等号 (=)。


DataTypex 是注册表值的数据类型，紧跟在等号后面。对于 REG_SZ（字符串值）以外的所有数据类型，数据类型后都紧跟一个冒号。如果数据类型是 REG_SZ，则不包括数据类型值或冒号。在这种情况下，Regedit.exe 假定数据类型为 REG_SZ。下表列出了典型的注册表数据类型：
数据类型 	.reg文件中的写法
REG_BINARY 	hex
REG_DWORD 	dword
REG_EXPAND_SZ 	hex(2)
REG_MULTI_SZ 	hex(7)

注意：可以为同一个注册表路径输入多个数据项行。

 

添加注册表项或添加和更改注册表值

一个简单的代码如下所示：

1:  Windows Registry Editor Version 5.00

2:  

3:  [HKEY_CLASSES_ROOT/..test]

4:  @="Default项的文本"

5:  "reg_binary_test"=hex:E0,31

6:  "reg_dword_test"=dword:000000ff

7:  "reg_expand_sz_test"=hex(2):30,00,31,00

8:  "reg_multi_sz_test"=hex(7):30,00,31,00

上面代码中值得注意的是：
第3行中的“..test”主要是为了在注册表中查找方便而采用的命名
@代表注册表项中默认项----(Default)
从代码中可以看出REG_SZ类型是不需要写出类型的
REG_BINARY是16进制的形式书写的
DWORD类型是16进制的形式书写的，前面的0可以不写，写出来主要是想把其长度（4个字节）表达清楚
REG_EXPAND_SZ与REG_MULTI_SZ实际上都是使用unicode编码表示的，编辑这两种类型应该需要编码转换软件，不过这两种类型一般很少用。

删除注册表项和值

要使用 .reg 文件删除注册表项，请在 .reg 文件中的 RegistryPath 前放置一个连字符 (-)。例如，要删除上文中的..test 项：

1:  Windows Registry Editor Version 5.00

2:  

3:  [-HKEY_CLASSES_ROOT/..test]

注意前面多了一个"-"号。
要使用 .reg 文件删除注册表值，请在 .reg 文件中的 DataItemName 后的等号后放置一个连字符 (-)。例如，要从上文中的..test 注册表项中删除reg_binary_test注册表值：

1:  Windows Registry Editor Version 5.00

2:  

3:  [HKEY_CLASSES_ROOT/..test]

4:  "reg_binary_test"=-

重命名注册表项和值

要重命名项或值，请删除该项或值，然后创建一个具有新名称的新项或新值。

需要注意的问题

最后值得一提的是，在REG_SZ类型中如果需要插入引号或者路径符号，那么需要使用转义字符“/”，例如：

 1:  Windows Registry Editor Version 5.00

 2:  

 3:  [HKEY_CLASSES_ROOT/dllfile/shell/exescope]

 4:  @="用 eXeScope 编辑资源"

 5:  [HKEY_CLASSES_ROOT/dllfile/shell/exescope/Command]

 6:  @="E://softdsgn//tools//eXeScope//Exescope.exe /"%1/""

 7:  

 8:  [HKEY_CLASSES_ROOT/exefile/shell/exescope]

 9:  @="用 eXeScope 编辑资源"

10:  [HKEY_CLASSES_ROOT/exefile/shell/exescope/Command]

11:  @="E://softdsgn//tools//eXeScope//Exescope.exe /"%1/""

注：这段代码是在explorer右键菜单上增加一个菜单项，当鼠标右键点击dll文件或者exe文件时，右键菜单多了一个“用exescope编辑资源”。

参考文献：http://support.microsoft.com/kb/310516/zh-cn
————————————————
版权声明：本文为CSDN博主「廖子鸿」的原创文章，遵循CC 4.0 BY-SA版权协议，转载请附上原文出处链接及本声明。
原文链接：https://blog.csdn.net/lanxinju/article/details/5779510

