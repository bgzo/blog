---
title: '[HTML] Craft'
date: 2020-02-02 10:28:00
toc: true
tag: 
- html
- web
---

## Some inters

+ 唤起QQ: 加QQ群的话在QQ客户端就可以申请到链接，操作即可，或者在[这里](https://qun.qq.com/join.html)找到。
```html
<body>
        <h1>jsdafjk</h1>
        <a href="http://wpa.qq.com/msgrd?v=3&amp;uin=1551728654&amp;site=qq&amp;menu=yes">1551728654</a>
        <br/>
        <a href="tencent://AddContact/?fromId=50&fromSubId=1&subcmd=all&uin=1551728654">1551728654</a>
</body>
```
+ 跳转邮箱
```html
<a href="mailto:lfh010618@gmail.com">lfh010618@gmail.com</a>
```
+ 生成网页的下载链接：


## Html Speed

互联网带宽越来越宽，似乎让网页的加载速度得到了质的飞跃。其实不然，因为随着带宽的提高，网页上的对象也越来越多，因此加快网页打开速度还是一个重要的课题。加快网页的打开速度，有三个路径，一是提高网络带宽，二是用户在本机做优化，三是网站设计者对网页做一定的优化。这篇文章站在一个网站设计者的角度，分享一些优化网页加载速度的小技巧。

</br>

### 优化图片

几乎没有哪个网页上是没有图片的。如果你经历过56K猫（拨号上网，B站可以搜到的两个号码：96167，16300）的年代，你一定不会很喜欢有大量图片的网站。因为加载那样一个网页会花费大量的时间。即使在现在，网络带宽有了很多的提高，56K猫逐渐淡出，优化图片以加快网页速度还是很有必要的。优化图片包括减少图片数、降低图像质量、使用恰当的格式。

1. 减少图片数：去除不必要的图片。

2. 降低图像质量：如果不是很必要，尝试降低图像的质量，尤其是jpg格式，降低5%的质量看起来变化不是很大，但文件大小的变化是比较大的。

3. 使用恰当的格式：请参阅下一点。因此，在上传图片之前，你需要对图片进行编辑，如果你觉得photoshop太麻烦，可以试试一些在线图片编辑工具。懒得编辑而又想图片有特殊的效果？可以试试用过调用javascript来实现图片特效。

</br>

### 图像格式的选择

一般在网页上使用的图片格式有三种，jpg、png、gif。三种格式的具体技术指标不是这篇文章探讨的内容，我们只需要知道在什么时候应该使用什么格式，以减少网页的加载时间。

1. JPG：一般用于展示风景、人物、艺术照的摄影作品。有时也用在电脑截屏上。2、
2. GIF：提供的颜色较少，可用在一些对颜色要求不高的地方，比如网站logo、按钮、表情等等。当然，gif的一个重要的应用是动画图片。就像用Lunapic制作的倒映图片。3、
3. PNG：PNG格式能提供透明背景，是一种专为网页展示而发明的图片格式。一般用于需要背景透明显示或对图像质量要求较高的网页上。三、优化CSSCSS叠层样式表让网页加载起来更高效，浏览体验也得到提高。有了CSS，表格布局的方式可以退休了。但有时我们在写CSS的时候会使用了一些比较罗嗦的语句，比如这句：

```html
margin-top: 10px;
margin-right: 20px;
margin-bottom: 10px;
margin-left: 20px;
```

​		你可以将它简化为：

```html
margin: 10px 20px 10px 20px;
```

​		又或者这句：

```html
<p class="decorated">A paragraph of decorated text</p>
<p class="decorated">Second paragraph</p>
<p class="decorated">Third paragraph</p>
<p class="decorated">Forth paragraph</p>
```

​		可以用div来包含：

```html
<div class="decorated">
<p>A paragraph of decorated text</p>
<p>Second paragraph</p>
<p>Third paragraph</p>
<p>Forth paragraph</p>
</div>
```

​		简化CSS能去除冗余的属性，提高运行效率。如果你写好CSS后懒得去做简化，你可以使用一些在线的简化CSS工具，比如CleanCSS。

</br>

### 网址后加斜杠

有些网址，比如"www.yoursites.com/220"，当服务器收到这样一个地址请求的时候，它需要花费时间去确定这个地址的文件类型。如果220是一个目录，不妨在网址后多加一个斜杠，让其变成www.yoursite.com/220/，这样服务器就能一目了然地知道要访问该目录下的index或default文件，从而节省了加载时间。

</br>

### 标明高度和宽度

这点很重要，但很多人由于懒惰或其它原因，总是将其忽视。当你在网页上添加图片或表格时，你应该指定它们的高度和宽度，也就是height和width参数。如果浏览器没有找到这两个参数，它需要一边下载图片一边计算大小，如果图片很多，浏览器需要不断地调整页面。这不但影响速度，也影响浏览体验。下面是一个比较友好的图片代码：

```html
<img id="moon" height="200" width="450" src="http://www.kenengba.com/moon.png" alt="moon image" />
```

当浏览器知道了高度和宽度参数后，即使图片暂时无法显示，页面上也会腾出图片的空位，然后继续加载后面的内容。从而加载时间快了，浏览体验也更好了。

### 减少http请求

当浏览者打开某个网页，浏览器会发出很多对象请求（图像、脚本等等），视乎网络延时情况，每个对象加载都会有所延迟。如果网页上对象很多，这可以需要花费大量的时间。因此，要为http请求减负。如何减负？1、去除一些不必要的对象。2、将临近的两张图片合成一张。3、合并CSS看看下面这段代码，需要加载三个CSS：

```html
<link rel="stylesheet" type="text/css" href="/body.css" /><link rel="stylesheet" type="text/css" href="/side.css" /><link rel="stylesheet" type="text/css" href="/footer.css" />
```

我们可以将其合成一个：

```html
<link rel="stylesheet" type="text/css" href="/style.css" />
```

从而减少http请求。

</br>

### 其它小技巧（译者添加）

1. 去除不必要加载项。
2. 如果在网页上嵌入了其它网站的widget，如果有选择余地，一定要选择速度快的。
3. 尽量用图片代替flash，这对SEO也有好处。
4. 有些内容可以静态化就将其静态化，以减少服务器的负担。
5. 统计代码放在页尾。  

</br>

</br>

</br>

### 参考资料

1. [网页直接加QQ群/QQ好友](https://blog.csdn.net/qq_28975017/article/details/72898385)-coder丶赵 
2. [想把文件直接放至服务器，通过http的url下载](https://blog.csdn.net/weixin_36586564/article/details/78774035?depth_1-utm_source=distribute.pc_relevant.none-task&utm_source=distribute.pc_relevant.none-task)-严的博客
3. [提高网页打开速度的一些小技巧 [问题点数：100分]]( https://bbs.csdn.net/topics/230010297 )