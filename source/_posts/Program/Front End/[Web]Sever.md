---
title: '[Web] Sever'
date: 2020-04-16 15:15:00
toc: true
---

<center><font size=2 color=grey>CD : 2020‎.02‎.02‎ 21:43:43</font></center>
</br>

## 0x00 Proface

首先是购买环节，这里有全球域名购买[索引](https://www.jianshu.com/p/aff58882bf00)，更新一些必要的常识：

1. **域名**备案
2. CDN
3. 对象存储
4. 内网穿透

其实服务器都有图形界面，if you need.然后我的感受其实相同配置下Linux类操作SSH比Win流畅，Win的远程桌面比Linux流畅，但是后者比较吃配置，很有意思。Win建站可以采用`Window+IIS`,Linux可以采用`LASP `和`LNSP`的方法，我用的是后者，因为处理并发的时候后者较强，虽然没有几个人访问我的站点。有个便宜的 vps frp 穿透 本地存图 使用第三方 cdn 基本就完美了。程序员内卷严重，坐个地铁都能听见好几个人打电话讨论程序员的东西

程序员内卷严重，坐个地铁都能听见好几个人打电话讨论程序员的东西

</br>

</br>

## 0x01 Sever

### 1.1 检查宕机操作

以下下代码可用性未知，想到的一种好的方法就是用Ping的方式，后续如果摸索出来再来更新。

```shell
#!/bin/bash
mail=1551728654@qq.com
while true
   do ping -c 2  >/dev/null 2>&1
   if [ $? -ne 0 ];then
     echo " |mail-s "ping baidu is down" $mail
     else
      echo "baidu is ok"
      fi;
      sleep 30
      done
```

</br>

### 1.2 pv访问

First,What the PV、TPS、QPS、RPS?

PV is a abbreviate of Page View , so a pv each refresh.

TPS=transactions per second(事务数,客户端发起请求到收到服务端最终响应的整个过程)

QPS=queries per second(查询次数,所以，一个TPS可能包含多个QPS)

RPS=requests per second

**MODEL：**

<center>(Sever Process Page Request /s) QPS=( 0.8*ALL_PR / 86400*0.4 )/Sever_Num</center>
注意：

1. 86400=24\*60\*60
2. 0.8、0.4表示一天中有80%的请求发生在一天的40%的时间内。24小时的40%是9.6小时，有80%的请求发生一天的9.6个小时当中（很适合互联网的应用，白天请求多，晚上请求少）

**简单可以获得初步的比较标准**：

<center>( 0.8*500万 / 86400*0.4 )/1 = 115.7  QPS</center>
<center>( 0.8*100万 / 86400*0.4 )/1 = 23.1  QPS</center>
如果你的服务器一秒能处理115.7个请求，就可以承受500万PV/每天。如果你的服务器一秒能处理23.1个请求，就可以承受100万PV/每天。但是实际上这样子理想情况只是我们的假设，实际上的访问量是一个正态分布曲线，而不是一个恒定走向的直线，所以需要在原有的基础上缩水放大，最终结论：

<center> 115.7 * 2 = 231.4 QPS</center>
<center> 115.7 * 3 = 347.1 QPS</center>
<center> 23.1 * 2 = 46.2 QPS</center>
<center> 23.1 * 3 = 69.3 QPS</center>
<font color ="red">如果你的服务器一秒能处理231.4--347.1个 QPS，就可以应对平均500万PV/每天。如果你的服务器一秒能处理46.2--69.3个 QPS，就可以应对平均100万PV/每天。</font>

再让我们看看1M宽带代表着什么？他的单位是B，所以1\*1024/8=128KB/s，所以大概可以用于文字博客的发布，像是页头视频那就别想了，加载个首页得上10s……要不然搭个炫酷的博客也很烧钱，虽然和过去12年烧的钱比起来不值一提……

</br>

</br>

</br>

## 0x02 Linux

**Linux** **系统内核**指的是一个由 Linus Torvalds 负责维护，提供硬件抽象层、硬盘及文件系统控制及多任务功能的系统核心程序。

**Linux** **发行套件系统**是我们常说的 Linux 操作系统，也即是由 Linux 内核与各种常用软件的集合产品

**Linux** **发行套件系统**全球有上百款，主要的如下：

<img src="http://i.dfslfh.cn/LINUX.png"  style="zoom:33%;"  >



补充一下：deepin是Debain的稳定版本的Linux发行版本之一，由武汉深之度科技有限公司开发的开源操作系统，其实他为中国的Linux软件层面做出了很大的贡献，很符合国人的操作习惯。所有发行版**都是使用Linux内核**；都需要遵循GNU的GPL协定；所有的发行版都有自己的版本号，版本格式约定基本一样（**主版本号.次版本号.发行号.修正号**）。本质区别在于**继承不同版本的内核**，**库**、**程序的组成**。不同发行版几乎采用了不同**包管理器**（**SLES、Fedora、openSUSE、centos、RHEL**使用**rmp**包管理系统，包文件以RPM为扩展名；Ubuntu系列，Debian系列使用基于**DPKG**包管理系统，包文件以deb为扩展名。

一些命令见参考。

</br>

</br>

## 0x03 Hard Diff

### 3.1 LS

SSH服务器目录会有颜色：

> **白色**：普通文件
>
> **蓝色**：目录
>
> **绿色**：可执行文件
>
> **红色**：压缩文件
>
> **浅蓝色**：链接文件
>
> **红色闪烁**：链接的文件有问题
>
> **黄色**：设备文件
>
> **灰色**：其他文件

**绿色**是有问题的，代表权限中有其它组权限拥有写入权限，系统默认这是一个高风险目录。将权限改到775以下就可以解决。

<img src="https://s2.ax1x.com/2020/02/18/3FFaMn.png" alt="3FFaMn.png" style="zoom:50%;" />

</br>

## 0x04 FAQ

> Q：ECS or 轻量服务器（馋5M带宽）

A：参考链接：https://www.zhihu.com/question/321378304 ， https://www.zhihu.com/question/365407782

主要如下：

**1、使用对象：**轻量应用服务器面向单机应用，云服务器ECS则未做任何限制；

**2、可扩展性：**轻量应用服务器提供的配置仅有少量的几个可供选择，升配局限较大；云服务器ECS提供数十种类型上百种配置可供选择，并且支持升级，同时ECS支持搭配其他应用如RDS、OSS来使用；

**3、网络：**轻量应用服务器面向对象是单机，基本不存在网络的扩展问题；云服务器ECS在专有网络VPC下，用户可以自定义专有网络，并且可以通过网络与线下IDC或者其他云产品进行互联互通；

云服务器ECS给学生提供更大的容错空间，也方便学生学习使用；

</br>

</br>

## 0x05 Sitemap

参考链接：https://zhuanlan.zhihu.com/p/36665620

生成网站地图其实很简单，首先打开“[站长工具_sitemap网站地图免费生成工具](https://link.zhihu.com/?target=https%3A//sitemap.webkk.net)”([https://sitemap.webkk.net](https://link.zhihu.com/?target=https%3A//sitemap.webkk.net))，按照页面的一些提示做下一步操作。

一、选择网站协议，（HTTP、HTTPS）；

二、键入网址；

三、选择您网站的字符集；

四、如果您有过使用记录，有更新，需要勾选更新数据按钮从头抓取；

五、下载对应HTML、XML、TXT格式的网站地图文件。

抓取的时候有一点需要注意，如果之前使用了这个工具，刚好下次使用的时候网站有内容更新，应该在页面上候选上 更新数据。

</br>

</br>

## 0x0 Reference

Linux建站参考：

1. [Windows 服务器配置、运行、图文流程(新手必备!) - IIS建站配置一条龙](https://blog.csdn.net/ChinarCSDN/article/details/79588171)，Chinarcsdn

2. [【腾讯云的1001种玩法】如何使用腾讯云做博客 ](https://cloud.tencent.com/developer/article/1004505)，云+社区 - 腾讯云

Linux难点参考：

1. [常见Linux的发行版及不同发行版之间的联系与区别](https://zhuanlan.zhihu.com/p/59867621)，Jerry.Guo
2. [Linux下的tar压缩解压缩命令详解](https://www.cnblogs.com/manong--/p/8012324.html)，码农一只
3. [在 Linux 终端快速检测网站是否宕机的 6 个方法](https://zhuanlan.zhihu.com/p/96460221)，Linux中国

Linux命令参考：

1. [Linux命令](https://man.linuxde.net/)大全
2. [菜鸟教程](https://www.runoob.com/linux/linux-tutorial.html)Linux
3. [智商税](https://www.linuxprobe.com/)Linux，但可朴
4. [撸](https://www.lulinux.com/archives/category/linux_newbie)Linux-新手开撸

Sever参考

1. [(转载)如何计算服务器能够承受多大的pv](https://cloud.tencent.com/developer/article/1463836)-用户1499526
2. [PV、TPS、QPS是怎么计算出来的？](https://www.zhihu.com/question/21556347).

</br>

</br>

## 0x0 Afterwards

关于我看书的一个遐想（其实也确实如此，至少Wiki上面已经提过）——早期多人共享一台计算机，共享的系统可能就是Unix或者Linux，而不会是win，因为Unix可比Win出现的要早啊，

1. **PC和操作系统一次只能供一个用户使用**。即使您可以物理连接外围设备（例如USB集线器），**操作系统仍然只能渲染一个台式机**，随之而来的是欢闹声。
   PCs are designed for one user at a time as are operating systems. Eve n if you could physically get the peripherals connected (eg. USB hub), the OS would still only render one desktop and hilarity would ensue. 

2. 在操作系统级别，来自多个连接的键盘或鼠标的输入被解释为来自单一来源。如果要使用多个鼠标和键盘，则任何尝试读取输入的应用程序都必须降低级别。 
   On the OS level, the input from multiple connected keyboards or mice is interpreted as coming from a single source.

   If you wanted to use multiple mice and keyboards, then whatever application is trying to read the inputs would have to go to a lower level.

最便宜的方法是拥有多台PC。如果要控制事物，以使用户拥有相同的桌面，相同的应用程序和共享资源，则可能需要考虑一个带有Windows域的小型办公服务器。

期待更多内容请参考其他博客：https://blog.csdn.net/shuaishuai80/article/details/6202508

</br>