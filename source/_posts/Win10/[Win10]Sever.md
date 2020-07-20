---
title: '[Win10] Sever'
date: 2020-04-03 10:21:21
toc: true
---


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


