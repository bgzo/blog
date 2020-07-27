---
title: '[Win10] Self Config'
date: 2020-04-03 10:21:21
toc: true
---

<center><font size =2 color=grey>Create Date: 2020-02-05 04:22:00</font></center>

## 0x00 Preface

> MicrosoftWindows 是由美国微软公司研发的一套操作系统，问世于1985年，起初仅是**Microsoft-DOS**模拟环境，后续的系统版本由于微软不断的更新升级，不但易用，也当前应用最广泛的操作系统。 Windows采用了**图形化模式GUI( Graphial User Interface )**，比起输入指令使用的方式更为人性化。随着计算机硬件和软件的不断升级，微软的  Windows也在不断升级，从架构的16位、32位再到64位,系统版本从最初的 Windows1.0 到 Windows95、 Windows98、 Windows2000、 WindowsXP、 WindowsVista、 Windows7 、 Windows8、Windows8.1、Windows 10和 Windows  Server服务器企业级操作系统。

<br>

## 0x01 Decoration 

+ [Dock](https://www.mydockfinder.com/).💻 
+ RocketDock 

会有在 Utf-8 下乱码的问题.

<br>

## 0x02 Application 

一切的操作只为让自己走出去，如果不希望花太多时间在磨刀上，那就请把问题聚焦在解决问题上, 即:

**" 个性化设置！"**

### ~~2.1 Youdao Note~~

打开自己有道云的安装路径下的这个文件：`\Youdao\YoudaoNote\theme\default\skin.xml`开始编辑。后`Ctrl+F`搜索`PanelAd`把`PanelAd Bounds`的值`0.0.0.0`(修改之前记得提前做好备份……)，

```html
<PanelAd Bounds="0,0,0,161" DockStyle="bottom"></PanelAd>
```

完成……

~~<font size =1>[吐槽]:从小米便签的编辑功能到它的待办功能，只做差不多的小米生态彻底失望了。便签反馈了三年，开卡了三年无果，真的只剩下骂街了，可能是受众小的缘故吧。待办换Microsoft的TODO，笔记换来换去还是有道云的吧，**排版的方式多、直接暴力保存网页，想要的内容点点手指就可以、关键是公司相比较靠谱……**说起来生态，又有一个经济学原理验证了——“科斯定律“，也可能我没必要要求一个手机公司在应用生态方面做的和高三个层次的Apple相比。</font>~~

</br>

### 2.2 Firefox&Chrome

#### ~~2.2.1 缩放比例~~

~~about:config :火狐标签页，修改配置~~

~~layout.css.devPixelsPerPx ：修改缩放比例~~

两者现在都已经支持默认缩放比例了，上面的设置可以修改全局的CSS字体大小，如果是笔记本的话会很好用

</br>

#### 2.2.2 跟手度

提高跟手程度只需要把动画时间和幅度变短就好。

像Chrome参数可以改为`200.0.20.80.8.50`；火狐打开`about:config`标签页找到`general.smoothScroll.mouseWheel.durationMaxMS
general.smoothScroll.mouseWheel.durationMinMS`这两个值，分别改为200和50即可。这个和Chrome参数前面的200和0相似.

更多的细节还在Firefox的开发[源码](https://developer.mozilla.org/zh-CN/docs/Mozilla/Developer_guide/Source_Code/Downloading_Source_Archives)中，这里不再涉及。

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

**[侧边翻译]:** 

+  **EdgeTranslate - 1.7.2** 及以下 -> [[移步]](https://github.com/EdgeTranslate/EdgeTranslate/blob/fftf/docs/wiki/zh_CN/%E8%87%B4%E7%81%AB%E7%8B%90%E7%94%A8%E6%88%B7.md)。
+  **Saladict - 7.6** 及以下,Firefox 一直显示包下载是损坏的…

<br>

### 2.3 Typera
页边距：主题下的CSS里面搜索`write`找到`max-width`就是显示的页边距，自行调整

<br>

### 2.4 Gmail国内代收

众多邮箱手机客户端可以丝滑登录Google以及代收邮件，电脑端169收费。

> 据我们的技术说，gmail被屏蔽了，但是仍有一部分地址是漏网之鱼，可以通过这些地址来接收到墙外的邮件。因为只有少部分地址是可以用的，所以你们看现在号称能够接收gmail的客户端，大多都是手机的app，不开放电脑端是因为无法承受大流量的接入，会过载。

</br>

### 2.5 VSCode使用

见[原文](http://blog.dfslfh.cn)

</br>

### 2.6 Word To MD

+  在线工具：https://word2md.com/
   + 项目[源码](https://github.com/benbalter/word-to-markdown).
+ [Writage](http://www.writage.com/)插件

[参考]：https://www.zhihu.com/question/24170089

</br>

### ~~2.7 VMware~~

#### ~~2.7.1 触控板滑动~~

两种解决方法：

+  朴实的做法，直接放弃滑动，改用上下左右控制界面也不是不可以，你说呢？
+  这个是属于强迫症的做法：改用管理员的模式运行来获取触控板的参数.

[Tip] : 一个有趣的现象就是 Ubuntu 默认触控板驱动不支持双指放大, 但是Win10 的触控板驱动的参数却可以传到 Vmare 中.  

<br>

#### ~~2.7.2 处理器数和进程数~~

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

### ~~2.9 QQ delete Qzone~~

> 一个高明的方法是该文件采用了不同形式编码集合的方式保存的文件，如果对源文件编辑会破坏部分代码，会导致部分报错，仍然可以使用

**[Loc]：**Tencent -> QQ -> Plugin -> Com.Tencent.Qzone

**[Way]：**编辑 Bundle 的标签。

**[Ver]：**9.3.3.27009

</br>

</br>



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


虚拟内存

https://www.crucial.cn/learn-with-crucial/memory/how-to-set-up-virtual-memory
