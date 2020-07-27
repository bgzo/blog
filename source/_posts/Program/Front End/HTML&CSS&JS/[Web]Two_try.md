---
title: '[Web]Two_try'
date: 2020-01-15 00:00:00
toc: true
---

## HTML

超文本标记语言（HyperText Markup Language）是一种用于创建网页的标准标记语言。


### 框架格局


```html
<!DOCTYPE html><!--浏览器得知自己要处理的是HTML-->
<html lang="en"><!--文档中HTML的开始，Chrome中谷歌翻译识别的原文本由此而来-->
<head>
    <meta charset="UTF-8"><!--是一个网页的标签  mata元数据，在HTML5中新加入的一种新的编码方式另外的iso的编码-->
    <title>Title</title><!--标签页显示的标题-->
</head><!--提供有关文档内容和标注信息的（头元素）-->
<body><!--面向内容--><!--用Ctrl+/可以添加注释-->
</body>
</html>
```


注意：


### 解析


**meta**


两种属性，不同属性又有不同的参数值


1. name属性主要用于描述网页，与之对应的属性是content，content中的内容，主要便于搜索引擎机器人查找信息和分类信息用的 。
1. http-equiv顾名思义，相当于http的文件头作用，它可以向浏览器传回一些有用的信息，以帮助正确和精确的显示网页内容，与之对应的属性为content，content中的内容其实就是各个参数的变量值。
```html
<meta http-equiv="Refresh" content="2"> #每隔2秒刷新界面
   <link rel="icon" href="https://common.cnblogs.com/favicon.ico">#做网页上面的小图标
```


**body**


```html
<hn>:n的取值是1~6；从大到小，用来表示标题。
<p>：段落标签，包裹的内容被换行，并且也上下内容之间有一行空白
<b> <strong>:加粗标签
<s><strike>：为文字加上一条中线
<em>：文字变成斜体
<sup> 和<sub>：上角标和下角标
<br>：换行（可以单独使用）
<hr>：水平线
<u>: 下划线 是过时的保留 在CSS里面也可以设置</u><!--颜色要用CSS调整-->
<div> <span>两个在html中没有实质性作用，只是配合css的使用。div是块级的，而span是内联的
```

2. 块级标签和内联标签：
```html
块级标签：<p> <h1> <table> <ol> <ul> <form> <div>
```

   1. block（块）元素的特点：
      1. 总是在新行上开始
      1. 高度，行高以及外边框和内边距都可控制
      1. 宽度缺省是它的容器的100%，除非设定一个宽度
      1. 它可以容纳内联元素和其他块元素
```html
内联标签：<a> <input> <img> <sub> <sup> <textarea> <span>
```

   1. lnline元素的特点：
      1. 和其他元素都在一行上
      1. 高，行高以及外边距和内边距不可改变
      1. 宽度就是它的文字或图片的宽度，不可改变
      1. 内联元素只能容纳文本或者其他内联元素
   2. 对行内元素注意如下：
      1. 设置宽度width无效，
      1. 设置高度height无效，可以通过line-height设置，
      1. 设置margin只有左右margin无效，上下无效。
      1. 特殊字符：<>"©®　　<>"©®　　对应的字符



**图形标签**


```html
src：要显示图片的路径
alt：图片没有加载成功时的提示
title：鼠标悬浮时的提示信息
width：图片的宽
height：图片的高（宽高两个属性只用一个会自动等比缩放）
```


**超链接标签**`<a>`


```html
<a href="002.html" >2、LFH的第二个网页</a></p><!--默认是self刷新-->
<a href="002.html" target="_blank">2、1 LFH的第二个网页</a></p>
<a href="002.html" target="_parent">2、2 LFH的第二个网页</a></p>
<a href="002.html" target="_self">2、3 LFH的第二个网页</a></p>
<a href="002.html" target="_top">2、4 LFH的第二个网页</a></p>
```

