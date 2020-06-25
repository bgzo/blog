---
title: '[V2ray]'
---



**[链接]:**

1. https://vpsland.xyz/
2. **[更好]** https://233v2.com/



关于自建VPN翻墙教程，本文是利用V2ray的一个VPS搭建VPN教程。仅供交流和学习使用。



### 

**前提：搭建之前首先要做两件事**

1. 注册VPS服务器 【[Vultr主机](https://vpsland.xyz/vultr/) / [BWH主机](https://vpsland.xyz/get-bwh/) / [HostWinds主机](https://vpsland.xyz/get-hostwinds/) 都可以】
2. [用SSH工具连接进入VPS主机服务器](https://vkuajing.net/ssh-vps-link/)

------

#### **第一、VPN的设置及连接**

1. 避免VPS没装Curl，保险起见运行一下 Curl的安装命令, 两种系统下随便用一个命令就可以。**

ubuntu/debian 系统下 【我现在的版本是 CentOS7，所以**不用**这个命令]

centos 系统下 【我现在的版本是 CentOS7，所以**用**这个命令】

> yum install curl -y

**2.右键复制粘贴如下代码，只能鼠标右键粘贴，Ctrl + V不管用**

> bash <(curl -s -L https://git.io/v2ray.sh)

粘贴后，Enter， 进入下列菜单,  输入 1 按 Enter 继续,  V2Ray的功能比较多，我们不用管,  看到以下界面直接按 Enter 继续,  继续 Enter  继续 Enter  继续 Enter,  等个几十秒，根据电脑性能不同等待时间不同，

**3. 看到如下界面之后 ，**

输入 v2ray url 复制出来 Vmess Url 【选中后用鼠标右键复制],  复制黄色区域 / 鼠标右键复制



#### **第二、 V2ray 的连接 【以Windows为例]**

下载 V2ray 软件: https://github.com/vkuajing/v2ray

下载 v2rayN-Core.zip 到桌面解压

打开 V2rayN 程序,  添加 Vmess 服务器,  复制刚才复制的代码 Vmess地址,  我把这个共享在 Free SS 资源  有需要的直接拿来用，也可以用来测试下速度,  从剪切板导入URL ； 点确定,  回到V2ray 主界面，这里多了一个 新的服务器,  参数设置 2333,  点确定,  和 SS类似，右键点图标启用即可，有风险提示，就点允许,  连接完成













