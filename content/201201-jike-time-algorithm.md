---
title: 'Jike Time Algorithm'
date: 2021-02-20T15:27:13+08:00
draft: true
dropcap: false
tags:
- Algorithm
---

来源于极客大学网课.

<!--more-->

## PREFACE

- Chunk it up 切碎知识点
- Deliberate Practicing 刻意练习
  - **职业化运动**: **基本功是区别业余和职业选手的根本**
  - 基础动作的分解训练和反复练习 —> 最大的误区
  - 刻意练习 — 过遍数（五毒神掌）
    - 5分钟：读题 + 思考 + 直接看解法：注意！多解法，比较解法优劣 + 背诵、默写好的解法
    - 马上自己写 —> LeetCode 提交 + 多种解法比较、体会 —> 优化
    - 过了一天后，再重复做题 + 不同解法的熟练程度 —> 专项练习
    - 过了一周：反复回来练习相同题目
    -  面试前一周恢复性训练
  - 练习缺陷、弱点地方
  - 不舒服、不爽、枯燥
- Feedback 反馈
  - 即时反馈
  - 主动型反馈（自己去找）
  - 高手代码 (GitHub, LeetCode, etc.)
  - 第一视角直播
  - 被动式反馈（高手给你指点）
  - code review
  - 教练看你打，给你反馈
- 切题四件套
  - Clarification
  - Possible solutions
    - compare (time/space)
    - optimal（加强）
  - Coding（多写）
  - Test cases


> 给的建议也是让我们快速的练习，而不是从零到有，我觉得不好，但是又想不出下文。



- 断点继传法
- 对照阅读法
- 教学视频法
- 书看不懂时，不硬看，扫清障碍，咱再来……
- 多找几本书，对照着看……
- 先看教学视频入门，再看书


## 时空复杂度

