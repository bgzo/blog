---
title: '[Win10] Bugs'
date: 2020-04-03 10:21:21
toc: true
---


## 0x04 Bug

### 4.1 文件大小&占用内存双标

<br>

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