2. 有 4 个保留的目标名称用作特殊的文档重定向操作：
   1. target的属性–>_blank：浏览器总在一个新打开、未命名的窗口中载入目标_
   1. target的属性–>_parent：这个目标使得文档载入父窗口或者包含来超链接引用的框架的框架集。如果这个引用是在窗口或者在顶级框架中，那么它与目标 _self 等效。
   1. target的属性–>_self：这个目标的值对所有没有指定目标的 [ 标签是默认目标，它使得目标文档载入并显示在相同的框架或者窗口中作为源文档。这个目标是多余且不必要的，除非和文档标题  标签中的 target 属性一起使用。]()
   1. target的属性–>_top：这个目标使得文档载入包含这个超链接的窗口，用 _top 目标将会清除所有被包含的框架并将文档载入整个浏览器窗口。--><!--标签的 target 属性规定在何处打开链接文档。
   1. 插入图片 在img标签里面只设置宽，不设置高，图片就会等比例缩放。



**列表标签**


```html
<ul>:无序列表
<ol>：有序列表
<li>：列表中的每一项
```
```html
<dl>：定义列表
<dt>：列表标题
<dd>：列表项
```

3. reversed ：倒序列表属性



**表格标签(table)**


```html
border：表格边框
cellpadding:内边框
cellspacing：外边框
width:像素百分比（最好是通过css来设置长宽）
<tr>：table row
<th><thead>：table head cell
<td>:table data cell
rowspan：单元格竖跨多少行
colspan：单元格横跨多少列
```


**表单标签`<form>`:（29种）**


1. 表单用于向服务器传输数据，比如文本字段、复选框、单选框、提交按钮等等。HTML表单用于接收不同类型的用户输入，用户提交表单时向服务器传输数据，从而实现用户与web服务器的交互。表单标签，要提交的所有内容都应该在该标签中。
1. `<form>`
1. `<input>`（自动断掉）
   1. **name**：表单提交项的键，注意和id的区别；name属性是和服务器通信时使用的名称，而id属性是浏览器端使用的名称，该属性主要是为了方便客户端编程。
   1. Type
      1. text:
         1. size：拓宽单行文本
         1. value：显式占位，表单提交项的值 , 对于不同的输入类型，value属性的用法也不同
         1. placeholder：隐式占位
         1. maxlength：最大长度
         1. readonly：文本属性
      2. password：密码
      2. textarea：多行文本框
         1. rows
         1. cols
      4. submit:
         1. method：表单的提交方式post、get默认取值就是get（信封）
            1. get：1、提交的键值对，放在地址栏中url后面。2、安全性相对较差。3、对提交的内容的长度有限制
            1. post：1、提交的键值对不在地址栏。2、安全性相对较差。3、对提交内容的长度理论上无限制。
         2. action：表单提交到哪，一般指向服务器端一个程序，程序接收到表单提交过来的数据（即表单元素值）作相应处理.
      5. button:
         1. Button > input button > input submit
      6. range
      6. file:
         1. multiple：一次允许上传多个文件
         1. required：一次只可以上传一个文件
   3. Name
   3. textarea
   3. select
   3. fieldset
   3. label



**嵌入图片和创建分区式响应**


1. `map`：响应图的关键元素
1. `area`：图片可被点击的元素
   1. 指定URL：href  和  Alt
   1. shape和coords 属性，共同起作用
      1. shape值：
         1. rect：四个逗号相隔的左上右下的四个区域
         1. circle：三个逗号相隔的左右边缘到圆心的距离和圆的半径
         1. poly：多边形，至少六个逗号，代表一个顶点（6个数值，实际是三个坐标，完成之后是一个三角形）
         1. dafault：代表默认区域，也就是说覆盖整个图片。不需要coords值。



**video**


1. src
1. height
1. width
1. autoplay
1. preload
1. controls
1. loop
1. poster
1. muted





## CSS


**层叠样式表**（英语：**C**ascading **S**tyle **S**heets，缩写：**CSS**；又称**串样式列表**、**级联样式表**、**串接样式表**、**阶层式样式表**）是一种用来为结构化文档（如HTML文档或XML应用）添加样式（字体、间距和颜色等）的计算机语言，由W3C定义和维护。当前最新版本是CSS2.1，为W3C的推荐标准。CSS现在已被大部分现代浏览器支持，而下一版的CSS4仍在开发中。