- [数学分析](https://www.zhihu.com/question/21387264/answer/417321105)
- Google
- Mac: iTerm2 + zsh (oh my zsh)
- Windows: Microsoft new terminal: (https://github.com/microsoft/terminal)
- VSCode; Java: IntelliJ; Python: Pycharm
- VSCODE 美化
  - [Vscode Themes](https://vscodethemes.com/)
  - [Macbook 毛玻璃效果教程](https://juejin.im/post/5ce1365151882525ff28ed47)
- LeetCode plugin (VSCode & IntelliJ)
- Code Style
  - Google code style
  - Facebook
  - Airbnb
- LeetCode
  - leetcode-cn.com 和 题解
  - leetcode.com 和 Discuss board

- ⾃顶向下的编程⽅式
  - https://markhneedham.com/blog/2008/09/15/clean-codebook-review/
  - https://leetcode-cn.com/problems/valid-palindrome

- Big O notation: 只看最⾼复杂度的运算
  - O(1): Constant Complexity 常数复杂度
  - O(log n): Logarithmic Complexity 对数复杂度
  - O(n): Linear Complexity 线性时间复杂度
  - O(n^2^): N square Complexity 平⽅
  - O(n^3^): N square Complexity ⽴⽅
  - O(2^n^): Exponential Growth 指数
  - O(n!): Factorial 阶乘
- Master Theorem
  - More In [Wikipedia](https://en.wikipedia.org/wiki/Master_theorem_(analysis_of_algorithms))
- N/NP/NPC/NP-Hard<sup>[1](#j1)</sup>

> 解决数独难题的问题。 快速检查解决方案非常容易（即，给了您一个解决方案，您要做的就是扫描行，列和3 x 3的单元格以表明它是有效的解决方案：1、2，…中的每个…  ，9必须发生一次），但是从头开始寻找解决方案可能会花费更长的时间。 时至今日，我们所知道的解决数独难题的最佳方法实质上就是系统地尝试所有可能性。 因此，我们可以说“ **找到问题的解决方案比检查解决方案难** ” [From](https://www.quora.com/What-are-P-NP-NP-complete-and-NP-hard)

  - N: 可以轻松解决(多项式时间内)的一类问题称为P问题
  - NP: 可以轻松验证(多项式时间内)的一类问题称为NP问题
    - **所有P问题都是NP问题, 换句话说，可以轻松解决的NP问题（可以轻松验证的问题）称为P问题**
    - 如果证明每个NP问题都可以轻松解决，则会导致事实 **P = NP**; 如果 **任何**  NP问题都可以证明不容易解决，那么就意味着至少有一个不容易解决的问题。NP-P部分中至少存在一个问题。 这将证明 **P！= NP**.
  - NP-Hard: 问题X应该与每个NP问题一样困难，因此使X的简单解决方案将为每个NP问题提供简单的解决方案
  - NPC(NP-Complete): NP问题之一与NP中的所有其他难题一样困难，解决该问题将解决所有NP问题。 

![](https://dandelionfs.oss-cn-beijing.aliyuncs.com/p_np_npc.png)




## 数组、链表、跳表

- **Array**
    ```cpp
    int a[100];    //Java/C++
    list = []      //Python
    let x=[1,2,3]  //JavaScript
    ```
    - 泛化语言类型: 任何一个单元类型都可以放进去
    - 内存管理器(Memory Controller) -- 删除/插入
    - o(1)+o(n)=o(n+1/2);
    - java 自动内存回收机制。
    ```cpp
    prepend		o(1)
    append 		o(1)
    lookup		o(1)
    insert 		o(n)
    delete		o(n)
    ```
- **Linked List**
    Head Tail 

    java的next指针是引用

    双向链表

    循环链表

    ```java
    Entry<T>
    ```

    java的链表是双向链表

    slide

    ```cpp
    prepend 	o(1)//增加
    append 		o(1)
    lookup		o(n)
    insert 		o(1)
    delete		o(1)
    ```
- **Skip LIst**

    Redis

    升维思想——空间换时间

    添加第一级索引

    添加二级索引

    增加log2n个级索引

    64（2^6）个元素(log2n-1)

    ```
    n/2、n/4、n/8、第k级索引结点的个数就是n/（2k）
    假设索引有h级，最高级的索引有2个结点。n/（2h）=2，从而求得h=log2（n）-1
    ```

    维护成本高

    n*(1-1/2^n)<n



    LRU Cache - Linked list
    
    https://www.jianshu.com/p/b1ab4a170c3c 
    
    https://leetcode-cn.com/problems/Iru-cache



    Redis - Skip - List 
    
    https://redisbook.readthedocs.io/en/latest/internal-datastruct/skiplist.html 
    
    https://www.zhihu.com/question/20202931











### Fibonacci

斐波纳契数列以如下被以递归的方法定义：F(0)=0，F(1)=1, F(n)=F(n-1)+F(n-2)(n>=2，n∈N*), 给定一个正整数n，求出斐波那契数列第n项

n<40时, 尚可通过递归得出;也可以通过数组剪枝;但是仍然可以用线性代数的思想优化<sip>[2](#j2)</sup>, 线性代数思路如下.

![](https://dandelionfs.oss-cn-beijing.aliyuncs.com/fibonacci_linear_algebra.png)

可以结合快速幂算法降低到 O(log2n)











## 栈、队列、优先队列、双端队列
练习
1. https://leetcode-cn.com/problems/container-with-most-water/
2. https://leetcode-cn.com/problems/move-zeroes/
3. https://leetcode-cn.com/problems/climbing-stairs/
4. https://leetcode-cn.com/problems/3sum/（高频老题）



Stack：先入后出；添加、删除皆为o（1）

Queue：先入先出；添加、删除皆为o（1）

 查询加哈希表加速



- **Deque(Double-End Queue)(双端队列)**
  - vector 线程安全


- [Java 的 PriorityQueue 文档](http://docs.oracle.com/javase/10/docs/api/java/util/PriorityQueue.html)
- [Java 的 Stack 源码](http://developer.classpath.org/doc/java/util/Stack-source.html)
- [Java 的 Queue 源码](http://fuseyism.com/classpath/doc/java/util/Queue-source.html)
- [Python 的 heapq](https://docs.python.org/2/library/heapq.html)
- [高性能的 container 库](https://docs.python.org/2/library/collections.html)


## 哈希表、映射、集合

- Hash table
  - 散列表，是根据关键码值（Key value）而直接进行访问的数据结构。它通过把关键码值映射到表中一个位置来访问记录，以加快查找的速度。这个映射函数叫作散列函数（Hash Function），存放记录的数组叫作哈希表（或散列表）
  - 电话号码簿
  - 用户信息表
  - 缓存（LRU Cache）
  - 键值对存储（Redis）
- Hash FunctionDF
- Hash Collisions
  - 增加维度->拉链式解决冲突法
- 好的情况下O(1),坏的情况下O(n)

- Map：key-value对，key不重复
  - new HashMap() / new TreeMap()
  - map.set(key, value)
  - map.get(key)
  - map.has(key)
  - map.size()
  - map.clear()
- Set：不重复元素的集合
  - new HashSet() / new TreeSet()
  - set.add(value)
  - set.delete(value)
  - set.hash(value) 



```python
ist_x = [1, 2, 3, 4]
map_x = {
‘jack’: 100,
‘张三’: 80,
‘selina’: 90,
# …
}
set_x = {‘jack’, ‘selina’, ‘Andy’}
set_y = set([‘jack’, ‘selina’, ‘jack’])
```

Map, Set : interfaces
- Java set classes:
  - [TreeSet, HashSet,ConcurrentSkipListSet, CopyOnWriteArraySet, EnumSet, JobState Reasons, LinkedHashSet](https://docs.oracle.com/en/java/javase/12/docs/api/java.base/java/util/Set.html)
- Java map classes: 
  - [HashMap, Hashtable, ConcurrentHashMap](https://docs.oracle.com/en/java/javase/12/docs/api/java.base/java/util/Map.html)

实战题目
1. https://leetcode-cn.com/problems/valid-anagram/description/
2. https://leetcode-cn.com/problems/group-anagrams/

3. https://leetcode-cn.com/problems/two-sum/description/
小技巧
- 养成收藏精选代码的习惯
    - Anagram, group-anagrams, two sum
    ```python
    # 思路：手动模拟hashtable，将字符串”a-z“的ASCII码作key，计数求差异    
    def  isAnagram(self, s: str, t: str) -> bool:
            arr1, arr2 = [0]*26, [0]*26
            for i in s:
                arr1[ord(i) - ord('a')] += 1
            for i in t:
                arr2[ord(i) - ord('a')] += 1
            return arr1 == arr2

    ```
    ```python
    # 思路：map计数，对比计数差异
        def isAnagram(self, s: str, t: str) -> bool:
            dict1, dict2 = {}, {}
            for item in s:
                dict1[item] = dict1.get(item,0) + 1
            for item in t:
                dict2[item] = dict2.get(item,0) + 1
            return dict1 == dict2
    ```
    ```python
    # 思路：数组排序后比较差异
        def isAnagram(self, s: str, t: str) -> bool:
            return sorted(s) == sorted(t)
    ​```+
    ​```java
    public class Solution {
        public boolean isAnagram(String s, String t) {
            if(s.length() != t.length()) return false;
            int [] a = new int [26];
            for(Character c : s.toCharArray()) a[c - 'a']++;
            for(Character c : t.toCharArray()) {
                if(a[c -'a'] == 0) return false;
                a[c - 'a']--;
            }
            return true;
        }
    }
    ```

    ```java
    public boolean isAnagram(String s1, String s2) {
            int[] freq = new int[256];
            for(int i = 0; i < s1.length(); i++) freq[s1.charAt(i)]++;
            for(int i = 0; i < s2.length(); i++) if(--freq[s2.charAt(i)] < 0) return false;
            return s1.length() == s2.length();
        }
    ```

    ```java
    public boolean isAnagram(String s, String t) 
    {
        char[] sChar = s.toCharArray();
        char[] tChar = t.toCharArray();
        Arrays.sort(sChar);
        Arrays.sort(tChar);
        return Arrays.equals(sChar, tChar);   
    }
    ```

    Group Anagrams:

    ```python
    def groupAnagrams(self, strs):
        d = {}
        for w in sorted(strs):
            key = tuple(sorted(w))
            d[key] = d.get(key, []) + [w]
        return d.values()
    ```

    ```python
    def groupAnagrams(self, strs):
        dic = {}
        for item in sorted(strs):
            sortedItem = ''.join(sorted(item))
            dic[sortedItem] = dic.get(sortedItem, []) + [item]
        return dic.values()
    ```

    ```java
    public List<List<String>> groupAnagrams(String[] strs) {
        List<List<String>> res = new ArrayList<>();
        HashMap<String, List<String>> map = new HashMap<>();
        
        Arrays.sort(strs);
        for (int i = 0; i < strs.length; i++) {
            String temp = strs[i];
            char[] ch = temp.toCharArray();
            Arrays.sort(ch);
            if (map.containsKey(String.valueOf(ch))) {
                map.get(String.valueOf(ch)).add(strs[i]);
            } else {
                List<String> each = new ArrayList<>();
                each.add(strs[i]);
                map.put(String.valueOf(ch), each);
            }
        }
        for (List<String> item: map.values()) {
            res.add(item);
        }
        return res;
    }
    ```

    Two sum

    ```python
    def twoSum(self, nums, target):
            d = dict()
            for index,num in enumerate(nums):
                if d.get(num) == None:
                    d[target - num] = index
                else:
                    return [d.get(num), index]

    ```

    ```java
    public int[] twoSum(int[] nums, int target) {
            HashMap<Integer, Integer> tracker = 
                new HashMap<Integer, Integer>();
            int len = nums.length;
            for (int i = 0; i < len; i++){
                if (tracker.containsKey(nums[i])){
                    int left = tracker.get(nums[i]);
                    return new int[]{left+1, i+1};
                } else {
                    tracker.put(target - nums[i], i);
                }
            }
            return new int[2];
        }

    ```


- [有效的字母异位词](https://leetcode-cn.com/problems/valid-anagram/description/)
- https://leetcode-cn.com/problems/group-anagrams/
- https://leetcode-cn.com/problems/two-sum/description/



## 树、二叉树、二叉搜索树












## 泛型递归、树的递归

- 递归 -> 盗梦空间
  - 向下进入到不同的梦境, 再带着不一样的状态回到原来的这层
  - 声音(参数)同步回到上一层
  - 每一层都是一份拷贝
- 要点:
  - 不要人肉进行递归（最大误区）
  - 找到最近最简方法，将其拆解成可重复解决的问题（重复子问题）
  - 数学归纳法思维, n = 1 时成立, 且 n 成立, n+1 也成立
    - 类似于放鞭炮, 保证第一个会炸, 后一个会接着前一个炸, 那么结论成立
- template:
```python
# Python
def recursion(level, param1, param2, ...): 
    # recursion terminator 
    if level > MAX_LEVEL: 
     process_result 
     return 

    # process logic in current level 
    process(level, data...) 

    # drill down 
    self.recursion(level + 1, p1, ...) 

    # reverse the current level status if needed
```
```java

// Java
public void recur(int level, int param) { 


  // terminator 
  if (level > MAX_LEVEL) { 
    // process result 
    return; 
  }


  // process current logic 
  process(level, param); 


  // drill down 
  recur( level: level + 1, newParam); 
  // restore current status 
```

```cpp
// C/C++
void recursion(int level, int param) { 
  // recursion terminator
  if (level > MAX_LEVEL) { 
    // process result 
    return ; 
  }

  // process current logic 
  process(level, param);

  // drill down 
  recursion(level + 1, param);

  // reverse the current level status if needed
}
```
```javascript
// JavaScript
const recursion = (level, params) =>{
   // recursion terminator
   if(level > MAX_LEVEL){
     process_result
     return 
   }
   // process current level
   process(level, params)
   //drill down
   recursion(level+1, params)
   //clean current level status if needed

}
```

- 习题
  - [爬楼梯](https://leetcode-cn.com/problems/climbing-stairs/)
    - mutual exclusive: 互斥状况
    - complete exhaustive: 完全详尽
  - [括号生成](https://leetcode-cn.com/problems/generate-parentheses/)
    ```cpp
    //List usage
    list<string>s1;
    list<string>::iterator it;
    it=s1.begin();
    s1.insert(it,"sdasdas");
    for(it=s1.begin();it!=s1.end();++it){
        cout<<' '<<*it;
    }
    ```
    ```cpp
    void _generate(int, int, const std::string);

    std::list<std::string> generateParenthesis(int n) {
      _generate(0, 2 * n, "");
      return {};
    }

    void _generate(int level, int max, const std::string s) { //自顶向下编程.
        //terminator
        if(level>=max) {
            std::cout<<s<<"\n";
            return;
        }
      //process currnet logic : lefe, right
      //down is here.

      //drill down
      _generate(level+1, max, s+"(");
      _generate(level+1, max, s+")");

      //reverse state
    }
    int main(){
        generateParenthesis(3);
    }
    ```
    ```cpp

    void _generate(int, int, int, const std::string);

    std::list<std::string>result;
    std::list<std::string>::iterator it;
    std::list<std::string> generateParenthesis(int n) {

        _generate(-1, 0, n, "");
        return result;
    }

    void _generate(int right, int left ,int n, const std::string s) { //自顶向下编程.
        //terminator
        if(right == n && left == n ) {
    //        std::cout<<s<<"\n";
            it=result.begin();
            result.insert(it,s);
            return;
        }
        //process currnet logic : lefe, right

        //drill down
        if(left < n)
            _generate(right,left+0, n, s+"(");
        if(right < left)
            _generate(right+0,left, n, s+")");
    ```


        //reverse state
    }
    
    int main(){
        generateParenthesis(2);
        for(it=result.begin();it!=result.end();++it)
            std::cout<<*it<<"\n";
    }
    ```
- https://leetcode-cn.com/problems/invert-binary-tree/description/
- https://leetcode-cn.com/problems/validate-binary-search-tree
- https://leetcode-cn.com/problems/maximum-depth-of-binary-tree
- https://leetcode-cn.com/problems/minimum-depth-of-binary-tree
- https://leetcode-cn.com/problems/serialize-and-deserialize-binary-tree/
- **每日一课**: [如何优雅地计算斐波那契数列](https://time.geekbang.org/dailylesson/detail/100028406)
- **作业**
  - https://leetcode-cn.com/problems/lowest-common-ancestor-of-a-binary-tree/
  - https://leetcode-cn.com/problems/construct-binary-tree-from-preorder-and-inorder-traversal
  - https://leetcode-cn.com/problems/combinations/
  - https://leetcode-cn.com/problems/permutations/
  - https://leetcode-cn.com/problems/permutations-ii/

## 分治&回溯 Divide & COnquer

- 递归的另外一种表现形式.
- 最近重复性
- 最优重复性: 动态规划
-  recursion
- Template:
   ```python
   # Python
   def divide_conquer(problem, param1, param2, ...): 
     # recursion terminator 
     if problem is None: 
     print_result 
     return 
     # prepare data 
     data = prepare_data(problem) 
     subproblems = split_problem(problem, data) 
     # conquer subproblems 
     subresult1 = self.divide_conquer(subproblems[0], p1, ...) 
     subresult2 = self.divide_conquer(subproblems[1], p1, ...) 
     subresult3 = self.divide_conquer(subproblems[2], p1, ...) 
     …
     # process and generate the final result 
     result = process_result(subresult1, subresult2, subresult3, …)
     
     # revert the current level states
   ```
    ```cpp
    //C/C++
    int divide_conquer(Problem *problem, int params) {
      // recursion terminator
      if (problem == nullptr) {
        process_result
        return return_result;
      } 

      // process current problem
      subproblems = split_problem(problem, data)
      subresult1 = divide_conquer(subproblem[0], p1)
      subresult2 = divide_conquer(subproblem[1], p1)
      subresult3 = divide_conquer(subproblem[2], p1)
      ...

      // merge
      result = process_result(subresult1, subresult2, subresult3)
      // revert the current level status
    
      return 0;
    }
    ```
    ```java
    //Java
    private static int divide_conquer(Problem problem, ) {
    
    if (problem == NULL) {
        int res = process_last_result();
        return res;     
    }
    subProblems = split_problem(problem)
    
    res0 = divide_conquer(subProblems[0])
    res1 = divide_conquer(subProblems[1])
    
    result = process_result(res0, res1);
    
    return result;
    }
    ```
    ```javascript
    //Javascript
    const divide_conquer = (problem, params) => {
    // recursion terminator
    if (problem == null) {
        process_result
        return
    } 

    // process current problem

    subproblems = split_problem(problem, data)
    subresult1 = divide_conquer(subproblem[0], p1)
    subresult2 = divide_conquer(subproblem[1], p1)
    subresult3 = divide_conquer(subproblem[2], p1)
    ...
    // merge

    result = process_result(subresult1, subresult2, subresult3)
    // revert the current level status
    }
    ```

 ## 回溯 Backtracking

 - 八皇后
 - 数独
 - 归去来兮. 

回溯法采用试错的思想，它尝试分步的去解决一个问题。在分步解决问题的过程中，当它通过尝试发现现有的分步答案不能得到有效的正确的解答的时候，它将取消上一步甚至是上几步的计算，再通过其它的可能的分步解答再次尝试寻找问题的答案。

回溯法通常用最简单的递归方法来实现，在反复重复上述的步骤后可能出现两种情况：

找到一个可能存在的正确的答案；

在尝试了所有可能的分步方法后宣告该问题没有答案。

在最坏的情况下，回溯法会导致一次复杂度为指数时间的计算。


- https://leetcode-cn.com/problems/powx-n/


- [牛顿迭代法原理](http://www.matrix67.com/blog/archives/361)
- [牛顿迭代法代码](http://www.voidcn.com/article/p-eudisdmk-zm.html)



- [子集](https://leetcode-cn.com/problems/subsets/)
    ```cpp
    // template: 1. terminator 2.process (split your big problem) 3. drill down (subproblmes) , merge(subsult) 4. reverse states

    x\^n ——\>2\^10： 2\^5—\>（2\^2）\*2

    pow(x, n):
        subproblem: subresult = pow(x, n/2)
    merge:

        if n%2 == 1 {//obb
            result = subresult * subresult *x;
        }else{//even
            result = subresult * subresult;
        }

    //3. 牛顿迭代法
    ```

    ```java
    public class Solution {

    public List<Integer>subsets(int []nums){
        List<List<Integer>> ans = new ArrayList<>();
        dfs(ans, nums, new ArrayList<Integer>(), 0);
        return ans;
    }

    private void dfs(list<list<Integer>> ans, int []nums, list<Integer> list, int index) {
        //terminator
        if(index == nums.length ) {
            ans.add(new Arraylist<Integer>(list));
            return ;
        }
        dfs(ans, nums, list, index+1);// not pick the number at this index

        list.add(nums[index]);
        dfs(ans, nums, list, index+1);// pick the number at this index

        // reverse the current state 
        list.remove(list.size()-1);
    }
    ```
    迭代
    ```python
    class Solution(object): 
        def subsets(self, nums):
            subsets = [[]]
            
            for num in nums:
                for subset in subsets:
                    new_subset = sulset + [num] 
                    newsets.append(new_subset) 
                subsets. extend(newsets).
        return subsets

    ```

## 深度优先搜索和广度优先搜索

## 贪心算法

## 二分查找

## 动态规划 

## 字典树和并查集

## 高级搜索

## 红黑树和AVL树

## 位运算

## 布隆过滤器和LRU缓存


## 排序算法

## 高级动态规划

## 字符串算法

## 期末串讲






## LINK

- [algorithm004-05|作业仓库](https://github.com/algorithm004-05/algorithm004-05)
- [黄明《从简单的线性数据结构开始：栈与队列》](https://shimo.im/docs/jTKWyPTYkQwDPYkr/)
- [王记超《Java中HashMap数据结构分析（语言无关）》](https://shimo.im/docs/wXpyygqVqYhHW6px)
- [张宇腾《Dijkstra算法分享》](https://shimo.im/docs/kkTgptvpQxj633Dk)
- [阎文元《聊聊散列表》](https://shimo.im/docs/K9vKxdr69RtpKJtJ)
- [张鹏《深入浅出数组》](https://shimo.im/docs/jpDKpgDTXTjtDkhj/) 

![](https://z3.ax1x.com/2021/06/28/RNt0kn.png)

<div id = 'j1'>[1]. https://www.zhihu.com/question/27039635/answer/83771163</div>
<div id = 'j2'>[2]. https://blog.csdn.net/hebtu666/article/details/79912328</div>


