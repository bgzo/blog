---
title: '[SSR 脚本]'
---

## 前言

- 有时候会自己买VPS搭梯子玩玩，而`ss`/`ssr`/`v2`都已经有非常好用的一键脚本了，以下就记录下用到的一键脚本，方便以后使用；
- 我一般都是都是装`Debain`系统，所以以下记录的都是`Debain`适用的。

## VPS综合性能测试脚本

### Bench.sh

脚本出处：https://teddysun.com/444.html

```bash
wget -qO- bench.sh | bash
```

### SuperBench.sh

脚本出处：https://www.oldking.net/350.html

```bash
wget -qO- --no-check-certificate https://raw.githubusercontent.com/oooldking/script/master/superbench.sh | bash
```

### UnixBench.sh

脚本出处：https://teddysun.com/245.html

```bash
wget --no-check-certificate https://github.com/teddysun/across/raw/master/unixbench.sh
chmod +x unixbench.sh
./unixbench.sh
```

### LemonBench

脚本出处：https://blog.ilemonrain.com/linux/LemonBench.html

```bash
# 快速测试
curl -fsL https://ilemonra.in/LemonBenchIntl | bash -s fast

# 完整测试
curl -fsL https://ilemonra.in/LemonBenchIntl | bash -s full
```

## VPS网络测试脚本

### speedtest-cli

```bash
wget -O speedtest-cli https://raw.githubusercontent.com/sivel/speedtest-cli/master/speedtest.py
chmod +x speedtest-cli
mv speedtest-cli /usr/bin/
```

**常用命令**：

> `speedtest-cli`
> `speedtest-cli --bytes` 以字节计算的方式来测试
> `speedtest-cli --share` 生成图片分享
> `speedtest-cli --simple` 只显示ping和上下行速度
> `speedtest-cli --help` 显示可用命令

### Superspeed

脚本出处：[GitHub](https://github.com/ernisn/superspeed)

```bash
bash <(curl -Lso- https://git.io/superspeed)
```

### MTR

**安装**：

```bash
apt update
apt upgrade
apt install mtr-tiny
```

**使用**：

```bash
mtr -rw ip
```

`ip` 自己替换成本地地址；参数设定可以通过`mtr -h` 查看；更详细解释请看[这篇文章](https://zhuanlan.zhihu.com/p/30591816)

。

## 梯子搭建脚本

### Shadowsocks

脚本出处：https://teddysun.com/486.html

```bash
wget --no-check-certificate -O shadowsocks-all.sh https://raw.githubusercontent.com/teddysun/shadowsocks_install/master/shadowsocks-all.sh
chmod +x shadowsocks-all.sh
./shadowsocks-all.sh 2>&1 | tee shadowsocks-all.log
```

**管理脚本**：`/etc/init.d/shadowsocks-libev start | stop | restart | status`

**配置文件**：`/etc/shadowsocks-libev/config.json`

### ShadowsocksR

脚本出处：https://doub.io/ss-jc42/

```bash
wget -N --no-check-certificate https://softs.wtf/Bash/ssr.sh && chmod +x ssr.sh && bash ssr.sh

# 备用地址
wget -N --no-check-certificate https://raw.githubusercontent.com/WithdewHua/doubi/master/ssr.sh && chmod +x ssr.sh && bash ssr.sh
```

**运行脚本**：`bash ssr.sh`

**管理脚本**：`/etc/init.d/ssr start| stop | restart | status`

**配置文件**：`/etc/shadowsocksr/user-config.json`

### V2Ray

脚本出处：https://v2ray666.com/post/1/

```bash
bash <(curl -s -L https://v2ray666.com/v2ray.sh)
```

> 如果提示 curl: command not found, 先执行`apt-get update -y && apt-get install curl -y`

**运行脚本**：`V2Ray`

**管理脚本**：[![1.png](data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAABS2lUWHRYTUw6Y29tLmFkb2JlLnhtcAAAAAAAPD94cGFja2V0IGJlZ2luPSLvu78iIGlkPSJXNU0wTXBDZWhpSHpyZVN6TlRjemtjOWQiPz4KPHg6eG1wbWV0YSB4bWxuczp4PSJhZG9iZTpuczptZXRhLyIgeDp4bXB0az0iQWRvYmUgWE1QIENvcmUgNS42LWMxMzggNzkuMTU5ODI0LCAyMDE2LzA5LzE0LTAxOjA5OjAxICAgICAgICAiPgogPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4KICA8cmRmOkRlc2NyaXB0aW9uIHJkZjphYm91dD0iIi8+CiA8L3JkZjpSREY+CjwveDp4bXBtZXRhPgo8P3hwYWNrZXQgZW5kPSJyIj8+IEmuOgAAAA1JREFUCJljePfx038ACXMD0ZVlJAYAAAAASUVORK5CYII=)](https://i.loli.net/2018/09/15/5b9be87e3e250.png)

**配置文件**：/etc/v2ray/config.json

## 梯子优化

### Debain 9+ 开启 BBR 等

```bash
echo "vm.swappiness = 10" >> /etc/sysctl.conf
echo "net.core.default_qdisc = fq" >> /etc/sysctl.conf
echo "net.ipv4.tcp_congestion_control = bbr" >> /etc/sysctl.conf
echo "net.ipv4.tcp_fastopen = 3" >> /etc/sysctl.conf
sed -i '$a root hard nofile 1024000\nroot soft nofile 1024000' /etc/security/limits.conf
sed -i '$a * hard nofile 1024000\n* soft nofile 1024000' /etc/security/limits.conf
ulimit -n 1024000
sysctl -p
```

### BBR脚本

脚本出处：https://doub.io/wlzy-16/

```bash
wget -N --no-check-certificate https://raw.githubusercontent.com/ToyoDAdoubi/doubi/master/bbr.sh && chmod +x bbr.sh && bash bbr.sh

# 备用地址
wget -N --no-check-certificate https://raw.githubusercontent.com/WithdewHua/doubi/master/bbr.sh && chmod +x bbr.sh && bash bbr.sh
```

### 暴力BBR脚本

脚本出处：https://www.moerats.com/archives/523/

```bash
wget https://raw.githubusercontent.com/iiiiiii1/tcp_nanqinlang-test/master/tcp_nanqinlang-test.sh
bash tcp_nanqinlang-test.sh
```

## 致谢

以上脚本基本上都给了作者博客文章的链接，衷心感谢[秋水逸冰](https://teddysun.com)

、[Toyo233](https://doub.io)、[OldKing](https://www.oldking.net)、[南琴浪](https://github.com/tcp-nanqinlang)、[AI](https://v2ray666.com)等几位大佬写的脚本。