---
title: '[Tools] VSCode'
date: 2020-07-06 18:50:00
toc: true
---

## 0x00 VSCode

> Any application that can be written in JavaScript, will eventually be written in JavaScript
>
> 任何能够用JavaScript实现的应用系统，最终都必将用JavaScript实现
>
> --Jeff Atwood 在2007年提出 Atwood定律

自带 TypeScript 和 JavaScript 提示, MIT开源.

<br><br>

## 0x01 ShortCut

| Mac 快捷键          | Win 快捷键               | 作用                                          | 备注                 |
| :------------------ | :----------------------- | :-------------------------------------------- | :------------------- |
| **Cmd + Shift + P** | **Ctrl + Shift + P**，F1 | 显示命令面板                                  |                      |
| **Cmd + B**         | **Ctrl + B**             | 显示/隐藏侧边栏                               | 很实用               |
| `Cmd + \`           | `Ctrl + \`               | **创建多个编辑器**                            | 【重要】抄代码利器   |
| **Cmd + 1、2**      | **Ctrl + 1、2**          | 聚焦到第 1、第 2 个编辑器                     | 同上重要             |
| **cmd +/-**         | **ctrl +/-**             | 将工作区放大/缩小（包括代码字体、左侧导航栏） | 在投影仪场景经常用到 |
| Cmd + J             | Ctrl + J                 | 显示/隐藏控制台                               |                      |
| **Cmd + Shift + N** | **Ctrl + Shift + N**     | 重新开一个软件的窗口                          | 很常用               |
| Cmd + Shift + W     | Ctrl + Shift + W         | 关闭软件的当前窗口                            |                      |
| Cmd + N             | Ctrl + N                 | 新建文件                                      |                      |
| Cmd + W             | Ctrl + W                 | 关闭当前文件                                  |                      |

<br>

### 1.1 跳转操作

| Mac 快捷键                    | Win 快捷键             | 作用                                 | 备注               |
| :---------------------------- | :--------------------- | :----------------------------------- | :----------------- |
| Cmd + `                       | 没有                   | 在同一个软件的**多个工作区**之间切换 | 使用很频繁         |
| **Cmd + Option + 左右方向键** | Ctrl + Pagedown/Pageup | 在已经打开的**多个文件**之间进行切换 | 非常实用           |
| Ctrl + Tab                    | Ctrl + Tab             | 在已经打开的多个文件之间进行跳转     | 不如上面的快捷键快 |
| Cmd + Shift + O               | Ctrl + shift + O       | 在当前文件的各种**方法之间**进行跳转 |                    |
| Ctrl + G                      | Ctrl + G               | 跳转到指定行                         |                    |
| `Cmd+Shift+\`                 | `Ctrl+Shift+\`         | 跳转到匹配的括号                     |                    |

### 1.2 移动光标

| Mac 快捷键              | Win 快捷键            | 作用                       | 备注       |
| :---------------------- | :-------------------- | :------------------------- | :--------- |
| 方向键                  | 方向键                | 在**单个字符**之间移动光标 | 大家都知道 |
| **option + 左右方向键** | **Ctrl + 左右方向键** | 在**单词**之间移动光标     | 很常用     |
| **Cmd + 左右方向键**    | **Fn + 左右方向键**   | 在**整行**之间移动光标     | 很常用     |
| Cmd + ←                 | Fn + ←（或 Win + ←）  | 将光标定位到当前行的最左侧 | 很常用     |
| Cmd + →                 | Fn + →（或 Win + →）  | 将光标定位到当前行的最右侧 | 很常用     |
| Cmd + ↑                 | Ctrl + Home           | 将光标定位到文章的第一行   |            |
| Cmd + ↓                 | Ctrl + End            | 将光标定位到文章的最后一行 |            |
| Cmd + Shift + \         |                       | 在**代码块**之间移动光标   |            |

### 1.3 编辑操作

| Mac 快捷键             | Win 快捷键          | 作用                                 | 备注                                   |
| :--------------------- | :------------------ | :----------------------------------- | :------------------------------------- |
| **Cmd + Enter**        | **Ctrl + Enter**    | 在当前行的下方新增一行，然后跳至该行 | 即使光标不在行尾，也能快速向下插入一行 |
| Cmd+Shift+Enter        | Ctrl+Shift+Enter    | 在当前行的上方新增一行，然后跳至该行 | 即使光标不在行尾，也能快速向上插入一行 |
| **Option + ↑**         | **Alt + ↑**         | 将代码向上移动                       | 很常用                                 |
| **Option + ↓**         | **Alt + ↓**         | 将代码向下移动                       | 很常用                                 |
| Option + Shift + ↑     | Alt + Shift + ↑     | 将代码向上复制                       |                                        |
| **Option + Shift + ↓** | **Alt + Shift + ↓** | 将代码向下复制                       | 写重复代码的利器                       |

### 1.4 多光标编辑

| Mac 快捷键                    | Win 快捷键                 | 作用                                 | 备注 |
| ----------------------------- | -------------------------- | ------------------------------------ | ---- |
| **Cmd + Option + 上下键**     | **Ctrl + Alt + 上下键**    | 在连续的多列上，同时出现光标         |      |
| **Option + 鼠标点击任意位置** | **Alt + 鼠标点击任意位置** | 在任意位置，同时出现光标             |      |
| Option + Shift + 鼠标拖动     | Alt + Shift + 鼠标拖动     | 在选中区域的每一行末尾，出现光标     |      |
| Cmd + Shift + L               | Ctrl + Shift + L           | 在选中文本的所有相同内容处，出现光标 |      |

其他的多光标编辑操作：（很重要）

- 选中某个文本，然后反复按住快捷键「 **Cmd + D** 」键（windows 用户是按住「**Ctrl + D**」键）， 即可将全文中相同的词逐一加入选择。
- 选中一堆文本后，按住「**Option + Shift + i**」键（windows 用户是按住「**Alt + Shift + I**」键），既可在**每一行的末尾**都创建一个光标。

### 1.5 删除操作

| Mac 快捷键             | Win 快捷键           | 作用                   | 备注                                      |
| :--------------------- | :------------------- | :--------------------- | :---------------------------------------- |
| Cmd + shift + K        | Ctrl + Shift + K     | 删除整行               | 「Cmd + X」的作用是剪切，但也可以删除整行 |
| **option + Backspace** | **Ctrl + Backspace** | 删除光标之前的一个单词 | 英文有效，很常用                          |
| option + delete        | Ctrl + delete        | 删除光标之后的一个单词 |                                           |
| **Cmd + Backspace**    |                      | 删除光标之前的整行内容 | 很常用                                    |
| Cmd + delete           |                      | 删除光标之后的整行内容 |                                           |

备注：上面所讲到的移动光标、编辑操作、删除操作的快捷键，在其他编辑器里，大部分都适用。

### 1.6 编程语言相关

| Mac 快捷键             | Win 快捷键      | 作用                         | 备注                             |
| :--------------------- | :-------------- | :--------------------------- | :------------------------------- |
| Cmd + /                | Ctrl + /        | 添加单行注释                 | 很常用                           |
| **Option + Shift + F** | Alt + shift + F | 代码格式化                   | 很常用                           |
| F2                     | F2              | 以重构的方式进行**重命名**   | 改代码备                         |
| Ctrl + J               |                 | 将多行代码合并为一行         | Win 用户可在命令面板搜索”合并行“ |
| Cmd +                  |                 |                              |                                  |
| Cmd + U                | Ctrl + U        | 将光标的移动回退到上一个位置 | 撤销光标的移动和选择             |

### 1.7 搜索相关

| Mac 快捷键          | Win 快捷键          | 作用                                       | 备注   |
| :------------------ | :------------------ | :----------------------------------------- | :----- |
| **Cmd + Shift + F** | **Ctrl + Shift +F** | 全局搜索代码                               | 很常用 |
| **Cmd + P**         | **Ctrl + P**        | 在当前的项目工程里，**全局**搜索文件名     |        |
| Cmd + F             | Ctrl + F            | 在当前文件中搜索代码，光标在搜索框里       |        |
| **Cmd + G**         | **F3**              | 在当前文件中搜索代码，光标仍停留在编辑器里 | 很巧妙 |

### 1.8 自定义快捷键

按住快捷键「Cmd + Shift + P」，弹出命令面板，在命令面板中输入“快捷键”，可以进入快捷键的设置。

当然，你也可以选择菜单栏「偏好设置 --> 键盘快捷方式」，进入快捷键的设置：





## 0x03 Plugin

**[Theme] :** Community Material Theme

**[Font] :** **https://github.com/abertsch/Menlo-for-Powerline**

### Markdown

1. Markdownlint
2. Markdown Preview Enhanced

### Python

1. Python

```python
pip install yapf # “python.formatting.provider”
pip intssll jupyter
# ......
```





### C++

1. C/C++
2. Visual Studio IntelliCode

### Java

1. Beautify：代码高亮
2. Terminal：直接唤起终端
3. Project Manager：多个项目切换
4. Auto Close Tag：标签自动闭合（其实我觉得可以内置的）

### Front-End

1. Svg viver
2. VS Color Picker
3. Regex Previewer
4. Quokka.js
5. Open in Browser
6. Liver Sever
7. Html Snippets
8. HTML Boilerplate
9. CSS Peek
10. color info
11. Code runner
12. Auto Close Tag









## Config

### Cpp

#### 配置

[来源] : https://zhuanlan.zhihu.com/p/87864677





## Bugs



### 无法在只读文本中编辑

[解决方案] :

1. 在终端编译: https://blog.csdn.net/weixin_41594045/article/details/86568571
2. 修改 JavaScript 验证: https://blog.csdn.net/qq_38774121/article/details/100123956













## 0xff 参考资料

1. VSCode 官网: https://code.visualstudio.com/
2. https://juejin.im/post/5cb87c6e6fb9a068a03af93a

