---
title: '[Ubuntu] Install&Usage&Shortcut'
date: 2020-04-16 11:00:00
---

<center><font color=grey size=2>Create Date: 2020-03-25 21:09:05</font></center>
</br>

### 0x00 Proface

从今年1月25号折腾到失联，然后在03-23花了一下午入手win10和Ubuntu的双系统，对虚拟机的一套的卡顿say bye，入手经典的Ubuntu……虽然确实不如国产省心，但是大多都可解决。

</br>

某天了解到官网曾经可以申请免费的Ubuntu光盘，虽然关闭了，但真是有趣哈哈哈，官网指导在[这里](https://wiki.ubuntu.org.cn/%E7%94%B3%E8%AF%B7Ubuntu%E5%85%8D%E8%B4%B9%E5%85%89%E7%9B%98%E7%9A%84%E5%85%A8%E7%A8%8B%E6%8C%87%E5%AF%BC)，写在前面留个纪念。（选择版本 -> 填写表格 -> 发出申请 -> 申请接受 -> 收到CD）

在安装前请一定看一看Ubuntu官网的[知识](https://wiki.ubuntu.org.cn/%E5%AE%89%E8%A3%85_Linux_%E5%BA%94%E7%9F%A5%E7%9A%84%E5%8D%81%E4%BB%B6%E4%BA%8B).

![](https://note.youdao.com/yws/public/resource/67259ba0be7ff93f74a72fb43fe478e5/xmlnote/4CB55994FF0E45368B83FE50BA83F6FF/6189)

</br>

**声明**：这个**教程针对UEFI+GPT的Win10电脑**。

</br>

### 0x02 Install

下载官方的镜像（国内有大量的开源镜像网站），然后用`Ultralso`烧录到一个8G（4G）大小的U盘。重启机器开到BIOS界面，把BOOT里面的``BOOT Security`关掉，重启进入系统UEFI的U盘启动的模式，先进入Ubuntu里面体验一下，不要直接安装。

去找系统的安装源list文件，在`/etc/apt/sources.list`里，用管理员的权限修改下载源地址（提前查到自己对应版本的源地址）。

```shell
sudo vi /etc/apt/sources.list
sudo apt update
```

- 高校镜像源（国内其他大学也有提供，可自行查找） 
  [清华大学开源镜像站](https://link.zhihu.com/?target=https%3A//mirrors.tuna.tsinghua.edu.cn/help/ubuntu/) 
  [中科大开源镜像站](https://link.zhihu.com/?target=https%3A//mirrors.ustc.edu.cn/repogen/)
- 企业镜像源（其他企业的请自行查找） 
  [阿里云开源镜像站](https://link.zhihu.com/?target=http%3A//mirrors.aliyun.com/help/ubuntu) 
  [网易开源镜像站](https://link.zhihu.com/?target=http%3A//mirrors.163.com/.help/ubuntu.html)

分盘的时候还请参考最下面的地址，但是值得注意一下`boot`不要太小气，给他2G，主分区我给了32G，交换空间我给了8G，然后/home我给了60G，这里不再赘述，分区仅供参考。

给出我的Ubuntu18.04的源：

```shell
# 默认注释了源码镜像以提高 apt update 速度，如有需要可自行取消注释
deb https://mirrors.tuna.tsinghua.edu.cn/ubuntu/ bionic main restricted universe multiverse
# deb-src https://mirrors.tuna.tsinghua.edu.cn/ubuntu/ bionic main restricted universe multiverse
deb https://mirrors.tuna.tsinghua.edu.cn/ubuntu/ bionic-updates main restricted universe multiverse
# deb-src https://mirrors.tuna.tsinghua.edu.cn/ubuntu/ bionic-updates main restricted universe multiverse
deb https://mirrors.tuna.tsinghua.edu.cn/ubuntu/ bionic-backports main restricted universe multiverse
# deb-src https://mirrors.tuna.tsinghua.edu.cn/ubuntu/ bionic-backports main restricted universe multiverse
deb https://mirrors.tuna.tsinghua.edu.cn/ubuntu/ bionic-security main restricted universe multiverse
# deb-src https://mirrors.tuna.tsinghua.edu.cn/ubuntu/ bionic-security main restricted universe multiverse

# 预发布软件源，不建议启用
# deb https://mirrors.tuna.tsinghua.edu.cn/ubuntu/ bionic-proposed main restricted universe multiverse
# deb-src https://mirrors.tuna.tsinghua.edu.cn/ubuntu/ bionic-proposed main restricted universe multiverse
```

</br>

</br>

</br>

### 0x03 Install Bugs

由于Ubuntu并不是内置N卡驱动，所以如果有独显可以运行3A大作就**糟糕**了，笔记本会在Ufi模式下启动U盘的时候就卡死。用`e`进去启动设置，在末尾quiet splash的后面先空一格再加上（如果quiet splash后面发现有- - -这串符号，直接删了就是，只要保证上述添加的参数在splash后面即可），F10保存退出：

```shell
acpi_osi=linux nomodeset
```

相关问题定位【Ubuntu开机卡在logo界面】。进去之后，漫长的等待安装，值得注意的一点是要换aliyun的源，速度可以。

进去发现分辨率是锁死的，帧率是没有的，是Ubuntu自带的显卡驱动背的锅，用下面方法更新N卡驱动，如果不可以参考【参考资料的第一条将自带的驱动禁掉……】

```shell
sudo ubuntu-drivers autoinstall
```

安装完成之后发现两者都回来了，但是亮度是不可以调节的，我TM终于是受不了了……

```shell
sudo nano /etc/default/grub
```

它会打开一个叫grub的文件，将` GRUB_CMDLINE_LINEX_DEFAULT`那一行改成：

```shell
GRUB_CMDLINE_LINUX_DEFAULT="quiet splash acpi_backlight=vendor acpi_osi=Linux"
```

​	按 `Ctrl+O `保存、按 `Ctrl+X `退出编辑、执行 `sudo update-grub`，重启完美解决。

完事之后，我的玛雅，Ubuntu可真好看……

补充一个小小的建议：

如果你是那位一开始对自己英语水平自信满满的小子，然后想改回中文但是发现有中文但是点击失效，其实只要把中文包拉倒最上方就OKay了。

你说系统自带的输入法字太小了？在Ubuntu软件仓库里，搜索“ibus”，安装其中的“ibus font setting”。或者直接上搜狗，我是后者。

</br>

</br>

### 0x04 Ubuntu

~~暂时不考虑，浪费时间……~~

使用的原理是Ubuntu的插件，需要Ubuntu系统和浏览器共同安装即可运行，哈哈哈哈。

#### 4.2 将Ubuntu的窗口的关闭按钮弄到左面

听说14版本的都是在左面。但是ubuntu18.04的不知道为什么移到了左面。那好，我们大显身手：

1. 终端使用这个命令`sudo  apt-get install gnome-tweaks`
2. 安装完成后alt+f2在运行窗口输入 gnome-tweaks 回车执行

</br>

#### 4.3 Ubuntu的输入法选择

我选择了ibus的小鹤双拼的输入法，然后我意识到了网络联想真tm是个好东西，我一下子想到了小学用诺基亚物理键盘敲打的费劲感觉的说···

</br>

#### 4.4 设置大屏Ubuntu的输入法大小

这个好像要用到无障碍的字体放大功能，在这个地方也是很是想吐槽的说···

1. 在Ubuntu软件仓库里，搜索“ibus”，安装其中的“ibus font setting”。
2. 打开这个插件后就可以设置输入法候选字体的大小了。

</br>

</br>

### 0x05 `apt-get`

用Ubuntu会有一种感觉，好像

一般来说：

```bash
sudo apt install tree -y# 使用apt安装软件,譬如安装tree,这里的 -y 参数是为了在安装的时候默认选择yes

sudo dpkg -i xxx.deb# deb包安装&卸载（需要先下载好）
sudo apt-get install -f#安装依赖（如果提示需要的话）

sudo apt-get autoclean #自动清除残留配置文件
sudo apt-get autoremove

sudo apt-get remove --purge name#完全卸载,这样的卸载会比较干净地卸载掉软件。有些没有办法自动删除的文件，可以手动去删除掉

sudo apt install ./xxxx.deb #另一种deb包安装方式

tar -xzvf file.tar.gz#安装filename.tar.gz软件,然后在解压目录或者bin文件夹中执行setup.sh文件
```

 **源码安装**

有些软件没有被收录进软件镜像源，或者说开发者需要去使用他们最新的版本，这时候就要自己去他们的官网或者是代码托管平台下载最新的Linux源码，自己来build。这种方式安装需要解决很多的依赖，安装前，多问问度娘，Google。

此处还是以tree为例：

- 先去 [Tree FTP](https://link.zhihu.com/?target=ftp%3A//mama.indstate.edu/linux/tree/) 下载最新的源码包

```bash
  tar zxf tree-1.7.0.tgz #解压
  cd  tree-1.7.0/
  
  sudo make#make and install
  sudo make install#如果没有配置g++环境，先用apt安装build-essential
```



安装deb包的时候如果出现`dpkg：错误：另外一个进程已经为 dpkg 状态数据库 加锁`的时候可能是开机自动更新会占用一会儿这个进程，要么PS kill 他，要么等一会就可以。



安装deb 包缺少以来关系，仍未被处理的时候

```shell
sudo apt-get install -f
```

自动修复



#### 5.1 `typora`安装

```shell
wget -qO - https://typora.io/linux/public-key.asc | sudo apt-key add -
sudo add-apt-repository 'deb https://typora.io/linux ./'
sudo apt-get update
sudo apt-get install typora
```

</br>

#### 5.2 QQ web

</br>

#### 5.3 网易云音乐

提前下载好Ubuntu的deb包，

```shell
sudo apt install gdebi
sudo gdebi netease-cloud-music_1.2.1_amd64_ubuntu_20190428.deb
```

</br>

#### ~~5.4 flash插件-见下一条~~

~~注意：如b站会发现是没有H5播放的，但是同等条件下Chromium是有的，执行下面的代码~~

</br>

#### 5.5 Chromium Browser 

```shell
sudo apt-get install chromium-browser
```

升级火狐，其他软件同理，

```shell
 sudo apt-get update
 sudo apt-get install firefox
```

让火狐像Choromium一样支持网页H5播放，之后重启浏览器就OK。

```shell
sudo apt-get install ubuntu-restricted-extras
```

</br>

#### 5.6 electron_ssr

去现存的作者那里找到安装包，还有他的教程……,这里附上我的备用链接。

之后拿到了他的deb包，然后顺着安装会发现没有他的依赖包，提前到设置里面打开网络代理哦～

```shell
sudo dpkg -i ...#这里会提示你缺少一些必要的依赖包，跟着安装
sudo apt --fix-broken install
# --------------------------------Doc----------------------------------
sudo apt install libcanberra-gtk-module libcanberra-gtk3-module gconf2 gconf-service libappindicator1
# sudo apt-get install libssl-dev
# sudo apt-get install libsodium-dev
sudo apt install python
```

</br>



#### 5.7 Xmind 

去官方下载一个deb包就可以了，



#### 5.8 VS code

去这里：https://code.visualstudio.com/Download 下载deb的包，然后

```shell
sudo  dpkg  -i   ......# 你的包就OKay了
```

</br>

#### 5.9 Flameshot

 ```shell
sudo apt install flameshot
 ```

</br>

#### 5.10 Git

首先，通过运行以下命令确保您的系统和apt包列表完全更新：

```shell
apt-get update -y
apt-get upgrade -y
apt install git
git --version
```

之后参考我的hexo里面的配置GIt即可。

</br>

#### 5.11 Node.js

</br>

#### 5.12 福昕阅读&okular

福昕的官方以及不怎么维护他的服务器了，下载速度慢的一批，网上有一个CDN的源可以下载，缺点是没有中文，但是还可。

```shell
 wget http://cdn07.foxitsoftware.cn/pub/foxit/reader/desktop/linux/2.x/2.1/en_us/FoxitReader2.1.0805_Server_x64_enu_Setup.run.tar.gz # 这个是你没有SSR情况下的选择，有了代理速度可以追上宽带……
tar xvzf FoxitReader2.1.0805_Server_x64_enu_Setup.run.tar.gz# 或者右键直接解压，解压完直接点击运行
chmod +x FoxitReader.enu.setup.2.1.0805\(r225432\).x64.run# 修改权限
sudo ./FoxitReader.enu.setup.2.1.0805\(r225432\).x64.run
```

乱麻问题听说`Okular`，很好用，但是我自己永用了之后感觉一般……

```shell
sudo apt-get install okular   # F6开启注释功能，如果出现乱码问题，查看原地址
```

这里还是放上这个软件的最新版本的包（18年的包……）：链接.

</br>

#### 5.13 Wine

```shell
sudo dpkg --add-architecture i386 
wget -nc https://dl.winehq.org/wine-builds/winehq.key
sudo apt-key add winehq.key
#分支
sudo apt-add-repository 'deb https://dl.winehq.org/wine-builds/ubuntu/ eoan main' #Ubuntu 19.10 
sudo apt-add-repository 'deb https://dl.winehq.org/wine-builds/ubuntu/ bionic main'#Ubuntu 18.04,Linux Mint 19.x
sudo apt-add-repository 'deb https://dl.winehq.org/wine-builds/ubuntu/ xenial main'#Ubuntu 16.04&Linux Mint 18.x
sudo apt update
sudo apt install --install-recommends winehq-stable#稳定分支 	
sudo apt install --install-recommends winehq-devel#开发分支 	
sudo apt install --install-recommends winehq-staging#Staging 分支 	
```

出现问题查看下面的参考资料……

#### 5.14 百度网盘

[点击这里](https://pan.baidu.com/download).，下载deb格式的包，然后参考上面的安装方式进行安装。

</br>

</br>

### 0x06 Usage

#### 6.1 复制文件出现权限不够

```shell
sudo nautilus
```

#### 6.2 ubuntu 18.04无法从fwupd下载固件

> 通常是更新BIOS、更新网卡之类的需要fwupd。Android手机的bootloader就相当于电脑BIOS，所以Android更容易刷成砖。电脑重装系统是不会碰BIOS的，所以特殊情况才会成砖。

所以不用管……强迫症当场去世。

#### 6.3 双系统的时间不统一

这个是Bios里面的`Boot Secury`应该背锅

  


#### 6.4 initramfs-tools报错

mdzz，当初分盘的时候太小气，看见别人`/boot`分区给了200M，但是太小了，以后给大点就不会有这问题了。解决方法是删掉多余的内核。dpkg命令是Debian Linux系统用来安装、创建和管理软件包的实用工具。查看自己的linux内核和正使用的内核，然后选择性删除。

```shell
sudo dpkg --get-selections |grep linux-image
sudo uname -a
sudo apt-get purge 内核名称
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

#### 6.5 更换介质：请把标有……

“更换介质：请把标有…… DVD 的盘片插入驱动器“/media/cdrom/”再按回车键，十分无语的Bug——修改`/etc/apt/sources.list`文件，注释掉`deb cdrom:`开头的一行（第一行）,这里用终端和自己修改是有区别的，还不太清楚的说……

```shell
cd ~
vim /etc/apt/sources.list
apt-get update
```

#### 6.6 ubuntu支持`exfat`方法

我的U盘是`exfat`格式

> 推荐u盘使用exfat格式，为什么呢？两个原因：
>  1、三大主流操作系统（Linux、Mac、Windows）都支持exfat格式。
>  2、exfat支持大于4G的文件。

在ubuntu下，由于版权的原因（据说），默认不支持exfat格式的u盘，对于ubuntu 14.04以上版本，直接运行下面的命令就可以了：

```shell
sudo apt-get install exfat-utils
```

#### 6.7 Ubuntu的在线账户

不知道有什么用…………

</br>

#### 6.8 snap错误has install-snap change in progress

获取任务Id

```shell
 snap changes 
 sudo snap abort 14
```

</br>

#### 6.9 Ubuntu 永久挂载Win10磁盘

实际挂载前，D盘为 `/dev/sdb2`，E盘为 `/dev/sdb3`（**注意！这里 sd 后面的不一定和 Windows 一样，图里 Windows 和 Ubuntu 同处于 SSD 上，而 D 和 E 盘均位于 HDD 上，所以从 `a` 变成了 `b`**）

> **接下来，我们假设你要挂载的分区地址为 `/dev/sdb2`（原 Windows 中的非系统文件目录，即通常意义上的 Windows 分区），要挂载到地址为 `/mnt/windows/d`（Ubuntu 中的非系统文件目录，即 Linux 中的一个目录）**
> 你当然可以（而且必须）根据你的实际情况修改分区地址

当然，你得先创建这个目录

```bash
sudo mkdir /mnt/windows/d# 然后关闭 WIndows 的**快速启动**，临时挂载，重启失效，适用于偶尔需要一次的：
sudo mount /dev/sdb2  /mnt/windows/d
```

在执行完成后，访问你的 `/mnt/windows/d` 应该就能看到原盘符中的文件了，没有文件显示请重启电脑查看第二种方式——永久挂载。

我们需要修改系统文件 `/etc/fstab`，在此之前，我们需要先获得 `/dev/sdb2` 的 `UUID`，执行指令：

```bash
sudo blkid /dev/sdb2
sudo apt-get install vim
sudo vim /etc/fstab#插入形如 UUID=XXXXXXXXXX   /mnt/windows/d   ntfs  defaults   0   2的字段
#其中第一列为UUID, 第二列为挂载目录（该目录必须为空目录），第三列为文件系统类型，第四列为参数，第五列0表示不备份，最后一列必须为２或0(除非引导分区为1)，如果你是grub引导的话，你会注意到boot分区是1.
sudo mount -a#检查一下，发现还是报错，The disk contains an unclean file system，执行下面：
sudo apt-get install ntfs-3g
sudo ntfsfix /dev/sdb2
sudo mount -a#再检查一下，发现全是OK，哈哈
```

上面流程走一遍发现该目录下没有文件，可以右键属性检查一下，如果确实存在，那么重启电脑就OK了，我只挂载了我win的数据盘，系统盘还是不要动的好……

<font size =6>持续总结……</font>

</br>

</br>

### 0x07 Uninstall

用的不习惯当然先卸载了，Emmmmm，哈哈哈哈，卸载比较简单，大家都知道如果你按照下面的链接安装无误的话，启动引导用的是Ubuntu自带的的 `GUN GRUB`，如果你分盘的时候没有选择下面的启动引导设置，那么你第一次启动的时候一定不会进入Ubuntu的系统。

综上所述，我们把 `GUN GRUB`干掉，然后选择磁盘分区的删除卷即可，软件的话，用EasyUEFI，官网下载的话需要梯子，然后我这里如果有时间会给出下载链接，去网上随便下载一个就好了。

</br>

</br>

### 0x08 Ubuntu&Shortcut



用起来切换任务之类的快捷键还是有很多卡顿的，不知道为什么，总是桌面显示的会很慢。



#### 8.1 Desktop

| Operation  |                   Effects                    | Operation |             Effects             |
| :--------: | :------------------------------------------: | :-------: | :-----------------------------: |
|  Alt + F1  | 聚焦到桌面左侧任务导航栏，可按上下键进行导航 | Alt + F2  |            运行命令             |
|  Alt + F4  |                 关闭当前窗口                 | Alt + Tab |          切换程序窗口           |
| Alt + 空格 |                 打开窗口菜单                 |   PrtSc   |            桌面截图             |
|  Win + A   |                搜索/浏览程序                 |    Win    | 搜索/浏览程序、文件、音乐文件等 |
|  Win + F   |                搜索/浏览文件                 |  Win + M  |        搜索/浏览音乐文件        |

#### 8.2 Terminal

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

#### 8.3 Gedit

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

### 0x09 Referance-Linux

1. [解决Nvidia显卡的电脑安装Ubuntu及驱动的各种坑](https://blhttps://blog.csdn.net/ysy950803/article/details/78507892og.csdn.net/ysy950803/article/details/78507892).
2. [sudo apt-get install typora](sudo apt-get install typora).
3. [在ubuntu系统下如何下载和安装Chrome ?](https://www.zhihu.com/question/28027486).
4. [Ubuntu 上使用 SSR 梯子](https://alanlee.fun/2018/05/18/ubuntu-ssr/#%E5%90%AF%E5%8A%A8-SSR).
5. [ubuntu开机卡在logo界面修复](https://blog.csdn.net/weixin_40851278/article/details/82701410).
6. [ubuntu 18.04无法从fwupd下载固件,这个有什么影响吗？](https://tieba.baidu.com/p/5732130742?red_tag=0447802847)。
7. [initramfs-tools出错的解决方案](https://blog.csdn.net/yc1404/article/details/8559852?utm_source=blogxgwz1).
8. [Ubuntu提示boot分区剩余空间不足或boot分区已满](https://blog.csdn.net/songkai320/article/details/78761391).
9. [Ubuntu /boot空间不足时解决办法](https://www.jianshu.com/p/b8e09fa1a387).
10. [ubuntu支持exfat方法](https://www.jianshu.com/p/c0dc9189e991).
11. 在 Linux 下[截屏](https://zhuanlan.zhihu.com/p/45919661)并编辑的最佳工具
12. Ubuntu下的PDF阅读器[okular](https://m.xp.cn/b.php/54038.html)安装使用介绍
13. [Wine](https://wiki.winehq.org/Ubuntu_zhcn)官方网站（上面失效走这）
14. [ubuntu 安装FoxitReader福昕阅读器](https://blog.csdn.net/github_38704428/article/details/79091407).-[点击打开链接](http://blog.topspeedsnail.com/archives/8655)
15. Ubuntu[SSR](https://github.com/qingshuisiyuan/electron-ssr-backup/blob/master/Ubuntu.md)报错
16. 其他linux的[SSR](https://github.com/qingshuisiyuan/electron-ssr-backup/blob/master/issue.md)报错
17. [Ubuntu 换源，安装&卸载软件](https://zhuanlan.zhihu.com/p/27187622)
18. [双系统下 Ubuntu 读写/挂载 Windows 中的硬盘文件 + 解决文件系统突然变成只读](https://jakting.com/archives/ubuntu-rw-windows-files.html)
19. [Ubuntu常用快捷键](https://blog.csdn.net/yzhang6_10/article/details/69569468)总结

</br>

</br>

### 0x09 Referance-Install

1. [安装Ubuntu18.04](https://blog.csdn.net/weixin_45591044/article/details/104157669).
2. [安装SSR](https://github.com/qingshuisiyuan/electron-ssr-backup/releases).-有详细的报错信息

</br>

</br>

### 0x0a Referance-Uninstall

1. **[UEFI启动Windows10+Ubuntu双系统删除Ubuntu方法](http://blog.csdn.net/tjuyanming/article/details/64929901)**
2. **[win10 gpt分区+uefi引导 卸载双系统ubuntu](http://blog.csdn.net/u013427969/article/details/52744688)**

</br>

</br>

### 0x0b Links

[Ubuntu的官方论坛](https://forum.ubuntu.org.cn/).

</br>

</br>

### 0x0c Tips

<center>万物基于<b>wiki.ubuntu.org.cn</b></center>
在对于没有深入了解人类设计的技术前，永远不要过分相信他，就像是你的电脑，在你真正摸清楚他的操作原理和操作逻辑之前，不要过分依赖他，在他面前，你可能就是赤裸的，所以人生啊，多学习一点东西，可能看书会吸收的很慢，但是幸好他永远是没有上限的，如果有瓶颈，突破它就好了，我所真正担心的是我没有足够的时间和精力去见证世间的一切，害怕的是自己不能静下心来慢慢的学习起来，对那些Fest Learner肃然起敬，但同时我始终都不了解真正的自己，永远在以伤害自己的方式来逼迫自己努力，而不是全身心的投入到自己的学习生涯中，这又是多么的可悲，而有的人意识不到这点，何等的讽刺……

</br>

</br>

</br>

win10没全部关闭导致Ubuntu的WiFi模块不可用：https://blog.csdn.net/github_33678609/article/details/86502916

