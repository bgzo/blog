关于在VPS服务器上安装SSR服务端，网上有众多一键安装脚本供我们选择，所以安装过程比较简单。这里我们以teddysun的一键安装为例，简单介绍下RSS服务器端的安装。



备用：极少部分用户，如果遇到安装失败或安装后无法正常使用的情况，可以尝试另一个版本：逗比SSR一键安装脚本



本一键安装脚本为服务器端使用，即SSR服务端一键安装。



服务器系统：CentOS6及以上、Debian7及以上、Ubuntu12及以上系统内存支持128M及以上，推荐256M起步。



```
wget --no-check-certificate -O shadowsocks-all.sh https://raw.githubusercontent.com/teddysun/shadowsocks_install/master/shadowsocks-all.shchmod +x shadowsocks-all.sh
./shadowsocks-all.sh 2>&1 | tee shadowsocks-all.log
```



```
CentOS：yum -y install wget
# Ubuntu/Debian：
apt-get -y install wget
```



1. 提示选择哪个版本安装，我们输入2后按回车，即选择SSR安装。
2. 然后会提示设置RSS密码，输入自定义密码后按回车，建议不要使用默认密码。
3. 接下来选择RSS要使用的服务器端口，随便输入一个，也可以默认回车
4. 然后选择加密方式，如果选择chacha20的话，就输入对应序号12，按回车继续。
5. 接下来选择协议，建议选择自auth aes128md5开始以下的几种，输入对应序号按回车。
6. 然后选择混淆方式，如下图所示，选择好后按回车。
7. 以上参数选择完成后，按任意键开始安装。
8. 安装完成后，会有如下图安装成功的提示，记住刚才设置的各项参数，在客户端连接时需要用到。
9. 经过以上几个简单的参数选择后，SSR服务器端已经自动安装成功了。保险起见，输入reboot重启VPS服务器，RSS会自动随系统重启。



Putty连接至VPS服务器，分别运行如下各命令：



```
# 启动Rss：
/etc/init.d/shadowsocks-r start
# 退出Rss：
/etc/init.d/shadowsocks-r stop
# 重启RSs：
/etc/init.d/shadowsocks-r restart 
# Rss状态：
/etc/init.d/shadowsocks-r status
# 卸载RSS：
./shadowsocks-all.sh uninstall
```



另外如果需要更改SSR的相关配置参数，配置文件位置在：/etc/shadowsocks-r/config.json