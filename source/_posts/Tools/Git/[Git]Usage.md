---
title: '[Git] Usage'
date: 2020-02-14 21:06:33
toc: true
---

</br>

### 一、Git 

版本控制系统 —— 记录每次文件的改动，协作编辑，避免管理一堆类似的文件了，也不需要把文件传来传去。

如果想查看某次改动，只需要在软件里瞄一眼就可以，能记录每次文件的改动：

这样，你就结束了手动管理多个“版本”的史前时代，进入到版本控制的20世纪。 

| 版本 | 文件名      | 用户 | 说明                   | 日期       |
| ---- | ----------- | ---- | ---------------------- | ---------- |
| 1    | service.doc | 张三 | 删除了软件服务条款5    | 7/12 10:38 |
| 2    | service.doc | 张三 | 增加了License人数限制  | 7/12 18:09 |
| 3    | service.doc | 李四 | 财务部门调整了合同金额 | 7/13 9:51  |
| 4    | service.doc | 张三 | 延长了免费升级周期     | 7/14 15:17 |

</br>

</br>

### 二、History

> Linus坚定地反对CVS和SVN，这些集中式的版本控制系统不但速度慢，而且必须联网才能使用。

Linus 在 1991年 创建了开源的 Linux 

2002年前，志愿者把源代码用 **diff** (命令)  的方式发给Linus，后由本人手工合并。

BitKeeper 的东家 BitMover 公司授权 Linux社区 免费使用这个版本控制系统。

2005年 Linux社区牛人聚集 开发Samba的Andrew试图破解BitKeeper的协议，被BitMover公司发现了，收回Linux社区的免费使用权。

Linus 花了两周时间自己用C写了一个分布式版本控制系统——Git！一个月之内，Linux系统的源码已经由Git管理了！

2008年，GitHub上线，为开源项目免费提供 Git 存储，无数开源项目开始迁移至GitHub，包括jQuery，PHP，Ruby等等。