### 一、CSS基础元素


1. Style元素
   1. 全局属性
2. Font-size设置文本大小的属性
2. Color 设置文本颜色的属性



二、制作一个初级的CSS设计


1. 元素内嵌样式表
1. 文档内嵌样式表
1. 外部样式表



以上三者的优先级逐递减，随着控制范围的提高而使得自己的操作权限减少，体现了一种中庸的思想。


### 二、使用CSS基本选择器


选择器一般存在于2.2和2.3，对2.1不太感冒。


1. 选择所有元素
```html
<style type="text/css">
        *{
            font-size: 50px;
            color: blueviolet;
        }/*所有元素的选择*/
</style>
```

2. 根据类型选择元素
```html
<style type="text/css">
	p{
            font-size: large;
            color: beige;
      }
</style>
```

3. 根据类选择元素
类是一个全局概念，意思是所有的元素都有累的属性
```html
<style type="text/css">
.class1 {
            font-size: 40px;
            color: aqua;
        }
</style>
```

4. 根据ID选择元素
和类相同，一个区别是不要用点，而是#；另一个区别是id是唯一身份的标识(不推荐这样使用)，而类可以使多个成员的归类。
```html
<style type="text/css">
#12345{
            font-size: xx-large;
            color: dodgerblue;
        }
</style>
```

5. 根据属性选择元素
```html
<style type="text/css">
[href]{
            font-size: 40px;
            color: aqua;
        }
</style>
```

6. 其他选择器



四、：选择器


```html
<style type="text/css">
a:hover{
  		font-size: 40px;
  	   	color: darkblue;
         }
</style>
```


### 三、定义简单边框和背景设置


```html
 <style type="text/css">
        .class2{
            border-width:5px;
            border-style: dashed;
            border-color: aqua;
            border-bottom-color: blueviolet;
            border-bottom-style: dashed;
            border-left-color: darkblue;
            border-right-style: hidden;
            border-right-color: #ffc244;
            border-left-style: dotted;
            border-radius:20px/15px
        }
    </style>
```


`border-style: dashed;`这个有多种属性，测试后总结如下


六、border简写属性


```html
<style type="text/css">
        .class2{
            border: 5px solid red;
        }
    </style>
```


七、定义简单背景


八、Background简写属性


### 四、CSS文本样式


1. 对齐文本`Text-align`
`center`&&`left`&&`right`
```html
<style type="text/css">
    .class4{
        text-align: center;
    }
</style>
<body>
<p class="class4" align="center">我是最帅的</p>
</body>
```

2. 文字方向`Direction`:`ltr`&&`rtl`
2. 指定字母间距，单词间距，行高`Letter-spacing,word-spacing,line-height`
```html
<style type="text/css">
    .class4{
        text-align: center;
        letter-spacing: 10px;
        word-spacing: 10px;
        line-height: 100px;
    }
</style>
```

4. 首行缩进`Text-indent`
```html
<style type="text/css">
    .class4{
        text-indent: 50px;
    }
</style>
```

5. 文本装饰`Text-decoration`
```html
<style type="text/css">
    .class4{
        text-decoration: overline;
        /*text-decoration: underline;*/
        /*text-decoration:line-through;*/
    }
</style>
```

6. 文本大小写转换`Text-transform`
```html
<style type="text/css">
     .class4{
         text-transform: capitalize;/*首字母大写*/
     /*  text-transform: uppercase;
         text-transform: lowercase;*/
     }
</style>
```

7. 字体名称`Font-family`
7. 字体大小`Font-size`
7. 字体样式`Font-style`
   1. `italic`:斜体&&`oblique(拉伸)`
