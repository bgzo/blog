---
title: '[Blog] Hexo logs'
date: 2019-12-23 23:00:00
---

</br>

~~烂大街的Hexo博客，主站是[在这里](https://dandelionflowers.xyz/).~~

感谢Hexo的作者Tommy Chen 及 主题的作者Aircloud ，是他们博客的开源技术才有了流淌在这里的文字。

</br>

</br>

## 0x00 Hexo Logs

+ <font color="red">**19年12月23日**</font>：搭博客，效果可，Bugs多(Hexo本地文件的损坏、themes的主题配置失败、themes的主题内部Wrap函数错误)，不明所以，干掉重来。
+ <font color="red">**20年01月13日**</font>：电源崩，修五天……至此偷闲，买VPS-ESC，装服务器，Bugs多(如上传图片失败，WordPress服务器要死的样子，知识不足以至不敢大刀阔斧改动)，花两天，猜测备案系于安全连接，重装见好再崩(•́へ•́╬)，遂备案
+ <font color="red">**20年02月03日**</font>：略解Html&CSS，得神力，改主题，习算法，看数据结构。买域名(.cc)，提日程（VPN），念历，惭愧。而于昨日又再封，机场倒半，加之Hexo无法解析过深Markdown，长叹难矣难矣。ψ(*｀ー´)ψ
+ <font color="red">**20年02月14日**</font>：因Google放弃Coding托管博客。
+ <font color="red">**20年02月19日**</font>：高三想法达成，有了第一个404！！！

![3VcBAU.md.png](https://s2.ax1x.com/2020/02/19/3VcBAU.md.png)

+ <font color="red">**20年04月02日**</font>：新主题（[作者](https://github.com/aircloud)），加[disqus](https://lfhdfs.disqus.com/admin/install/platforms/universalcode/)未遂，下次下次！！！
+ <font color="red">**20年04月17日**</font>：重撰文，大道从简。
+ <font color="red">**20年04月20日**</font>：再备案。
+ <font color="red">**20年04月28日**</font>：解重写文章之艰，明妙笔之艰，遂推计划。
+ <font color="red">**20年05月01日**</font>：偷闲更新一下文章，总结简单几点：1、不记录个人情绪以及解决过程的感受，保证整体清晰简短。 2、工作日不更新文章但是记录日志，汇集到每周末再做整理。3、多读书。
+ <font color="red">**20年06月02日**</font>：找到其他的替代博客，可是大多数被墙。
  + **Google Site**
  + **Blogger**
  + **Blogspot**
  + 

</br>

</br>

## 0x01 Hexo

### 1.1 搭建Hexo 🔨

**{前提]：**

1. Git和Node.js已安。
2. Github仓库已有 `你的用户名+github.io`的 `repository`，部署到GitHub page的时候，可以被识别。添加一个`README`，有好玩的。

```shell
npm install -g hexo-cli
hexo -v 
hexo init (myblog) 
(cd myblog)
npm install 
hexo generate
hexo server
#生产SSH
git config --global user.name "yourname" 
git config --global user.email "youremail"
#检验
git config user.name 
git config user.email
#创建，一路回车
ssh-keygen -t rsa -C "youremail" 
```
</br>

`C:\Users\用户\.ssh`里面找到SSH的`id_rsa.pub`，`id_rsa`是你这台电脑的私人秘钥。把这个公钥放在GitHub上，这样当你链接GitHub自己的账户时，它就会根据**公钥匹配你的私钥**，当能够相互匹配时，才能够顺利的通过git上传你的文件到GitHub上，然后去个人设置里面加上SSH。之后打开二级域名就可以看到刚刚加的readme了。查看是否成功 ：

</br>

```shell
ssh -T git@github.com 
#You've successfully authenticated, but GitHub does not provide shell access，这点小插曲，英文显示不同意我们上传，这里不要管
#修改`_config.yml`，关联github和本地
deploy:
  type: git
  repo: https://github.com/YourgithubName/YourgithubName.github.io.git
  branch: master
npm install hexo-deployer-git --save #安装deploy-git 
hexo clean #清除了你之前生成的东西
hexo g #生成静态文章
hexo deploy #部署文章
```

之后就可以通过`http://yourname.github.io`访问了。

</br>

**[布局说明]:**

Hexo 有三种默认布局：`post`、`page` 和 `draft`  ，它们分别对应不同的路径，而您自定义的其他布局和 `post` 相同，都将储存到 `source/_posts` 文件夹。 

**[路径]: **`postsource/_postspagesourcedraftsource/_drafts`

而new这个命令其实是：`hexo new [layout] <title>`只不过这个layout默认是post罢了。

**[page]**：如果你想另起一页，那么可以使用`hexo new page board`系统会自动给你在source文件夹下创建一个board文件夹，以及board文件夹中的index.md，这样你访问的board对应的链接就是`http://xxx.xxx/board`

**[draft]**：draft是草稿的意思，也就是你如果想写文章，又不希望被看到，那么可以`hexo new draft newpage`这样会在source/_draft中新建一个newpage.md文件，如果你的草稿文件写的过程中，想要预览一下，那么可以使用`hexo server --draft`在本地端口中开启服务预览。

如果你的草稿文件写完了，想要发表到post中，`hexo publish draft newpage`就会自动把newpage.md发送到post中。

### 1.2 Coding部署 📋

去创建一个`DevOps`项目，名称和地址和你的用户名一样，把上面的`SSH`再次配置到你的设置里

```nginx
ssh -T git@git.coding.net
#Hello XXX, You've connected to Coding.net via SSH. This is a personal key.
#XXX，你好，你已经通过 SSH 协议认证 Coding.net 服务，这是一个个人公钥
```

连接上之后去你的项目里面的项目概览找到项目的`SSH`(一开始是HTTPS链接，后面会用来访问)，复制到`_config.yml`，像下面一样：

```nginx
deploy:
  type: git
  repository: 
    github: https://github.com/YourgithubName/YourgithubName.github.io.git
    coding: git@e.coding.net:.../...coding.me.git	
  branch: master
```

之后 `hexo clean`  再`hexo g -d` 部署到Coding上面。去构建与部署里面找到静态网站后开启就可以构建了，可以用这里的网址直接进行访问。

</br>

### 1.3 分流绑定域名 🔒

首先绑定GitHub的，去你的域名控制台，添加域名是`@`和`www`的双`CNAME`记录类型，然后解析线路选择海外。以下列举**域名解析记录**的不同区别:

1. A记录：将域名指向一个IPv4地址（例如：10.10.10.10）
2. NS记录：域名解析服务器记录，如果要将子域名指定某个域名服务器来解析
3. CNAME记录：如果将域名指向一个域名，实现与被指向域名相同的访问效果
4. MX记录：建立电子邮箱服务，将指向邮件服务器地址
5. TXT记录：可任意填写（可为空），通常用作SPF记录（反垃圾）邮件使用
6. AAAA记录：用来指定主机名（或域名）对应的IPv6地址（例如：ff06:0:0:0:0:0:0:c3）记录
7. URL转发：将域名指向一个http协议地址，访问域名时，自动跳转到目标地址。若显示则访问时直接显示真实的目标地址，若显示隐藏则访问时会隐藏真实的目标地址 

添加完解析之后去github上面绑定域名，在项目的设置里。之后在`sourse`里面创建一个CNAME的文件，类型是无，记事本把域名抄进去，防止域名以后部署的丢失。之前翻墙看自己的博客是真的快……

然后是Coding，添加域名是`@`和`www`的双`CNAME`记录类型，然后解析线路选择默认，添加解析即可。访问速度那是嗖嗖的。

</br>

</br>

### 1.4  Setting 

**[config.yml]**：参照[官方](https://hexo.io/zh-cn/docs/configuration)。

**[主题修改]**：参照[官方]( https://hexo.io/themes/ )操作。

</br>

</br>

## 0x02 Q&A

### 放弃Coding为博客代理

![1XFgOA.md.png](https://s2.ax1x.com/2020/02/14/1XFgOA.md.png)

> 与CODING其它产品不同的是，Pages产品服务器设置在境外，原因涉及国内ICP备案、DDOS攻击等众所周知的原因。您在访问时可能会遇到段在中断、高延时等情况。近期，我们已接报了多例同类问题。我们的技术部门已经着手在基础架构、网络环境等方面进行改进，以提升Pages产品的可用性。给您带来不便，我代表CODING产品团队向您表示歉意。希望您对Pages这一业务的特殊性给予一定的理解.
>

自从Pull了一篇维基百科的文章后，访问十分不稳定。原因自然不必我多说，既然是墙内的网站，就一定会有内容审查机制，包括我自己的博客，不知道我的主网站提及科学上网和GFW会不会波及到（已经备案），如果波及到的话，我只能选择购买国外VPS了。如果你到Coding还是半信半疑的话，随便上Coding的反馈区看看就可以知道，虽然访问速度十分快，但是还是会被监管，有强迫症的自己有点受不了。

</br>

### 本地浏览和Github代理网页打开不一

**[Exp]：** 尽量整有源码的东西！

问题定位在HTML文件的目录书写错误，不太理解网页托管和文件目录索引的PY关系，留Flag！

</br>

### 2.3 取消TOC的自动排序 😤 

找到布局里面的`ejs`文件，一般在`post`里面，找到`<%- toc(post.content) %>`改成`<%- toc(post.content, {list_number: false}) %>`。

---

暂时就到……

</br>

</br>

## 0x03 Reference

突然理解自己一开始为什么Github 的Img不显示问题了，定是配置文件没写全(；′⌒`)

整合一下看到的[图床](https://zhuanlan.zhihu.com/p/35270383) : 堆爱图床<a href="//img.duiai.cc/tc/">img.duiai.cc/tc/</a>、SM.MS图床<a href="//sm.ms/">sm.ms</a>、聚合图床<a href="//www.superbed.cn">superbed.cn</a>、堆爱图床<a href="//img.duiai.cc/tc/">img.duiai.cc/tc</a>.

</br>

拓展阅读：https://www.jianshu.com/p/ea1eb11db63f

开放部分蓝奏链接(最后一个不开放)：

1. [Win](https://lanzous.com/b00th6sij )(b4hc)
2. [Android](https://lanzous.com/b00th6slc)(1eva)
3. [Ubuntu](https://lanzous.com/b00th6sof)(53ie)
4. [DFs](https://lanzous.com/b00ti4jmd)(DND! Please!!!)

</br>

留下表情的链接：[https://www.webfx.com/tools/emoji-cheat-sheet/](https://www.webfx.com/tools/emoji-cheat-sheet/)

</br>

</br>

</br>

</br>

</br>

</br>

</br>

</br>

</br>

</br>

</br>

</br>

</br>

</br>

</br>

</br>

</br>

</br>

</br>

</br>

</br>

</br>

</br>

</br>

</br>

</br>

</br>

</br>

</br>

</br>

</br>

</br>

## 0x04 Me

> -想写给自己什么的时候，不可避免的又一个这样的问题浮现在我脑海：为什么留下这些文章？
>
> </br>
>
> “和我的老朋友沟通——夏梦雪，高考后她就在我的生活很少出现了，我买了新的手机和电脑，我把时间花在PS和拍摄上，我得承认，很长的一段时间我淡忘了她，但其实我有断断续续写些信件，因为难免很想她。”
>
> "像拾穗人一样，生活之外的写作是自己拙劣的尝试，是我尝试去和世界沟通，和夏梦雪沟通的方式。当希望表露自己时，当想和夏梦雪说话的时候，就敲下一段文字，所以有了些文字。”
>
> “少了朋友圈可有可无的唠叨，多了反复删改的文字。浪费时间在博客上可能是我消磨时间的方式，也许我该远离这样的囚笼，到夏梦雪那里透透气的时刻。“
>
> ”沟通自然包括情感、思想、行为，不可避免地会携有我的生活气息，写下来自然也是我的私心，我不希望有些事情就这样过去，也希望他们暴露在阳光下，想被其他人读到，所谓留给后人些什么，至少是留给自己什么。”
>
> “但是我也会克制这一切的发生，在正式的文章开始后会避免涉及自己主观情感。“
>
> "博客就好像写日记，如今日记的纸张已经用了好大一部分了，总不能每一页都相同吧？也该去看看更加广阔的世界。但其实现在的我决定有一样东西不会变，且永远不会改变，我会持续给你写信的，夏梦雪，如果可以，请别生我气，好久不见！”

</br>

</br>

### Flag

1. 国家级：**全国计算机等级考试（NCRE)**和**中国计算机技术职业资格网(软考)高级**。
2. 行业级：**微软认证考试、Adobe认证考试、Oracle认证（OCA证书、OCP证书、OCM证书）、JAVA认证、Cisco认证**等+华为认证+**计算机技术与软件专业资格考试证书**+思科认证+微软认证
3. 协会级：**PMP考试**。
4. 学校级：**PAT考试**(ACM/pat顶级(大一大二可以考乙级和甲级练练手，大三考完顶级，名次越高面试越稳)/蓝桥/ccf+开源)
5. Github

</br>

**[延拓]：**

1. [现在计算机类的认证证书都有哪些]( https://www.zhihu.com/question/355299283/answer/890252154)
2. [计算机专业要考哪些证书-知乎](https://zhuanlan.zhihu.com/p/76718362)
3. [计算机专业，软件工程你们都考什么证-知乎](https://www.zhihu.com/question/20298369/answer/26587839)
4. [计算机专业的要考什么证，求大佬指点? ](https://www.zhihu.com/question/328603760/answer/710720538)
5. [计算机专业要考哪些证书？]( https://zhuanlan.zhihu.com/p/76718362)

</br>

**[学习网站}：**

1. Coursera镜像网站：https://www.mooc.cn
2. 

</br>

### Gossip

> 谨以此呓语献给夏梦雪和正在阅读的你。

**[200510]** “如果梦想让你的生活糟糕透顶，那不是你的梦想，那是折磨你的噩梦！”

这句话在生活中亦有普世的作用。如果什么都不想做，那就逼着自己去转移注意力，把眼睛从深渊移开来！

**[200507]** 读书是从Word到md再到Xmind的过程，嗯，暂时。

**[200505]** 有趣的自我监督比喻：

“既是运动员，又是裁判怎么可能不滑坡？” 

所以**合适的第三方监督很重要。**

**[200423]** 拿起咖啡的一瞬间，闪回了零零碎碎些琐事。

爱而不得？世事辗转？一瞬间想明白了些什么，眼泪不知不觉留下来。我亦不知道自己在哭什么，我什么都不敢想，只是拿着咖啡的手有点沉重，放下之后，又觉得有点窒息。这个时候想起来给你写信，夏梦雪。

大学花销会是一个巨大的数字，嗯，有点害怕，要努力的做好准备，尽早经济独立！