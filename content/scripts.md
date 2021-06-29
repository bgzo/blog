---
title: "Scripts"
date: 2021-03-07T23:19:32+08:00
draft: true
dropcap: false
tags:
- linux
---


本文推荐阅读不限于:
- [Termux Text Color-Gist](https://gist.github.com/vratiu/9780109)
- [Bash 脚本教程](https://wangdoc.com)-[Github](https://github.com/wangdoc/bash-tutorial)
- [用 Python 替代 Bash 脚本](https://www.oschina.net/translate/python-scripts-replacement-bash-utility-scripts)

<!--more-->

## Commands

### echo

```shell
$ echo hello world
$ echo "<HTML>
    <HEAD>
          <TITLE>Page Title</TITLE>
    </HEAD>
    <BODY>
          Page body.
    </BODY>
</HTML>" # multi-output
```

### ps/grep

```shell
$ ps -ef | grep -v grep
# ps:
  # UID 程序被该 UID 所拥有
  # PID 程序 ID 
  # PPID 则是其上级父程序的ID
  # C CPU使用的资源百分比
  # STIME  系统启动时间
  # TTY  登入者的终端机位置
  # TIME 使用掉的CPU时间。
  # CMD 所下达的是什么指令
 #`-e`: Select all processes.  Identical to -A.
 #`-f`:  Do full-format listing.  This option can be combined with 
 #       many other UNIX-style options to add additional
 #       columns.  It also causes the command arguments to be
 #       printed.  When used with -L, the NLWP (number of
 #       threads) and LWP (thread ID) columns will be added.  See
 #       the c option, the format keyword args, and the format
 #       keyword comm.
 #`aux`: 用BSD的格式来显示参数. 

# grep
  # `grep`: Global Regular Expression Print 
  # `grep -v grep` means that do not include the grep used for filtering in the command output.[1]
 #`-v`: Invert the sense of matching, to select non-matching lines.
 
```

### iptables

https://www.zsythink.net/archives/1199

### 



## SCRIPTS

```shell
# ????
	if [[ -f /etc/redhat-release ]]; then
		release="centos"
```

```shell
# Quote the system bin
PATH=/bin:/sbin:/usr/bin:/usr/sbin:/usr/local/bin:/usr/local/sbin:~/bin

# Judge System Release
cat /etc/issue | grep -q -E -i "ubuntu" # debain / centos 
cat /proc/version | grep -q -E -i "ubuntu" # centos|redhat|red hat / debain

# file extence
if [[ ! -e "adbyby.tar.gz" ]]; then xxx;
# it's telling the shell to check into the existence of 
# $filename to know whether to choose the then or else statement.
# [[ ]] denotes a boolean variable whose value depends on the expression within.
# Traditionally, [ ] was the bash syntax to issue test command, 
# returning the value of the expression, regardless of type and in any context. 
# Newer versions of bash adopted [[ ]] as a keyword exclusively for if-statements. (see:[2])
```

-e filename 如果 filename存在，则为真
-d filename 如果 filename为目录，则为真
-f filename 如果 filename为常规文件，则为真
-L filename 如果 filename为符号链接，则为真
-r filename 如果 filename可读，则为真
-w filename 如果 filename可写，则为真
-x filename 如果 filename可执行，则为真
-s filename 如果文件长度不为0，则为真
-h filename 如果文件是软链接，则为真 
// https://zhidao.baidu.com/question/1383018121535109180.html





![](https://z3.ax1x.com/2021/06/28/RNt0kn.png)

<div id="j1">[1]. https://stackoverflow.com/questions/29454101/unix-grep-command-grep-v-grep</div>
<div id="j2">[2]. https://askubuntu.com/questions/780082/what-does-if-e-filename-means  </div>
