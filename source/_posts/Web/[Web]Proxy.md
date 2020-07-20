---
title: '[Web] Proxy'
date: 2020-07-14 09:18:00
toc: true
---



### Git

```bash
git config --global https.proxy  http://127.0.0.1:1087
git config --global http.proxy  http://127.0.0.1:1087

#ss
git config --global http.proxy 'socks5://127.0.0.1:1087'
git config --global https.proxy 'socks5://127.0.0.1:1087'

git config --global  --get http.proxy
git config --global  --get https.proxy

git config --global --unset http.proxy
git config --global --unset https.proxy
```





### Yarn

```bash
yarn config list

yarn config set https-proxy http://127.0.0.1:1087
yarn config set proxy http://127.0.0.1:1087

yarn config delete proxy
yarn config delete https-proxy
```







### npm

```bash
npm config list

npm config set proxy  http://127.0.0.1:1087
npm config set https-proxy http://127.0.0.1:1087

npm config delete proxy
npm config delete https-proxy
```



linux 全局安装 Hexo 居然还需要 Sudo 是我没有想到的. 

```
npm WARN deprecated hexo-bunyan@2.0.0: Please see https://github.com/hexojs/hexo-bunyan/issues/17
/usr/local/bin/hexo -> /usr/local/lib/node_modules/hexo-cli/bin/hexo
npm WARN optional SKIPPING OPTIONAL DEPENDENCY: fsevents@~2.1.2 (node_modules/hexo-cli/node_modules/chokidar/node_modules/fsevents):
npm WARN notsup SKIPPING OPTIONAL DEPENDENCY: Unsupported platform for fsevents@2.1.3: wanted {"os":"darwin","arch":"any"} (current: {"os":"linux","arch":"x64"})
npm WARN optional SKIPPING OPTIONAL DEPENDENCY: good-listener@^1.2.2 (node_modules/hexo-cli/node_modules/clipboard/node_modules/good-listener):
npm WARN optional SKIPPING OPTIONAL DEPENDENCY: sha1-1TswzfkxPf+33JoNR3CWqm0UXFA= integrity checksum failed when using sha1: wanted sha1-1TswzfkxPf+33JoNR3CWqm0UXFA= but got sha512-QpGW37eDFd+i2NIhe/OPlzgIMD0NiPE3PJcN3Gh0FxgFp0zPr6i+7+9jhhsbXoAQRR8Ab08jR1Iyk+OmhzAhrg== sha1-aCdPuD7hUb1vycIqaN0bonlSivA=. (4759 bytes)

+ hexo-cli@3.1.0
added 78 packages from 322 contributors in 233.62s

```



### Bash

使用环境变量, `~/.bashrc` 的尾部:

#### HTTP

|  环境变量   | 描述                                                         | 值示例                                                       |
| :---------: | :----------------------------------------------------------- | :----------------------------------------------------------- |
| http_proxy  | 为http网站设置代理；                                         | 10.0.0.51:8080; <br />user:pass@10.0.0.10:8080 <br />socks4://10.0.0.51:1080<br /> socks5://192.168.1.1:1080 |
| https_proxy | 为https网站设置代理；                                        | 同上                                                         |
|  ftp_proxy  | 为ftp协议设置代理；                                          | socks5://192.168.1.1:1080                                    |
|  no_proxy   | 无需代理的主机或域名； 可以使用通配符； 多个时使用“,”号分隔； | \*.aiezu.com,10.\*.\*.\*,192.168.\*.\*, <br />\*.local,localhost,127.0.0.1 |

```bash
export http_proxy=10.0.0.52:8080 # 为http站点设置http代理（默认）

export http_proxy=socks://10.0.0.52:1080 # # 设置 socks 代理，自动识别socks版本
export http_proxy=socks4://10.0.0.52:1080 # 设置 socks4 代理
export http_proxy=socks5://10.0.0.52:1080 # 设置 socks5 代理

export http_proxy=user:pass@192.158.8.8:8080 #代理使用用户名密码认证
```



#### HTTPS

　　如果需要为https网站设置代理，设置*https_proxy*环境变量即可；设置方法完全与*http_proxy*环境变量相同：

```bash
# 任意使用一项
export https_proxy=10.0.0.52:8080
export https_proxy=user:pass@192.158.8.8:8080
export https_proxy=socks://10.0.0.52:1080
export https_proxy=socks4://10.0.0.52:1080
export https_proxy=socks5://10.0.0.52:1080

curl -I http://www.fackbook.com # 测试代理
```



