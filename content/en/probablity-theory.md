---
title: "Probablity Theory"
date: 2021-06-10T16:00:00+08:00
draft: false
tags:
- Math
---

In general. I have finished the test of probability theory today. I still have a lot of regrets about the education I received, because I really didn't learn anything. I always do a few sets of papers that my classmates want before the end of the semester, and then go directly to the test. , Without any own thinking and connection, I am always awkward.

- **"Birthday Problem" / "Birthday Paradox"**: The most interesting and practical part of this semester is the first class-introducing a simple problem mentioned in probability theory: "Birthday Problem".
  - **Question**: *Assuming there are n days in a year (365/355), how many people should have the same probability of birthday?*
  - Idea: The problem is transformed into a probability problem of `1-P (two by two are not equal)`
  - Get: `(assuming 365 days a year)` 1-365! / 365<sup>n</sup> \* (365-n)! (*For the derivation process, see: https://zh.wikipedia.org /wiki/%E7%94%9F%E6%97%A5%E5%95%8F%E9%A1%8C*), or <img src="https://latex.codecogs.com/svg.image? \prod_{k=1}^{n-1}(1-\frac{k}{365})" title="\prod_{k=1}^{n-1}(1-\frac{k} {365})" />
  - Further statistical calculations:
  - ![](https://dandelionfs.oss-cn-beijing.aliyuncs.com/1280px-Birthday_paradox_approximation.svg.webp)
  - | *n* | *p*(*n*) |
    | ---- | -------------------------------- |
    | 10 | 12% |
    | 20 | 41% |
    | 30 | 70% |
    | 50 | 97% |
    | 100 | 99.99996% |
    | 200 | 99.9999999999999999999999999998% |
    | 300 | 1 −(7×10<sup>−73</sup>) |
    | 350 | 1 −(3×10<sup>−131</sup>) |
  | ≥366 | 100% |
  
- Random variable is also a function, a constraint from event to abstraction, a kind of mapping relationship
  
- Probability distribution and probability
  -  Probability distributions
  - Probability
    - Probability Quality/Distribution Function (PMF): <img src="https://latex.codecogs.com/svg.image?P_{i}=P(x_{i})=p(X=x_{i} )" title="P_{i}=P(x_{i})=p(X=x_{i})" />
    - Probability Density Function (PDF) => Cumulative Distribution Function (CDF) (monotone bounded right continuous)
    - ![](https://dandelionfs.oss-cn-beijing.aliyuncs.com/637615279826892268.webp)

- Proof of continuity
  - ![](https://dandelionfs.oss-cn-beijing.aliyuncs.com/637615264057320450.webp)
  
- The essence of the hypergeometric distribution is sampling without replacement. The essence of the geometric distribution is a specific example of the binomial distribution.
  - Move to know: https://www.zhihu.com/question/38191693/answer/75277085
  
- The meaning of **moment**
  - Moment = moment arm × force
    - **Meaning**
      - First-order origin distance -> average value; Second-order origin moment -> average energy;
      - The first-order central moment -> 0; the second-order central moment -> variance; the third-order central moment is also called skewness; the fourth-order central moment is also called kurtosis or kurtosis
    - Move to know:
    - https://zhuanlan.zhihu.com/p/57802400
  
- Why is the probability density function of continuous random variables not necessarily continuous
  
- https://www.zhihu.com/question/437683132
  
- Why is convolution called "convolut" ion?
  
- https://www.zhihu.com/question/54677157
  
- Three Axioms
  - Non-negative axioms
  - Normative Axioms
  - Addable axioms

- Compatible, independent, mutually exclusive
  - ![](https://dandelionfs.oss-cn-beijing.aliyuncs.com/Screenshot%202021-07-10%20151353.webp)
  - Move to know: https://zhuanlan.zhihu.com/p/36607363

- Central Limit Theorem and Law of Large Numbers
  - Law of Large Numbers -> The sample converges to the population mean
- Central Limit Theorem -> The population tends to be normally distributed
  - Move to know:
    - https://www.zhihu.com/question/22913867
  
- Anyone who knows statistics, why is the standard error equal to the standard deviation divided by the radical n, and how to find the formula derivation process?
  - https://www.zhihu.com/question/21744800
  
- Why is the standard deviation of the sample mean the standard deviation of the population mean divided by the radical n?
  - https://www.zhihu.com/question/33394664
  
- Why is the denominator of sample variance n-1?
  - https://www.zhihu.com/question/20099757/answer/312670291
  
- Gamma distribution?
  - (For question level) **Nature**:
    - <img src="https://latex.codecogs.com/svg.image?\tau&space;(x)=\int_{0}^{&plus;\infty}&space;t^{x-1}&space; e^{-t}&space;dt,&space;x>0" title="\tau (x)=\int_{0}^{+\infty} t^{x-1} e^{-t} dt , x>0" />
    - <img src="https://latex.codecogs.com/svg.image?\tau&space;(x&plus;1)=x\tau(x),&space;\forall&space;x>0" title="\tau (x+1)=x\tau(x), \forall x>0" />
    - <img  src="https://latex.codecogs.com/svg.image?\tau&space;(1)=1,&space;\tau(\frac{1}{2})=\sqrt{\pi}"  title="\tau (1)=1, \tau(\frac{1}{2})=\sqrt{\pi}" />
    - <img src="https://latex.codecogs.com/svg.image?\tau&space;(n)=(n-1)!,\forall&space;n\in&space;N_{&plus;}" title=" \tau (n)=(n-1)!,\forall n\in N_{+}" />
  - More professional answers move to know:
    - https://www.zhihu.com/question/34866983
    - https://www.zhihu.com/question/31407058

- <img src="https://latex.codecogs.com/svg.image?Var(x)=D(x)" title="Var(x)=D(x)" />
- If the distribution function of the random variable X <img src="https://latex.codecogs.com/svg.image?F_{x}(X)" title="F_{x}(X)" /> is strict Monotonically increasing continuous function, then there is <img src="https://latex.codecogs.com/svg.image?Y=F_{x}(X)\sim&space;U(0,1)" title="Y =F_{x}(X)\sim U(0,1)" />, such as <img src="https://latex.codecogs.com/svg.image?U&space;=&space;1-&space;e ^{-\lambda&space;X}&space;\sim&space;U(0,1)" title="U = 1- e^{-\lambda X} \sim U(0,1)" />