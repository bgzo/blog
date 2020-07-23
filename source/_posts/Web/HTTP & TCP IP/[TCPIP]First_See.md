---
title: '[TCP/IP] First_See'
date: 2020-07-04 21:30:00
toc: true
---

## 0x00 基础知识/计算机早期历史

> 计算机与网络发展的历史及其标准化过程、OSI参考模型、网络概念的本质、网络构建的设备等

**[发展方向]**：算盘	-->	步进计算器	-->	 差分机	-->	分析机	-->	打孔卡片制表机

**[贡献人]**：

1. [查尔斯 · 巴贝奇](https://baike.baidu.com/item/%E6%9F%A5%E5%B0%94%E6%96%AF%C2%B7%E5%B7%B4%E8%B4%9D%E5%A5%87/5466849)（Charles Babbage）—— 用机械来计算数学表 
2. [阿达 · 洛芙莱斯](https://baike.baidu.com/item/%E9%98%BF%E8%BE%BE%C2%B7%E6%B4%9B%E8%8A%99%E8%8E%B1%E6%96%AF?fromtitle=Ada+Lovelace&fromid=6825878)（Ada Lovelace）——计算机程序创始人，建立了循环和子程序概念 

**[历程]：**

1. **算盘**——社会规模远超个人心算能力; 在公元2020年的巴比伦就可能有算盘，在公元前五世纪希腊的希罗多德有纪录埃及人有使用，后来其希腊字**άβακασ**成为拉丁文、英文的**abacus**。而相对应的, **星盘**——计算在海上的经纬度；计算尺，帮助计算乘法和除法；而世界上有成千上万种不同的时钟(待补充)

2. Computer从 代职业 变成指代 机器. 在这之前有专门计算的人——计算者（持续到1800年）

3. 步进计算器——第一个可以做加减乘除的机器(延续了300多年)

4. 炮弹进行精校，要计算弹道，二战是查表来做，但是每一次改进就要一张新表, 因成本(金钱+时间成本)，发明除了查表（射程表）

5. 查尔斯·巴贝奇提出**差分机**（最终失败）（1991年成功发明），制造它的过程中，想到分析机（通用计算机）(1823)

6. 阿达·洛芙莱斯给**分析机**假象程序，是第一个程序猿

7. 人口普查10年一次，赫尔曼·何乐礼（Herman Hollerith）（ 创办了制表机器公司（Tabulating Machine Company），后来成为IBM的前身 ）的打孔制表机大大提升了效率，可以解决数据密集 的方面

注意:

1. **以往认为算盘为中国发明的观点并不可靠。事实上，在古中国开始广泛流行算盘已晚至宋元时期，此前通行的是筹算**。

> 在巴比伦、罗马都出土过接近今日中国算盘形制的算板实物，其算盘的形制相对上有着较清晰的演进轨迹。此外，包括北非的古埃及、中亚的俄罗斯、中古欧洲都有形制与之类似的手算盘。因此不能说算盘为中国所独有之巧思。客观来看，算盘是各地人类因应计算需要，透过文明交流而相互参考、逐渐完善的过程。在中国，隶首传说发明珠算，见于东汉末三国时期徐岳撰、北周汉中郎甄鸾注的《数术记遗》：“隶首注术，乃有多种，及余遗忘，记忆数事而已。其一积算...其一珠算，其一计算。”此书也记述中国古代太一算、两仪算、三才算等早期算盘。

2. 互联网的早期目的是解决 物理硬盘 拷贝不方便的问题, 通过远程的网络实现远程数据传输. 方便在**即时**. 其实和后来渠道上的收费不大冲突.
3. **瘦身**: 20世纪90年代上半叶，个人电脑与UNIX工作站从性能上已不亚于一台主机。再加上个人电脑与UNIX工作站本身的网络功能不断提高，利用这些设备搭建一个网络要比使用大型主机构建网络更有优势(操作简单，价格低廉)。由此也引发了一个旨在降低网络架构成本的新趋势。之所以叫“瘦身”是因为这一趋势导致那些曾经在大型主机上才能运行的公司核心业务系统逐渐被转移到“轻量型”的个人电脑或UNIX工作站上去运行。从机体规模 & 成本上都有些“瘦身减负”之意.
4. 分时系统的实现: 一个CPU通常在同一时间只能运行一个程序。为了让多个程序同时运行，操作系统采用CPU时间片轮转机制，在多个程序之间进行切换，合理调度。这种方式叫做多任务调度。







**网络交换机**

> A network switch is a multiport [network bridge](https://en.wikipedia.org/wiki/Network_bridge) that uses [MAC addresses](https://en.wikipedia.org/wiki/MAC_address) to forward data at the [data link layer](https://en.wikipedia.org/wiki/Data_link_layer) (layer 2) of the [OSI model](https://en.wikipedia.org/wiki/OSI_model). Some switches can also forward data at the [network layer](https://en.wikipedia.org/wiki/Network_layer) (layer 3) by additionally incorporating [routing](https://en.wikipedia.org/wiki/Routing) functionality. Such switches are commonly known as layer-3 switches or [multilayer switches](https://en.wikipedia.org/wiki/Multilayer_switch).Switches for [Ethernet](https://en.wikipedia.org/wiki/Ethernet) are the most common form of network switch. The first Ethernet switch was introduced by [Kalpana](https://en.wikipedia.org/wiki/Kalpana_(company)) in 1990.[[3\]](https://en.wikipedia.org/wiki/Network_switch#cite_note-3) Switches also exist for other types of networks including [Fibre Channel](https://en.wikipedia.org/wiki/Fibre_Channel), [Asynchronous Transfer Mode](https://en.wikipedia.org/wiki/Asynchronous_Transfer_Mode), and [InfiniBand](https://en.wikipedia.org/wiki/InfiniBand).Unlike less advanced [repeater hubs](https://en.wikipedia.org/wiki/Repeater_hub), which broadcast the same data out of each of its ports and let the devices decide what data they need, a network switch forwards data only to the devices that need to receive it.-- Wikipedia
>
> 网络交换机是一个多端口[网络桥](https://en.wikipedia.org/wiki/Network_bridge)，使用[MAC地址](https://en.wikipedia.org/wiki/MAC_address)在[OSI模型](https://en.wikipedia.org/wiki/OSI_model)的[数据链路层](https://en.wikipedia.org/wiki/Data_link_layer)（第2层）转发数据。一些交换机还可以通过附加合并[路由](https://en.wikipedia.org/wiki/Routing)功能在[网络层](https://en.wikipedia.org/wiki/Network_layer)（第3层）转发数据。这种开关通常被称为第三层开关或[多层开关](https://en.wikipedia.org/wiki/Multilayer_switch)。[以太网](https://en.wikipedia.org/wiki/Ethernet)交换机是网络交换机的最常见形式。[Kalpana](https://en.wikipedia.org/wiki/Kalpana_(company))于1990 年推出了第一台以太网交换机。[[3\]](https://en.wikipedia.org/wiki/Network_switch#cite_note-3)交换机还用于其他类型的网络，包括[光纤通道](https://en.wikipedia.org/wiki/Fibre_Channel)，[异步传输模式](https://en.wikipedia.org/wiki/Asynchronous_Transfer_Mode)和[InfiniBand](https://en.wikipedia.org/wiki/InfiniBand)。与较不先进的[转发器集线器](https://en.wikipedia.org/wiki/Repeater_hub)不同，[转发器集线器](https://en.wikipedia.org/wiki/Repeater_hub)从其每个端口广播相同的数据，并让设备决定所需的数据，而网络交换机仅将数据转发给需要接收数据的设备．





总结一下就是如下图所示:

![http://i.dfslfh.cn/%E8%AE%A1%E7%BD%91%E5%8E%86%E5%8F%B2.png](./img/Web/计网历史.png)





## 0x01 协议

| 网络体系结构                                                 | 协议                                                 | 主要用途                 |
| :------------------------------------------------------------: | :----------------------------------------------------: | :------------------------: |
| TCP/IF                                                       | IP, ICMP, TCP, UDP, HTTP, TELNET, SNMP, SMTP.... | 互联网、局域网           |
| IPX/SPX     Net Ware)                                        | IPX, SPX, NPC....                                    | 个人电脑局域网           |
| AppleTalk                                                    | DDP, RTMP, AEP, ATP, ZIP..                           | 苹果公司现有产品的局域网 |
| DECnet                                                       | DPR, NSP, SCP....                                    | 前DEC小型机              |
| OSI                                                          | FTAM, MOTIS, VT, CMIS/CMIP, CLNP, CONP...       | ......                   |
| XNS(Xerox Network Services)(Novell公司开发的NetWare系统的协议) | IDP, SPP, PEP...                                     | 施乐公司网络             |





### 分组交换协议

> **分组交换是指将大数据分割为一个个叫做包（Packet）的较小单位进行传输的方法。这里所说的包，如同我们平常在邮局里见到的邮包。分组交换就是将大数据分装为一个个这样的邮包交给对方。**

计算机通信也会在每一个分组中附加上源主机地址和目标主机地址送给通信线路。这些发送端地址、接收端地址以及分组序号写人的部分称为“报文首部”。





## 0x02 机构标准化

> 所谓标准化是指使不同厂商所生产的**异构产品之间具有兼容性、便于使用的规范化过程**。标准化组织大致分为三类：
>
> **国际级标准化机构:** **ISO、ITU-TV**(International Telecommuni-cation Union Telecommunication Standardization Sector。制定远程通信相关国际规范的委员会。是ITU（International Telecommunication Union：国际电信联盟）旗下的一个远程通信标准化组。前身是国际电报电话咨询委员会（CCITT：International Telegraph andTelephone Consultative Com-mittee）)等
>
> **国家级标准化机构**: **JISC**（制定了日本**JIS**）和美国的**ANSI**
>
> **民间团体**: **IETF**等组织。





## 0x03 OSI参考模型

|      | 分层名称   | 功能                                                         | 每层功能概牲                                   |
| ---- | ---------- | ------------------------------------------------------------ | ---------------------------------------------- |
| 7    | 应用层     | 针对特定应用的协议。                                         | **针对每个应用的协议**   XX-> XX协议           |
| 6    | 表示层     | 设备固有数据格式和网络标准数据格式的转换。                   | 接收不同表现形式的信息,如文字流、图像、声音等  |
| 5    | 会话层     | 通信管理。负责建立和断开通信连接(数据流动的 逻辑通路) 管理传输层以下的分层。 | 何时建立连接,何时断开连接以及 保持多久的连接?  |
| 4    | 传输层     | 管理两个节点之间的数据传输。负责可靠传输 (确保数据被可靠地传送 到目标地址)。 | 是否有數据丢失?                                |
| 3    | 网络层     | 地址管理与路由选择。                                         | 经过那个路由传递到目标地址?                    |
| 2    | 数据链路层 | 互连设备之间传送和识别数据帧。                               | 数据帧与比特流之间的转换 分段转发              |
| 1    | 物理层     | 以“0” "1"代表电压的高低、灯光的闪灭。 界定连接器和网线的规格。 | 比特流与电子信号之间的切换; 连接器与网线的规格 |

注意:

1. **OSI 协议 != OSI 参考模型**: OSI 协议是为了让异构的计算机之间能够相互通信的、由ISO和ITU-T推进其标准化的一种网络体系结构。



## 0x04 传输分类

### 网络发送数据

1. 面向有连接型
2. 面向无连接型

### 交换方式

1. 电路交换
2. 分组交换

### 接收端数量

1. 单播（Unicast）
2. 广播（Broadcast）
3. 多播（Multicast）
4. 任播（Anycast）





## 0xFF Reference

1. https://github.com/1c7/crash-course-computer-science-chinese
2. 《图解TCP IP(第5版)》.(日)竹下隆史