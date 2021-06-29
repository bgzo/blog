---
title: "End to End 端对端"
date: 2021-01-17T17:33:21+08:00
draft: false
tags:
- Networks
---

The end-to-end principle is a design framework in computer networking. In networks designed according to this principle, application-specific features reside in the communicating end nodes of the network, rather than in intermediary nodes, such as gateways and routers, that exist to establish the network.

一个设计框架计算机联网。在根据该原理设计的网络中，特定于应用程序的功能驻留在网络的通信端节点中，而不是存在于建立网络的中间节点（如网关和路由器）中。

<!--more-->

## DETAILS

A basic premise of the principle is that the payoffs from adding features to a simple network quickly diminish, especially in cases in which the end hosts have to implement those functions only for reasons of conformance, i.e. completeness and correctness based on a specification. Implementing a specific function incurs some resource penalties regardless of whether the function is used or not, and implementing a specific function in the network distributes these penalties among all clients.

基本前提是，将特征添加到简单网络的收益会迅速减少，尤其是在最终主机仅出于一致性（即基于规范的完整性和正确性）的原因而必须实现这些功能的情况下。不管是否使用该功能，实现特定功能都会招致一些资源损失，并且在网络中实现特定功能会将这些损失分配给所有客户端。

Internet Protocol (IP) is a connectionless datagram service with no delivery guarantees. On the internet, IP is used for nearly all communications. End-to-end acknowledgment and retransmission is the responsibility of the connection-oriented Transmission Control Protocol (TCP) which sits on top of IP. The functional split between IP and TCP exemplifies the proper application of the end-to-end principle to transport protocol design.

IP几乎用于所有通信。端到端的确认和重传是IP之上的面向连接的传输控制协议（TCP）的职责。IP和TCP之间的功能划分体现了端到端原理在传输协议设计中的正确应用。



## LIMIT

The most important limitation of the end-to-end principle is that its basic premise, placing functions in the application endpoints rather than in the intermediary nodes, is not trivial to implement. 

An example of the limitations of the end-to-end principle exists in mobile devices, for instance with mobile IPv6. Pushing service-specific complexity to the endpoints can cause issues with mobile devices if the device has unreliable access to network channels. 

Further problems can be seen with a decrease in network transparency from the addition of network address translation (NAT), which IPv4 relies on to combat address exhaustion. With the introduction of IPv6, users once again have unique identifiers, allowing for true end-to-end connectivity. Unique identifiers may be based on a physical address, or can be generated randomly by the host.

- 将功能置于应用程序端点而不是中间节点中的基本前提是不容易实现的。
- 存在于移动设备（例如，移动IPv6）中。如果设备对网络通道的访问不可靠，则将特定于服务的复杂性推向端点可能会导致**移动设备出现问题**。
- 通过添加网络地址转换（NAT）可以看到网络透明度降低带来的其他问题，而IPv4依赖于它来对抗地址耗尽。随着IPv6的推出，用户再次拥有唯一的标识符，从而实现了真正的端到端连接。唯一标识符可以基于物理地址，也可以由主机随机生成。

![](https://z3.ax1x.com/2021/06/28/RNt0kn.png)

1. [End-to-end_principle](https://en.wikipedia.org/wiki/End-to-end_principle)