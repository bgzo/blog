---
title: '[Clash]Subconverter'
---
#### Subconverter[^1] [^2]

借助 subconverter 对机场的节点进行挑选以满足需求。

Clash `Dev` 分支增加了 proxy-provider 功能，可以通过托管链接获取节点信息，类似于 Surge 的 node list。

正好，这个功能可以解决我的问题，可以在我自己的 clash 配置文件的基础上，快速添加上机场的节点并保持更新。

### 写法介绍

来自 [Clash Proxy Provider](https://www.notion.so/Clash-Proxy-Provider-ff8d1955f6234ad3a779fecd3b3ea007)

```yaml
proxy-provider:
    name: # provider 名字
        type: # provider 类型，可以是 http 或者 file，分别为远程链接和本地文件。
        path: # 文件保存路径，可以为绝对路径，./ 相对于 clash home 文件夹
        url: # 类型为 http 时，填写的 URL 链接
        interval: # 类型为 http 时，订阅自动更新周期
        health-check: # 健康检查选项
            enable:    # true or false
            url: # 测试地址，可以为 http://www.gstatic.com/generate_204
            interval: # 测试间隔
```

其中，`url` 或者 `file` 类型的 provider 中节点写法如下：

```yaml
proxies:
  - {name: 1, server: 1.1.1.1, port: 34119, type: ss, cipher: rc4-md5, password: 3M3duq}
  - {name: 2, server: 1.1.1.2, port: 34119, type: ss, cipher: rc4-md5, password: 3M3duq}
  - {name: 3, server: 1.1.1.3, port: 35119, type: ss, cipher: rc4-md5, password: 3M3duq}
  - {name: 4, server: 1.1.1.4, port: 35119, type: ss, cipher: rc4-md5, password: 3M3duq}
```

### 使用示例

```yaml
# proxy-provider 字段
proxy-provider:
  example:
    type: http
    path: ./example.yaml
    url: https://example.com    # clash provider 订阅链接
    interval: 3600
    health-check:
        enable: true
        url: http://www.gstatic.com/generate_204
        interval: 300

# 在 Proxy Group 中使用 proxy-provider
Proxy Group:
  - name: PROXY
    type: select
    use:    # 引入 proxy-provider 使用 use 关键字
      - example    
```

## Subconverter

+ subconverter https://github.com/tindy2013/subconverter

使用了 proxy-provider，虽然可以很方便的引入节点，但是，就目前而言，少有机场会直接提供 provider  链接。同时，机场的线路过多，并不都是自己需要的。就拿我的需求来说，我为了看台湾爱奇艺，我仅仅需要台湾线路而已，并不想要引入别的节点。那么就可以使用 subconverter 这个项目了，可以方便的转换各种订阅格式，也可以利用正则进行节点的选择。本地或者部署在服务器端都很方便，这里我部署在了服务器上，方便分享给大家使用。

#### 服务器部署

简单记录下部署过程，不感兴趣的可以直接略过

```bash
# 1. 下载最新版 subconverter, 选择系统合适的压缩包
wget https://github.com/tindy2013/subconverter/releases/latest/download/subconverter_linux64.tar.gz

# 2. 解压
tar -xvf subconverter_linux64.tar.gz    # 解压后可以得到subconverter 可执行二进制文件
# 直接执行 ./subconverter 即可运行，默认监听 0.0.0.0:25500
# 这里的话，准备使用 443 端口，方便使用 HTTPS，但是服务器上已经有了 LNMP 环境了， 443 由 nginx 监听，所以采用反代的方式
# 3. 修改 pref.ini 中监听地址
vim pref.ini
# 修改 server 字段如下
[server]
;Address to bind on for Web Server
listen=127.0.0.1

;Port to bind on for Web Server
port=25500

# 如果是使用 LNMP 一键包或者 oneinstack，可以很方便申请 SSL 、生成 nginx 站点配置文件等，就不再说明了，这里简单说明下没有一键包的情况
# 4. 生成 ssl 证书，以启用 https，推荐使用 acme.sh 免费申请及自动续签
# 申请前请确保域名已经成功解析到了 VPS IP 上
# > 4.1 下载并执行 acme.sh 脚本
curl https://get.acme.sh | sh
# > 4.2 生成证书，这只是一种方式，其他方式可以自行搜索
apt install socat # debian 系为例
acme.sh  --issue -d api.10101.io  --standalone    # 以 api.10101.io 为例
# > 4.3 将生成的证书拷贝安装到指定文件夹
acme.sh  --installcert  -d  api.10101.io   \
        --key-file   /etc/ssl/api.10101.io.key \
        --fullchain-file /etc/ssl/fullchain.cer 
# 5. nginx 配置
# > 5.1 新建一个 nginx 站点文件 api.10101.io.conf，内容大致如下
server {
    listen       443 ssl;
    server_name  api.10101.io;
    ssl_certificate    /etc/ssl/fullchain.cer;
    ssl_certificate_key    /etc/ssl/api.10101.io.key;
    ssl_protocols TLSv1 TLSv1.1 TLSv1.2 TLSv1.3;
      ssl_ciphers TLS13-AES-256-GCM-SHA384:TLS13-CHACHA20-POLY1305-SHA256:TLS13-AES-128-GCM-SHA256:TLS13-AES-128-CCM-8-SHA256:TLS13-AES-128-CCM-SHA256:EECDH+CHACHA20:EECDH+AES128:RSA+AES128:EECDH+AES256:RSA+AES256:EECDH+3DES:RSA+3DES:!MD5;
    ssl_prefer_server_ciphers on;
    ssl_session_cache shared:SSL:10m;
    ssl_session_timeout 10m;
    error_page 497  https://$host$request_uri;
location / {
    proxy_pass       http://127.0.0.1:25500;    # 对应 pref.ini 里的配置
    proxy_set_header Host      $host;
    proxy_set_header X-Real-IP $remote_addr;
    }
}
# > 5.2 重载 nginx
service nginx reload

# 6. 采用 pm2 来管理后台运行和开启自启
# > 6.1 安装 pm2
wget -qO- https://getpm2.com/install.sh | bash
# > 6.2 启动 subconverter 
pm2 start subconverter
# > 6.3 生成启动脚本
pm2 startup
pm2 save
```

#### API 使用介绍

这里分享出我使用该项目搭建的 API：`https://api.10101.io`

**API 主要使用场景**：

- 不同格式订阅 / 托管之间的转换（Surge、Clash、Quantumult(X)、SSD、SS等），包括输出 Surge list 或者 Clash proxy provider；
- 为节点添加国旗 Emoji；
- 合并多个机场订阅或者多个链接；
- 利用正则挑选节点；

我根据自己需要调整了 Proxy Group，如果使用该 API 得到的基础策略组如下，规则使用的是神机规则：

```
🚥Final=select, 🌕PROXY, DIRECT
🌕PROXY=select, ♻️ Fallback
🎞 GlobalMedia=select, 🌕PROXY
🎬 HKMTMedia=select, DIRECT, 🌕PROXY
🍏Apple=select, DIRECT, 🌕PROXY
💰️PayPal=select, 🌕PROXY, DIRECT
♻️ Fallback=fallback
```

API 的具体使用方法这里就不再说明了，详见 [subconverter](https://github.com/tindy2013/subconverter/blob/master/README-cn.md)

#### Provider + API 使用实例

前面说了，我只需要机场中的台湾节点并加入到`🎬 HKMTMedia`组中即可。作为示例，我再多加一个美国节点 provider，用于 `💰️PayPal` 策略组。

首先，利用 API 筛选节点：

```toml
# 需要用到的参数有：
target=clash    # 转换结果为 clash 配置
url=https://nfnf.xyz/link/abcdefg?mu=4    # 机场订阅链接
include=(TW|台湾|台灣)    # 只匹配台湾节点
list=true    # 生成 provider 链接

# 将 url 和 include 内容均 urlencode：
url=https%3a%2f%2fnfnf.xyz%2flink%2fabcdefg%3fmu%3d4
include=(TW%7c%e5%8f%b0%e6%b9%be%7c%e5%8f%b0%e7%81%a3)

# 将参数拼接起来得到新的订阅链接——只包含台湾节点的 provider 链接
https://api.10101.io/sub?target=clash&url=https%3a%2f%2fnfnf.xyz%2flink%2fabcdefg%3fmu%3d4&include=(TW%7c%e5%8f%b0%e6%b9%be%7c%e5%8f%b0%e7%81%a3)&list=true

# 同理可得到只包含美国节点的 provider 链接
https://api.10101.io/sub?target=clash&url=https%3a%2f%2fnfnf.xyz%2flink%2fabcdefg%3fmu%3d4&include=(US%7c%e7%be%8e%e5%9b%bd)&list=true
```

然后编写我的 clash 配置文件，加入 provider：

```yaml
# proxy-provider
proxy-provider:
  TW:
    type: http
    path: ./tw.yaml
    url: https://api.10101.io/sub?target=clash&url=https%3a%2f%2fnfnf.xyz%2flink%2fabcdefg%3fmu%3d4&include=(TW%7c%e5%8f%b0%e6%b9%be%7c%e5%8f%b0%e7%81%a3)&list=true
    interval: 3600
    health-check:
        enable: false
        url: http://www.gstatic.com/generate_204
        interval: 300
  US:
    type: http
    path: ./us.yaml
    url: https://api.10101.io/sub?target=clash&url=https%3a%2f%2fnfnf.xyz%2flink%2fabcdefg%3fmu%3d4&include=(US%7c%e7%be%8e%e5%9b%bd)&list=true
    interval: 3600
    health-check:
        enable: false
        url: http://www.gstatic.com/generate_204
        interval: 300


# 在 Proxy Group 中 🎬 HKMTMedia 组和 💰️PayPal 中引入 provider
Proxy Group:
  - name: 🎬 HKMTMedia
    type: select
    proxies:
      - DIRECT
    use:
        - TW    # provider
  - name: 💰️PayPal
    type: select
    use:    
      - US    # provider
    proxies:    # 以下为自建节点
      - 🇺🇸BWG-DC6
      - 🇺🇸Spartan
      - DIRECT
```


**参考资料**：

[^1]:https://www.notion.so/Clash-Proxy-Provider-ff8d1955f6234ad3a779fecd3b3ea007
[^2]:https://10101.io/2020/02/12/use-clash-proxy-provider-with-subconverter