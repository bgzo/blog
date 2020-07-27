---
title: '[SV]Summer Vacation Two'
date: 2020-07-22 12:00:00
toc: true
tag:
- Linux
- c++
---


### C语言编程实践 -> Makefile入门


#### Makefile[^1]

> 在软件开发中，**make通常被视为一种软件构建工具**。该工具主要**经由读取一种名为“makefile”或“Makefile”的文件来实现软件的自动化建构**。

**make命令执行时，需要一个 makefile 文件，以告诉make命令如何去编译程序**。

> 不同于之前只留有一个源文件, 一个大型的工程项目中的源文件不计其数，其按类型、功能、模块分别放在若干个目录中。makefile定义了一系列的规则来指定工程项目中哪些文件需要先编译，哪些文件需要后编译，哪些文件需要重新编译。


+ 第一种方法
```cpp
#include<stdio.h>
#define PI 3.141592653
int main(){
    double r;
    printf("Please enter the radius of the circle: ");
    scanf("%lf",&r);
    printf("Circumference of the circle is: ");
    printf("%lf\n",r*PI*2);
    printf("Area of the circle is: ");
    printf("%lf\n",r*r*PI);
    return 0;
}
```

+ 第二种方法
```cpp
#include<stdio.h>
#define PI 3.141592653
double  get_circumference(double r);
double  get_area(double r);
int main(){
    double r;
    printf("Please enter the radius of the circle ");
    scanf("%lf",&r);
    printf("Circumference of the circle is: ");
    printf("%lf\n",get_circumference(r));
    printf("Area of the circle is: ");
    printf("%lf\n",get_area(r));
    return 0;
}
double  get_circumference(double r){
     return  2*PI*r;
}
double  get_area(double r){
     return  PI*r*r;
}
```


+ 第三种方法
```cpp
// 第一个文件 text.c
#include <stdio.h>
#include "mylib.h"
int main(){
    double r;
    printf("Please enter the radius of the circle：\n");
    scanf("%lf",&r);
    printf("Circumferenceof the circle is：\n");
    printf("%lf\n",get_circumference(r));
    printf("Area of the circleis：\n");
    printf("%lf\n",get_area(r));
    return 0;
}
//第二个文件 mylib.c
#include "mylib.h"
double  get_circumference(double r){
    return  2*PI*r;
}
double  get_area(double r){
    return  PI*r*r;
}
//第三个文件 lib.h
#define  PI 3.141592653
double  get_circumference(double r);
double  get_area(double r);
```
执行编译命令
    ```bash
    gcc -o text mylib.c text.c
    ```
上面的编译方式，当我们修改一个文件时，不需要所有的源文件都参与编译，只需要编译改动的那个文件即可，然后最终编译为可执行文件。但是如果源文件很多，那就比较麻烦了，因此需要下面的Make了。


+ 第四种方法:

    ```bash
    hello : mylib.o  text.o
        gcc -o hello mylib.o text.o
    mylib.o : mylib.c mylib.h
        gcc -c mylib.c
    text.o: text.c
        gcc -c text.c
    clean:
        rm hello mylib.o text.o
    ```
执行编译命令
```bash
make
./hello
make clean
```

以上只是简陋的实例, 以实际为标准


#### 为什么不用类 Python 的脚本语言[^2]

make、cmake 这种是领域特定语言(DSL, Domain Specific Language)，使用前需要掌握特定的领域知识。具体需要理解程序和库，怎么从源码一步步构建出来的。中间需要配置目标、路径、依赖关系、生成规则等等。难的并非是 make 和 cmake 语法本身，而是构建和编译的基本知识。没有这些基本知识，就算换了 Python 来写，也是一样会难的。这里说换 Python 来写，是指配置文件用 Python 的语法来写。如果你不使用任何已有工具，从头使用 Python 来控制整个编译构建过程，工作量太大。

编译构建本身是个复杂过程，不同的项目构建规则会有所不同。比如项目有个 txt 的列表文件，需要先调用一个 Python 脚本生成 c 数组，产生一个 list.c 文件，之后让这个 list.c 跟项目其它文件一起编译。或者项目有 Debug 和 Release 两种设置，Debug 不优化，Release 使用 O3 优化。或者项目依赖一个第三方库，需要指定库的路径。

总需要某种方式来告诉构建工具，各种各样的规则。使用 make 工具，规则就写在 makefile 中。而一旦写好 makefile，之后的构建就只需要敲 make 命令。假如不写 makefile，规则还是会以另一种方式存在，比如像 go 语言那样，按照一定的命名方式来组件代码，再运行 go build。

