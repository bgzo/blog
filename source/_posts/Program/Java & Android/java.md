**Java****编程思想**

# 1.   绪论



# 2.  

# 10. 第10章 内部类

## 10.1.  内部类

### 10.1.1. private内部类

public class Parcel4 {<br>  private class PContents implements Contents {<br><br>    private int i = 11;<br>    @Override<br>    public int value() {<br>      return i;<br>    }<br>    <br>  }...

·    完全阻止依赖于类型的编码

·    完全隐藏了实现细节

·    无法访问不属于公共接口的方法

### 10.1.2. 在方法和作用域内的内部类

public class Parcel5 {<br>  public Destination destination(String s) {<br>    class PDestination implements Destination {<br>      private String label;<br>      <br>      private PDestination(String whereTo) {<br>        label = whereTo;<br>      }<br>      <br>      @Override...

·    为什么需要？

•   实现接口，创建并返回引用

•   创建类，不希望类公共可用

·    作用域和普通变量一样

### 10.1.3. 匿名内部类

public class Parcel7 {<br>  public Contents contents() {<br>    return new Contents() {<br>      private int i = 11;<br>      @Override<br>      public int value() {<br>        return i;<br>      }<br>    };<br>  }...

·    说明

•   返回值的生成，表示返回值的类的定义结合在一起！

•   通过new表达式，自动向上转型为接口的引用

•   类是匿名的，没有名字

·    构造器

•   无参

•   有参

·    特点

•   扩展类or实现接口，不能两者兼备

•   只能实现一个接口

·    工厂方法

•   使用匿名内部类

### 10.1.4. 嵌套类

·    说明

•   static 内部类对象×外围类对象

•   不能从嵌套类的对象，访问非静态的外围类对象

·    接口内部的类

•   嵌套类→接口的一部分

•   接口中的任何东西，都是public和static的

•   好处

•   创建公共代码，被所有不同实现共用

### 10.1.5. 为什么需要内部类

·    入口

•   内部类对象→访问外围类对象的所有成员

•   内部类→进入外围类的窗口

·    多重继承

•   每个内部类，独立继承一个（接口的）实现

•   外围类继承层次，对内部类无影响

•   内部类允许继承多个非接口类型

·    闭包与回调

•   回调

•   对象携带信息，在某一时刻调用初始对象

·    控制框架

•   图形用户接口 GUI

•   事件驱动系统

# 11. 第11章 持有对象

## 11.1.  容器

唯一需要指定精确类型的地方，是在创建的时候。<br> <br>新程序中不应该使用过时的Vector、HashTable、Stack。<br><br>Java的容器是每天都会用到的工具，它可以使程序更简洁、更强大、更高效。

### 11.1.1. 用途

·    保存对象

·    编译期×错误类型→容器

### 11.1.2. Collection

·    说明

•   独立元素的序列

•   槽内只有一个元素

·    分类

•   List

•   按照插入顺序

•   ArrayList

•   √随机访问元素

•   ×中间插入和移除元素

•   LinkedList

•   √中间插入和移除元素

•   ×随机访问元素

•   Stack

•   后进先出 LIFO

•   Set

•   元素不能重复

•   HashSet

•   散列函数→查询速度快

•   TreeSet

•   红黑树→排序

•   Queue

•   先进先出 FIFO→并发编程

•   PriorityQueue

### 11.1.3. Map

·    映射表：“键值对”对象

·    槽内有两个对象：键和与之关联的值

## 11.2.  迭代器

### 11.2.1. 统一了对容器的访问方式

### 11.2.2. 只能单向移动

### 11.2.3. foreach隐形包括迭代器

# 12. 第12章 异常

异常处理的优点之一，就是它使得你可以在某处集中精力处理你要解决的问题，而在另一处处理你编写代码产生的错误。<br><br>Java坚定地强调将所有的错误都以异常形式报告的这一事实，正是它远超过注入C++这类语言的长处之一。

## 12.1.  发现错误

### 12.1.1. 编译阶段

### 12.1.2. 运行时

## 12.2.  好处

### 12.2.1. 提供一致的错误报告模型

### 12.2.2. 节省代码

### 12.2.3. 正常逻辑↔错误逻辑

## 12.3.  Throwable

### 12.3.1. Error

·    JVM报告系统错误

### 12.3.2. Exception

·    编译期检查

·    RuntimeException

•   运行时异常

•   可忽略，防止代码臃肿

## 12.4.  try-catch-finally

### 12.4.1. catch

·    仅处理匹配的catch子句

·    派生类对象，可以匹配基类

### 12.4.2. finally

·    子句总会执行

•   即使try中有return！

## 12.5.  基本异常

### 12.5.1. 构造器

·    默认

·    字符串参数

### 12.5.2. 用名称代表发生的问题

### 12.5.3. 根类

·    Throwable

## 12.6.  printStackTrace()

### 12.6.1. 从方法调用处→异常抛出处的方法调用序列

### 12.6.2. 标准错误流

### 12.6.3. 栈底：第一个方法调用

# 13. 第13章 字符串

## 13.1.  字符串

### 13.1.1. String

·    对象不可变

### 13.1.2. StringBuilder

![desc](file:///C:/Users/15517/AppData/Local/Temp/msohtmlclip1/01/clip_image003.png) 

·    非线程安全，可变

### 13.1.3. StringBuffer

![desc](file:///C:/Users/15517/AppData/Local/Temp/msohtmlclip1/01/clip_image003.png) 

·    线程安全

## 13.2.  格式化输出

### 13.2.1. Formatter

import java.text.DateFormat;<br>import java.text.SimpleDateFormat;<br>import java.util.Date;<br><br>public class Formatter {<br>  public static void main(String[] args) {<br>    DateFormat sdf = new SimpleDateFormat("yyyy-mm-dd hh:mm:ss");<br>    System.out.println(sdf.format(new Date()));<br>  }<br>}

## 13.3.  正则表达式

Java的正则表达式，\处理与其他语言不同！

### 13.3.1. 其他语言

·    \d

### 13.3.2. Java

·    \\d

·    \\\\

•   一个\

# 14. 第14章 类型信息

## 14.1.  类型信息

### 14.1.1. Class对象→JVM类加载器

### 14.1.2. 常用方法

·    printInfo()

•   全限定类名

·    getInterfaces()

•   包含的接口

·    getSuperclass()

•   直接基类

·    newInstance()

•   创建类

•   必须有默认构造器

### 14.1.3. 初始化

·    对静态方法或非常数静态域的首次引用

•   static final 不初始化

·    构造器隐式为静态的

### 14.1.4. 泛化的Class引用

·    Class<? extends Integer>

### 14.1.5. 类型判断

·    x instanceof Integer

## 14.2.  RTTI

### 14.2.1. 含义

·    RunTime Type Info

·    运行时，识别对象的类型（多态）

·    编译时打开和检查.class文件

### 14.2.2. 好处

·    代码只操纵基类的引用

·    方便扩展程序

## 14.3.  反射

public class RT {<br> public static int a = 10;<br> <br> public void say(int a, String s) {<br>  System.out.println(a);<br>  System.out.println(s);<br> }<br> <br> public void run() {<br>  System.out.println("Hello, run()");...

### 14.3.1. 运行时加载类

·    磁盘中的文件

·    网络中的一串字节

### 14.3.2. java.lang.reflect

·    Field

·    Method

•   invoke调用

·    Constructor

### 14.3.3. 动态代理

·    中间人→额外的操作

·    Java的动态代理

  @Override<br>  public Object invoke(Object proxy, Method method, Object[] args) throws Throwable {<br>    return null;<br>  }

•   动态创建代理

•   动态处理代理方法的调用

•   所有调用→单一的调用处理器

### 14.3.4. 代码耦合度，超过你的期望

# 15. 第15章 泛型

## 15.1.  引入原因

### 15.1.1. 多态

·    方法的参数是接口

·    但是必须满足特定的接口

### 15.1.2. 泛型

·    更通用→某种不确定的类型（接口）

·    参数化类型（容器类）

## 15.2.  泛型

### 15.2.1. 简单泛型

·    指定容器要持有什么类型

·    编译器→保证类型的正确性

·    元组类库

•   一次方法调用，返回多个对象

•   一个对象→持有多个对象

### 15.2.2. 泛型接口

·    生成器，创建对象的类

### 15.2.3. 泛型方法

public class HelloWorld {<br>  public <<T> void f(T x) {<br>    System.out.println(x.getClass().getName());<br>  }<br>  <br>  public static void main(String[] args) {<br>    HelloWorld helloWorld = new HelloWorld();<br>    helloWorld.f("");<br>    helloWorld.f(4);<br>    helloWorld.f(4.0);...

·    泛型参数列表→返回值前

·    尽量使用泛型方法

## 15.3.  擦除

### 15.3.1. 在泛型代码内部，无法获得任何有关泛型参数类型的信息

### 15.3.2. 泛型→具体类型信息→被擦除

## 15.4.  边界

### 15.4.1. 泛型的参数类型→设置限制条件

### 15.4.2. <T extends HasF>

·    限制为HasF的类型子集

### 15.4.3. <? super T>

·    超类型通配符（参数是下界）

·    某个特定类的任何基类

### 15.4.4. <?>

·    无界通配符

# 16. 第16章 数组

## 16.1.  为什么特殊？

### 16.1.1. 效率

·    存储和随机访问对象引用序列

·    简单的线性序列

·    效率最高

### 16.1.2. 类型

### 16.1.3. 保存基本类型

·    泛型之前的容器不能

## 16.2.  优先使用容器

### 16.2.1. 更多的功能

### 16.2.2. 编译期类型检查

### 16.2.3. 效率已经不是问题

## 16.3.  Arrays

### 16.3.1. fill()

·    填充各个位置

### 16.3.2. System.arraycopy()

·    复制数组

·    比for循环快很多

### 16.3.3. equals()

·    比较整个数组

•   元素个数

•   对应位置的元素

### 16.3.4. sort()

·    排序算法

•   基本类型

•   快速排序

•   引用类型

•   稳定归并排序

·    对象比较的方式

•   java.lang.Comparable接口

•   编写自己的Comparator

•   比较

•   当前对象<参数

•   负值

•   =

•   0

•   当前对象>参数

•   正值

### 16.3.5. binarySearch()

·    排序数组→快速查找

# 17. 第17章 容器深入研究

## 17.1.  填充容器

### 17.1.1. Collections.nCopies()

### 17.1.2. Collections.addAll()

## 17.2.  Set和存储顺序

### 17.2.1. Set

·    每个元素—唯一

·    元素必须定义equals()

### 17.2.2. HashSet

·    元素必须定义hashCode()

### 17.2.3. TreeSet

·    保持次序的set，底层为树结构

·    元素必须实现Comparable接口

·    方法

•   first()

•   返回容器的第一个元素

•   last()

•   返回容器的最末一个元素

•   subSet(from, to)

•   Set的子集

•   headSet(to)

•   <to的Set子集

•   tailSet(from)

•   ≥from的Set子集

### 17.2.4. LinkedHashSet

·    内部使用链表维护插入的次序

·    元素必须定义hashCode()

## 17.3.  理解Map

### 17.3.1. 实现

·    HashMap

•   构造器（调整容器性能）

•   容量

•   负载因子

·    TreeMap

•   基于红黑树的实现

•   方法

•   firstKey()

•   lastKey()

•   subMap()

•   fromKey()

•   headMap()

•   tailMap()

·    LinkedHashMap

•   取得顺序是插入顺序

·    WeakHashMap

•   “弱键”，允许释放映射所指向的对象

•   如果映射外没有引用指向键，则键可以被GC

·    ConcurrentHashMap

•   线程安全

•   不涉及同步加锁

·    IdentityHashMap

### 17.3.2. 性能

·    散列码

•   相对唯一，代表对象的int值

•   将对象的某些信息转换而成

•   散列Map，必须实现

## 17.4.  equals()和hashCode()

### 17.4.1. 覆盖equals()，总是同时覆盖hashCode()

### 17.4.2. hashCode()不需要返回唯一的标识码

### 17.4.3. equals()方法必须严格判断两个对象是否相同

## 17.5.  散列与散列码

### 17.5.1. Object

·    hashCode()

•   使用对象的地址计算散列码

·    equals()

•   比较对象的地址

### 17.5.2. equals()

·    自反性

•   x.equals(x)=true

·    对称性

•   y.equals(x)=true→x.equals(y)=true

·    传递性

•   x.equals(y)=true,y.equals(z)=true→x.equals(z)=true

·    一致性

•   无论比较对少次，结果都是一样的

·    x!=null→x.equals(null)=false

### 17.5.3. 理解hashCode()

·    目的

•   用一个对象→查找另一个对象

•   键对象→生成数字（散列码）→数组下标

•   bucket：实际散列表的数组命名

·    冲突

•   equals()方法→线性查询

·    put()

•   针对键hashCode()，转换取模

•   数组的对应位置

•   null

•   创建新的LinkedList

•   非null

•   list是否有相同元素

•   有→替换value

•   没有→添加到list末尾

·    get()

•   同put()

### 17.5.4. 覆盖hashCode()

·    why?

•   无论何时，对同一个对象调用hashCode()→相同值

•   hashCode()→处理→桶位下标

·    how?

•   不能依赖易变的数据

•   数据变化→不同散列码

•   不能依赖具有唯一性的对象信息(this)

•   Apache库自动生成

## 17.6.  HashMap性能因子

### 17.6.1. 容量

·    桶位数

### 17.6.2. 初始容量

·    创建时拥有的桶位数

### 17.6.3. 尺寸

·    当前存储的项数

### 17.6.4. 负载因子

·    尺寸/容量

•   空表

•   0

•   半满表

•   0.5

·    >负载因子，容器自动增加容量，再散列

·    构造器可以指定，默认0.75

## 17.7.  同步控制

### 17.7.1. 自动同步整个容器

·    synchronizedList()

### 17.7.2. 快速报错

 public static void main(String[] args) {<br>  Collection<<String> c = new ArrayList<<>();<br>  Iterator<<String> iterator = c.iterator();<br>  c.add("hello");<br>  try {<br>   iterator.next();<br>  } catch (Exception e) {<br>   // TODO: handle exception<br>   System.out.println(e);<br>  }...

·    防止多进程同时修改同一容器

## 17.8.  持有引用

### 17.8.1. 引用

·    SoftReference

•   内存敏感的高速缓存

·    WeakReference

•   规范映射，不影响GC回收

•   对象的实例可以在程序多处同时使用，节省空间

·    PhantomReference

•   调度回收前的清理工作

### 17.8.2. WeakHashMap

·    保存WeakReference

·    value只保存一份实例→节省存储空间

## 17.9.  Java 1.0/1.1 的容器

### 17.9.1. Vector

### 17.9.2. Hashtable

### 17.9.3. Stack

### 17.9.4. BitSet

# 18. 第18章 Java I/O系统

## 18.1.  概述

### 18.1.1. 源端-接收端

·    文件

·    控制台

·    网络连接

### 18.1.2. 通信方式

·    顺序

·    随机存取

·    缓冲

·    二进制

·    按字符

·    按行

·    按字

## 18.2.  File类

### 18.2.1. 表示

·    特定文件的名称

·    一个目录下的一组文件的名称

## 18.3.  输入和输出

### 18.3.1. 流

·    有能力产出数据的数据源对象

·    有能力接收数据的接收端对象

### 18.3.2. Java

·    输入

•   InputStream或Reader派生

•   read()

·    输出

•   OutputStream或Writer派生

•   write()

·    叠合多个对象→期望功能

### 18.3.3. InputStream

·    作用

•   表示从不同数据源产生输入的类

·    途径

•   字节数组

•   String对象

•   文件

•   管道

•   Internet连接

·    类型

•   ByteArrayInputStream

•   内存的缓冲区

•   StringBufferInputStream

•   String

•   FileInputStream

•   文件读取信息

•   PipedInputStream

•   SequenceInputStream

•   两个或多个InputStream合并为单一

•   FilterInputStream

•   抽象类

### 18.3.4. OutputStream

·    作用

•   输出所要去往的目标

·    目标

•   字节数组

•   文件

•   管道

·    类型

•   ByteArrayOutputStream

•   内存创建缓冲区

•   所有送往“流”的数据，都放于此

•   FileOutputStream

•   信息写至文件

•   PipedOutputStream

•   FilterOutputStream

•   抽象类

## 18.4.  添加属性和接口

### 18.4.1. FilterInputStream从InputStream读取数据

·    DataInputStream

·    BufferedInputStream

·    LineNumberInputStream

·    PushbackInputStream

### 18.4.2. FilterOutputStream向OutputStream写入

·    DataOutputStream

·    PrintStream

•   格式化输出

·    BufferedOutputStream

## 18.5.  Reader和Writer

### 18.5.1. InputStream和OutputStream

·    面向字节

·    8位，byte

### 18.5.2. Reader和Writer

·    面向字符

·    兼容Unicode

### 18.5.3. 信息的来源和去处

·    InputStream

•   Reader

•   适配器

•   InputStreamReader

·    OutputStream

•   Writer

•   适配器

•   OutputStreamWriter

·    FileInputStream

•   FileReader

·    FileOutputStream

•   FileWriter

·    ByteArrayInputStream

•   CharArrayReader

·    ByteArrayOutputStream

•   CharArrayWriter

·    PipedInputStream

•   PipedReader

·    PipedOutputStream

•   PipedWriter

## 18.6.  I/O流的典型使用

### 18.6.1. 缓冲输入文件

public class HelloWorld {<br>  public static void main(String[] args) {<br>    try {<br>      BufferedReader in = new BufferedReader(new FileReader(<br>          new File("/Users/yano/code/HelloWorld/src/HelloWorld.java")));<br>      String s;<br>      while ((s=in.readLine()) != null) {<br>        System.out.println(s);<br>      }<br>      in.close();...

### 18.6.2. 基本的文件输出

public class HelloWorld {<br>  public static void main(String[] args) {<br>    try {<br>      BufferedReader in = new BufferedReader(new FileReader(<br>          new File("/Users/yano/code/HelloWorld/src/HelloWorld.java")));<br>      PrintWriter out = new PrintWriter(new BufferedWriter(<br>          new FileWriter("/Users/yano/code/HelloWorld/src/1.txt")));<br>      String s;<br>      while ((s=in.readLine()) != null) {<br>        out.println(s);...

## 18.7.  标准I/O

### 18.7.1. 标准输入

·    System.in

•   未加工的InputStream

### 18.7.2. 标准输出

·    System.out

•   printStream对象

### 18.7.3. 标准错误

·    System.err

•   printStream对象

## 18.8.  进程控制

### 18.8.1. Java内部→其他操作系统程序

### 18.8.2. OSExecute.command()

·    传递command字符串

## 18.9.  新I/O

### 18.9.1. JDK 1.4

### 18.9.2. 速度提高

·    通道、缓冲器

### 18.9.3. 修改类

·    FileInputStream

·    FileOutputStream

·    RandomAccessFile

## 18.10.压缩

### 18.10.1. 属于InputStream和OutputStream继承层次

### 18.10.2. 压缩类库按字节方式，不是字符方式

### 18.10.3. Java档案文件

·    JAR

•   Java ARchive

•   一组文件→单个压缩文件

•   跨平台

•   压缩，传输时间短

•   向服务器发一次请求

## 18.11.对象序列化

### 18.11.1. 意义

·    创建对象，程序终止时，保存状态

·    自动弥补操作系统的差异

### 18.11.2. 方法

·    实现Serializable接口

·    对象→字节序列

·    字节序列→原来的对象

### 18.11.3. 轻量级持久化

·    对象必须显式序列化

·    显式反序列化

### 18.11.4. 支持特性

·    远程方法调用RMI

•   存活于其他计算机的对象

•   像存活于本机一样

·    Java Beans

•   配置状态信息

### 18.11.5. 方法

import java.io.Serializable;<br><br>public class Alien implements Serializable{<br><br>  /**<br>   * <br>   */<br>  private static final long serialVersionUID = -909669434587202448L;<br>  <br>  private int i;...

·    序列化

public class HelloWorld {<br>  public static void main(String[] args) throws FileNotFoundException, IOException {<br>    ObjectOutput out = new ObjectOutputStream(new FileOutputStream("a.file"));<br>    Alien alien = new Alien(2, "hello~");<br>    out.writeObject(alien);<br>  }<br>}

•   创建OutputStream对象

•   封装在ObjectOutputStream对象中

•   调用writeObject()即可对象序列化

·    反序列化

public class ThawAlien {<br>  public static void main(String[] args) throws FileNotFoundException, IOException, ClassNotFoundException {<br>    ObjectInputStream in = new ObjectInputStream(new FileInputStream("a.file"));<br>    Alien readObject = (Alien) in.readObject();<br>    System.out.println(readObject.getI());<br>    System.out.println(readObject.getString());<br>  }<br>}

•   将InputStream封装在ObjectInputStream内

•   调用readObject()

### 18.11.6. transient关键字

·    特定子对象，不想Java序列化保存

·    逐个字段关闭序列化

·    只能和Serializable对象配合使用

## 18.12.XML

### 18.12.1. 对象序列化限制

·    仅是Java的解决方案

·    只有Java程序能反序列化这种对象

### 18.12.2. 优点

·    跨平台

·    跨语言

## 18.13.Preferences

### 18.13.1. key-value数据集合

·    基本类型

·    字符串

·    单个字符串长度<8K

### 18.13.2. 应用

·    存储和读取用户的偏好

·    程序配置项的设置

### 18.13.3. 数据存储位置

·    不是本地文件

·    使用合适的系统资源

•   Windows的注册表

# 19. 第19章 枚举类型

## 19.1.  简介

### 19.1.1. 具名的值的有限集合→新的类型

### 19.1.2. 作为常规的程序组件使用

## 19.2.  基本enum特性

### 19.2.1. values()

·    enum实例的数组

### 19.2.2. ordinal()

·    enum实例在声明时的次序

·    从0开始

### 19.2.3. name()

·    实例声明的名字

## 19.3.  向enum添加新方法

### 19.3.1. 定义方法时，enum实例序列最后要加分号

### 19.3.2. enum不能被继承，剩下就像普通类

## 19.4.  使用接口组织枚举

### 19.4.1. 在接口内部，创建实现该接口的枚举→枚举分组

## 19.5.  常量相关的方法

### 19.5.1. 为enum实例编写方法→不同的行为

public enum SpecificMethod {<br>  DATE_TIME {<br>    @Override<br>    String getInfo() {<br>      return "date_time";<br>    }<br>  },<br>  VERSION {<br>    @Override<br>    String getInfo() {...

# 20. 第20章 注解

http://www.cnblogs.com/peida/archive/2013/04/26/3038503.html

注解提供了一种结构化的，具有类型检查能力的新途径，从而使得程序员能够为代码加入元数据，而不会导致代码杂乱且难以阅读。使用注解能够帮助我们避免编写累赘的部署描述文件，以及其他生成的文件。

## 20.1.  概述

### 20.1.1. 元数据、源代码文件结合在一起

### 20.1.2. 有关程序的额外信息

## 20.2.  优点

### 20.2.1. 减轻编写“样板”代码的负担

### 20.2.2. 更加干净易读的代码

### 20.2.3. 编译期类型检查

## 20.3.  内置注解

### 20.3.1. @Override

·    当前方法覆盖超类的方法

### 20.3.2. @Deprecated

·    使用该元素，会发出警告

### 20.3.3. @SuppressWarnings

·    关闭不当的编译期警告信息

## 20.4.  元注解

### 20.4.1. 专门负责创建新的注解

### 20.4.2. @Target

·    表示注解可以用在什么地方

·    ElementType

•   CONSTRUCTOR

•   构造器声明

•   FIELD

•   域声明

•   LOCAL_VARIABLE

•   局部变量声明

•   METHOD

•   方法声明

•   PACKAGE

•   包声明

•   PARAMETER

•   参数声明

•   TYPE

•   类、接口（包括注解类型）或enum声明

### 20.4.3. @Rectetion

·    在什么级别保存注解信息

·    RetentionPolicy

•   SOURCE

•   注解被编译期丢弃

•   CLASS

•   注解在class文件中可用，但会被VM丢弃

•   RUNTIME

•   VM运行期也保留注解

•   可用通过反射机制读取注解信息

### 20.4.4. @Documented

·    注解包含在Javadoc中

### 20.4.5. @Inherited

·    允许子类继承父类中的注解

## 20.5.  提取注解

### 20.5.1. 已知实现类

·    Class：类定义

·    Constructor：构造器定义

·    Field：累的成员变量定义

·    Method：类的方法定义

·    Package：类的包定义

### 20.5.2. 方法

·     getAnnotation:返回元素上指定类型的注解，如果该类型注解不存在，则返回null。

·    getAnnotations():返回该程序元素上存在的所有注解。

·    isAnnotationPresent:判断该程序元素上是否包含指定类型的注解，存在则返回true，否则返回false.

·    getDeclaredAnnotations():返回存在于此元素的所有注解

## 20.6.  注解处理器

### 20.6.1. 读取注解的工具

# 21. 第21章 并发

## 21.1.  并发的多面性

### 21.1.1. 并发方式

·    进程

•   操作系统级别

•   进程相互隔离

·    线程

•   Java支持

•   抢占式

调度机制会周期性地中断线程，将上下文切换到另一个线程，从而为每个线程都提供时间片，使得每个线程都会分配到数量合理的时间驱动任务。

### 21.1.2. 更快的执行

·    多处理器、多个任务→提高吞吐量

·    ↑运行在单处理器上的程序性能

•   阻塞

## 21.2.  基本的线程机制

### 21.2.1. 定义任务

package Concurrency;<br><br>public class LiftOff implements Runnable{<br>  <br>  protected int countDown = 10;<br>  private static int taskCount = 0;<br>  private final int id = taskCount++;<br>  <br>  public LiftOff() {<br>  }...

·    实现Runnable接口，编写run()方法

### 21.2.2. Thread类

package Concurrency;<br> <br>public class BasicThreads {<br> <br> public static void main(String[] args) {<br>  for (int i = 0; i << 5; i++) {<br>   new Thread(new LiftOff()).start();<br>  }<br>  System.out.println("Waiting for LiftOff");<br> }...

·    Runnable对象→Thread构造器

·    线程调度机制是非确定性的

•   早期JDK不会频繁对时间切片

### 21.2.3. 使用Executor

·    客户端和任务执行间的间接层

·    允许管理异步执行的任务，无需显式管理线程的生命周期

·    shutdown()

•   防止新任务提交给Executor

•   当前线程继续允许之前提交的所有任务

·    newCachedThreadPool

package Concurrency;<br> <br>import java.util.concurrent.ExecutorService;<br>import java.util.concurrent.Executors;<br> <br>public class CachedThreadPool {<br> <br> public static void main(String[] args) {<br>  ExecutorService exec = Executors.newCachedThreadPool();<br>  for (int i = 0; i << 5; i++) {...

•   为每个任务创建一个线程

·    newFixedThreadPool

package Concurrency;<br><br>import java.util.concurrent.ExecutorService;<br>import java.util.concurrent.Executors;<br><br>public class FixedThreadPool {<br>  public static void main(String[] args) {<br>    ExecutorService exec = Executors.newFixedThreadPool(5);<br>    for (int i = 0; i << 5; i++) {<br>      exec.execute(new LiftOff());...

•   预先执行代价高昂的线程分配

·    newSingleThreadExecutor

package Concurrency;<br><br>import java.util.concurrent.ExecutorService;<br>import java.util.concurrent.Executors;<br><br>public class SingleThreadExecutor {<br>  public static void main(String[] args) {<br>    ExecutorService exec = Executors.newSingleThreadExecutor();<br>     for (int i = 0; i << 5; i++) {<br>      exec.execute(new LiftOff());...

•   多个任务将排队

•   任务会顺序执行

•   所有任务使用相同的线程

•   序列化任务，不需要同步共享资源

### 21.2.4. 从任务中产生返回值

package Concurrency;<br> <br>import java.util.concurrent.Callable;<br> <br>public class TaskWithResult implements Callable<<String>{<br> <br> private int id;<br> public TaskWithResult(int id) {<br>  this.id = id;<br> }...

·    Runnable不返回任何值

·    实现Callable接口

•   call()

•   ExecutorService.submit()调用

•   Future对象

### 21.2.5. 休眠

package Concurrency;<br><br>import java.util.concurrent.ExecutorService;<br>import java.util.concurrent.Executors;<br>import java.util.concurrent.TimeUnit;<br><br>public class SleepingTask extends LiftOff{<br>  @Override<br>  public void run() {<br>     try {...

·    sleep()

•   InterruptedException

### 21.2.6. 优先级

·    线程的重要性→调度器

·    JDK 10个优先级

·    Windows 7个且不固定

·    只使用

•   MAX_PRIORITY

•   NORM_PRIORITY

•   MIN_PRIORITY

### 21.2.7. 让步

·    yield()

### 21.2.8. 后台(daemon)线程

·    在后台提供通用服务

·    不是程序中不可或缺的部分

·    所有非后台线程结束后，会杀死进程的所有后台线程

·    setDaemon()

### 21.2.9. 加入一个线程

·    join()

## 21.3.  共享受限资源

并发使得两个或多个线程彼此相互干涉的问题出现了。

### 21.3.1. 不正确地访问资源

·    EvenChecker

package Concurrency;<br><br>import java.util.concurrent.ExecutorService;<br>import java.util.concurrent.Executors;<br><br>public class EvenChecker implements Runnable{<br>  <br>  private IntGenerator generator;<br>  private final int id;<br>  ...

•   消费者任务

·    IntGenerator

package Concurrency;<br><br>public abstract class IntGenerator {<br>  // 为了保证可视性，canceled是volatile<br>  private volatile boolean canceled = false;<br>  public abstract int next();<br>  public void cancel() {canceled = true;}<br>  public boolean isCanceled() {return canceled;}<br>}

·    EvenGenerator

package Concurrency;<br><br>// 此类是共享资源<br>public class EvenGenerator extends IntGenerator{<br>  <br>  private int currentEvenValue = 0;<br><br>  @Override<br>  public int next() {<br>    ++currentEvenValue;// 递增不是原子性的！...

### 21.3.2. 解决共享资源竞争

·    why

•   你永远都不知道一个线程何时在运行

想象一下，你坐在桌边手拿叉子，正要去叉盘中的最后一片食物，当你的叉子就要够着它时，这片食物突然消失了，因为你的线程被挂起了，而另一个就餐者进入并吃掉了它。这正是在你编写并发编程时要处理的问题。对于并发，必须采取某种手段，防止两个任务访问相同的资源。

·    对资源加锁

考虑一下屋子里的浴室：多个人（多个由线程驱动的任务）都希望能单独使用浴室（共享资源）。为了使用浴室，一个人先敲门，看看是否能进入。如果没人，他就进入浴室并锁上门。这时其他人要使用浴室，就会被“阻挡”，所以他们要在浴室门口等待，直到浴室可以使用。

•   序列化访问共享资源

•   互斥量-mutex

•   synchronized

•   流程

•   检查锁是否可用

•   获取锁

•   执行代码

•   释放锁

•   特定对象

•   所有方法共享一个锁

•   每个类

•   syn static 方法共享

•   一个任务可以多次获得对象的锁

·    同步控制EvenGenerator

package Concurrency;<br><br>public class SynEvenGenerator extends IntGenerator{<br>  <br>  private int currentEvenValue = 0;<br><br>  @Override<br>  public synchronized int next() {<br>    ++currentEvenValue;<br>    ++currentEvenValue;...

·    显式的Lock对象

package Concurrency;<br><br>import java.util.concurrent.locks.Lock;<br>import java.util.concurrent.locks.ReentrantLock;<br><br>public class MutexEvenGenerator extends IntGenerator{<br>  <br>  private int currentEvenValue = 0;<br>  private Lock lock = new ReentrantLock();<br>...

•   代码缺乏优雅性

•   更加灵活

•   更细粒度的控制

### 21.3.3. 原子性与易变性

·    原子性

•   原子操作不能被线程调度机制中断

•   应用中的可视性

•   对volatile域修改

•   所有读操作能立刻看到修改

•   long和double

•   两个分离的32位操作

•   字撕裂

·    volatile

•   告诉编译器，不要执行任何读取和写入操作的优化

•   读取和写入直接针对内存，不被缓存

·    反例

package Concurrency;<br><br>import java.util.concurrent.ExecutorService;<br>import java.util.concurrent.Executors;<br><br>public class AtomicityTest implements Runnable{<br>  <br>  private int i = 0;<br>  public int getValue() {return i;};<br>  private synchronized void evenIncrement() {...

### 21.3.4. 原子类

·    AtomicInteger

·    AtomicLong

·    AtomicReference

·    compareAndSet(exp, update)

### 21.3.5. 临界区

·    同步方法内部的部分代码，不是整个方法

·    synchronized指定某个对象，锁用来对花括号内的代码同步

·    （互斥量是同步整个方法）

### 21.3.6. ThreadLocal

http://www.importnew.com/17849.html

·    根除对变量的共享

·    为相同变量的不同线程，创建不同存储

·    状态↔线程

·    代码

package Concurrency;<br><br>import java.util.Random;<br>import java.util.concurrent.ExecutorService;<br>import java.util.concurrent.Executors;<br>import java.util.concurrent.TimeUnit;<br><br>public class ThreadLocalVariableHolder {<br>  private static ThreadLocal<<Integer> value = <br>      new ThreadLocal<<Integer>() {...

## 21.4.  终结任务

### 21.4.1. 在阻塞时终结

·    线程状态

•   new 新建

•   Runnable 就绪

•   Blocked 阻塞

•   有某个条件阻止线程运行

•   调度器忽略线程

•   Dead 死亡

·    进入阻塞状态

•   调用sleep()

•   调用wait()线程挂起

•   等待某个输入/输出完成

•   试图在某对象调用同步方法，但对象锁不可用

### 21.4.2. 中断

·    interrupt()

•   Executor-shutdownNow()

•   Executor.submit()返回Future<?>，可调用cancel()

## 21.5.  线程间的协作

### 21.5.1. 概述

·    互斥-解决资源共享问题

·    协作-多个任务一起工作，解决某个问题

·    任务之间的握手

### 21.5.2. wait()和notifyAll()

·    wait()

•   等待某个条件发生变化，这个变化由另一任务实现

•   挂起线程，对象上的锁释放

•   sleep()和yield()没有释放锁！

•   将任务挂起，只有在notify()或notifyAll()才被唤醒

·    notify()

•   通知对象x

synchronized(x) {<br>  x.notifyAll();<br>}

•   众多等待同一个锁的任务，只有一个被唤醒

### 21.5.3. 错失的信号

·    死锁

### 21.5.4. 生产者与消费者

·    Chef

package Concurrency;<br><br>import java.util.concurrent.TimeUnit;<br><br>public class Chef implements Runnable{<br>  <br>  private Restaurant restaurant;<br>  private int count = 0;<br>  <br>  public Chef(Restaurant r) {...

•   生产者

·    WaitPerson

package Concurrency;<br><br>public class WaitPerson implements Runnable{<br>  <br>  private Restaurant restaurant;<br>  public WaitPerson(Restaurant r) {<br>    restaurant = r;<br>  }<br><br>  @Override...

•   消费者

·    Meal

package Concurrency;<br><br>public class Meal {<br>  private final int orderNum;<br>  public Meal(int orderNum) {<br>    this.orderNum = orderNum;<br>  }<br>  @Override<br>  public String toString() {<br>    return "Meal " + orderNum;...

·    Restaurant

package Concurrency;<br><br>import java.util.concurrent.ExecutorService;<br>import java.util.concurrent.Executors;<br><br>// WaitPerson和Chef的焦点<br>public class Restaurant {<br>  Meal meal;<br>  ExecutorService exec = Executors.newCachedThreadPool();<br>  WaitPerson waitPerson = new WaitPerson(this);...

### 21.5.5. 生产者-消费者与队列

·    wait()和notifyAll()是低级的任务操作，每次交互都握手

·    更高的抽象级别-同步队列

·    BlockingQueue

•   同一时刻只允许一个任务插入或删除元素

### 21.5.6. 任务间使用管道输入/输出

·    PipedWriter

·    PipedReader

## 21.6.  死锁

### 21.6.1. 哲学家就餐

5个人，5根筷子，每个人2根筷子才能吃饭，但是一人只拿了1根

·    Chopstaicks

package Concurrency;<br><br>public class Chopstick {<br>  private boolean taken = false;<br>  <br>  public synchronized void take() throws InterruptedException {<br>    while (taken) {<br>      wait();<br>    }<br>    taken = true;...

·    Philosopher

package Concurrency;<br><br>import java.util.Random;<br>import java.util.concurrent.TimeUnit;<br><br>public class Philosopher implements Runnable{<br>  <br>  private Chopstick left;<br>  private Chopstick right;<br>  private final int id;...

·    DeadlockingDining

package Concurrency;<br><br>import java.util.concurrent.ExecutorService;<br>import java.util.concurrent.Executors;<br><br>public class DeadLockingDining {<br>  public static void main(String[] args) {<br>    int ponder = 0;<br>    int size = 5;<br>    ExecutorService exec = Executors.newCachedThreadPool();...

### 21.6.2. 死锁条件

·    互斥条件

•   任务的资源至少有一个是不能共享的（筷子）

·    持有资源

•   一个任务持有一个资源，等待另一个资源

·    资源不能被任务抢占

·    循环等待

## 21.7.  新类库中的构件

### 21.7.1. CountDownLatch

·    同步一个或多个任务，强制它们等待由其他任务执行的一组操作

### 21.7.2. CyclicBarrier

·    一组任务并行执行，在进行下一个步骤前等待，直至所有任务都完成

·    所有的并行任务在栅栏处列队，一致地向前移动

### 21.7.3. DelayQueue

·    无界的BlockingQueue，放置实现了Delayed的接口对象

·    对象只能在到期时才能从队列取走

### 21.7.4. PriorityBlockingQueue

·    优先级队列，具有可阻塞的读取操作

### 21.7.5. Exchanger

·    两个任务交换对象的栅栏

## 21.8.  性能调优

### 21.8.1. 免锁容器

·    原理

•   对容器的修改可以与读取操作同时发生，只要读取者只能看到完成修改的结果

•   修改在容器数据结果的副本执行，在修改过程中不可视

·    CopyOnWriteArrayList

·    CopyOnWriteArraySet

·    ConcurrentHashMap

·    ConcurrentLinkedQueue

### 21.8.2. 乐观加锁

·    保持数据未锁定状态

### 21.8.3. ReadWriteLock

·    优化不频繁写入，但多个任务经常读取的数据结构

·    如果写锁被持有，任何读取者都不能访问

## 21.9.  总结

### 21.9.1. 线程好处

·    轻量级的执行上下文切换（大约100条指令）

·    进程需要上千条指令，并改变所有内存空间

·    而线程只改变程序的执行序列和局部变量

### 21.9.2. 多线程缺点

·    等待共享资源时，性能↓

·    处理线程，额外CPU

·    糟糕的程序设计，导致不必要的复杂度

·    病态行为：竞争、死锁

·    不同平台导致的不一致性