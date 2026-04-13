---
title: 重构 TG 机器人
aliases: ['重构 TG 机器人']
created: 2026-02-17 14:36:01
modified: 2026-04-11 18:50:18
published: 2026-02-17 14:36:01
tags: ['golang', 'public', 'telegram-bot', 'writing/lab']
draft: False
description: 不懂的点（学习笔记） Golang 跑测试 为啥可以直接测试？测试在另一个文件里面 service_test.go？ ==猜测是按文件夹测试== Golang 的接口实现 比较变态，没有显示声明，差点没看出来是 Provider 是 Service 的接口实现。 如果想实现一个接口，能否快速生成这个接口的全部方法？要不然还得反过头来反复查找，感觉如果没有这个语法糖有点坐牢，而且没有显示声明，也不容...
---

## 不懂的点（学习笔记）

### Golang 跑测试

```shell
go test ./internal/service/syncservice
```

> 为啥可以直接测试？测试在另一个文件里面 `service_test.go`？

==猜测是按文件夹测试==

### Golang 的接口实现

比较变态，没有显示声明，差点没看出来是 Provider 是 Service 的接口实现。

> 如果想实现一个接口，能否快速生成这个接口的全部方法？要不然还得反过头来反复查找，感觉如果没有这个语法糖有点坐牢，而且没有显示声明，也不容易分辨接口实现。

via: https://draven.co/golang/docs/part2-foundation/ch04-basic/golang-interface/

## Golang make 构造数据结构

via:https://draven.co/golang/docs/part2-foundation/ch05-keyword/golang-make-and-new/

### Golang 编程模式

管道基础用法：

```go
package main

import (
	"fmt"
)

// 生成整数序列的函数
// `gen` 函数生成一个通道并返回，它使用一个 goroutine 来将输入的整数序列写入通道中
func gen(nums ...int) <-chan int {
	out := make(chan int)
	go func() {
		defer close(out)
		for _, n := range nums {
			out <- n
		}
	}()
	return out
}

// 对整数进行平方操作的函数
// `square` 函数接收一个整数类型的通道作为输入，对每个输入的整数进行平方操作，并将结果写入一个新的整数类型的通道中
func square(in <-chan int) <-chan int {
	out := make(chan int)
	go func() {
		defer close(out)
		for n := range in {
			out <- n * n
		}
	}()
	return out
}

// 对整数进行求和操作的函数
// `sum` 函数接收一个整数类型的通道作为输入，对其中的整数进行求和操作，并返回求和的结果
func sum(in <-chan int) int {
	sum := 0
	for n := range in {
		sum += n
	}
	return sum
}

func main() {
	// 生成整数序列
	nums := gen(2, 3, 4)

	// 对整数进行平方操作
	sq := square(nums)

	// 对整数进行求和操作
	res := sum(sq)

	fmt.Println(res) // 输出 29
}
```

进阶用法：

```go
// 一个代理函数
type EchoFunc func ([]int) (<- chan int)
type PipeFunc func (<- chan int) (<- chan int)

func pipeline(nums []int, echo EchoFunc, pipeFns ... PipeFunc) <- chan int {
  ch  := echo(nums)
  // pipeFns 这里是切片，所以i 是索引
  for i := range pipeFns {
	  // 把当前的 channel ch 传给第 i 个处理函数
	  // 这个处理函数会返回一个“新的 channel”
	  // 用新的 channel 覆盖旧的 ch
    ch = pipeFns[i](ch)
  }
  return ch
}

var nums = []int{1, 2, 3, 4, 5, 6, 7, 8, 9, 10}
// range 的对象只有一个：最终返回的 channel
// pipeline 这里是管道，所以结果是最终管道流出的值
for n := range pipeline(nums, gen, odd, sq, sum) {
    fmt.Println(n)
}
```

上下两个 range 行为不一致，是 golang 的「多态语法」，并不是「统一抽象」，`range` 在切片中代表索引，在 channel 中代表终点值，更多关于 range 的语法参考： https://www.runoob.com/go/go-range.html

via: (8/10) https://coolshell.cn/articles/21228.html;https://www.bilibili.com/read/cv23233345