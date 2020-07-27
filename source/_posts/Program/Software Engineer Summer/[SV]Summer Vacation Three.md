---
title: '[SV]Summer Vacation Three'
date: 2020-07-23 21:00:00
toc: true
---

### Preface

Today is 23^th^ Jul, 2020. I have a little envious about something, which is reason I continue to write these words. Emotion needs to be freed, such as her lived in my past memory , some hurt words in the past I couldn't forget. But unfortunatly nobody company with me. it actually make more effictive in hurt myself, which is reason why we want a pet like a cat or dog, beacuse we just would't like alone. Meanwhile, it likes not the first that  Even I could thought I cry for myself alone again one day in futurn. It sucks! Fu\*\*\*\*\* dame it! I waana leave !!!

### gcc[^1]

gcc是linux系统集成的编译器。在linux环境下**没有集成开发环境的一键式操作所带来的麻烦**。这其中涉及**命令行操作、编译选项的设定、文件依赖关系的书写(makefile)等问题**。这里主要介绍的是关于gcc的常用命令行参数及其相应的作用。以C为例, C++同理。

#### Preprocessing

```bash
gcc -E -o hello.i hello.c # 预处理；对源码进行头文件展开，宏替换等操作
```

#### Compliation

```bash
gcc -S -o hello.s  hello.c  # 编译；把c++代码翻译成汇编语言
```
#### Assembly



```bash
cc -c -o hello.o hello.s # 汇编；将输出的汇编代码翻译成符合一定格式的机器代码
```

#### Linking

```bash
gcc -o hello hello.o # 连接；将汇编生成的OBJ文件，系统库的OBJ文件，库文件链接起来，最终生成可以在特定平台运行的可执行程序
```

### GDB

linux程序调试中最常用的工具，gdb主要可以做四件事情帮我们找到bug：
+ 启动你的程序，指定任意可以影响程序行为的参数；
+ 让你的程序在指定的条件停下；
+ 测试你的程序停止的时候发生了什么；
+ 改变程序内部的变量，来改正程序的错误继续执行。


#### GDB常用命令

+ 开始/结束gdb：使用 gdb filename 启动gdb，其中 filename 应为可执行文件;  gdb以命令行环境运行，进入gdb后，程序会等待用户的指令并执行，直至用户选择退出。使用q 或 Ctrl + d退出。

```bash
gdb a.out # 使用gdb对a.out进行调试　　
```
+ 运行指令（run/r)

```bash
r # 表示开始运行程序，如果是正在调试的程序，表示再次进行调试
```
+ l/list指令: 可以使用指令l来列出源文件中的部分源代码。(需要编译时加入 -g 选项生成对应的编译符号)
  + 对于多个文件的而言，可以通过 l 源文件名：行号 来指定所需查看的源代码
  + 也可以以函数为整体进行输出，命令格式为 l function_name

```bash
l 10 # 输出源程序10行的源码，可以方便进行调试。若要继续查看，按回车键会继续向下显示。
l hello.c:10 # 输出hello.c在第10行前后的代码（默认共十行代码）
l main # 输出main函数上下共十行的源代码
```
+ 断点指令

指令 b可以在需要地方放置断点，使得程序在指令的位置停止运行，指令格式为 b 断点位置。其中，断点位置可以是行号，也可以是函数名(指定方式与 l 指令类似)，也可以是地址。

```bash
b 10 # 在源代码10行处放置断点　　
b main # 在main函数开始处放置断点　　
b *0x80480000 # 在存放在0x80480000处的指令处放置断点，直接使用地址时需要使用 *地址 的格式 　　
b 10 if a<10 # 可以在断点中加入中断执行的条件，表示当a < 10 时才会中断程序执行
```

在断点处检查完毕后，可以使用 c 指定继续指令的执行，跳转到下个断点，或者跳转到观察点。使用指令 disable/enable 断点号 可以启用/停用某断点。使用指令 d 可删除所有的断点，d 1 删除breakpoint 1.

```bash
disable/enable n # 停用/启用编号为n的断点
d # 删除所有断点
d n # 删除标号为n的断点
```
+ 观测点(watch)指令: 一般用来观察某个变量/内存地址的状态（也可以是表达式），如可以监控该变量/内存值是否被程序读/写情况。

```bash
watch a # 当（指定变量/内存地址/表达式）a 的值发生变化时，中断程序执行　　
awatch a # 当a被读或者被写的时候将停住程序
rwatch a # 当 a 的值被读取时，中断表达式的执行
```
+ 显示(disp)和打印(p)指令: disp指令(display)可以在每次程序暂定时显示指定变量的值，指令格式为 disp 变量名。若输入的变量为数组名，则每次显示数组的所有元素，若为结构体，则输出结构体的所有成员的值。

```bash
disp temp # 在每次程序暂停时输出指定的变量的值(确保程序在指定变量的作用域内执行，如某个在特定函数中的局部变量在程序进入该函数执行之前是无法被显示的)　　
undisplay # 取消所有disp指定的自动显示变量
```

p指定(print)同样将变量的值打印出来，用法与diap类似，但结果只显示一次。

除变量外，p指令还可以输出给定寄存器、给定地址处的值。同时，可以通过一些参数对打印格式进行规定，如 /x 表示以16进制格式打印值，/t表示以二进制格式打印值。

```bash
p $eax # 打印寄存器%eax存储的值，注意使用$标志寄存器名称　　
p /x ($ebp + 8)# 以十六进制的格式打印%ebp + 8 的值　　
p /t 100# 以二进制格式输出100的值　　
p *0x08048000# 输出位于0x08048000处的数据(此处实际存放的是机器代码)，注意地址需使用 * 标志，否则会被默认为常数　　
p *(int *)0xxxxxxxx # 将指定地址处数据按照整数格式输出，这里一般需要指出指针类型方便gdb解释数据
```
+ nfo命令：列出相应的信息

```bash
info watchpoints # 输出所有观察点　　
info frame # 输出栈帧的使用情况　　
info  b n # 其中 n 为指定的断点号，显示指定断点的状态信息，不加参数 n 时，会显示所有的断点的信息
```
+ ptype指令

```bash
pt a # 可以查看变量a的类型，ptype可以简写为pt
```
+ 格式化输出(printf)指令: 使用方法与C语言中的格式化输出函数相似. 使用指令whatis可以方便的得知所需对象的类型，如 whatis temp 会显示出temp的类型定义，在调试时有用。

```bash
printf" %d , %d \n",X,Y # 对于两个整型变量X，Y进行输出
```
+ s(step)与n指令: s 与 n 指令都是表示执行下一条指令指令的意思。但是，当遇到函数调用时，s 指令会进入函数调用内部进行执行，即下一步为被调函数的第一指令，而 n 指令不进入函数调用内部，会将整个函数的执行过程当作一步执行。

+ 回溯(bt)指令: 回溯指令(backtrace)可以查看程序内存访问越界等错误信息，显示程序出错的位置，从而帮助定位程序错误。

+ 设置(set)指令: 可以将指定的变量的值修改为调试所需要的值。如对于一个int型的变量X，可以使用 set X = 12 将变量的值进行设置。



### Afterwords

至此实验班的大概知识干货就这样子了, 接下来这几天要开始兼顾学校的课程了, 可能就不能这样子全身心的投入到输出这一环节了. 加油!!!





[^1]:https://mp.weixin.qq.com/s/9cFFBS2srnoK8BujQNhB0A