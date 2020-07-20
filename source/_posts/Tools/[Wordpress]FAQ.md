---
title: '[Wordpress] FAQ'
date: 2020-02-14 06:53:42
toc: true
---

### FAQ

</br>

> Q：无法上传图片，提示信息“无法创建目录”。

A：<font color="grey">方法一：定位`wordpress/wp-contect/uploads`的文件夹，更改权限为`777`.</font>

<font color="grey">方法二：参考下述修改用户属性的的方法。（安全）</font>

</br>

> Q：填写主机名称，无法进行下一步操作

A：  <font color="grey">方法一：填写`localhost`或者`www.yoursite.com`.</font>

​		<font color="grey">方法二： 修改wp-config.php文件（来自老蒋部落） </font>

```php
define("FS_METHOD", "direct");  
define("FS_CHMOD_DIR", 0777);  
define("FS_CHMOD_FILE", 0777);  
```

</br>

>  Q：发布失败。错误信息：此响应不是合法的JSON响应。 

<font color="grey">A：在写文章的时候出现的Bug，目前定位是WordPress的5.0版本和 Gutenberg古腾堡编辑器 有点不兼容。</font>

​	  <font color="grey">一种是禁用Gutenberg古腾堡编辑器，然后有插件禁用和代码禁用。代码禁用的话是在主题的 functions.php 文件添加下面的代码：</font>

```
//Wordpress 5.0+ 禁用 Gutenberg 编辑器
add_filter('use_block_editor_for_post', '__return_false');
remove_action( 'wp_enqueue_scripts', 'wp_common_block_scripts_and_styles' );
```

​	 <font color="grey"> 	插件禁用的话是下载Classic Editor的编辑器即可。</font>

​		 <font color="grey"> 另外一种是继续使用Gutenberg古腾堡编辑器，但是方法还没找到，听说是因为网站没有配置[伪静态](https://baike.baidu.com/item/%E4%BC%AA%E9%9D%99%E6%80%81)的原因，于是自己又跑去配置伪静态，顺便百科、维基了一下。</font> 

</br>

> Q：woc，WordPress官网那么垃圾我怎么才能从官网索取主题以及插件呢？？

<font color="grey">A：直接去插件和主题的控制面板搜</font>

</br>



> [![](https://s2.ax1x.com/2020/02/18/3ioI1J.th.png)](https://imgchr.com/i/3ioI1J)
>
> Q: 文章粘过来发现不支持Markdown

<font color="grey">A：去搜` WP Githuber MD`插件，网上一边倒另一款编辑器`[WP Editor.md `但是不可用果断放弃。</font>

<font color="grey">但是有一个缺点，就是如果字数太多的话，实时预览的速度会有点慢，我直接把它关掉了。</font>

</br>

> Q：我的代码不可以高亮，怎么半？装什么代码高亮的插件到没有用

<font color="grey">A： Markdown姿势，找到[规范](https://terryl.in/en/highlight-js-html-code-language-list-for-syntax-highlighting/#how-it-works)！</font>

</br>

> Q：Warning: ftp fget() expects parameter 1 to be resource, null iven n w/wwmoot/www. dandelionflowers. xz/wordpress/p-admin/includes/class-wp-filesystem-ftpext. php on line 143

<font color="grey">A：一般（插件` WPForms Lite `）是WordPress不兼容报错，禁掉就好了。</font>

</br>

> Q：Wordpress伪静态规则的配置以及原理？

<font color="grey">A：参考配置[伪静态规则](https://themebetter.com/wp-url-rewrite.html)，[伪静态规则](http://dreamkeeper.com.cn/2009/03/how-to-build-the-html-page-in-wordpress.html)，[伪静态规则](https://www.uoo2.com/wordpress-rewriterule.html)，[伪静态规则](https://www.cnblogs.com/zxlovenet/archive/2013/05/05/3061030.html)，[伪静态隐藏](https://www.likole.com/2019/12/nginx-%e9%9a%90%e8%97%8findex-php-%e4%bc%aa%e9%9d%99%e6%80%81%e8%a7%84%e5%88%99/)。</font>

<font color="grey">这个又和古腾堡编辑器的使用息息相关，留作日后开发使用。</font>

</br>

> Q：WordPress 常使用的插件？

A：[爬了爬常用的插件：留作日后使用。](https://www.wpdaxue.com/recommend-wordpress-plugins.html)：留作日后使用。

​	[插件](https://zhuanlan.zhihu.com/p/34314017).

</br>

> Q : 出现无法创建文件夹需要修改文件夹权限的问题

A：之前为了解决升级主题的缘故，所以将好多文件的权限改成了777(wp-content下的文件)，有的是644，有的是755，现在希望研习一下这个的修改的操作。	

这里先贴出这样做的原因吧：

>  所有的人都可以来这里随便指点一下，随便来删除一下啊。 记得当初一个兄弟的遭遇：刚进一间公司不久，然后执行了一下删除命令，没想到把该公司的一个项目的所有上传的资源全部删掉了～悲催！此处先不讨论做该项目的人的部署问题。如果操作得当，大家都可以避免。既然可以在开始就避免，何乐而不为呢？

 **出现无法创建目录的确是权限的问题，但是，不是目录读写的权限，而是用户组的问题。**（这里回去温习一下Linux的用户组知识……） **想要下载插件的用户组为web用户组，用户名组名为 www（ lnmp环境——ngnix.conf中第一行查看，可以用`locate nginx.conf`的操作搜索一下） **

 ![3FFaMn.png](https://s2.ax1x.com/2020/02/18/3FFaMn.png)

读写的权利全是`1006`，自然不可以成功，所以目标是把读写权利交给`www`.退出wordpress的目录运行` chown -R www:www wordpress`,发现报错

```nginx
chown: changing ownership of ‘wordpress/.user.ini’: Operation not permitted
```

如果你没有root账户，就是上面的情况：

```nginx
sudo chown www wordpress
```

发现什么都没有，发现成了。

![3FYJBV.png](https://s2.ax1x.com/2020/02/18/3FYJBV.png)

(注意：还有一个版本，用户不是`www`,而是` apache `，这个我还没有搞清楚，留下坑日后再改，如果哪位知道还劳烦指点一下。)

</br>

> Q : 添加网络搜索引擎的索引

A：让自己的站点可以增加更多的曝光机会。在上面的危险操作完成之后就可以操作了。

</br>

> Q : 备份自己的WordPress，腾挪更加方便

A：[方法](https://www.wopus.org/wordpress-deepin/tech/1009.html)

</br>

> Q : 添加自己网站的留言板

A：[方法](https://www.boke8.net/wordpress-page-for-guestbook.html)

</br>

> Q:官网访问429

A: WP-China-Yes 插件，[Github](https://github.com/wp-china-yes/wp-china-yes)源码

[参考]：https://www.imahui.com/resource/2326.html

</br>

