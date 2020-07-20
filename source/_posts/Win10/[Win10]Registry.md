---
title: '[Win10] Registry'
date: 2020-04-03 10:21:21
toc: true
---


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

http://support.microsoft.com/kb/310516/zh-cn