---
title: "Electron"
date: 2020-08-20T19:35:43+08:00
draft: false
dropcap: false
tags:
- Tool
---

[Electron](https://github.com/electron/electron), html/css/js的跨平台应用开发框架, 额外需要用到[NodeJS](http://nodejs.cn/learn), 一开始使用是小学期作业如果写出图形界面可以获得加分, 但是因为自己写的实在写的有点拖沓, 没有时间赶工这个点了, 放假之后拿出来重新着手去做.

```shell
$ npm install electron -g
$ npm install electron --save-dev
$ npm install electron -g --unsafe-perm
$ sudo npm npm install electron -g
$ sudo npm npm install electron -g --unsafe-perm
```

一开始最让我厌烦的是国内局域网下载困难的问题, 服务资源都在墙外, 怎么也同步不下来, 网络总是卡在 `node install.js` 的 `download electron-linux-x64.zip`, 当然校园网当时也占一部分因素. 但是幸运的是, Alibaba 有官方的 CNPM 替代物<sup>[1](#j1)</sup>., 或者直接使用 `npm config set registry http://registry.npm.taobao.org` 永久设置/ `~/.npmrc` 加上 `electron_mirror="https://npm.taobao.org/mirrors/electron/"`<sup>[2](#j2)</sup>; 或者 `npm install your-model --registry=http://registry.npm.taobao.org` 临时设置源. 相信我, 这是唯一最优的方法.<sup>[4](#j4)</sup>

```shell
$ npm config set proxy url
$ npm config delete proxy
# Or You could 
$ vim ~/.npmrc
# Add `electron_mirror="https://npm.taobao.org/mirrors/electron/`
```
<!--more-->

下面是我参考的教程, 由衷的感谢:

1. https://github.com/tal-tech/electron-playground/tree/0.0.3
2. https://jspang.com/detailed?id=62

## DEMO

你永远不会知道我这个垃圾用了四天的时间完成这个Demo, 因为各种不确定因素叠加, 太难受了, 试例如下<sup>[3](#j3)</sup>:

```shell
$ npm init
$ vim index.html
```
```html
<!DOCTYPE html>
<html lang="en">
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Text</title>
    </head>

    <body>
        <center> <h1> Hello, Electron!!! </h1></center>
    </body>
</html>
```
`$ vim index.js`

```javascript
//version 1.0
const { app, BrowserWindow } = require('electron')
const path = require('path')

app.on('ready', function(){
  const window = new BrowserWindow()
  window.loadFile(path.resolve(__dirname, 'index.html'))
})

//version 2.0
var electron= require('electron') //引入electron
var app=electron.app // 创建引用
var BrowserWindow = electron.BrowserWindow // 创建窗口应用
var mainWindow=null;//声明要打开的主窗口
app.on('ready',()=>{
    mainWindow=new BrowserWindow({
        width:800, 
        height:800,
    //     webPreferences: {//最新的electron@5.0系列中，nodeIntegration参数默认是false。而在以前版本的electron中，这个nodeIntegration参数，默认为true。
    //     nodeIntegration: true
    // }
    }) // 设置窗口大小
    mainWindow.loadFile('index.html') //加载这个页面
    mainWindow.on('closed',()=>{////监听关闭事件，把主窗口设置为null
        mainWindow = null
    })
})
```

`$ electron .` Okay!

## Webpack

> 主进程和渲染进程改如何调试？我想用最新的ES特性该怎么做？想用TypeScript该怎么配置？想用React，Vue，Angular来写UI呢？






















### Nodejs

```javascript
const http = require('http')

const hostname = '127.0.0.1'
const port = 3000

const server = http.createServer((req, res) => {//会创建新的 HTTP 服务器并返回它
  res.statusCode = 200
  res.setHeader('Content-Type', 'text/plain')
  res.end('你好世界\n')
})

server.listen(port, hostname, () => {
  console.log(`服务器运行在 http://${hostname}:${port}/`)
})
```

每当接收到新的请求时，[`request` 事件](http://nodejs.cn/api/http.html#http_event_request)会被调用，并提供两个对象.

+ 一个请求（[`http.IncomingMessage`](http://nodejs.cn/api/http.html#http_class_http_incomingmessage) 对象）提供了请求的详细信息。 在这个简单的示例中没有使用它，但是你可以访问请求头和请求数据。

+ 一个响应（[`http.ServerResponse`](http://nodejs.cn/api/http.html#http_class_http_serverresponse) 对象）用于返回数据给调用方。





### Electron

使用[`ipcRenderer`](https://www.electronjs.org/docs/api/ipc-renderer) 和 [`ipcMain`](https://www.electronjs.org/docs/api/ipc-main)模块发送消息

使用 [remote](https://www.electronjs.org/docs/api/remote)模块进行RPC方式通信

RPC方式通信

[web页面间如何共享数据](https://www.electronjs.org/docs/faq#how-to-share-data-between-web-pages)。

主进程和渲染进程中，你可以通过require的方式将其包含在模块中以此，获取Electron的API

```cpp
const electron = require('electron')
```

+ 主进程或渲染进程
+ 一些API可以同时在两种进程中使用. 每一个API的文档都将声明你可以在哪种进程中使用该API。
+ Electron通过`remote`模块暴露一些通常只能在主进程中获取到的API。 为了在渲染进程中创建一个`BrowserWindow`的实例，我们通常使用remote模块为中间件：


同时对主进程和渲染进程暴露了Node.js 所有的接口

1)所有在Node.js可以使用的API，在Electron中同样可以使用。 在Electron中调用如下代码是有用的：

```cpp
const fs = require('fs')
const root = fs.readdirSync('/')
// 这会打印出磁盘根级别的所有文件
// 同时包含'/'和'C:\'。
console.log(root)
```

+ 加载远程内容的信息和指南
+ npm 提供了目前世界上最大的开源代码库，那里包含了经过良好维护和测试的代码，这些代码之前往往是专门供给服务器应用程序使用的，能够使用这些代码是Electron的重要特色之一。
+ 在你的应用程序中如果要使用官方的AWS SDK，你需要首先将它作为一项依赖进行安装, 然后在你的Electron应用中，通过require引入并使用该模块，就像构建Node.js应用程序那样：

```cpp
// 准备好被使用的S3 client模块
const S3 = require('aws-sdk/clients/s3')
```

原生Node.js模块 (即指，需要编译源码过后才能被使用的模块) 需要在编译后才能和Electron一起使用。绝大多数的Node.js模块都*不*是原生的， 在650000个模块中只有400是原生的。 当然了，如果你的确需要原生模块，可以在这里查询[如何重新为Electron编译原生模块](https://www.electronjs.org/docs/tutorial/using-native-node-modules)(很简单)。



![](https://z3.ax1x.com/2021/06/28/RNt0kn.png)

<div id="j1">[1]. https://developer.aliyun.com/mirror/NPM</div>
<div id="j2">[2]. https://www.electronjs.org/docs/tutorial/installation</div>
<div id="j3">[3]. https://jspang.com/detailed?id=62</div>
<div id="j4">[4]. https://www.electronjs.org</div>
<div id="j5">[5]. https://www.cnblogs.com/zjhblogs/p/10755058.html</div>
<div id="j6">[6]. http://www.thewashingtonhua.com/blog/2017/07/06/electron-install-guide</div>
<div id="j7">[7]. https://systemisbusy.info/blog/2019/09/03/%E7%BB%99electron%E5%81%9Ac%E5%BC%80%E5%8F%91%E7%9A%84%E9%82%A3%E4%BA%9B%E5%9D%91/</div>
