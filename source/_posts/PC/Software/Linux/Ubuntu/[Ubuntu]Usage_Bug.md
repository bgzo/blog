---
title: '[Ubuntu] Bugs && ShortCut'
date: 2020-04-16 11:00:00
toc: true
---

### 0x08 Usage

#### 8.1 复制文件

```shell
sudo cp film  ~/XXX
```

#### 8.2 ubuntu 18.04无法从fwupd下载固件

> 通常是更新BIOS、更新网卡之类的需要fwupd。Android手机的bootloader就相当于电脑BIOS，所以Android更容易刷成砖。电脑重装系统是不会碰BIOS的，所以特殊情况才会成砖。

所以不用管……强迫症当场去世。

#### 8.3 双系统的时间不统一

这个是Bios里面的`Boot Secury`应该背锅；

  


#### 8.4 initramfs-tools报错

mdzz，当初分盘的时候太小气，看见别人`/boot`分区给了200M，但是太小了，以后给大点就不会有这问题了。解决方法是删掉多余的内核。dpkg命令是Debian Linux系统用来安装、创建和管理软件包的实用工具。查看自己的linux内核和正使用的内核，然后选择性删除。

```shell
sudo dpkg --get-selections |grep linux-image
sudo uname -a
sudo apt purge 内核名称
```

然后清理/usr/src目录,删除你已经卸载的内核目录

内核版本显示为**install，表示系统已经安装了相应的内核，使用purge命令删除相应的内核。**

```shell
sudo apt purge linux-image-4.4.0-130-generic
```

**deinstall**，表示系统没有安装此内核，但是在配置文件中还残留它的信息，也有可能是以前卸载的时候不彻底。 正常情况下，就已经清理完成辣。输入`df`查看/boot的已用百分比。

```shell
 sudo dpkg -P linux-image-extra-4.4.0-128-generic
```

#### 8.5 更换介质：请把标有……

“更换介质：请把标有…… DVD 的盘片插入驱动器“/media/cdrom/”再按回车键，十分无语的Bug——修改`/etc/apt/sources.list`文件，注释掉`deb cdrom:`开头的一行（第一行）,这里用终端和自己修改是有区别的，还不太清楚的说……

```shell
cd ~
vim /etc/apt/sources.list
apt update
```

#### 8.6 ubuntu支持`exfat`方法

我的U盘是`exfat`格式

> 推荐u盘使用exfat格式，为什么呢？两个原因：
>  1、三大主流操作系统（Linux、Mac、Windows）都支持exfat格式。
>  2、exfat支持大于4G的文件。

在ubuntu下，由于版权的原因（据说），默认不支持exfat格式的u盘，对于ubuntu 14.04以上版本，直接运行下面的命令就可以了：

```shell
sudo apt install exfat-utils
```

#### 8.7 Ubuntu的在线账户

不知道有什么用…………

</br>

#### 8.8 snap错误has install-snap change in progress

获取任务Id

```shell
 snap changes 
 sudo snap abort 14
```

</br>

#### 8.9 Ubuntu 永久挂载Win10磁盘

