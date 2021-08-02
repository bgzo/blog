---
title: "Introduction To Software Engineer"
date: 2021-06-10T14:42:00+08:00
draft: false
tags:
- Sofeware-Engineer
---


Introduction to Software Engineering talked about the main steps of [Agile Development-Agile Development](https://t.me/lfh010618/52) that I learned on TG a few months ago in the course, which I came into contact with in my spare time. Fragmented knowledge turned out to be embedded in such theories. I was sitting in the last row and looking forward. Although there were no seats, basically no one listened to this part of the content, let alone internalized thoughts. Teacher. The PPT does not mention the [website](https://agilemanifesto.org/) established by the agile development organization for publicity.

Why is it that mentioning these additional things is so important to me? These important contents make me believe that such creeds are real and exist. I don’t think this is just useless remarks. This is the most important thing for developers. Fundamental foundation. After class, I was ashamed of my long-standing prejudice against domestic teaching. The duck-filling education invented by the former Soviet educator I. Ann Keloff is still active in the general domestic college life and stays with me. After twelve years of education, I sneer at me. I really enjoy the open-source teaching method on the Internet. Freshness is one aspect, and low threshold is another. I will never praise it because of the overwhelming theories, on the contrary, sleep. It's the only way I choose.

Coincidentally, Ruan Yifeng also [talked about this subject](http://www.ruanyifeng.com/blog/2021/05/scaling-problem.html) on his blog, about the biggest problem of software engineering.


##  1. <a name='Someconceptsyouneedtomaster'></a>Some concepts you need to master

- **Introduction**
  - Software: Software is another part of a computer system that is interdependent with hardware. It is a complete collection including programs, data and related documents
  - Software crisis? What are the two points of the software crisis? What is the cause of the software crisis?
    - Software crisis refers to a series of serious problems encountered in the process of computer software development and maintenance. Includes two points
      - How to develop software to meet the increasing demand for software;
      - How to maintain the ever-expanding number of existing software.
    - Many serious problems in the process of software development and maintenance are related to the characteristics of the software itself on the one hand, and improper methods of software development and maintenance on the other hand. The specific performance is as follows:
      - Software is a logical part, not a physical part.
      - The scale of software is getting bigger and bigger, and the complexity is getting bigger and bigger.
      - Underestimate the importance of requirements analysis, and underestimate the wrong views and methods of software maintenance
  - What is software engineering?
    - Early definition at the first NATO conference in 1968: "A series of methods to establish and use sound engineering principles to obtain reliable software that can run effectively on actual machines with a more economical means."
    - The definition of 1EEE in 1993: "1 Software engineering is: the application of systematic, standardized, and measurable approaches to software development, operation and maintenance processes, that is, the application of engineering to software; ② further study ⑦ ways to achieve" .
    - Our country recently defined: Software Engineering is an engineering discipline that guides the development and maintenance of computer software. It uses engineering concepts, principles, techniques, and methods to develop and maintain software, combining management techniques that have been proven to be correct through the test of time with the best technical methods currently available.
  - Which models should be established when two software engineering methodologies develop software?
    - Software engineering methodology includes:
      - Traditional Methodology
      - Object-oriented methodology
    - Common development models are:
      - Waterfall model (demand is stable and can be specified in advance
      - Prototype model (demand fuzzy or change over time)
      - Incremental model (analysts first make demand analysis and outline design, and users participate in gradual improvement)
      - Spiral model (combining waterfall model and prototype model, and adding risk analysis)
      - Fountain model (make the development process iterative and seamless)
  - What are the software process models? Briefly describe their characteristics.
    - Process models are divided into five categories
      - Management process model
      - Waterfall model (also known as life cycle model)
      - Incremental process model: Including incremental model, RAD model
      - Fireworks process model: including prototype development model, spiral model, collaborative development model
      - Dedicated process model: Including opportunity-based development model, formal method model, and aspect-oriented software development model
  - What is the software life cycle?
    - A software has to go through a long period of time from definition, development, use and maintenance until it is finally obsolete. This long period of software experience is usually called the life cycle
  - What are the stages and steps in the software life cycle?
    - Three stages: definition, development, and maintenance
    - Eight steps: problem definition, feasibility study, requirements analysis; overall design, detailed design, coding and unit testing, comprehensive testing; operation and maintenance.
  - What are the tasks of each stage of software development?

    - Definition stage: problem definition-task: report on scale and goals; feasibility study-task: high-level logical model of the system: data flow diagram, cost-benefit analysis; demand analysis-task: logical model of the system: data flow diagram , Data dictionary, algorithm description.

    - Development phase: overall design-task: system flow chart, cost-benefit analysis, recommended system structure: hierarchical diagram structure diagram; detailed design-task: HIPO diagram or PDL diagram; coding and unit testing-task: source program list, unit Test plan and results; comprehensive test-task: comprehensive test plan, result integration test, acceptance test, complete and consistent software configuration.

    - Maintenance phase: software maintenance tasks: maintenance records and corrective maintenance, adaptive maintenance, integrity maintenance and preventive maintenance
- **Design**
  - What are the two stages of software design? What are the two stages of the overall design?
    - Divided into two stages: overall design and detailed design
  - The overall design includes system design (dividing the physical elements of the system, such as programs, files, databases, manual processes, and documents) and structural design (determining which modules each program in the system is composed of, and the relationship between these modules , Does not involve the internal calculation process of the module)
  - What is the difference between software and hardware?
    - Software is a logical component, not a specific physical component. Software is significantly different from hardware in terms of development, production, use, and maintenance. The software is developed, the hardware is manufactured, and the software is self-determined. The assembled software will not wear out. The hardware has mechanical wear problems.
  - What is the task of software requirements analysis
    - The task of requirement analysis is to determine what the system must accomplish, that is, to put forward complete, accurate, clear, and specific requirements for the target system. Generally speaking, the tasks of requirements analysis include the following aspects:
      - Determine the comprehensive requirements for the system (mainly include: functional requirements, performance requirements, operating requirements, and possible future requirements.
      - Analyze the data requirements of the system
      - Export the logical model of the system: data flow diagram, entity-connection diagram, state transition diagram, data dictionary, algorithm flow, etc. 4. Revise the system development plan
  - Which software are suitable for the development of waterfall model and prototype model?
    - The waterfall model and the prototype model are respectively suitable for the development of which software waterfall model is suitable for stable demand and can be specified in advance for large-scale system engineering projects. The prototype model is suitable for small and medium-sized projects with fuzzy requirements or changing over time
  - What is the role of the data flow diagram? How to draw
    - Data flow diagram is abbreviated as DFD (Data Flow Diagram) diagram, which is a data flow diagram tool that describes the logical model of the system with specific graphic symbols; it abstractly describes the flow and data of information in the system from the perspective of data transmission and processing The process of processing; it is a communication tool for exchanging information between developers and users; it is also a tool for system analysis and system design.
    - Summary of data flow graphics
      - First find out the data source and sink. They are external entities, and they determine the interface between the system and the outside world
      - Find out the output data stream and input data stream of external entities. Draw the top-level data flow diagram.
      - Starting from the top-level processing, gradually refine and draw the required sub-maps.
      - Analyze the main processing functions of the system, treat each processing function as a process, determine the data inflow and outflow relationship between them, and draw the first-level data flow diagram.
      - Refine each process in the flow chart and draw the required sub-graphs until the process does not need to be decomposed. 6 Check and modify each layer of data flow graphs and subgraphs in accordance with the principles given above
  - What is a data dictionary? How to write a data dictionary?
    - Data dictionary is a collection of information describing data in the data flow diagram (description content includes: data flow diagram, state transition diagram, data dictionary E-R diagram data information (data flow, data storage, external entities), control information (Event) etc., not including processing)
  - How to write?
    - The combination of data elements
    - Sequence: Connect two or more components in a certain order. Example: A+B
    - Selection: select one from two or more possible elements. Example: [AB]
    - Repeat: Repeat the specified component zero or more times. Example: 1A15
    - Optional: that is, a component is optional (repeat zero or one time
  - What are the principles of software design?
    - Modularization, abstraction and gradual refinement, information hiding and localization, module independence
  - What are the coupling and cohesion? How to define? How to differentiate?
    - Coupling measures how closely different modules depend on each other
    - Cohesion measures how closely the various elements within a module are combined with each other
    - Type of coupling:
      - Data coupling: If the communication information between two modules is a number of parameters, each of which is a data element, the coupling of data coupling is called data coupling. This is the coupling relationship with the least impact between modules.
      - Tag coupling: When the entire data structure is passed as a parameter and the called module only needs to use some of the data elements to tag the coupling, this situation is called tag coupling
      - Control coupling: then the control coupling between A and B. If the information transmitted from module A to module B controls the internal logic of module B, the coupling is called control coupling.
      - Common coupling: If two or more modules are related to the same common data domain, it is called common coupling. Public coupling Public coupling is a bad coupling relationship, which brings difficulties to the maintenance and modification of modules. If the two modules share a lot of data and it is inconvenient to pass them through parameters, you can use common coupling.
      - Content coupling: If one module is related to the internal properties of another module (ie, running programs and internal data), it is called content coupling.
      - Function cohesion: If the processing actions of each component within a module all exist to perform the same function, and function cohesion: Only perform one function, it is called functional cohesion. To determine whether a module is functionally cohesive, just look at what the module "does" is to complete a specific task or to complete multiple tasks.
      - Sequential cohesion: If several processing actions performed by the various components within a module have such characteristics: The previous sequence cohesion: The output data generated by the processing action is the input data of the latter processing action, which is called sequence Cohesion. Sequence cohesion is not as convenient to maintain as function cohesion. Modifying one function in a module will affect other functions in the same module.
      - Communication cohesion: If the processing actions of each component in a module use the same input data or generate the same output communication cohesion data, it is called communication cohesion.
      - Process cohesion: If the processing actions of the various components within a module are different and not related to each other, but they are all governed by the same control flow, their execution order is determined, which is called process cohesion
      - Temporary Cohesion (Time Cohesion): If the processing actions of each component in a module are related to time, it is called temporary: Cohesion. The processing action of the temporary cohesion module must be completed within a specific time. One means to complete within a specific time frame, but the order of completion is not important. For example: the initialization of the module in the programming.
      - Logical cohesion: If the processing actions of each component within a module are logically similar, but the functions are different from each other or logical cohesion: irrelevant, it is called logical cohesion. A logical cohesion module often includes several logically similar actions, and one or several functions can be selected when used. For example: Put the function of editing various input data in one module
      - Mechanical cohesion (accidental cohesion): If the processing actions of the internal components of a module have no connection with each other, then: it is called mechanical cohesion
  - Which graphics tools were used in the detailed design stage
    - Program flow chart (PFD box diagram (N-S diagram) Problem analysis diagram (PAD)
    - Decision table decision tree (other non-graphic tools include process design language (PDL)
  - What are the heuristic rules for software engineering?
    - When the module is too large, it should be disassembled. Generally, it is broken down by function until it becomes a small single-function module. Generally, 30-50 sentences contained in a module are better (referring to high-level language). After decomposition, the independence of the module should not be reduced.
    - The depth, width, fan-out and fan-in should all be appropriate. A good design structure usually has a higher fan-out at the top level, less fan-out at the middle level, and fan-in at the bottom level into a common utility module (the module at the bottom level has a high fan-in level). The independence of modules is a standard throughout, and the independence standard cannot be violated in order to pursue other goals.
    - For any module that has an internal judgment call, the scope of its judgment function
Surroundings should be a subset of its control range. There are modules called by judgment, and the level should not be too far away from the level of modules that fall within the scope of judgment—the closer the better.
    - Strive to reduce the complexity of the module interface. The complexity of the module interface is a major cause of software errors. The module interface should be carefully designed to make the information delivery simple and consistent with the function of the module. The interface is complex or inconsistent (that is, it seems that there is no connection between the transmitted data), which is a symptom of tight coupling or low cohesion, and the independence of this module should be re-analyzed. E. Design a single entry single exit module: prevent content coupling-multiple entries (multiple processing functions) mean content coupling
    - The function of the module should be predictable. A module is a black zygote. If the input is the same, the output is the same, and its internal data structure and interface are restricted. The function of the module should be predictable, but the function of the module should also be prevented from being too limited. Excessive limitation will lead to poor flexibility of the module, and there will be changes in the use of the site.
  - What are the scope and control domain of a module?
    - Module control domain: itself and all its subordinate modules (including direct and indirect subordinate modules)
    - Scope of the module: the collection of all modules affected by a decision in the module
  - What do the fan-in, fan-out, depth, and width of the module mean?
    - Depth indicates the number of layers controlled in the software structure-a rough indication of the size and complexity of a system. The width is the maximum value of the total number of modules on the same level of the software structure-the larger the width, the more complex the system.
    - The fan-out of a module refers to the number of directly subordinate modules owned by a module. Generally, the number of fan-out is controlled within 7, and the average is 3 module fan-out or 4. The fan-in of a module refers to the number of directly superior modules of a module. number.
- **Implementation**
  - What is the purpose of software testing?
    - Software testing is the process of executing programs in order to find errors:
    - Testing is the execution process of the program, the purpose is to find errors;
    - Software testing requires data, that is, test cases carefully designed for testing. Use test cases to run the program to help find program errors; a good test case is to find errors that have not been discovered so far;
    - A successful test is a test that finds errors that have not been found so far.
    - Software testing is definitely not to prove the correctness of the program, nor can it prove the correctness of the program
  - What are the contents of the unit test?
    - Use each module as a separate test unit to ensure that each module can run correctly as a unit.
    - Unit testing mainly tests the following five basic characteristics of the module:
      - Module interface
      - Partial data structure
      - Important execution path
      - Error handling
      -  Boundary conditions
  - What is integration testing? What is the difference between non-incremental and incremental? How to assemble modules in incremental mode?
    - Combining modules to form a complete system to test it is called integration testing. Whether it is subsystem testing or system testing, both have the dual meanings of testing and assembly, and are usually called integration testing.
    - Non-incremental means that the modules are unit tested first and then assembled together for testing. The incremental method is to assemble the untested modules one by one to the tested modules for integration testing, and test each time one is added. The non-increasing type requires stub modules and driver modules, the non-increasing type can be tested in parallel, the incremental type can find interface errors in time, the non-increasing type is difficult to find the interface errors, and the incremental type cannot be tested in parallel. Incremental testing is more thorough
    - The incremental assembly module has two assembly methods, top-down and bottom-up,
  - What is a confirmation test? What are the tasks at this stage?
    - Perform functions and performance tests on the system according to the determined indicators in the requirements specification. At this stage, a clear test (test with the black box method against the requirements specification), software configuration test (the completeness of the document, and timely supplement and modification if any omissions are found)
  - What is flow graph? How to draw a flow diagram?
    - How to calculate the loop complexity of the flow graph? Flow graph is an abstract program flow graph, highlighting the control flow
    - The symbol O is a node of the flow graph, which represents one or more non-branch statements. Arrows are edges, which indicate the direction of control flow. In the branch structure, there should be a convergence node at the convergence of the branch, and each edge must end at a node. If the conditional expression in the judgment is a compound conditional expression connected by one or more logical operators (OR, AND, NAND, NOR), it needs to be changed to a series of nested judgments with only a single condition.
    - According to the number of single conditional branches or loops in the program, the loop complexity is the complexity of the program. The loop complexity is the complexity of the program. The loop complexity is measured by the number of single conditional branches or loops in the program. the complexity
    - VIG)-the number of flow graph regions VIG)-the number of edges-the number of nodes + 2 VIG) the number of single condition judgments + 1
  - What are the test methods for white box testing and black box testing? How to test for specific problems?
    - Self-box testing tests all execution paths of program modules at least once; for all logical judgments, both cases of "true" and "false" white box testing are tested at least once; white box testing is also called logical coverage method Including: statement coverage, decision coverage, condition coverage
    - Black box testing finds errors in the program, and the test data must be determined in all possible input conditions and output conditions to check whether the program can produce the correct output. Black box testing has equivalence class method and boundary value analysis method
  - What are the steps for software testing? What is the test basis for each test phase? Who will test each? Step test content time
    - Unit test: treat each module as a separate test unit to ensure that each module can run correctly as a unit. (Coding test phase)
    - The sub-system test system puts the modules that have been unit tested together to form a subsystem for testing, and the main task is to test the correctness of the interfaces between the modules. (Concentrated testing stage)
    - System testing assembles the tested subsystems into a complete system for testing to check whether the system can actually achieve the functions in the requirements specification and whether the dynamic characteristics of the system meet the predetermined requirements. Phase system testing refers to the testing of the entire computer system (including software and hardware), which can be combined with the installation and acceptance of the system. (Concentrated testing stage)
    - Acceptance testing takes the software system as a single entity to test with the participation of users, so that the software system can meet the needs of users. The test content is basically the same as the system test. (Acceptance stage)
    - Parallel testing: the new and old systems are running at the same time for comparison, avoiding risks and giving users a period of time to be familiar with the new system (operation phase)
- **Maintenance**
  - What is maintenance? What are the types of maintenance?
    - Software maintenance is the process of modifying the software in order to correct errors or meet new needs after the software has been delivered for use. Software maintenance types are
    - Corrective maintenance: the process of diagnosing and correcting program errors found during program use; it accounts for 17-21% of the maintenance workload. Adaptive maintenance: the activity of modifying the software in line with the changed environment; accounts for 18-25% of the maintenance workload.
    - Complete maintenance: to meet the improvement work that users propose to add new functions or modify existing functions during the use process; account for 50-66% of the maintenance workload.
    - Preventive maintenance: the work of modifying software in order to improve future maintainability or reliability; it accounts for about 4% of the maintenance workload

(The following is also the knowledge of the object-oriented UML series, because IMU does not examine this aspect for the time being, I will ignore it for the time being...)
