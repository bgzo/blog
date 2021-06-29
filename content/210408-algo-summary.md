---
title: "Algo Summary"
date: 2021-04-08T21:16:07+08:00
draft: true
---

算法体系十分混乱, 先整理一部分为好. 

## 字符串匹配

题单

- leetcode 344
- leetcode 151
- leetcode 13
- leetcode 28 [实现 strStr()](https://leetcode-cn.com/problems/implement-strstr/)

- 剑指offer 58
- 剑指 Offer 05

算法

- BF: Brute Force, 暴力.
  - [Link1](https://github.com/chefyuan/algorithm-base/blob/main/animation-simulation/%E6%95%B0%E6%8D%AE%E7%BB%93%E6%9E%84%E5%92%8C%E7%AE%97%E6%B3%95/BF%E7%AE%97%E6%B3%95.md).
- BM: Boyer-Moore
  - [link1](https://github.com/chefyuan/algorithm-base/blob/main/animation-simulation/%E6%95%B0%E6%8D%AE%E7%BB%93%E6%9E%84%E5%92%8C%E7%AE%97%E6%B3%95/BM.md)
- KMP
  - [link1](https://github.com/chefyuan/algorithm-base/blob/main/animation-simulation/%E6%95%B0%E6%8D%AE%E7%BB%93%E6%9E%84%E5%92%8C%E7%AE%97%E6%B3%95/KMP.md)


- RK: Rabin-Karp
- Trie
- AC自动机

- 字串匹配:
  - cpp: 
    - stl: `strstr()`: 判断字符串str2是否是str1的子串
- 切割字符串:
  - cpp:
    - stl: 
      - `find`: 查找子字符串第一次出现的位置
      - `substr`: 获得子字符串
    - `strtok()/strtok_r()`

## 前缀和


## 数组模拟 加减乘除

- leetcode 66 [加一](https://leetcode-cn.com/problems/plus-one)


## 哨兵 空头

- leetcode 203 [移除链表元素](https://leetcode-cn.com/problems/remove-linked-list-elements/)

哨兵(sentinel)节点去解决它，**哨兵节点广泛应用于树和链表中，如伪头、伪尾、标记等，它们是纯功能的，通常不保存任何数据，其主要目的是使链表标准化，如使链表永不为空、永不无头、简化插入和删除**。

## 哈希表 双指针

- leetcode 141
- leetcode 560. 和为K的子数组

关键词: 
1. "连续和" 前缀和
2. "和" 
    1. 累加
    2. 做差->哈希查找




- leetcode 61. 旋转链表
- leetcode 86. 分隔链表



unordered_map


203. 移除链表元素



## AFTERWARDS

Leetcode 总是报一个错误: `AddressSanitizer: heap-buffer-overflow`, 发现: **LeetCode 使用了AddressSanitizer检查是否存在内存非法访问**, 在 *nix 下可以通过下面命令得到

```shell
gcc -O -g -fsanitize=address  test.c
./a.out
```

1. Heap-buffer-overflow: 堆缓冲区上溢
2. Heap-use-after-free: 释放后使用堆
3. Stack-buffer-overflow: 栈缓冲区上溢
4. Global-buffer-overflow: 全局缓存上溢


![](https://z3.ax1x.com/2021/06/28/RNt0kn.png)


<div id="j1">[1]. https://www.jb51.net/article/55954.htm<div>


https://blog.csdn.net/zhangpeterx/article/details/88775434