[ori] : [双系统下 Ubuntu 读写/挂载 Windows 中的硬盘文件 + 解决文件系统突然变成只读](https://jakting.com/archives/ubuntu-rw-windows-files.html)

实际挂载前，D盘为 `/dev/XX`，E盘为 `/dev/XXX`（**注意！这里 sd 后面的不一定和 Windows 一样，图里 Windows 和 Ubuntu 同处于 SSD 上，而 D 和 E 盘均位于 HDD 上，所以从 `a` 变成了 `b`**）

> **接下来，我们假设你要挂载的分区地址为 `/dev/XX`（原 Windows 中的非系统文件目录，即通常意义上的 Windows 分区），要挂载到地址为 `/mnt/windows/d`（Ubuntu 中的非系统文件目录，即 Linux 中的一个目录）**
> 你当然可以（而且必须）根据你的实际情况修改分区地址

```bash
sudo mkdir /mnt/windows/d# 然后关闭 WIndows 的**快速启动**，临时挂载，重启失效，适用于偶尔需要一次的：
sudo mount /dev/XX  /mnt/windows/d
```

在执行完成后，访问你的 `/mnt/windows/d` 应该就能看到原盘符中的文件了，没有文件显示请重启电脑查看第二种方式——永久挂载。

我们需要修改系统文件 `/etc/fstab`，在此之前，我们需要先获得 `/dev/XX` 的 `UUID`，执行指令：

```bash
sudo blkid /dev/XX
sudo apt install vim
sudo vim /etc/fstab
#插入形如 UUID=XXXXXXXXXX   /mnt/windows/d   ntfs  defaults   0   2的字段; 其中第一列为UUID, 第二列为挂载目录（该目录必须为空目录），第三列为文件系统类型，第四列为参数，第五列0表示不备份，最后一列必须为２或0(除非引导分区为1)，如果你是grub引导的话，你会注意到boot分区是1.
sudo mount -a#检查一下，发现还是报错，The disk contains an unclean file system，执行下面：
sudo apt install ntfs-3g
sudo ntfsfix /dev/XX
sudo mount -a#再检查一下，发现全是OK，哈哈
```

上面流程走一遍发现该目录下没有文件，可以右键属性检查一下，如果确实存在，那么重启电脑就OK了，我只挂载了我win的数据盘，系统盘还是不要动的好……

To Be Continued……

1. [安装Ubuntu18.04](https://blog.csdn.net/weixin_45591044/article/details/104157669).
2. [安装SSR](https://github.com/qingshuisiyuan/electron-ssr-backup/releases).-有详细的报错信息
</br>


#### 8.10 



</br>

### 0x09 Uninstall

用的不习惯当然先卸载了，Emmmmm，哈哈哈哈，卸载比较简单，大家都知道如果你按照下面的链接安装无误的话，启动引导用的是Ubuntu自带的的 `GUN GRUB`，如果你分盘的时候没有选择下面的启动引导设置，那么你第一次启动的时候一定不会进入Ubuntu的系统。

综上所述，我们把 `GUN GRUB`干掉，然后选择磁盘分区的删除卷即可，软件的话，用EasyUEFI，官网下载的话需要梯子，然后我这里如果有时间会给出下载链接，去网上随便下载一个就好了。


**Referance-Uninstall**

1. **[UEFI启动Windows10+Ubuntu双系统删除Ubuntu方法](http://blog.csdn.net/tjuyanming/article/details/64929901)**
2. **[win10 gpt分区+uefi引导 卸载双系统ubuntu](http://blog.csdn.net/u013427969/article/details/52744688)**


</br>

</br>

### 0x0a Ubuntu&Shortcut

用起来切换任务之类的快捷键还是有很多卡顿的，不知道为什么，总是桌面显示的会很慢。
#### a.1 Desktop

| Operation  |                   Effects                    | Operation |             Effects             |
| :--------: | :------------------------------------------: | :-------: | :-----------------------------: |
|  Alt + F1  | 聚焦到桌面左侧任务导航栏，可按上下键进行导航 | Alt + F2  |            运行命令             |
|  Alt + F4  |                 关闭当前窗口                 | Alt + Tab |          切换程序窗口           |
| Alt + 空格 |                 打开窗口菜单                 |   PrtSc   |            桌面截图             |
|  Win + A   |                搜索/浏览程序                 |    Win    | 搜索/浏览程序、文件、音乐文件等 |
|  Win + F   |                搜索/浏览文件                 |  Win + M  |        搜索/浏览音乐文件        |

#### a.2 Terminal

|       Operation       |                 Effects                  |        Operation        |                        Effects                        |
| :-------------------: | :--------------------------------------: | :---------------------: | :---------------------------------------------------: |
|    Ctrl + Alt + T     |                 打开终端                 |           Tab           |                 命令或文件名自动补全                  |
|   Ctrl + Shift + C    |                   复制                   |    Ctrl + Shift + V     |                         粘贴                          |
|   Ctrl + Shift + T    |        在同一个窗口新建终端标签页        |    Ctrl + Shift + W     |                      关闭标签页                       |
|   Ctrl + Shift + N    |               新建终端窗口               |    Ctrl + Shift + Q     |                     关闭终端窗口                      |
| Ctrl + Shift + PageUp |                标签页左移                | Ctrl + Shift + PageDown |                      标签页右移                       |
|       Ctrl + D        |                关闭标签页                |        Ctrl + C         |                     终止当前任务                      |
|       Ctrl + L        |                 清除屏幕                 |        Ctrl + P         |                  显示上一条历史命令                   |
|       Ctrl + N        |            显示下一条历史命令            |        Ctrl + R         |                   反向搜索历史命令                    |
|      Ctrl + J/M       |          回车（同enter键功能）           |        Ctrl + A         |                    光标移动到行首                     |
|       Ctrl + E        |              光标移动到行尾              |        Ctrl + B         |           关闭想后移动一个位置（backward）            |
|       Ctrl + Z        |          把当前任务放到后台运行          |      Ctrl + PageUp      |                   前一个终端标签页                    |
|    Ctrl + PageDown    |             下一个终端标签页             |           F1            |                     打开帮助指南                      |
|        Win + W        |               展示所有窗口               |         Win + T         |                      打开回收站                       |
|    Ctrl + Win + ↓     |           还原/最小化当前窗口            |     Ctrl + Win + D      |                    最小化所有窗口                     |
|       Ctrl + &        |        恢复Ctrl + H/D/W删除的内容        |     Ctrl + Win + ↑      |                    最大化当前窗口                     |
|       Ctrl + D        |  删除光标位置的一个字符（delete键功能）  |        Ctrl + W         | 删除光标位置的前一个单词（Alt + Backspace组合键功能） |
|       Ctrl + K        |      剪切从光标位置到行末的所有字符      |        Ctrl + Y         |            粘贴Ctrl + U/Ctrl + K剪切的内容            |
|       Ctrl + U        | 剪切从行的开头到光标前一个位置的所有字符 |       Ctrl + H/\*       |      删除光标位置的前一个字符（backspace键功能）      |
|       Ctrl + ←        |        光标移动到下一个单词的词尾        |        Ctrl + →         |              光标移动到上一个单词的词首               |
|        Alt + H        |          打开“帮助”菜单（help）          |        Ctrl + T         |       将光标位置的字符和前一个字符进行位置交换        |
|        Alt + V        |          打开“查看“菜单（view）          |         Alt + T         |              打开“终端”菜单（terminal）               |
|        Alt + E        |          打开“编辑”菜单（edit）          |         Alt + S         |               打开“搜索”菜单（search）                |
|          F11          |                 全屏切换                 |         Alt + F         |                打开“文件”菜单（file）                 |

补充：
    2次连续Tab/4次连续Esc/2次连续Ctrl + I|将显示所有命令和工具名称

#### a.3 Gedit

| Operation |  Effects   |    Operation     |  Effects   |
| :-------: | :--------: | :--------------: | :--------: |
| Ctrl + N  |  新建文档  |     Ctrl + W     |  关闭文档  |
| Ctrl + S  |  保存文档  | Ctrl + Shift + S |   另存为   |
| Ctrl + F  |    搜索    |     Ctrl + H     | 搜索并替换 |
| Ctrl + I  | 跳到某一行 |     Ctrl + C     |    复制    |
| Ctrl + V  |    粘贴    |     Ctrl + X     |    剪切    |
| Ctrl + Q  |    退出    |                  |            |

</br>

使用 `ctrl + ;`（此为 fcitx 自带剪贴板插件） ：查看粘贴板的内容，此时显示的就不只有一条内容，一般而言是最近的五次复制的内容。使用数字键进行选择。

https://blog.csdn.net/lanchunhui/article/details/51670785

</br>

### 0x0b Reference:
1. [ubuntu开机卡在logo界面修复](https://blog.csdn.net/weixin_40851278/article/details/82701410).
4. [ubuntu 18.04无法从fwupd下载固件,这个有什么影响吗？](https://tieba.baidu.com/p/5732130742?red_tag=0447802847)。
5. [initramfs-tools出错的解决方案](https://blog.csdn.net/yc1404/article/details/8559852?utm_source=blogxgwz1).
6. [Ubuntu提示boot分区剩余空间不足或boot分区已满](https://blog.csdn.net/songkai320/article/details/78761391).
7. [Ubuntu /boot空间不足时解决办法](https://www.jianshu.com/p/b8e09fa1a387).
8.  [ubuntu支持exfat方法](https://www.jianshu.com/p/c0dc9189e991).
9.  win10没全部关闭导致Ubuntu的WiFi模块不可用：https://blog.csdn.net/github_33678609/article/details/86502916