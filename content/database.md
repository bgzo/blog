---
title: "Database"
date: 2021-01-28T17:39:35+08:00
draft: false
tags:
- DB
---

本文参考:
- [X分钟速成Y-SQL](https://learnxinyminutes.com/docs/zh-cn/sql/)
- [MySQL_基础+高级篇- 数据库 -sql -mysql教程_mysql视频_mysql入门_尚硅谷](https://www.bilibili.com/video/BV12b411K7Zu). 
- [尚硅谷MySQL核心技术基础知识笔记](https://www.jianshu.com/p/91856df6b6f9)

<!--more-->

## 好处

1. 持久化数据到本地
2. 可以实现结构化查询, 方便管理

### 概念

1. DB：数据库, 保存一组有组织的数据的容器
2. DBMS：数据库管理系统, 又称为数据库软件(产品), 用于管理DB中的数据
3. SQL:结构化查询语言, 用于和DBMS通信的语言

## 存储特点

1. 将数据放到表中, 表再放到库中
2. 一个数据库中可以有多个表, 每个表都有一个的名字, 用来标识自己。表名具有唯一性。
3. 表具有一些特性, 这些特性定义了数据在表中如何存储, 类似java中 “类”的设计。
4. 表由列组成, 我们也称为字段。所有表都是由一个或多个列组成的, 每一列类似java 中的”属性”
5. 表中的数据是按行存储的, 每一行类似于java中的“对象”。

## 命令

```mysql
show databases; #查看当前所有的数据库
use 库名 #打开指定的库
show tables; # 查看当前库的所有表
show tables from 库名;# 查看其它库的所有表
create table 表名(
	name type;
    name type;
    ...
); # 创建表
desc 表名; # 查看表结构
select version(); # 查看服务器的版本 登录到mysql服务端
mysql --version # 查看服务器的版本 没有登录到mysql服务端
mysql --V
```

## 语法规范

1. 不区分大小写,但建议关键字大写, 表名、列名小写
2. 每条命令最好用分号结尾
3. 每条命令根据需要, 可以进行缩进 或换行
4. 注释
        `单行注释：#注释文字`
        `单行注释：-- 注释文字`
        `多行注释：/* 注释文字  */`

## 语言分类

- **DQL(Data Query Language)** : 数据查询语言 select 
- **DML(Data Manipulate Language)** : 数据操作语言 insert 、update、delete
- **DDL(Data Define Languge)** : 数据定义语言 create、drop、alter
- **TCL(Transaction Control Language)** : 事务控制语言 commit、rollback

## 查询

基础查询如上.

### 条件查询

- 表达式: `select + 要查询的字段|表达式|常量值|函数 + from + 表 + where + 条件` ;

- 条件表达式: `salary>10000`
    - 条件运算符：`> < >= <= = != <>`
    
- 逻辑表达式
    示例：`salary>10000 && salary<20000`
    - 逻辑运算符：
        - and(&&):两个条件如果同时成立, 结果为true, 否则为false
        - or(||)：两个条件只要有一个成立, 结果为true, 否则为false
        - not(!)：如果条件成立, 则not后为false, 否则为true

- 模糊查询: `last_name like 'a%'`

### 排序查询

`order by 排序的字段|表达式|函数|别名 【asc|desc】`

### 分组查询

`group by 分组的字段`

- 特点:
    - 可以按单个字段分组
    - 和分组函数一同查询的字段最好是分组后的字段
    - 分组筛选
            针对的表    位置          关键字
    分组前筛选：  原始表     group by的前面     where
    分组后筛选：  分组后的结果集 group by的后面     having
    - 可以按多个字段分组, 字段之间用逗号隔开
    - 可以支持排序
    - having后可以支持别名



### 多表连接查询

- 笛卡尔乘积：如果连接条件省略或无效则会出现
- 解决办法：添加上连接条件

#### 等值连接——非等值连接

1. 等值连接的结果 = 多个表的交集
2. n表连接, 至少需要n-1个连接条件
3. 多个表不分主次, 没有顺序要求
4. 一般为表起别名, 提高阅读性和性能

#### sql99语法：通过join关键字实现连接

支持:

- 等值连接、非等值连接 (内连接)
- 外连接
- 交叉连接

语句上, 连接条件和筛选条件实现了分离, 简洁明了！

```mysql
【inner|left outer|right outer|cross】join 表2 on  连接条件
【inner|left outer|right outer|cross】join 表3 on  连接条件
【where 筛选条件】
【group by 分组字段】
【having 分组后的筛选条件】
【order by 排序的字段或表达式】
```

#### 自连接

```mysql
# sql99
SELECT e.last_name,m.last_name
FROM employees e
JOIN employees m ON e.`manager_id`=m.`employee_id`;
# sql92
SELECT e.last_name,m.last_name
FROM employees e,employees m 
WHERE e.`manager_id`=m.`employee_id`;
```

### 子查询

一条查询语句中又嵌套了另一条完整的select语句, 其中被嵌套的select语句, 称为子查询或内查询. 在外面的查询语句, 称为主查询或外查询

1. 子查询都放在小括号内
2. 子查询可以放在from后面、select后面、where后面、having后面, 但一般放在条件的右侧
3. 子查询优先于主查询执行, 主查询使用了子查询的执行结果
4. 子查询根据查询结果的行数不同分为以下两类：
    5. 单行子查询: 搭配单行操作符使用：`> < = <> >= <= `, 非法使用子查询的情况：
        1. 子查询的结果为一组值
        2. 子查询的结果为空
    2. 多行子查询: 一般搭配多行操作符使用：`any、all、in、not in
            in`： 
        1. 属于子查询结果中的任意一个就行
        2. any和all往往可以用其他查询代替

#### 分页查询

实际的web项目中需要根据用户的需求提交对应的分页查询的sql语句

```mysql
【where 条件】
【group by 分组字段】
【having 条件】
【order by 排序的字段】
limit 【起始的条目索引, 】条目数;
```
特点:
1. 起始条目索引从0开始
2. limit子句放在查询语句的最后
3. 公式：`select * from  表 limit (page-1)*sizePerPage,sizePerPage`; 每页显示条目数sizePerPage, 要显示的页数 page

#### 联合查询

引入`union`联合、合并.

```mysql
select 字段|常量|表达式|函数 【from 表】 【where 条件】 union 【all】
select 字段|常量|表达式|函数 【from 表】 【where 条件】 union 【all】
select 字段|常量|表达式|函数 【from 表】 【where 条件】 union  【all】
.....
select 字段|常量|表达式|函数 【from 表】 【where 条件】
```

1. 起始条目索引从0开始

2. limit子句放在查询语句的最后

3. 公式：select * from  表 limit (page-1)*sizePerPage,sizePerPage
    假如:
    每页显示条目数sizePerPage
    要显示的页数 page
    进阶9：联合查询
    引入：
    union 联合、合并

**特点:**

1. 多条查询语句的查询的列数必须是一致的
2. 多条查询语句的查询的列的类型几乎相同
3. union代表去重, union all代表不去重



## 常见函数

一、单行函数
1. 字符函数
    1. concat拼接
    2. substr截取子串
    3. upper转换成大写
    4. lower转换成小写
    5. trim去前后指定的空格和字符
    6. ltrim去左边空格
    7. rtrim去右边空格
    8. replace替换
    9. lpad左填充
    10. rpad右填充
    11. instr返回子串第一次出现的索引
    12. length 获取字节个数
2. 数学函数
    1. round 四舍五入
    2. rand 随机数
    3. floor向下取整
    4. ceil向上取整
    5. mod取余
    6. truncate截断
3. 日期函数
    1. now当前系统日期+时间
    2. curdate当前系统日期
    3. curtime当前系统时间
    4. str_to_date 将字符转换成日期
    5. date_format将日期转换成字符
4. 流程控制函数
    1. if 处理双分支
    2. case语句 处理多分支
        1. 处理等值判断
        2. 处理条件判断
5. 其他函数
    1. version版本
    2. database当前库
    3. user当前连接用户

#### 分组函数

一、单行函数
1. 字符函数
    concat拼接
    substr截取子串
    upper转换成大写
    lower转换成小写
    trim去前后指定的空格和字符
    ltrim去左边空格
    rtrim去右边空格
    replace替换
    lpad左填充
    rpad右填充
    instr返回子串第一次出现的索引
    length 获取字节个数
    
2. 数学函数
    round 四舍五入
    rand 随机数
    floor向下取整
    ceil向上取整
    mod取余
    truncate截断
3. 日期函数
    now当前系统日期+时间
    curdate当前系统日期
    curtime当前系统时间
    str_to_date 将字符转换成日期
    date_format将日期转换成字符
4. 流程控制函数
    if 处理双分支
    case语句 处理多分支
        情况1：处理等值判断
        情况2：处理条件判断
    
5. 其他函数
    version版本
    database当前库
    user当前连接用户

## DML

### 插入

- `insert into 表名(字段名, ...) + values(值1, ...);`

- 特点
    - 字段类型和值类型一致或兼容, 而且一一对应
    - 可以为空的字段, 可以不用插入值, 或用null填充
    - 不可以为空的字段, 必须插入值
    - 字段个数和值的个数必须一致
    - 字段可以省略, 但默认所有字段, 并且顺序和表中的存储顺序一致
    - 字段类型和值类型一致或兼容, 而且一一对应



### 修改


### 删除



## DDL

### 库的管理

```mysql
create database 库名 # 创建库
drop database 库名 # 删除库
```

### 表的管理

####  创建表

```mysql
CREATE TABLE IF NOT EXISTS stuinfo(
    stuId INT,
    stuName VARCHAR(20),
    gender CHAR,
    bornDate DATETIME
);# 创建表

DESC studentinfo;
```

#### 修改表 alter

- `ALTER TABLE 表名 ADD|MODIFY|DROP|CHANGE COLUMN 字段名 【字段类型】;`

```mysql
ALTER TABLE studentinfo CHANGE  COLUMN sex gender CHAR;#修改字段名
ALTER TABLE stuinfo RENAME [TO]  studentinfo;#②修改表名
ALTER TABLE studentinfo MODIFY COLUMN borndate DATE ;#③修改字段类型和列级约束
ALTER TABLE studentinfo ADD COLUMN email VARCHAR(20) #④添加字段first;
ALTER TABLE studentinfo DROP COLUMN email;#⑤删除字段
```

#### 删除表

```mysql
DROP TABLE [IF EXISTS] studentinfo;
```

### 常见类型

- 整型
- 小数
    - 浮点型
    - 定点型
- 字符型：
- 日期型：
- Blob类型：

### 常见约束

```mysql
NOT NULL
DEFAULT
UNIQUE
CHECK
PRIMARY KEY
FOREIGN KEY
```

## 事务

通过一组逻辑操作单元(一组DML——sql语句), 将数据从一种状态切换到另外一种状态

- **特点:**
    - 原子性(ACID)：要么都执行, 要么都回滚
    - 一致性：保证数据的状态操作前和操作后保持一致
    - 隔离性：多个事务同时操作相同数据库的同一个数据时, 一个事务的执行不受另外一个事务的干扰
    - 持久性：一个事务一旦提交, 则数据将持久化到本地, 除非其他事务对其进行修改

- 分类：隐式事务, 没有明显的开启和结束事务的标志


## PLAN
- 基础篇
  - 绪论
  - 关系数据库
  - 关系数据库标准语言SQL
  - 数据库安全性
  - 数据库完整性
- 设计与应用 开发篇
  - 关系数据理论数据库设计
  - 数据库设计
  - 数据库编程
- 系统篇
  - 关系查询处理和查询优化
  - 数据库恢复技术
  - 并发控制

## People

- 1973年 Charles W. Bachman(1924-2017) 网状数据库技术
- 1981年 Edgar F. Codd (1923－2003 )数据库系统，尤其是关系型数据库
- 1998年 Jim Gray (1944-2007.1.28? )数据库与事务处理
- 2014年 Michael Stonebraker(1943-)现代数据库系统底层的概念与实践

## DBs

- Foreign
  - 大型：
    - 甲骨文 Oracle
    - IBM DB2
    - Microsoft SQL Server
    - Sybase 
  - 小型
    - ACCESS
  -开源
    - PostgresSQL
    - MYSQL
    - berkeley db(BDB)
- China
  - 华中科技大学: [DM](http://www.dameng.com/)
  - 中国人民大学: [kingbase](http://www.kingbase.com.cn)
    - 2018年，国家科技进步二等奖
  -东软: [OpenBASE](http://www.openbase.com.cn)
  -阿里巴巴: [OceanBase](http://code.taobao.org/p/OceanBase/src/)

## PAPER

| 刊物简称  | 刊物全称                                            | 出版社                | 网址                                                 |
| --------- | --------------------------------------------------- | --------------------- | ---------------------------------------------------- |
| TODS      | ACM Transactions on Database Systems                | ACM                   | http://www.acm.org/tods/                             |
| VLDBJ     | VLDB Journal                                        | Springer- Verlag      | http://www.vldb.org/dblp/db/journals/vldb/index.html |
| TOIS      | ACM Transactions on Information and Systems         | ACM                   | http://www.acm.orgpubs/tois/                         |
| IEEE TKDE | IEEE Transactions on Knowledge and Data Engineering | IEEE Computer Society | http://www.computer.org/tkde/                        |

## Meeting

- ACMSIGMOD: 国际计算机学会数据管理专业委员会(ACM SIGMOD)是国际数据库领域最高级别的国际会议。其主要致力于数据库以及信息技术的研究，开发和应用。
- VLDB: 国际超大型数据库会议是一个专门从事超大规模数据库管理理论、方法和应用研究的专业性学术机构，它涉及的内容也很丰富，包括研究及应用的诸多方面，基本上能够较全面地反映当前数据库研究的前沿方向、工业界的最新技术以及各国的研发水平。
- ICDE: 数据工程国际学术会议(ICDE)是由IEEE计算机数据工程技术学会(TCDE)主办的数据库领域的最高级别的国际性会议之一。
- CCFDBS: 中国计算机学会数据库专业委员会(CHINA COMPUTER FEDERATION DATABASE SOCIETY，简称CCFDBS)是中国计算机学会领导下的数据库学术组织。由数据库专业委员会主办的中国数据库学术会议(NDBC)始于1977年，已成为国内数据库领域较为权威的会议。

## 概述

- **数据(Data)**: 描述事物的符号记录, 数据库中存储的基本对象
  - 特点: 数据与其语义是不可分
- **数据库(DataBase, DB)**: 长期储存 在计算机内 、有组织的、可共享的大量数据的集合
  - 数据按一定的数据模型组织、描述 和储存
  - 可为各种用户共享
  - 冗余度较小
  - 数据独立性较高
  - 易扩展
- **数据库管理系统(DataBase Management System, DBMS)**: 位于用户与操作系统之间的一层数据管理软件, 科学地组织和存储数据、高效地获取和维护数据
  - 功能:
    - 数据操纵功能
      - 提供数据操纵语言(DML)
      - 实现对数据库的基本操作 (查询、插入、删除和修改)
    - 数据库的事务管理和运行管理
      - 数据库在建立、运行和维护时由DBMS统一管理和控制
      - 保证数据的安全性、完整性、多用户对数据的并发使用
      - 发生故障后的系统恢复
    - 数据库的建立和维护功能(实用程序 )
      - 数据库初始数据装载转换
      - 数据库转储
      - 介质故障恢复
      - 数据库的重组织
      - 性能监视分析等
    - 其它功能
      - DBMS与网络中其它软件系统的通信
      - 两个DBMS系统的数据转换
      - 异构数据库之间的互访和互操作
- **数据库系统(DBS)**: 由数据库、数据库管理系统、应用系统和数据库管理员组成
的存储、管理、处理和维护 数据的系统
  - 构成:
    - 数据库
    - 数据库管理系统(及其开发 工具)
    - 应用系统
    - 数据库管理员
  - **特点**
    - 数据结构化
      - 整体结构化
        - 不再仅仅针对某一个应用，而是面向全组织
        - 不仅数据内部结构化，整体是结构化的，数据之间具有联系
      - 数据库中实现的是数据的真正结构化
        - 数据的结构用数据模型描述 ，无需程序定义和解释
        - 数据可以变长
        - 数据的最小存取单位是数据项
    - 数据的共享性高，冗余度低，易扩充
      - 数据共享
        - 减少数据冗余，节约存储空间
        - 避免数据之间的不相容性与不一致性
        - 使系统易于扩充
    - 数据独立性高
      - 物理独立性
        - 指用户的 应用程序与存 储在磁盘上的 数据库中数据 是相互独立的。当数据的物理存储改变了，应用程序不用改变。
      - 逻辑独立性
        - 指用户的应用程序与数据库的逻辑结构是相互独立的 。数据的逻辑结构改变了，用户程序也 可以不变 。
      - 数据独立性是由DBMS的二级映像功能来保证的
    - 数据由DBMS统一管理和控制

### History

- 数据管理
  - 对数据进行分类、组织、编码、存储、检索和维护
  - 数据处理的中心问题
- 发展过程
  - 人工管理阶段(20世纪40年代中--50年代中)
    - 数据的管理者：用户(程序员)，数据不保存
    - 数据面向的对象：某一应用程序
    - 数据的共享程度：无共享、冗余度极大
    - 数据的独立性：不独立，完全依赖于程序
    - 数据的结构化：无结构
    - 数据控制能力：应用程序自己控制
  - 文件系统阶段(20世纪50年代末--60年代中)
- 数据的管理者：文件系统，数据可长期保存
    - 数据面向的对象：某一应用程序
    - 数据的共享程度：共享性差、冗余度大
    - 数据的结构化：记录内有结构，整体无结构
    - 数据的独立性：独立性差，数据的逻辑结构改变必须
    - 修改应用程序
    - 数据控制能力：应用程序自己控制
  - 数据库系统阶段(20世纪60年代末--现在)
- 动力
  - 应用需求的推动
  - 计算机硬件的发展
  - 计算机软件的发展

### 数据模型

- 两大类
  - **概念模型**: 信息模型，它是按用户的观点来对数据和信息建模，用于数据库设计。
  - 逻辑模型和物理模型
    - **逻辑模型**: 主要包括网状 模型、层次模型、关系模型、面向对象模型等，按计算机系统的观点对数据建模，用于DBMS 实现。
    - **物理模型**: 是对数据最底 层的抽象，描述数据在系统 内部的表示方式和存取方法，在磁盘或 磁带上的存储方式和存 取方法。
- 数据模型的组成要素
  - 数据结构
  - 数据操作
  - 完整性约束条件
    - 一组完整性规则的集合。
    - 完整性规则：给定的数据模型中数据及其联系所具有的制约和依存规则
    - 用以限定符合数据模型的数据库状态以及状态的变化，以保证数据的正确、有效、相容。
- 概念模型
  - 信息世界
    - **实体(Entity)**: 客观存在并可相互区别的事物称为实体。可以是具体的人、事、物或 抽象的概念。
    - 属性(Attribute): 实体所具有的某一特性称为属性。一个实体可以由若干个属性来刻画。
    - 码(Key): 唯一标识实体的属性集称为码
    - 域(Domain): 属性的取值范围称为该属性的域。
    - **实体型(Entity Type)**: 用实体名及其属性名集合来抽象和刻画同类实体称为实体型
    - **实体集(Entity Set)**: 同一类型实体的集合称为实体集
    - 联系(Relationship)
      - 现实世界中事物内部以及事物之间的联系,在信息世界中反映为实体内部的联系和实体之间的联系。
      - 实体内部的联系通常是指组成实体的各属性之间的联系
      - **实体之间的联系通常是指不同实体集之间的联系**
- 最常用的数据模型
  - 层次模型
  - 网状模型
  - 关系模型
    - **关系(Relation)**: 一个关系对应通常说的一张表
    - **元组(Tuple)**: 表中的一行即为一个元组
    - **属性(Attribute)**: 表中的一列即为一个属性 ，给每一个属性起一个名称, 即属性名
    - **码(Key)**: 表中的某个属性组，它可以唯一确定一个元组。
    - **域(Domain)**: 属性的取值范围。
    - **分量**: 元组中的一个属性值。
    - **关系模式**: 对关系的描述

### 数据库系统结构

- 数据库系统模式的概念
- 数据库系统的三级模式结构
  - **模式(Schema)**: 逻辑模式, 数据库中全体数据的逻辑结构和特征的描述
      - 所有用户的公共数据视图，综合了所有用户的需求
    - 一个数据库只有一个模式
    - 模式的地位：是数据库系统模式结构的中间层
      - 与数据的物理存储细节和硬件环境无关
      - 与具体的应用程序、开发工具及高级程序设计语言无关
  - **外模式(External Schema)**: 子模式或用户模式, 数据库用户（包括应用程序员和最终用户）使用的局部数据的逻辑结构和特征的描述
      - 数据库用户的数据视图，是与某一应用有关的数据的逻辑表示
    -外模式的地位：介于模式与应用之间
      - 模式与外模式的关系：一对多
        - 外模式通常是模式的子集
        - 一个数据库可以有多个外模式 。反映了不同的用户的应用需求 、看待数据的方式、对数据保密的要求
        - 对模式中同一数据 ，在外模式中的结构 、类型、长度、保密级别等都可以不同
      - 外模式与应用的关系：一对多
        - 同一外模式也可以为某一用户的多个应用系统所使用
        - 但一个应用程序只能使用一个外模式
    - 外模式的用途
      - 保证数据库安全性的一个有力措施
      - 每个用户只能看见和访问所对应的外模式中的数据
  - **内模式(Internal Schema)**:是数据物理结构和存储方式的描述
    - 是数据在数据库内部的表示方式
        - 记录的存储方式（顺序存储，按照B树结构 存储，按hash方法存储）
        - 索引的组织方式
        - 数据是否压缩存储
        - 数据是否加密
        - 数据存储记录结构的规定
    - 一个数据库只有一个内模式
    - 数据库的二级映像功能与数据独立性

### 数据库系统的组成

- 硬件平台及数据库
  - 足够大的内存
  - 足够大的外存
  - 较高的通道能力，提高数据传送率
- 软件
  - 支持DBMS运行的操作系统
  - 与数据库接口的高级语言及其编译系统
  - 以DBMS为核心的应用开发工具
  - 为特定应用环境开发的数据库应用系统
- 人员
  - 数据库管理员: DBA
  - 系统分析员和数据库设计人员
  - 应用程序员
  - 用户
    - 偶然用户
    - 简单用户
    - 复杂用户

## ORACLE DB

- Download
  - [Oracle Database Express Edition (XE) Release 11.2.0.2.0 (11gR2)](https://www.oracle.com/database/technologies/xe-prior-releases.html)
  - [Oracle Database Software Downloads](https://www.oracle.com/database/technologies/oracle-database-software-downloads.html)
- Install<sup>[1](#j1)[2](#j2)[3](#j3)</sup>
    ```shell
    $ sudo apt install rmp -y && sudo apt install alien -y
    $ sudo alien --scripts -d oracle-xe-11.2.0-1.0.x86_64.rpm
    $ sudo dpkg -i oracle-xe_11.2.0-2_amd64.deb
    # /var/lib/dpkg/info/oracle-xe.postinst: line 114: /sbin/chkconfig: No such file or directory You must run '/etc/init.d/oracle-xe configure' as the root user to configure the database.
    $ sudo /etc/init.d/oracle-xe configure
    # 安装的时候一大堆目录错过了...
    $ reboot
    ```


## Relationship DB 关系数据库

- 关系代数<sup>[4](#j4)</sup>
  - 集合运算符: 并(union),差(except), 交(intersection)及笛卡尔积(cartesian product)
  - 专门的关系运算符:
    - **选择(select)**: 
      - σ <sub>SAL>1000</sub> (EMP): 取出查询工资大于1000的所有员工的信息
    - **投影(projection)**: ：∏<sub>字段序列</sub>(关系)
      - ∏<sub>ENAME,SAL</sub>(EMP): 查看所有员工的姓名和工资
    - **连接(join)**
      - ∏<sub>ENAME,SAL</sub>(σ<sub>SAL>1000</sub>(EMP)): 求出了所有工资大于1000的员工的名字和工资, 将σ<sub>SAL>1000</sub>(EMP)执行的结果当做一个临时的关系，参与了投影运算得到
        - **自然连接(natural join)**
          - ∏<sub>name, course_id</sub>(instructor ⋈ teaches): 所有老师的名字以及其所授课程的id
    - **除法(division)**
      - 原理解析见[CSDN博客](https://blog.csdn.net/qq_22627687/article/details/53789362)


![](https://z3.ax1x.com/2021/06/28/RNt0kn.png)

<div id="j1">[1]. https://askubuntu.com/posts/983032/edit</div>
<div id="j2">[2]. https://dba.stackexchange.com/questions/13291/installing-oracle-11g-on-ubuntu-11-10</div>
<div id="j3">[3]. https://docs.oracle.com/cd/E17781_01/install.112/e18802/toc.htm#XEINL123</div>
<div id="j3">[3]. https://www.jianshu.com/p/f7f9440e30a5</div>