10. 指定字母是否以小型大写字母显示`Font-variant`
10. 字体粗细`Font-weight`
10. 文本阴影`Font-shadow`
```html
    <style type="text/css">
        .class5{
            font-family: 微软雅黑;
            font-size: 40px;
            font-style: oblique;
            font-variant: small-caps;/*小型大写转换（和text-transform不同的地方）*/
            font-weight: 200;/*(bold,bolder)*/
            text-shadow: 10px 10px 10px red;(左右，上下，模糊程度)
        }
    </style>
```


### 五、CSS过渡


```html
<style type="text/css">
        p{
            width: 100px;
            height: 100px;
            background-color: bisque;
        }
        p:hover{
            width: 150px;
            height: 150px;
            background-color: aqua;
            transition-delay: 150ms;
            transition-duration: 250ms;
            /*-webkit-transition-duration: ;
            -o-transition-duration: ;
            -moz-transition-duration: ;*/
            transition-property: width,height;
        }/*指定动作*/
    </style>
```


### 六、CSS动画


贝塞尔曲线


`ease`、`eaae-in(前慢)`、`ease-out（后慢）`、`ease-in-out（前后都慢）`


```html
<style type="text/css">
    p{
            width: 100px;
            height: 100px;
            background-color: bisque;
        }
    p:hover{
        	width: 150px;
            height: 150px;
            background-color: aqua;
            transition-delay: 150ms;
        transition-timing-function: ease-in;
    }
```


和过渡相比动画演示完成以后会回到初始状态，但是过渡动画不同，它会随着鼠标的停留而动画停留


```html
<meta charset="UTF-8">
    <title>CSS动画</title>
    <style type="text/css">
        p{
            width: 100px;
            height: 100px;
            background-color: orange;
        }
        p:hover{
            animation-duration: 500ms;/*动画的过渡时间*/
            animation-delay: 200ms;
            animation-name: lfh;
            animation-iteration-count: infinite;
            animation-direction: alternate;/*变大之后变小*/
        }
        @keyframes lfh {
            from{
                width: 125px;
                height: 125px;
                background-color: #ffc244;
            }
            50%{
                width: 150px;
                height: 150px;
                background-color: #ffc244;
            }
            75%{
                width: 175px;
                height: 175px;
                background-color: #ffc244;
            }
            to{
                width: 200px;
                height: 200px;
                background-color: #ffc244;
            }
        }
    </style>
```

### 七、CSS使用变换





### Color

#### Num

- 十六进制 : \#RRGGBB
- RGB : rgb(red, green, blue) (0 ~ 255 / 0% ~ 100%) : 256\*256\*256 = 16,777,216
- RGBA ( alpha , 0.0 - 1.0 )
- HSL : hsl ( hue, saturation, lightness ) (颜色柱面坐标表示法)
  - Hue : 0 / 360 红，120 绿，240 蓝
  - Saturation 百分比值；0% 灰， 100% 全彩
  - Lightness 百分比值；0% 黑，100% 白
- HSLA :hsla(hue, saturation, lightness, alpha) ( alpha 同上 )
- 预定义/跨浏览器

**[延拓] :** https://www.w3school.com.cn/cssref/css_colors_legal.asp





#### Name

规范中定义了 147 中颜色名（17 种标准颜色加 130 种其他颜色）

> 17 种标准色是 aqua, black, blue, fuchsia, gray, green, lime, maroon, navy, olive, orange, purple, red, silver, teal, white, yellow。

**[延拓] :** 

1. 查询 130 种颜色移步 https://www.w3school.com.cn/cssref/css_colornames.asp
2. **“网络安全色”** : 多年前，当电脑只支持最多 256 种颜色时，**216 种“网络安全色”列表被定义为 Web 标准**，并保留了 40 种固定的系统颜色。



## Reference

[1]. MDN Web 开发技术 https://developer.mozilla.org/zh-CN/docs/Web

[2]. MDN HTML https://developer.mozilla.org/zh-CN/docs/Web/HTML

[3]. MDN CSS https://developer.mozilla.org/zh-CN/docs/Web/CSS

[4]. MSD js https://developer.mozilla.org/zh-CN/docs/Web/JavaScript

[5].