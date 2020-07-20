---
title: '[Java] Day_One'
date: 2020-07-01 11:36:35
tor: true
---



今日练习:

```java
import java.util.Date;
public class First_Proiect {
  public static void main(final String[] args) {// Public 提供外部调用的机会(Ch 5), args 存储命令行参数
    System.out.println("Hello vscode!");//实际作用是 "将我给你的数据打印到控制台"
    System.out.println(new Date());//new Date 返回字符串,  java垃圾回收自动处理
    System.getProperties().list(System.out);// 在系统中获取的所有“属性
    System.out.println(System.getProperty("user.name"));// 可以把运行的结果发送到任何地方
    System.out.println(System.getProperty("java.libary.path"));
  }
}
```

## Bug -- JDK&Coding 

Bug 是 系统编码 (Utf-8 ,  GBK) 的问题,  Win10 中文版本的编码是是切换回 Utf-8(Bata版本) 命令行会出现乱码的问题,  在 UWP 的 Terimux/VSCode( Utf-8 ) 输出 乱码/不输出 ,  在 Powershell 里无法识别,  但是官网的 JDK 无法改变自己的输出语言(编码-GDK), Win10家庭版 无法切换回 英文操作系统.  所以这个循环很复杂. UWP 的 Terimux 暂时没有找到切换途径,  所以可以用下面的命令切换:

```powershell
chcp xxx
```

十进制的编码切换:

1. MS-DOS 美英: 437
2. Utf-8: 65001
3. GBK-简中: 936
4. GBK-繁中: 950

系统自带的 Shell 可以在 Regedit 的 Codepage 十进制下可以修改.

```powershell
$OutputEncoding = [console]::InputEncoding = [console]::OutputEncoding = New-Object System.Text.UTF8Encoding
# 只可以短暂的修改编码方式
```

```shell
"code-runner.executorMap": {
        "java": "cd $dir && javac -encoding utf-8 $fileName && java $fileNameWithoutExt"
    }
    code-runner.runInTerminal": true,
```

这句话写的很清晰，你的helloword是 56.0版本编译的，但是你的jre是52版本。 版本不兼容

## Referance:

1. [windows cmd 修改默认字符集 编码为UTF-8](https://blog.csdn.net/yangzhong0808/article/details/79012628)

2. [win10下,cmd,power shell设置默认编码为‘UTF-8’?](https://www.zhihu.com/question/54724102)

3. [Using UTF-8 Encoding (CHCP 65001) in Command Prompt / Windows Powershell (Windows 10)](https://stackoverflow.com/questions/57131654/using-utf-8-encoding-chcp-65001-in-command-prompt-windows-powershell-window)

4. https://bbs.csdn.net/topics/360254188

5. https://blog.csdn.net/qq_27292113/article/details/71404298

6. https://segmentfault.com/q/1010000011835892/a-1020000012019266

7. https://blog.csdn.net/jfztaq/article/details/102648273

8. https://m.php.cn/tool/vscode/434683.html

   

今天从 JDK 13.0.1 降会了 JDK11(LTS) 的版本,  但是 VSCode 的编译了

![](./img/java.complarerror.png)

aubio
