---
title: "Database"
date: 2021-06-10T00:12:00+08:00
draft: false
tags:
- DB
---

Finally, review the knowledge of closure, minimum dependency set, paradigm optimization and pass the exam, looking the video of Bilibili following:

<iframe src="//player.bilibili.com/player.html?aid=456343564&bvid=BV1P5411e7rU&cid=211158985&page=1" scrolling="no" border="0" frameborder="no" framespacing="0" allowfullscreen="true"> </iframe>


## Peoples

- 1973: Charles W.Bachman (1924-2017) Mesh database technology
- 1981: Edgar F.Codd (1923-2003) database system, especially relational database
- 1998: Jim Gray (1944-2007.1.28?) Database and transaction processing
- 2014: Michael Stonebraker (1943-) The concept and practice of the underlying modern database system


## DBs

- Foreign
  - Large：
    - Oracle
    - IBM DB2
    - Microsoft SQL Server
    - Sybase 
  - Small
    - ACCESS
  - Open Source
    - PostgresSQL
    - MYSQL
    - berkeley db(BDB)
- China
   - Huazhong University of Science and Technology: [DM](http://www.dameng.com/)
   - Renmin University of China: [kingbase](http://www.kingbase.com.cn)
     - In 2018, the second prize of National Science and Technology Progress Award
   - Neusoft: [OpenBASE](http://www.openbase.com.cn)
   - Alibaba: [OceanBase](http://code.taobao.org/p/OceanBase/src/)

## Book

| Publication abbreviation | Full publication name | Publisher | Website |
| --------- | --------------------------------------------------- | --------------------- | ---------------------------------------------------- |
| TODS      | ACM Transactions on Database Systems                | ACM                   | http://www.acm.org/tods/                             |
| VLDBJ     | VLDB Journal                                        | Springer- Verlag      | http://www.vldb.org/dblp/db/journals/vldb/index.html |
| TOIS      | ACM Transactions on Information and Systems         | ACM                   | http://www.acm.orgpubs/tois/                         |
| IEEE TKDE | IEEE Transactions on Knowledge and Data Engineering | IEEE Computer Society | http://www.computer.org/tkde/                        |

## Meeting

- ACMSIGMOD: The International Computer Society Data Management Professional Committee (ACM SIGMOD) is the highest level international conference in the field of international databases. Its main focus is on the research, development and application of databases and information technology.
- VLDB: The International Conference on Very Large Databases is a professional academic institution that specializes in the theory, methods and application of ultra-large database management. It also involves a lot of content, including many aspects of research and application. It can basically provide a comprehensive Reflects the current frontier direction of database research, the latest technology in the industry, and the level of research and development in various countries.
- ICDE: International Conference on Data Engineering (ICDE) is one of the highest-level international conferences in the database field sponsored by the IEEE Computer Data Engineering Technology Society (TCDE).
- CCFDBS: China Computer Federation Database Professional Committee (CHINA COMPUTER FEDERATION DATABASE SOCIETY, referred to as CCFDBS) is an academic database organization under the leadership of China Computer Society. The China Database Conference (NDBC) sponsored by the Database Professional Committee started in 1977 and has become a more authoritative conference in the domestic database field.

## Some U Must Know 

A total of **Basic** (Introduction, Relational Database, Relational Database, Standard Language SQL, Database Security, Database Integrity), **Design and Development** (Relational Data Theory, Database Design, Database Design), **System ** (Relational query processing and query optimization, database recovery technology, concurrency control) three parts.

- **Introduction**
  - Data: Symbol records describing things, which are the basic objects in the database
  - Database: It is a collection of large amounts of data stored in the computer for a long time, organized and shared
  - Database Management System (DBMS): It is a layer of data management software between the user and the operating system
    -  The main function:
      - Data definition function
      - Data organization, storage and management
      - Data manipulation function: 1. Data security protection; 2. Data integrity check; 3. Concurrency control; 4. Database recovery
      - Database transaction management and operation management
      - Database establishment and maintenance
      -  Other functions
  - Database System (DBS): A system for storing, managing, processing and maintaining data composed of databases, database management systems (and their development tools), application systems, and database administrators.
  - Features of manual management stage
      - Data is not saved
      - Application management data
      - Data is not shared
      - Data is not independent
  - File system stage features
      - Data can be stored for a long time
      - Manage data files by file system
  - System disadvantages
      - Poor data sharing and high redundancy
      - Poor data independence
  - Database system characteristics
    - Data structure (essentially different from file system)
    - High data sharing, low redundancy, easy to expand
    - High data independence
    - Data is managed and controlled by DBMS
  - Independence:
    - Data independence
      - Physical independence of data: Refers to the user's application and the data stored in the database on the disk are independent of each other.
      - Logical independence of data: The logical structure of the user's application and the database are independent of each other, that is, the logical structure of the data is changed, and the user program can also remain unchanged
  - Data model is the core and foundation of database system
    - The components of the data model:
      - Data structure: describe the constituent objects of the database and the connections between the objects
      - Data operations: Refers to the set of operations allowed to be performed on the instances of various objects in the database.
  - The three-level model structure of the database system means that the database system is composed of three levels: external mode, mode and internal mode
      - Mode (Logical Mode): It is the description of the logical structure and characteristics of all data in the database, and is the common data view for all users. It is the middle layer of the database system schema structure, which does not involve the physical storage details of the data and the hardware environment, but also It has nothing to do with the specific application, the development tools used and the high-level programming language. A database has only one mode
    - External mode (sub-mode, user mode): It is the description of the logical structure and characteristics of the local data that the database user can see and use. It is the data view of the database user and the logical representation of the data related to a certain application. Usually it is A subset of the pattern, a database can have multiple outer patterns. The outer pattern is a powerful measure to ensure the security of the database
    - Internal mode (storage mode): A database can only have one internal mode, which is the description of the physical structure and storage method of the data, and the representation of the data inside the database
        External mode/mode mapping, mode/internal mode mapping ensure that the data in the database system can have high logical independence and physical independence
-  **relational database**
  - Data integrity constraints: refer to the constraints and dependency rules of the data and its connections in a given data model
  - Substance: Things that exist objectively and can be distinguished from each other
  - Attribute: a certain characteristic of the entity
  - Code: A set of attributes that uniquely identifies an entity
  - Domain: The value range of the attribute
  - Entity type: The characteristics and properties that entities with the same attributes must have. Use entity names and their attribute name sets to abstract and portray similar entities to become entity types
  - Entity Set: A collection of entities of the same type
  - Contact: The relationship within an entity usually refers to the relationship between the attributes that make up the entity; the relationship between entities usually refers to the relationship between different entity sets. There are three types
    - One-to-one contact
    - One-to-many contact
    - Many-to-many contact
  - Relationship model
    - Data structure of relational data model
    - Manipulation and integrity constraints
    - Storage structure
  - Relationship: A relationship corresponds to a table in general
  - Tuple: A row in the table is a tuple
  - Attribute: One column in the table is an attribute
  - Code (code key): an attribute group in the table, it can uniquely determine a tuple
  - Domain: The value range of the attribute
  - Component: an attribute value in the tuple
  - Candidate code: If the value of a certain attribute group in the relationship can uniquely identify a tuple
  - Master Code: If there are multiple candidate codes in a relationship, select one of them as the master code.
  - The attributes of candidate codes are called primary attributes. Attributes not included in any candidate codes are called non-primary attributes or non-code attributes
  - Three types of relationships
    - Basic relationship (also known as basic table, base table)
    - Inquiry form
    - View table
  - Basic operation of relational model
    - Query operation
    - Insert, delete and modify operations
  - Query operations are divided into: selection, projection, connection, division, union, difference, intersection, Cartesian product (5 basic operations)
  - Relational operation characteristics: Set operation mode, that is, the object and result of the operation are sets, also known as one set at a time. Non-relational data model is one record at a time
  - Language classification of relational data:
    - Relational Algebra Language
    - Relationship calculus language
    - With relational algebra and relational calculus
- **Dual Characteristic Language (SQL) **: Language used to communicate with DBMS
  - The difference and connection between equivalence connection and natural connection
    - The concatenation operation with the concatenation operator "=" becomes equivalent concatenation. It selects those tuples with equal attribute values ​​of A and B from the generalized Cartesian product of the relations R and S
    - Natural connection is a special equivalence connection. It requires that the components to be compared in the two relations must be the same attribute group, and the duplicate attribute column is removed from the result
  - SQL integrates data query, data definition, data manipulation and data control functions
  - The main features of SQL include
    - Comprehensive unity
    - Highly non-procedural
    - Collection-oriented operation
    - Provide multiple usage methods with the same grammatical structure
    - Simple language, easy to learn and use
- **Database Security**
  - Describe the commonly used methods and technologies for database security control:
    - User identification and authentication: The system provides a certain way for users to identify their own name or identity. Every time a user asks to enter the system, the system will check it and provide the right to use the system after passing the authentication
    - Access control: Through user authority definition and legal authority check to ensure that only users with legal authority can access the database, and all unauthorized persons cannot access the database.
    - View mechanism: Define views for different users, and hide the data to be kept secret from users who have no right to access through the view mechanism, thereby automatically providing a certain degree of security protection to the data
    - Audit: Establish an audit log, automatically record all user operations on the database and put it in the audit log. The DBA can use the audit trail information to reproduce a series of events leading to the current status of the database, and find out illegal access to data People, time, content, etc.
    - Data Encryption: Encrypt the stored and transmitted data so that people who don’t know the decryption algorithm can’t know the content of the data.
  - TCSEC/TDI describes the standards for the classification of security levels in terms of security policies, responsibilities, guarantees and documents.
  - The GRANT statement grants permissions to the user, and the REVOKE statement revokes the granted permissions
  - Autonomous access control method: Define each user's access authority to different data objects. When the user accesses the database, first check the user's access authority. Prevent illegal users from accessing the database.
  - Mandatory access control method: Each data object is (mandatory) marked with a certain level of security, and each user is also (mandatory) granted a certain level of license. The system stipulates that only users with a certain level of license In order to access a certain confidential data object.
- **Database Integrity**
  - Database integrity refers to the positive determination and compatibility of data
  - The difference and connection between the integrity and security of the database
    - The integrity of the database is to prevent the existence of non-semantic data in the database, that is, to prevent the existence of incorrect data in the database. The object of integrity check and control is the non-semantic and incorrect data to prevent them from entering the database.
    - Data security refers to the protection of the database to prevent data leakage, modification or destruction caused by illegal use. The object of security control is illegal users and illegal operations to prevent them from illegal access to database data.
  - To maintain the integrity of the database, the DBMS must be able to
    - Provide a mechanism for defining integrity constraints
    - Provide methods for integrity check
    - Handling of breach of contract
  - The integrity constraints of the relationship include
    - Entity integrity: If the attribute (referring to one or a group of attributes) A ​​is the primary attribute of the basic relationship R, then A cannot take a null value
    - Referential integrity: If the attribute (or attribute group) F is the outer code of the basic relation R, it corresponds to the main code Ks of the basic relation S (the basic relation R and S are not necessarily different relations), then for R The value of each tuple on F must be: 1. Or take a null value (each attribute value of F is a null value); 2. Or equal to the main code value of a tuple in S
    - User-defined completeness
  - Two invariances of the relationship: the integrity constraints that the relationship model of entity integrity and referential integrity must satisfy
- **Relational Data Theory**
  - Problems with the relationship model
    - Data is easily too big
    - Update exception
    - Insertion exception
    - Delete exception
  - Functional dependency: Let R(U) be the relational pattern on the attribute set U. X and Y are U's own. If for any possible relation r of R(U), there cannot be two tuples in r The attribute value on X is equal, but the attribute value on Y is not equal, it is said that the X function determines that Y or the Y function depends on X, denoted as X→Y
  - Normalization: A relational model of a lower-level paradigm can be transformed into a collection of several higher-level paradigm through pattern decomposition. This process is called normalization
    - 1NF: Each component must be an inseparable data item. The relational model that meets this minimum requirement belongs to 1NF
    - 2NF: If R∈1NF, and every non-primary attribute completely depends on the code, then R∈2NF
    - 3NF: If there is no such code X in the relational pattern R<U,F>, attribute group Y and non-primary attribute Z (Z is not a proper subset of Y) make X→Y, Y→Z hold, Y\→Z , Then it is called R<U,F>∈3NF
    - BCNF: Relational pattern R<U,F>∈1NF. If X→Y and Y is not a proper subset of X, X must contain a code, then R<U,F>∈BCNF A relational pattern R does not belong to 2NF, it will be generated The following questions: 1. Insert the exception; 2. Delete the exception; 3. Modify the three definitions of the abnormal pattern decomposition: decomposition has "lossless connectivity"; decomposition must "maintain functional dependency"; decomposition must "maintain functional dependency", elegant Has "lossless connectivity"
    - ......
-  **Database Design**
  - General definition of database design: For a given application environment, construct (design) optimized database logical mode and physical structure, and establish database and application system accordingly, so that it can effectively store and manage data to meet various requirements User's application requirements, including information management requirements and data operation requirements
    - Information management requirements: Which data objects should be stored and managed in the database
    - Data operation requirements: What operations need to be performed on the data object e, such as query, addition, deletion, modification, statistics and other operations. Database design goals, to provide users and various application systems with an information infrastructure and efficient operating environment
      - High-efficiency operating environment includes: database data access efficiency, database storage space utilization, database system operation management efficiency, etc. are all high
  - Features of data design: 1. Basic law of database design: "three points of technology, seven points of management, twelve points of basic data"; 2. The combination of structure (data) design and behavior (processing) design
  - Main features of the conceptual structure
    - It can truly and fully reflect the real world, including the connection between things and things, and can meet the coarse-grained requirements of users for data. It is a real model for realizing the world
    - It is easy to understand, so that you can use it to exchange opinions with users who are not familiar with computers. The active participation of users is the key to the success of database design
    - Easy to change, when the application environment and application requirements change, it is easy to modify and expand the conceptual model
    - Easy to convert to various data models such as relationship, mesh, hierarchy, etc.
- **Query processing and query optimization**
  - The advantage of query optimization is not only that users do not have to think about how to best express queries to achieve better efficiency, but also that the system can do better than the "optimization" of user programs
  - The overall goal of query optimization: select an effective strategy to obtain the value of a given relational expression, so that the query cost is minimized
  - Algebraic optimization strategy is to improve query efficiency by equivalent changes to relational algebraic expressions. Physical optimization is
  - To select efficient and reasonable operation algorithms or access paths, find an optimized query plan, and achieve the goal of query optimization
- **Database Recovery Technology**
  - A transaction is a user-defined sequence of database operations. These operations are either all or all, and are an indivisible unit of work
  - The transaction usually starts with BEGIN TRANSACTION and ends with COMMIT or ROLLBACK. COMMIT means commit, and all operations of committing the transaction ROLLBACK means rollback, that is, some kind of failure occurs during the operation of the transaction, and the transaction cannot continue to be executed. The system will All completed operations of the database are all undone and rolled back to the state at the beginning of the transaction
  - Four characteristics of transactions (ACID characteristics): Atomicity, consistency, isolation, and persistence
    - Atomicity: Transaction is the logical unit of work of the database, all operations included in the transaction are either done or not done
    - Consistency: The result of transaction execution must be to make the database change from one consistent state to another consistent state
    - Isolation: For concurrent execution, the execution of a transaction cannot be interfered by other transactions
    - Persistence: Once a transaction is committed, its changes to the data in the database should be permanent
  - **Types of failures and recovery strategies**
  - Transaction failure
      - Scan the file log in the reverse direction to find the update operation of the transaction
      - Perform the reverse operation of the update operation of the transaction
      - Continue to scan the log file in the reverse direction and do the same
      - Continue in this way until the start mark of the transaction is read, and the recovery of the transaction failure is completed
    - System failure (soft failure)
      - Scan the log file forward to find out the transaction queues that have been committed and the unfinished transaction queues before the failure occurred
      - Cancel each transaction in the cancel queue
      - Redo each transaction in the redo queue
    - Media failure (hard): The most serious type of failure. The recovery method is to reinstall the database and then redo the completed transactions.
      - Load the latest database backup copy (the dumped copy closest to the time of the failure) to restore the database to the consistency state at the time of the dump
      - Load a copy of the log file at the end of the dump and redo completed transactions.
    -  computer virus
  - Basic techniques of database recovery: data dump and log file
    - When a failure occurs during system operation, the database can be restored to a consistent state before the failure by using the dumped backup copy of the database and log files.
  - Checkpoint record is a new type of log record.
    - Establish a list of all transactions in progress at the time of checkpoint
    - The address of the most recent log record of these transactions
  - The most commonly used technique for establishing redundant data
    - Data dump
    - Registration log files
  - Data inconsistency caused by concurrent operations: loss of modification, non-repeatable read, read "dirty" data
  - The easy way to avoid deadlocks is to adopt a first-come, first-served strategy
  - Three-level lockdown agreement
    - Level 1 Locking Protocol: Add write lock before writing data, and no lock when reading data. It can only prevent loss and modification.
    - Level 2 lockout protocol: In the level 1 lockout protocol, a read lock is required to read data, and it will be released after reading. Avoid reading dirty data.
    - Three-level lockout protocol: On the first-level lockout protocol, read data plus read lock, and release after the transaction ends.


## SQL 

The `Oracle 11g` used in the school’s experimental environment. It is said that this version is really the original sin, and few people use it. Although I have found the installation tutorial on Stackoverflow, my Ubuntu still has all the bugs, and finally uninstalled Ubuntu (lost a lot of valuable data), I jumped back to Windows, just to use this experimental software, why does the school use the old version instead of the latest Oracle? I am really depressed.

I hosted the lab homework and lab notes for a semester in [Gist](https://gist.github.com/bGZoCg/cc81fcceb8455e95a413a20cd0759cb7). Alumni of IMU can read it by themselves.

<script src="https://gist.github.com/bGZoCg/cc81fcceb8455e95a413a20cd0759cb7.js"></script>


## Postgresql Source

All work will be better if I could preview the latter chapter. And a extension named `Comment Translate` , in VsCode, helps me a lot. What's more, the source of Postgresql is awesome, all the model is filled with comments. Cause the total flow of postgresql is the same with Oracle above. So let talk the diff details following.

As we known, flow is like `Parser -(tree)> Rewriter -(convert)> Planner -(review)> Executor(do)`. In part one, parser used [flex](http://www.cs.virginia.edu/~cr4bd/flex-manual) under `./src/backend/parser/scan.l` and bison under `./src/backend/parser/gram.y`.

So if you're fascinated in this struction and flow, you could read <<*PostgreSQL database core analysis*>>. Its douban's page is [here](https://book.douban.com/subject/6971366/).


## Ubuntu Oracle DB 

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
    # Omit a lot...
    $ reboot
    ```

## 拓展

- [Y-SQL in X minutes](https://learnxinyminutes.com/docs//sql/)
- [(ZH)Getting started with mysql is still in Silicon Valley](https://www.bilibili.com/video/BV12b411K7Zu). 
- [(ZH)Shang Silicon Valley MySQL core technology basic knowledge notes](https://www.jianshu.com/p/91856df6b6f9)


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




<div id="j1">[1]. https://askubuntu.com/posts/983032/edit</div>
<div id="j2">[2]. https://dba.stackexchange.com/questions/13291/installing-oracle-11g-on-ubuntu-11-10</div>
<div id="j3">[3]. https://docs.oracle.com/cd/E17781_01/install.112/e18802/toc.htm#XEINL123</div>
<div id="j3">[3]. https://www.jianshu.com/p/f7f9440e30a5</div>