对于 make，最关键的规则是指定依赖关系。当某些文件变了，直接或者间接依赖这些文件的目标就需要重新构建，其它没有依赖的目标不用重新构建。这样可以大大加快构建速度。make 用于构建，并不一定非要用于编译。比如写一本书，就可以用 make 来管理，书稿一但变动，敲入 make 命令，就生成书的交叉索引和目录，并同时生成 word 文档，网页格式、pdf 格式。另外也可以用 make 来生成网站。

make 是很基础的工具。现在基本不会手写 makefile, 而是用其它更高级的工具根据平台，额外配置来生成 makefile（或者生成常用 IDE 的工程文件）, 之后再调用 make。cmake 就是这样的工具，类似的工具还有 Qt 用的 qmake，Lua 写的 premake。

实际上开源库，这些生成规则已经写好了。构建通常只需要三步

```text
./configure
make
make install
```

configure 根据平台和配置自动生成 makefile，之后用 make 来构建项目，再使用 make install 来安装到相应目录。并不需要过多了解 make 和 cmake 的语法。当编写自己的库，才需要了解 make 或者 cmake 的具体语法。

现在编写程序经常依靠 IDE，IDE 将整个构建的过程封装起来。构建过程对于很多人来说是个黑箱子，只知道将文件拖进工程，按个 Build 按钮，程序就出来了。有些人甚至连 Debug 和 Release 有什么区别也不知道。缺乏基本的编译和构建概念，之前只接触过 IDE，初次接触 make、cmake 这些工具, 多少会有不适应的。

那为什么有了 IDE 这样“先进”的东西，还需要 make 和 cmake 这些看似“原始”的工具呢？

1. 某些语言根本就没有 IDE。make 工具是很通用的，任何语言都可以使用，甚至并非是编程也可以使用。上文就提到可以用 make 工具来管理书稿，或者编写网站。
2. 为了跨平台。不同的平台有不同的 IDE，比如同一个 C++ 工程，在 Windows 常用的 IDE 是 Visual Studio, Mac 平台的 IDE 是 Xcode。假如使用 IDE，就需要分别为每个 IDE 重复配置。使用 cmake 工具，只需要写好配置一次，开发的时候根据开发人员的习惯来选择开发方式。有些人在 Linux 平台选择 Vim 来开发；有些人习惯用 IDE，就生成 IDE 项目文件。Mac 平台开发人员就可以用 Xcode，Windows 平台开发人员可以使用 Visual Studio。发布时候，不用发布 IDE 的项目文件。每个平台都用相应的 cmake 来构建。
3. 需要很多控制。让同一份代码，根据不同的情况、不同的平台、编译出不同的版本。比如可以选择编译成静态库和动态库，是否需要 WebKit 功能，是否需要界面，是否需要支持特定的硬件等等。这些控制，使用 IDE 也很难做得。


#### make[^3] & makefile & cmake & nmake[^4] [^5] [^6]

+ make: 可以看成是一个智能的批处理工具，它本身并没有编译和链接的功能，而是用类似于批处理的方式—**通过调用makefile文件中用户指定的命令来进行编译和链接**的。
+ makefile: 就像一首歌的乐谱，make工具就像指挥家，指挥家根据乐谱指挥整个乐团怎么样演奏，**make工具就根据makefile中的命令进行编译和链接的**。makefile命令中就**包含了调用gcc（也可以是别的编译器）去编译某个源文件的命令**。makefile在一些简单的工程完全可以人工拿下，但是当工程非常大的时候，手写makefile也是非常麻烦的，如果换了个平台makefile又要重新修改，这时候就出现了下面的Cmake这个工具。
+ cmake: 可以更加简单的生成makefile文件给上面那个make用。当然cmake还有其他更牛批功能，就是**可以跨平台生成对应平台能用的makefile**，我们就不用再自己去修改了。**cmake根据一个叫CMakeLists.txt文件（学名：组态档）去生成makefile**。
  + CMakeList.txt: 自己手写CMakeLists.txt (呵呵)
+ nmake: nmake是Microsoft Visual Studio中的附带命令，需要安装VS，实际上可以说相当于linux的make.

总的来说是下图如此:

![](/img/program/c++make.png)



### Reference

[^1]:https://mp.weixin.qq.com/s/TbiaacY3h8SutWVNeNEdeQ
[^2]:https://www.zhihu.com/question/51607490/answer/126627362
[^3]:https://en.wikipedia.org/wiki/Make_%28software%29
[^4]:https://zhuanlan.zhihu.com/p/111110992
[^5]:https://www.cnblogs.com/russellluo/archive/2011/10/15/2212787.html
[^6]:https://blog.csdn.net/lisfaf/article/details/90411862