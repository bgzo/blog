---
title: '[Git] F* Github Clone'
date: 2020-03-24 21:14:22
---



### 提升Git Clone 速度的Git命令

明明Git提交分支的时候速度可以上2Mib/s，但是Clone的时候就奇慢无比……佛了

![](http://img.dandelionflowers.xyz/commit.png)

</br>

#### 首选梯子

用SSh无用，对比如下，可能是我的SS不太好用……

![](http://img.dandelionflowers.xyz/comper_github.png)



用Git代理默认SS的1080端口，花个好价钱买个好机子……

```nginx
git config --global http.https://github.com.proxy socks5://127.0.0.1:1080 # 只对 github.com
git config --global --unset http.https://github.com.proxy # 取消代理
```



</br>

#### 再次码云导入Github

无脑关联Github，然后导入自己的仓库，从Github下面直接Clone ，缺点就是暂时不确定Pull到Github是否正确提交……

速度你根本无法想象，工具人[码云](https://gitee.com)了解一下

![](http://img.dandelionflowers.xyz/gitee.png)

</br>

#### 后记

在Clone一个300+M的项目的时候，出现了`git clone: error: RPC failed;The remote end hung up unexpectedlyfatal: The remote end hung up unexpectedly Everything up-to-dat`的错误，好像是因为curl的postBuffer 默认值较小的原因,配置下个这个值,就不会出现该错误了.

```nginx
git config http.postBuffer 524288000
```

50G左右，应该没有问题了，我不信代码给我写了一个云盘……

然后再次Clone就没有这个问题了……

</br>

### 参考资料：

1. [知乎问题](https://www.zhihu.com/question/27159393).
2. [V2ex](https://www.v2ex.com/t/574303).
3. [修改Host](https://blog.51cto.com/11887934/2051323)的方法，有缘再会……