**[关于 diff 的延拓]：**[醉卧沙场的回答 - 知乎]( https://www.zhihu.com/question/295125460/answer/493797867)

</br>

</br>

### 三、Install Git

+ Linux：

```shell
git # 测试一下电脑里面有没有git
sudo apt-get install git # Debian 或 Ubuntu Linux
sudo apt-get install git-core # 老版本Debian 或 Ubuntu Linux（避免和一个叫GIT(GNU Interactive Tools)的软件重名）
```

+ Win 

安装完后配置自己的账户

```shell
git config --global user.name "Your Name"
git config --global user.email "email@example.com"
# 检查
git config --global user.name
git config --global user.email
```

**注：**

`git config`命令的`--global`参数，用了这个参数，表示你这台机器上**所有的Git仓库都会使用这个配置**，当然也可以对某个仓库指定不同的用户名和Email地址。 

</br>

</br>

### 四、Repo

仓库(**Repository**)，版本库，可以简单理解成一个目录，这个目录里面的所有文件都可以被Git管理起来，每个文件的修改、删除，Git都能跟踪，以便任何时刻都可以追踪历史，或者在将来某个时刻可以“还原”。

</br>

一个合适的地方，创建一个空目录：

```shell
mkdir text
cd text
pwd
```

通过`git init`命令把这个目录变成Git可以管理的仓库： 

```shell
git init
```

可以发现当前目录下多了一个`.git`的目录，这个目录是Git来跟踪管理版本库的，没事千万不要手动修改这个目录里面的文件，不然改乱了，就把Git仓库给破坏了(用`ls -ah`命令就可以看见)。

也不一定必须在空目录下创建Git仓库，选择一个已经有东西的目录也是可以的。



补：Git配置同时推送到GitHub和码云

如果是在本地初始化的仓库，则需要先添加默认的远程仓库：

```shell
git remote add origin + Url
```

 然后再配置需要同时推送到的其他仓库添加码云：

```shell
git remote set-url --add origin + Url
```

</br>

</br>

### 五、Add Sth into Repo

版本控制系统可以告诉你每次的改动，而图片、视频这些二进制文件，虽然也能由版本控制系统管理，但没法跟踪文件的变化，只能把二进制文件每次改动串起来，也就是只知道图片从100KB改成了120KB，但到底改了啥，版本控制系统不知道，也没法知道。

不幸的是，**Microsoft的Word格式是二进制格式**，因此，版本控制系统是没法跟踪Word文件的改动的，前面我们举的例子只是为了演示，**如果要真正使用版本控制系统，就要以纯文本方式编写文件**。因为文本是有编码的，比如中文有常用的GBK编码，日文有Shift_JIS编码，如果没有历史遗留问题，强烈建议**使用标准的UTF-8编码**，所有语言使用同一种编码，既没有冲突，又被所有平台所支持。

</br>

> 使用Windows的童鞋要特别注意：
>
> **千万不要使用Windows自带的记事本编辑任何文本文件**。原因是Microsoft开发记事本的团队使用了一个非常弱智的行为来保存UTF-8编码的文件，他们自作聪明地**在每个文件开头添加了0xefbbbf（十六进制）的字符**，你会遇到很多不可思议的问题，比如，网页第一行可能会显示一个“?”，明明正确的程序一编译就报语法错误，等等，都是由记事本的弱智行为带来的。建议你下载[Notepad++](http://notepad-plus-plus.org/)代替记事本，不但功能强大，而且免费！记得把Notepad++的**默认编码设置为UTF-8 without BOM**即可：

</br>

以上内容存在考证，里面的例子在我的电脑里面其实并没有翻车。

---

</br>

现在我们编写一个`readme.txt`文件，内容如下：

```shell
Git is a version control system.
Git is free software.
```

然后开始试验：

```shell
git add readme.txt
git commit -m "wrote a readme file"#  -m后面输入的是本次提交的说明
```

`commit`可以一次提交很多文件，所以你可以多次`add`不同的文件，比如：

```shell
git add file1.txt
git add file2.txt file3.txt
git commit -m "add 3 files."
```



修改readme.txt文件，如下：

```shell
Git is a distributed version control system.
Git is free software.
```

现在，运行`git status`命令看看结果：

```shell
$ git status# 时刻掌握仓库当前的状态
# 命令输出告诉我们，readme.txt被修改过了，但还没有准备提交的修改。
```

</br>

如果你休假两周从国外回来，第一天上班时，已经记不清上次怎么修改的`readme.txt`，所以，需要用`git diff`这个命令看看：

```shell
git diff readme.txt # 顾名思义就是查看difference，显示的格式正是Unix通用的diff格式
```

</br>

知道了对`readme.txt`作了什么修改后，再把它提交到仓库就放心多了，提交修改和提交新文件是一样的两步，第一步是`git add`：

```shell
git add readme.txt
git status
#git status告诉我们，将要被提交的修改包括`readme.txt`
git commit -m "add distributed"
git status
# Git告诉我们当前没有需要提交的修改，而且，工作目录是干净（working tree clean）的。
```

---

</br>

</br>

#### 5.1 版本回退

Git每当你觉得文件修改到一定程度的时候，就可以“保存一个快照”，这个快照在Git中被称为`commit`。一旦你把文件改乱了，或者误删了文件，还可以从最近的一个`commit`恢复，然后继续工作，而不是把几个月的工作成果全部丢失。 



版本控制系统帮助我们记得一个几千行的文件每次都改了什么内容。在Git中，我们用`git log`命令查看： 

```shell
git log #(--pretty=oneline) 显示从最近到最远的提交日志

# 216439e510c6f77b6b1e0547bc34e81c1793b1d5 (HEAD -> master) add distributed
# 37aa903fd6263174d9c149cdad07d12a7021b048 wrote a readme file

# 我们可以看到2次提交，最近的一次是add distributed，最早的一次是wrote a readme file，如果嫌输出信息太多，看得眼花缭乱的，可以试试加上--pretty=oneline参数
```

需要友情提示的是，你看到的一大串类似`1094adb...`的是`commit id`**（版本号）**，和**SVN**不一样，Git的`commit id`不是1，2，3……递增的数字，而是一个SHA1计算出来的一个非常大的数字（哈希值），用十六进制表示，具有一致性。

为什么`commit id`需要用这么一大串数字表示呢？

> 因为**Git是分布式的版本控制系统，后面我们还要研究多人在同一个版本库里工作，如果大家都用1，2，3……作为版本号，那肯定就冲突了**。每提交一个新版本，实际上Git就会把它们自动串成一条时间线。如果使用可视化工具查看Git历史，就可以更清楚地看到提交历史的时间线：

</br>

好了，现在我们启动时光穿梭机，准备把`readme.txt`回退到上一个版本，最早的的那个版本，怎么做呢？

首先，Git必须知道现在是哪个版本，在Git中，用`HEAD`表示当前版本，上一个版本就是`HEAD^`，上上一个版本就是`HEAD^^`，当然往上100个版本写100个`^`比较容易数不过来，所以写成`HEAD~100`。

现在，我们要把当前版本`append GPL`回退到上一个版本`add distributed`，就可以使用`git reset`命令：

```shell
git reset --hard HEAD^
# HEAD is now at e475afc XXX
cat readme.txt# 查看自己的文本
# Git is a distributed version control system.
# Git is free software.
```

其实如果你把窗口关掉，想再回去已经回不去了。反之，找到他的哈希值，或者从记忆里找，至少包含前四个值，Git会自动去找。值得注意的是，版本号是自上而下的，就是新的改动先显示

```shell
git reset --hard 1094a
# HEAD is now at 83b0afe append GPL
cat readme.txt
# Git is a distributed version control system.
# Git is free software distributed under the GPL.
```

Git的版本回退速度非常快，因为Git在内部有个指向当前版本的`HEAD`指针，当你回退版本的时候，Git仅仅是把HEAD从指向`append GPL`：然后顺便把工作区的文件更新了。所以你让`HEAD`指向哪个版本号，你就把当前版本定位在哪。

<img src="http://img.dandelionflowers.xyz/Head%201.png"  />

<img src="http://img.dandelionflowers.xyz/Head%202.png">



但是，你回退到了某个版本，关掉了电脑，第二天早上就后悔了，找不到新版本的`commit id`却想恢复到新版本怎么办，怎么办？

Git提供了一个命令`git reflog`用来记录你的每一次命令：

```shell
git reflog
# e475afc HEAD@{1}: reset: moving to HEAD^
# 1094adb (HEAD -> master) HEAD@{2}: commit: append GPL
# e475afc HEAD@{3}: commit: add distributed
# eaadf4e HEAD@{4}: commit (initial): wrote a readme file
# 从输出可知，append GPL的commit id是1094adb，现在，你又可以乘坐时光机回到未来了。
```

</br>

#### 5.2 工作区和暂存区

Git和其他版本控制系统（如SVN）的一个不同之处就是有暂存区的概念。

工作区（Working Directory）: 就是你在电脑里能看到的目录，比如`text`文件夹就是一个工作区：

版本库（Repository）: 工作区有一个隐藏目录`.git`，这个不算工作区，而是Git的版本库。版本库里存了很多东西，其中最重要的就是称为**stage（或者叫index）**的暂存区，还有Git为我们自动创建的第一个分支`master`，以及指向`master`的一个指针叫`HEAD`。

![3PMkNt.jpg](https://s2.ax1x.com/2020/02/17/3PMkNt.jpg)

分支和`HEAD`的概念我们以后再讲。

前面讲了我们把文件往Git版本库里添加的时候，是分两步执行的：

1. 是用`git add`把文件添加进去，实际上就是把文件修改添加到暂存区；
2. 是用`git commit`提交更改，实际上就是把暂存区的所有内容提交到当前分支。

因为我们创建Git版本库时，Git自动为我们创建了唯一一个`master`分支，所以，现在，`git commit`就是往`master`分支上提交更改。

</br>

#### 5.3 管理修改

Git跟踪并管理的是修改，而非文件。为什么说Git管理的是修改，而不是文件呢？

做实验：

```shell
cat readme.txt# 对readme.txt做一个修改，比如加一行内容
# Git is a distributed version control system.
# Git is free software distributed under the GPL.
# Git has a mutable index called stage.
# Git tracks changes.
git add readme.txt
git status
# On branch master
# Changes to be committed:
#   (use "git reset HEAD <file>..." to unstage)
#
#       modified:   readme.txt
#
cat readme.txt 
# Git is a distributed version control system.
# Git is free software distributed under the GPL.
# Git has a mutable index called stage.
# Git tracks changes of files.
git commit -m "git tracks changes"
# [master 519219b] git tracks changes
#  1 file changed, 1 insertion(+)
git status
# On branch master
# Changes not staged for commit:
#   (use "git add <file>..." to update what will be committed)
#   (use "git checkout -- <file>..." to discard changes in working directory)
#
# 	modified:   readme.txt

# no changes added to commit (use "git add" and/or "git commit -a")
```

发现第二次的修改没有被提交？原因就是`Git add`就是追踪每一次的修改，第二次没有追踪，自然提交没有。

提交后，用`git diff HEAD -- readme.txt`命令可以查看工作区和版本库里面最新版本的区别：

```shell
git diff HEAD -- readme.txt 
# diff --git a/readme.txt b/readme.txt
# index 76d770f..a9c5755 100644
# --- a/readme.txt
# +++ b/readme.txt
# @@ -1,4 +1,4 @@
#  Git is a distributed version control system.
#  Git is free software distributed under the GPL.
#  Git has a mutable index called stage.
# -Git tracks changes.
# +Git tracks changes of files.
```

可见，第二次修改确实没有被提交。

</br>

#### 5.4 撤销修改

自然，你是不会犯错的。不过现在是凌晨两点，你正在赶一份工作报告，你在`readme.txt`中添加了一行：

```shell
cat readme.txt
# Git is a distributed version control system.
# Git is free software distributed under the GPL.
# Git has a mutable index called stage.
# Git tracks changes of files.
# My stupid boss still prefers SVN.

# 既然错误发现得很及时，你可以删掉最后一行，手动把文件恢复到上一个版本的状态
git status
# On branch master
# Changes not staged for commit:
#   (use "git add <file>..." to update what will be committed)
#   (use "git checkout -- <file>..." to discard changes in working directory)
#
# 	modified:   readme.txt
#
# no changes added to commit (use "git add" and/or "git commit -a")
git checkout -- readme.txt# readme.txt`文件在工作区的修改全部撤销，--很重要，没有--，就变成了“切换到另一个分支”的命令，我们在后面的分支管理中会再次遇到`git checkout`命令。
```

这里有两种情况：

1. readme.txt自修改后还没有被放到暂存区，现在，撤销修改就回到和版本库一模一样的状态；
2. readme.txt已经添加到暂存区后，又作了修改，现在，撤销修改就回到添加到暂存区后的状态。

总之，就是让这个文件回到最近一次`git commit`或`git add`时的状态，意思就是说如果自你上次改完文件后，如果你的修改全都错误，那么`git checkout`适合你。

---

另外一种Scene，现在假定是凌晨3点，你不但写了一些胡话，还`git add`到暂存区了：

```shell
cat readme.txt
# Git is a distributed version control system.
# Git is free software distributed under the GPL.
# Git has a mutable index called stage.
# Git tracks changes of files.
# My stupid boss still prefers SVN.
git add readme.txt
#在commit之前，你发现了这个问题。用git status查看一下，修改只是添加到了暂存区，还没有提交
git status
# On branch master
# Changes to be committed:
#  (use "git reset HEAD <file>..." to unstage)
#
#	modified:   readme.txt
# Git同样告诉我们，用命令git reset HEAD可以把暂存区的修改撤销掉（unstage），重新放回工作区
git reset HEAD readme.txt
# Unstaged changes after reset:
# M	readme.txt
```

注意：此前的版本回退是`git reset --hard readme.txt`。这时，`git reset`命令既可以回退版本，也可以把暂存区的修改回退到工作区。当我们用`HEAD`时，表示最新的版本。再用`git status`查看一下，现在暂存区是干净的，工作区有修改：

```shell
git status
# On branch master
# Changes not staged for commit:
#  (use "git add <file>..." to update what will be committed)
#  (use "git checkout -- <file>..." to discard changes in working directory)
#
#	modified:   readme.txt
git checkout -- readme.txt# 丢弃工作区的修改
git status
# On branch master
# nothing to commit, working tree clean
```

最糟糕的是：现在你不但改错了东西，还从暂存区提交到了版本库，怎么办呢？

还记得版本回退吗？可以回退到上一个版本。不过，这是有条件的，就是**你还没有把自己的本地版本库推送到远程**。还记得Git是分布式版本控制系统吗？一旦你把`stupid boss`提交推送到远程版本库，下个公司再见……

<center><font color="red">这教会你在代码提交到远程库的时候千万千万多看两眼，仅仅为了活下去</font></center>
</br>

#### 5.5 删除文件

Git中删除也是一个修改操作，我们实战一下，先添加一个新文件`test.txt`到Git并且提交：

```shell
git add test.txt
git commit -m "add test.txt"
# [master b84166e] add test.txt
#  1 file changed, 1 insertion(+)
#  create mode 100644 test.txt
rm test.txt# 文件管理器中把没用的文件删了，或者用`rm`命令删了,此时工作区和版本库就不一致了
```

这个时候，Git知道你删除了文件，因此，，`git status`命令会立刻告诉你哪些文件被删除了：

```shell
git status
# On branch master
# Changes not staged for commit:
#  (use "git add/rm <file>..." to update what will be committed)
#  (use "git checkout -- <file>..." to discard changes in working directory)
#
#	deleted:    test.txt
#
#no changes added to commit (use "git add" and/or "git commit -a")
```

现在你有两个选择：

1. 确实要从版本库中删除该文件，那就用命令`git rm`删掉，并且`git commit`：
```shell
git rm test.txt# 意思是删除资源库里面的存档，效果是个git add差不多的
rm 'test.txt'# 或者手动删除文件效果是一样
git commit -m "remove test.txt"# 提交这次的修改OKAY
#[master d46f35e] remove test.txt
# 1 file changed, 1 deletion(-)
# delete mode 100644 test.txt
```
2. 删错了，因为版本库里还有呢，所以可以很轻松地把误删的文件恢复到最新版本，因此你会**最近一次提交后你修改的内容**：

```shell
git checkout -- test.txt# 用版本库里的版本替换工作区的版本，无论工作区是修改还是删除，都可以“一键还原”
```

<center><font color="red"> 从来没有被添加到版本库就被删除的文件，是无法恢复的！  </font></center>
</br>

</br>

</br>

### 六、 Git Sever

有用过集中式版本控制系统SVN的童鞋会站出来说，这些功能在SVN里早就有了，没看出Git有什么特别的地方。没错，如果只是在一个仓库里管理文件历史，Git和SVN真没啥区别。但是**远程仓库**就是一个点。



Git是分布式版本控制系统，**同一个Git仓库，可以分布到不同的机器上。怎么分布呢？**

> 最早，肯定只有一台机器有一个原始版本库，此后，别的机器可以“克隆”这个原始版本库，而且每台机器的版本库其实都是一样的，并没有主次之分。

你肯定会想，至少需要两台机器才能玩远程库不是？但是我只有一台电脑，怎么玩？

> 其实一台电脑上也是可以克隆多个版本库的，只要不在同一个目录下。不过，现实生活中是不会有人这么傻的在一台电脑上搞几个远程库玩，因为一台电脑上搞几个远程库完全没有意义，而且硬盘挂了会导致所有库都挂掉，所以我也不告诉你在一台电脑上怎么克隆多个仓库（其实可以回退版本不是？）。实际情况往往是这样，找一台电脑充当服务器的角色，每天24小时开机，其他每个人都从这个“服务器”仓库克隆一份到自己的电脑上，并且各自把各自的提交推送到服务器仓库里，也从服务器仓库中拉取别人的提交。

完全可以自己搭建一台运行Git的服务器，[GitHub](https://github.com/)网站提供Git仓库托管服务的，由于你的本地Git仓库和GitHub仓库之间的传输是通过SSH加密的，所以，需要一点设置，而这一点在我的如何搭建HEXO博客里面已经有了教程，不再赘述。 为什么GitHub需要SSH Key呢？

> **因为GitHub需要识别出你推送的提交确实是你推送的，而不是别人冒充的，而Git支持SSH协议，所以，GitHub只要知道了你的公钥，就可以确认只有你自己才能推送**。当然，GitHub允许你添加多个Key。假定你有若干电脑，你一会儿在公司提交，一会儿在家里提交，**只要把每台电脑的Key都添加到GitHub，就可以在每台电脑上往GitHub推送了**。最后友情提示，在GitHub上免费托管的Git仓库，任何人都可以看到喔（但只有你自己才能改）。所以，不要把敏感信息放进去。

如果你不想让别人看到Git库，有两个办法：

1. 交点保护费，让GitHub把公开的仓库变成私有的，这样别人就看不见了（不可读更不可写）。
2. 自己动手，搭一个Git服务器，因为是你自己的Git服务器，所以别人也是看不见的。这个方法我们后面会讲到的，相当简单，公司内部开发必备。

</br>

#### 6.1 添加远程库

你已经在本地创建了一个Git仓库后，又想在GitHub创建一个Git仓库，并且让这两个仓库进行远程同步，这样，GitHub上的仓库既可以作为备份，又可以让其他人通过该仓库来协作，真是一举多得。

首先Create a new repo， 在Github上Repository name填入你本地的目录，其他保持默认设置，点击“Create repository”按钮，就成功地创建了一个新的Git仓库，目前在GitHub上的这个仓库还是空的，GitHub告诉我们，可以从这个仓库克隆出新的仓库，也可以把一个已有的本地仓库与之关联，然后，把本地仓库的内容推送到GitHub仓库。

现在我们根据GitHub的提示，在本地的仓库下运行命令：

```shell
git remote add origin git@github.com:youraccountname/yourreponame .git #远程库的名字就是`origin`，这是Git默认的叫法，也可以改成别的

git push -u origin master# 把本地库的所有内容推送到远程库上，由于远程库是空的，第一次推送分支时，有了 -u
# Counting objects: 20, done.
# Delta compression using up to 4 threads.
# Compressing objects: 100% (15/15), done.
# Writing objects: 100% (20/20), 1.64 KiB | 560.00 KiB/s, done.
# Total 20 (delta 5), reused 0 (delta 0)
# remote: Resolving deltas: 100% (5/5), done.
# To github.com:michaelliao/learngit.git
#  * [new branch]      master -> master
# Branch 'master' set up to track remote branch 'master' from 'origin'.
```

Git不但会把本地的`master`分支内容推送的远程新的`master`分支，还会把本地的`master`分支和远程的`master`分支关联起来，在以后的推送或者拉取时就可以简化命令。 推送成功后，可以立刻在GitHub页面中看到远程库的内容已经和本地一模一样。从现在起，只要本地作了提交，就可以通过命令：

```shell
git push origin master# 把本地`master`分支的最新修改推送至GitHub，现在，你就拥有了真正的分布式版本库！
```

<font color="red">SSH警告</font>，当你第一次使用Git的`clone`或者`push`命令连接GitHub时，会得到一个警告：

```shell
# The authenticity of host 'github.com (xx.xx.xx.xx)' can't be established.
# RSA key fingerprint is xx.xx.xx.xx.xx.
# Are you sure you want to continue connecting (yes/no)?
```

**这是因为Git使用SSH连接，而SSH连接在第一次验证GitHub服务器的Key时，需要你确认GitHub的Key的指纹信息是否真的来自GitHub的服务器，输入`yes`回车即可**。Git会输出一个警告，告诉你已经把GitHub的Key添加到本机的一个信任列表里了，这个警告只会出现一次，后面的操作就不会有任何警告了：

```shell
# Warning: Permanently added 'github.com' (RSA) to the list of known hosts.
```

如果你实在担心有人冒充GitHub服务器，输入`yes`前可以对照[GitHub的RSA Key的指纹信息](https://help.github.com/articles/what-are-github-s-ssh-key-fingerprints/)是否与SSH连接给出的一致。

</br>

#### 6.2 从远程库克隆

Git支持多种协议，默认的`git://`使用ssh，但也可以使用`https`等其他协议，关于在国内快速Clone别人的优秀代码，参照我之前的博客。使用`https`除了速度慢以外（大陆除外，呵呵），还有个最大的麻烦是每次推送都必须输入口令，但是在某些只开放http端口的公司内部就无法使用`ssh`协议而只能用`https`。

</br>

</br>

</br>

### 七、Master Commit

> 分支就是科幻电影里面的平行宇宙，当你正在电脑前努力学习Git的时候，另一个你正在另一个平行宇宙里努力学习SVN。如果两个平行宇宙互不干扰，那对现在的你也没啥影响。不过，在某个时间点，两个平行宇宙合并了，结果，你既学会了Git又学会了SVN！

分支在实际中有什么用呢？假设你准备开发一个新功能，但是需要两周才能完成，第一周你写了50%的代码，如果立刻提交，不完整的代码库会导致别人不能干活了。如果等代码全部写完再一次提交，又存在丢失每天进度的巨大风险。

有了分支，就不用怕了。你创建了一个属于你自己的分支，别人看不到，还继续在原来的分支上正常工作，而你在自己的分支上干活，想提交就提交，直到开发完毕后，再一次性合并到原来的分支上，这样，既安全，又不影响别人工作。

其他版本控制系统如SVN等都有分支管理，但是这些版本控制系统创建和切换分支比蜗牛还慢，简直让人无法忍受，结果分支功能成了摆设，大家都不去用。但Git的分支无论创建、切换和删除分支，在1秒钟之内就能完成！无论你的版本库是1个文件还是1万个文件。

</br>

#### 7.1  创建与合并分支	

版本回退的每次提交，Git都把它们串成一条时间线，这条时间线就是一个分支。截止到目前，只有一条时间线，在Git里，这个分支叫主分支，即`master`分支。`HEAD`严格来说不是指向提交，而是指向`master`，`master`才是指向提交的，所以，`HEAD`指向的就是当前分支。

一开始的时候，`master`分支是一条线，Git用`master`指向最新的提交，再用`HEAD`指向`master`，就能确定当前分支，以及当前分支的提交点：

![](https://static.liaoxuefeng.com/files/attachments/919022325462368/0)

每次提交，`master`分支都会向前移动一步，这样，随着你不断提交，`master`分支的线也越来越长。当我们创建新的分支，例如`dev`时，Git新建了一个指针叫`dev`，指向`master`相同的提交，再把`HEAD`指向`dev`，就表示当前分支在`dev`上：

![](https://static.liaoxuefeng.com/files/attachments/919022363210080/l)

你看，Git创建一个分支很快，因为除了增加一个`dev`指针，改改`HEAD`的指向，工作区的文件都没有任何变化！

不过，从现在开始，对工作区的修改和提交就是针对`dev`分支了，比如新提交一次后，`dev`指针往前移动一步，而`master`指针不变：

![](https://static.liaoxuefeng.com/files/attachments/919022387118368/l)

所以Git合并分支也很快！就改改指针，工作区内容也不变！

合并完分支后，甚至可以删除`dev`分支。删除`dev`分支就是把`dev`指针给删掉，删掉后，我们就剩下了一条`master`分支：

![](https://static.liaoxuefeng.com/files/attachments/919022412005504/0)

真是太神奇了，你看得出来有些提交是通过分支完成的吗？下面开始实战。

首先，我们：

```shell
git checkout -b dev # 创建dev分支，然后切换到`dev`分支
# Switched to a new branch dev
#加上`-b`参数表示创建并切换，相当于以下两条命令:
# git branch dev
# git checkout dev
# Switched to branch dev
git branch # 列出所有分支，当前分支前面会标一个*号
# * dev
#   master
```

我们就可以在`dev`分支上正常提交，比如对`readme.txt`做个修改，加上一行：`Creating a new branch is quick.`然后提交：

```shell
git add readme.txt 
git commit -m "branch test"
# [dev b17d20e] branch test
#  1 file changed, 1 insertion(+)
git checkout master# 切换回master分支：
Switched to branch 'master'
# 之后查看原来提交分支的内容其实并没有变化
git merge dev# dev分支合并
# Updating d46f35e..b17d20e
# Fast-forward
#  readme.txt | 1 +
#  1 file changed, 1 insertion(+)
git branch -d dev# 删除dev分支
# Deleted branch dev (was b17d20e).
git branch# 只剩下master分支
# * master
```

注意到上面的`Fast-forward`信息，Git告诉我们，这次合并是“快进模式”，也就是直接把`master`指向`dev`的当前提交，所以合并速度非常快。当然，也不是每次合并都能`Fast-forward`，我们后面会讲其他方式的合并。

因为创建、合并和删除分支非常快，所以Git鼓励你使用分支完成某个任务，合并后再删掉分支，这和直接在`master`分支上工作效果是一样的，但过程更安全。

</br>

#### 7.2 冲突

模拟一个场景：

```shell
git switch -c feature1
# Switched to a new branch 'feature1'
```

修改`readme.txt`最后一行，改为：`Creating a new branch is quick AND simple.`

```shell
git add readme.txt# 在feature1分支上提交：
git commit -m "AND simple"
# [feature1 14096d0] AND simple
#  1 file changed, 1 insertion(+), 1 deletion(-)
git switch master# 切换到master分支：
# Switched to branch 'master'
# Your branch is ahead of 'origin/master' by 1 commit.
#   (use "git push" to publish your local commits)	
```

在`master`分支上把`readme.txt`文件的最后一行改为：`Creating a new branch is quick & simple.`

```shell
git add readme.txt 
git commit -m "& simple"
# [master 5dc6824] & simple
#  1 file changed, 1 insertion(+), 1 deletion(-)
```

这种情况下，Git无法执行“快速合并”，只能试图把各自的修改合并起来，但这种合并就可能会有冲突:

```shell
git merge feature1
# Auto-merging readme.txt
# CONFLICT (content): Merge conflict in readme.txt
# Automatic merge failed; fix conflicts and then commit the result.
git status
# On branch master
# Your branch is ahead of 'origin/master' by 2 commits.
#   (use "git push" to publish your local commits)
# You have unmerged paths.
#   (fix conflicts and run "git commit")
#   (use "git merge --abort" to abort the merge)
# Unmerged paths:
#   (use "git add <file>..." to mark resolution)
# 	both modified:   readme.txt
# no changes added to commit (use "git add" and/or "git commit -a")
cat "readme.txt"#Git用<<<<<<<，=======，>>>>>>>标记出不同分支的内容
# Git is a distributed version control system.
# Git is free software distributed under the GPL.
# Git has a mutable index called stage.
# Git tracks changes of files.
# <<<<<<< HEAD
# Creating a new branch is quick & simple.
# =======
# Creating a new branch is quick AND simple.
# >>>>>>> feature1
```

我们修改如下后保存：`Creating a new branch is quick and simple.`

```shell
git add readme.txt 
git commit -m "conflict fixed"
# [master cf810e4] conflict fixed
git log --graph --pretty=oneline --abbrev-commit# git log --graph`命令可以看到分支合并图
# *   cf810e4 (HEAD -> master) conflict fixed
# |\  
# | * 14096d0 (feature1) AND simple
# * | 5dc6824 & simple
# |/  
# * b17d20e branch test
# * d46f35e (origin/master) remove test.txt
# * b84166e add test.txt
# * 519219b git tracks changes
# * e43a48b understand how stage works
# * 1094adb append GPL
# * e475afc add distributed
# * eaadf4e wrote a readme file
git branch -d feature1# 删除feature1分支：
# Deleted branch feature1 (was 14096d0	).
```

Git无法自动合并分支时，就必须首先解决冲突。解决冲突后，再提交，合并完成。解决冲突就是**把Git合并失败的文件手动编辑为我们希望的内容，再提交。**

</br>

#### 7.3 分支管理策略

`Fast forward`模式，但这种模式下，删除分支后，会丢掉分支信息，如果要强制禁用`Fast forward`模式，Git就会在merge时生成一个新的commit，这样，从分支历史上就可以看出分支信息，这时可以用`--no-ff`方式的`git merge`.q其实加上`--no-ff`参数就可以**用普通模式合并**，合并后的历史有分支，能看出来曾经做过合并，而`fast forward`合并就看不出来曾经做过合并。

```shell
git switch -c dev# 创建并切换dev分支
# Switched to a new branch 'dev'
git add readme.txt #修改后提交非分支
git commit -m "add merge"
# [dev f52c633] add merge
#  1 file changed, 1 insertion(+)
git switch master# 切换回master
# Switched to branch 'master'
git merge --no-ff -m "merge with no-ff" dev# 合并要创建一个新commit，故+ -m参数
# Merge made by the 'recursive' strategy.
#  readme.txt | 1 +
#  1 file changed, 1 insertion(+)
git log --graph --pretty=oneline --abbrev-commit
# *   e1e9c68 (HEAD -> master) merge with no-ff
# |\  
# | * f52c633 (dev) add merge
# |/  
# *   cf810e4 conflict fixed
```

即：

![。](https://static.liaoxuefeng.com/files/attachments/919023225142304/0)

所以最后下来是这样做的：

首先，`master`分支应该是非常稳定的，也就是仅用来发布新版本，平时不能在上面干活；干活都在`dev`分支上，也就是说，`dev`分支是不稳定的，到某个时候，比如1.0版本发布时，再把`dev`分支合并到`master`上，在`master`分支发布1.0版本；你和你的小伙伴们每个人都在`dev`分支上干活，每个人都有自己的分支，时不时地往`dev`分支上合并就可以了。所以，团队合作的分支看起来就像这样：

![](https://static.liaoxuefeng.com/files/attachments/919023260793600/0)



</br>

#### 7.4 Bug分支

在Git中分支是如此的强大，所以每个bug都可以通过一个新的临时分支来修复，修复后，合并分支，然后将临时分支删除。

当你接到一个修复一个代号101的bug的任务时，很自然地，你想创建一个分支`issue-101`来修复它，但是，等等，当前正在`dev`上进行的工作还没有提交：

```shell
git status
# On branch dev
# Changes to be committed:
#   (use "git reset HEAD <file>..." to unstage)
# 
# 	new file:   hello.py
# 
# Changes not staged for commit:
#  (use "git add <file>..." to update what will be committed)
#  (use "git checkout -- <file>..." to discard changes in working directory)
# 
#	modified:   readme.txt
```

并不是你不想提交，而是工作只进行到一半，还没法提交，预计完成还需1天时间。但是，必须在两个小时内修复该bug，怎么办？

幸好，Git还提供了一个`stash`功能，可以把当前工作现场“储藏”起来，等以后恢复现场后继续工作：

```shell
git stash
# Saved working directory and index state WIP on dev: f52c633 add merge
# git status查看工作区，就是干净的（除非有没有被Git管理的文件）
```



确定要在哪个分支上修复bug，假定需要在`master`分支上修复，就从`master`创建临时分支：

```shell
git checkout master
# Switched to branch 'master'
# Your branch is ahead of 'origin/master' by 6 commits.
#   (use "git push" to publish your local commits)

git checkout -b issue-101
# Switched to a new branch 'issue-101'

#改完之后：
git add readme.txt 
git commit -m "fix bug 101"
# [issue-101 4c805e2] fix bug 101
#  1 file changed, 1 insertion(+), 1 deletion(-)
git switch master
# Switched to branch 'master'
# Your branch is ahead of 'origin/master' by 6 commits.
#   (use "git push" to publish your local commits)

git merge --no-ff -m "merged bug fix 101" issue-101 # 完成合并，最后删除issue-101分支
# Merge made by the 'recursive' strategy.
#  readme.txt | 2 +-
#  1 file changed, 1 insertion(+), 1 deletion(-)
git switch dev#切回去继续干活
#Switched to branch 'dev'
git status
# On branch dev
# nothing to commit, working tree clean
git stash list
# stash@{0}: WIP on dev: f52c633 add merge
```

恢复有两个办法：

1. `git stash apply`恢复，但是恢复后，stash内容并不删除，你需要用`git stash drop`来删除；
2. `git stash pop`，恢复的同时把stash内容也删了：

```shell
git stash pop
# On branch dev
# Changes to be committed:
#   (use "git reset HEAD <file>..." to unstage)
# 
# 	new file:   hello.py

# Changes not staged for commit:
#   (use "git add <file>..." to update what will be committed)
#   (use "git checkout -- <file>..." to discard changes in working directory)
# 
# 	modified:   readme.txt
# 
# Dropped refs/stash@{0} (5d677e2ee266f39ea296182fb2354265b91b3b2a)
git stash list
```

可以多次stash，恢复的时候用`git stash list`查看，然后恢复指定的stash：

```shell
git stash apply stash@{0}
```

在master分支上修复了bug后，我们要想一想，dev分支是早期从master分支分出来的，所以，这个bug其实在当前dev分支上也存在。那怎么在dev分支上修复同样的bug？重复操作一次，提交不就行了？

有更简单的方法。同样的bug，要在dev上修复，我们只需要把`4c805e2 fix bug 101`这个提交所做的修改“复制”到dev分支。注意：我们只想复制`4c805e2 fix bug 101`这个提交所做的修改，并不是把整个master分支merge过来。为了方便操作，Git专门提供了一个`cherry-pick`命令，让我们能复制一个特定的提交到当前分支：

```shell
git branch
# * dev
#   master
git cherry-pick 4c805e2
# [master 1d4b803] fix bug 101
#  1 file changed, 1 insertion(+), 1 deletion(-)
```

Git自动给dev分支做了一次提交，**注意这次提交的commit是`1d4b803`**，它并不同于master的`4c805e2`，因为这两个commit只是改动相同，但确实是两个不同的commit。用`git cherry-pick`，我们就不需要在dev分支上手动再把修bug的过程重复一遍。

既然可以在master分支上修复bug后，在dev分支上可以“重放”这个修复过程，那么直接在dev分支上修复bug，然后在master分支上“重放”行不行？当然可以，不过你仍然需要`git stash`命令保存现场，才能从dev分支切换到master分支。即在master分支上修复的bug，想要合并到当前dev分支，可以用`git cherry-pick `命令，把bug提交的修改“复制”到当前分支，避免重复劳动。

</br>

#### 7.5 Delete分支

添加一个新功能时，你会每添加一个新功能，最好新建一个feature分支，在上面开发，完成后，合并，最后，删除该feature分支。快完成时，接到上级命令，因经费不足，新功能必须取消！

```shell [S&#39;H&#39;E&#39;L&#39;L]
git switch -c feature-vulcan
#Switched to a new branch 'feature-vulcan'
git add vulcan.py
git status
# On branch feature-vulcan
# Changes to be committed:
#   (use "git reset HEAD <file>..." to unstage)
# 
# 	new file:   vulcan.py
# 
git commit -m "add feature vulcan"
# [feature-vulcan 287773e] add feature vulcan
#  1 file changed, 2 insertions(+)
#  create mode 100644 vulcan.py 
git switch dev
git branch -d feature-vulcan
# error: The branch 'feature-vulcan' is not fully merged.
# If you are sure you want to delete it, run 'git branch -D feature-vulcan'.
git branch -D feature-vulcan# 强行删除
# Deleted branch feature-vulcan (was 287773e).
```

</br>

#### 7.6 多人协作

总体而言就是解决冲突的时候先PULL请求，然后本地做整合，最后再PUSH到远端仓库里面，设计的东西比较多，留作日后的坑再补…… 

</br></br></br>

### 八、标签管理

</br>

#### 8.1 创建标签

命令`git tag `用于新建一个标签，默认为`HEAD`，也可以指定一个commit id；

```shell
git tag v1.0.0 1094adb
```

命令`git tag -a  -m "blablabla..."`可以指定标签信息，``-a`指定标签名，`-m`指定说明文字;

```shell
git tag -a v0.1 -m "version 0.1 released" 1094adb
```

命令`git tag`可以查看所有标签。

```shell
git tag
# v0.9
# v1.0
```

命令以用`git show <tagname> `可以查看标签的详细信息

```shell
git show v0.9
#commit f52c63349bc3c1593499807e5c8e972b82c8f286 (tag: v0.9)
#Author: Michael Liao <askxuefeng@gmail.com>
#Date:   Fri May 18 21:56:54 2018 +0800
#
#    add merge
#
#diff --git a/readme.txt b/readme.txt
#...
```

</br>

#### 8.2 操作标签

创建的标签都只存储在本地，不会自动推送到远程。所以，打错的标签可以在本地安全删除。如果要推送某个标签到远程，使用命令`git push origin `：

```shell
git tag -d v0.1
# Deleted tag 'v0.1' (was f15b0dd)
git push origin v1.0
# Total 0 (delta 0), reused 0 (delta 0)
# To github.com:michaelliao/learngit.git
#  * [new tag]         v1.0 -> v1.0
git push origin --tags
# Total 0 (delta 0), reused 0 (delta 0)
# To github.com:michaelliao/learngit.git
# * [new tag]         v0.9 -> v0.9
```

删除远程标签

```shell
git tag -d v0.9
# Deleted tag 'v0.9' (was f52c633)
git push origin :refs/tags/v0.9
# To github.com:michaelliao/learngit.git
#  - [deleted]         v0.9
```

</br>

</br>

</br>

### 后记

其实感觉有的时候中国的教材不是给下面的人看的，而是给同僚和自己看的，我会嫌弃写的过于详细而浪费时间，但是当我在拜读那些大佬的作品的时候常常因为他们的“此处省略”而抓耳挠腮，很不多Ctrl+w把它从我眼睛中去除，可能这也是我要避免的一个点，要做到清晰、正确、连贯和朴实，说了百字还真是废话呢……

- git remote：列出remote 别名。
- git remote rm [别名]: 删除一个存在的remote alias。
- git remote set-url [别名] [url]:更新远程repo的url。
- git branch：列出本地所有分支,当前分支会被星号标示出。
- git branch (branchname): 创建一个新的分支(当你用这种方式创建分支的时候,分支是基于你的上一次提交建立的)。
- git config -l：查看git config的信息
- git push -f：强推（慎用），即利用强覆盖方式用你本地的代码替代git仓库内的内容

</br>

</br>

</br>

### 参考资料

[1]. [廖雪峰的官方网站的Git教程](https://www.liaoxuefeng.com/wiki/896043488029600 ) : 教程事无巨细且读来有趣不乏味，推荐原文阅读。

[2]. [Git-Book](https://git-scm.com/book/zh/v2):Git的官方文档，可以随时查看。

如果需要官方书籍请点击[这里](http://pan-yz.chaoxing.com/share/info/1798800a2d238b41).