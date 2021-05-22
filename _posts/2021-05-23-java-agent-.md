---
title: Understanding Java Agents
id: 35
date: '2020-06-20 06:33:23 +0700'
author: sathiyakugan
layout: post
guid: null
permalink: "/blog/java-agent/"
wp_last_modified_info:
- June 14, 2019 @ 8:17 pm
wplmi_shortcode:
- "[lmt-post-modified-info]"
site-sidebar-layout:
- default
site-content-layout:
- default
theme-transparent-header-meta:
- default
categories:
- java
image: assets/images/posts/java/java-agent/cover-java-agent.jpeg
tags:
- Programming
- ds-and-algo
- dynamic-programming
---

let’s say that you have an application running in production. Every once in a time it gets into a broken state, it’s hard to reproduce, you need some more information out of the application.

 So are you wondering about the solution?
 what you could do is dynamically attach some set of code to your application and carefully rewrite it so that the code dumps additional information you can log or else you can dump the application stage into a text file. Jave is giving us a facility to do this using Java Agent. Have we ever wondered how our Java code is hot-swapped in our IDE? It’s because of agents. Another interesting fact about Java agent is Application profilers are using the same technique at the backend to collect information of memory usage, memory leakage and execution time of methods.

####  So what is a Java Agent?

Java agents are a special type of class which, by using the Java Instrumentation API, can intercept applications running on the JVM, modifying their bytecode. Java agents are extremely powerful and also dangerous.


Before diving, I will explain how a Java Agent intercepts a Class using the simple HelloWorld Example.

```java
public class Hello {
    public static void main(String[] args){
        System.out.println("hello world");
    }
}
```

As shown in the below diagram, **Classloaders** are in charge of loading classes from binary to in-memory. When you run the compiled HelloWorld application (HelloWorld.class), the agent could be viewed as a way to intercept classloaders behaviour at runtime. You may think how come the java byte code will be restructured so that agent can add the relevant code at the correct places.  `The interesting fact is, for Java programs, the structure of the bytecode is really close to the original Java program source code. Hence, while we don’t instrument the Java program itself, we use a very close representation of it.` One thing to note is that there are non-Java languages that compile into Java bytecode (such as Scala, Clojure, and Kotlin), which means that the structure and shape of the bytecode for programs can be very different.

![]({{ site.baseurl }}/assets/images/posts/java/java-agent/explanation.jpeg)

#### What is the important thing you need to know to implement a Java Agent?:
Java agents are based on facility, coming from the Java platform and the entry point to that is a java.lang instrument package which provides services that allow agents to instrument programs running on the JVM. The package is quite simple and self-contained as it contains a couple of exception classes, a data class, the class definition and two interfaces. Out of those two, we only need to implement classFileTransformer interface, if we want to write a Java agent.

#### So how do we define an agent?
There are two ways of doing that.

The first one is a static agent which means that we build our agent we package it as a jar file and when we start our java application we pass in a special JVM argument which is called javaagent and then we give it the location of the agent jar on disk and then the JVM does its magic.

~~~~sh
$ java -javaagent:<path of agent jar file> -jar <path of the packaged jar file you want to intecept>
~~~~

We need to add a special manifest entry which is called pre-main class and of course, this is a fully qualified name class definition.
~~~~sh
Premain-Class : org.example.JavaAgent
~~~~

The class looks something like this
```java
public class JavaAgent {
    /**
     * As soon as the JVM initializes, This  method will be called.
     *
     * @param agentArgs       The list of agent arguments
     * @param instrumentation The instrumentation object
     * @throws InstantiationException
     */
    public static void premain(String agentArgs, Instrumentation instrumentation) throws InstantiationException {
        InterceptingClassTransformer interceptingClassTransformer = new InterceptingClassTransformer();
        interceptingClassTransformer.init();
        instrumentation.addTransformer(interceptingClassTransformer);
    }
}

```
* `premain` method takes two arguments.
	*  `agentArgs`  String arguments, whatever the user has chosen to pass as arguments to the Java agent invocation.
	*  `instrumentation` is from the java.lang instrument package and we can add a new `ClassFileTransformer` object, which contains the actual logic of our Agent.


The second option is called a **dynamic agent**.
Instead of instrumenting the way you launch the application, what you can do is write a small piece of code that takes and connects to an existing JVM and tells it to load a certain agent.

```java
VirtualMachine vm = VirtualMachine.attach(vmPid);
vm.load(agentFilePath);
vm.detach();
```

This argument `agentFilePath` is the exact same one as in the static agent approach. It has to be the file name of the agent jar so no input streams no bytes. There are **two caveats** with this approach the first one is that this is private API living under the com sun space and it usually works for hotspot implementations. The second one is that sorting with java 9 you can no longer use this code to attach to the JVM it’s running.

#### Class Transformation

This is the interface that we need to implement for our agent in order to transform the classes.
```java
public interface ClassFileTransformer {
    byte[] transform(ClassLoader loader, 
                     String className, 
                     Class<?> classBeingRedefined,
                     ProtectionDomain protectionDomain, 
                     byte[] classfileBuffer) 
            throws IllegalClassFormatException;
}
```
It’s a bit of a mouthful but I will explain the necessary arguments in the method signature. The first important one is the `className` the primary purpose of this parameter is, it helps to find and differentiate between the right class you wanted to intercept and others. obviously, you may not want to intercept each class in your application and the simplest way to do that is to check with the conditional statement. Then ClassLoader which is mostly used in environments that don’t have a flat class space for basic applications you probably can get away without looking at it, but as soon as you run into something more complicated or a modular platform you need to look in the ClassLoader. `classfileBuffer` is the current definition of the class before being instrumented. To intercept you need to read this byte array using libraries and intercept your code and then have to transform back to bytecode again to return.

There are several byte code generation libraries. you need to do the research and decide for yourself in terms of whether it is a high-level API or low-level API, community size and what is the license. The demo I put below is [Javassist](https://www.javassist.org/) because I think it has a nice balance between high-level and low-level API s and also is a triple license so it should be available for almost anyone to consume. so this is the body of the implementation of the `ClassFileTransformer` .

```java
@Override
public byte[] transform(ClassLoader loader, ..)
        throws .. {
    byte[] byteCode = classfileBuffer;
    // If you wanted to intercept all the classs then you can remove this conditional check.
    if (className.equals("Example")) {
        try {
            ClassPool classPool = scopedClassPoolFactory.create(loader, rootPool,
                    ScopedClassPoolRepositoryImpl.getInstance());
            CtClass ctClass = classPool.makeClass(new ByteArrayInputStream(classfileBuffer));
            CtMethod[] methods = ctClass.getDeclaredMethods();
            for (CtMethod method : methods) {
                if (method.equals("main")) {
                    method.insertAfter("System.out.println(\"Logging using Agent\");");
                }
            }
byteCode = ctClass.toBytecode();
            ctClass.detach();
        } catch (Throwable ex) {
            log.log(Level.SEVERE, "Error in transforming the class: " + className, ex);
        }
    }
    return byteCode;
}
ctClass.detach();
        } catch (Throwable ex) {
            log.log(Level.SEVERE, "Error in transforming the class: " + className, ex);
        }
    }
    return byteCode;
}
```

Here from the, 
`classPool` we can directly get the class bypassing the `classfileBuffer`. since I wanted to work with the method `main` We loop through all the method in the class definition and get the class we wanted. We do not have to work with bytecode at all. We can simply pass it some legal Java code and then Javassist will compile it generates the new bytecode and give us that definition. There are three ways to insert some Java code into the method. [insertAfter​(..)](http://https://www.javassist.org/html/javassist/CtBehavior.html#insertAfter(java.lang.String)) -inserts bytecode at the end of the body, Inserts bytecode at the end of the body. [insertAt​(..)](https://www.javassist.org/html/javassist/CtBehavior.html#insertAt(int,boolean,java.lang.String)) inserts bytecode at the specified line in the body and [insertBefore​(..)](https://www.javassist.org/html/javassist/CtBehavior.html#insertBefore(java.lang.String)) inserts bytecode at the beginning of the body.
#### Getting hands-on with Java Agent.

1. Download the sample [application](https://github.com/Sathiyakugan/example-playapp-javaagent.git) and [Java Agent](https://github.com/Sathiyakugan/javaagent-example.git) from the link pointed out.
2. Build both the repo using going into the path and execute the command `mvn clean install`
3. Now you will get the jar files in the target. Copy the path of the `.jar`  file in Example Application and Copy the path of the -`dependencies.jar` file in JavaAgent.
4. First, run the application only with the Example Application using the command `$ java -jar <path of the packaged jar>` and observe the output. `Hi I am main.` will be printed in the console.
5. Then run the application attached with the java agent using the command `$ java -javaagent:<path of agent jar file> -jar <path of the packaged jar file you want to intercept>` and observe the output. `Logging using Agent` will be printed additionally in the console. This ensures that the java agent has been intercepted and added to the body of the `main` method.

![]({{ site.baseurl }}/assets/images/posts/java/java-agent/demo.png)
#### In summary, If you want to implement the Java Agent
1. You need to create two Java classes. One with the with `premain` method (JavaAgent) and another class which extends the `ClassFileTransformer (CustomTransformer)`
2. Inside the body of the `premain` method, you need to add the object of the class which extends the `ClassFileTransformer`
3. Then you need to add the logic inside the overridden method `transform` inside CustomTransformer.
4. When transforming the bytecode inside the transform method you may need to use the bytecode generation libraries according to your purpose.
5. You need to specify the `premain` class in the Manifest and build the jar.
6. Use the `javaagent` tag to load the agent with the application you wanted to intercept.


#### Me and Java Agent
I have developed  some sort of [debugger for WSO2 Identity Server,](https://github.com/wso2-extensions/identity-tools-debugger) which gets the important variables from the Authentication flow from the server. As I mentioned, in the beginning, It is impossible to change the whole code that we want to intercept. So It is easy to dynamically attach some set of code to Server and carefully rewrite it so that the code fires the additional information you can use to debug. This architecture which does debug without starting the Java Debugging or any code manipulation was amazed me, so I thought of putting some words about this amazing tool.

#### Conclusions
In this post, we’ve looked at the extremely powerful entry in the Java developer toolbelt: the Java agent. which has the power to access to classes loaded into the JVM. You might wonder if all that we have done too much work for little result. The answer would be a firm “No.” First, you must keep in mind that Hello world example is elaborated here to explain the use of the Java agents. Things that can be done with java agent is enormous and they come handy when it’s complex code to rewrite. I have only just scratched the surface of what can be achieved with java agent, but hopefully, after reading this post, you will now know of their existence and can investigate things further. However, For persistence and proper monitoring, building a reliable java agent is a task that needs to be tackled by a team of dedicated engineers. Let me know how you got on!

Happy blogging! Happy Coding :)

#### References
[https://docs.oracle.com/javase/8/docs/api/java/lang/instrument/package-summary.html](https://docs.oracle.com/javase/8/docs/api/java/lang/instrument/package-summary.html)
[https://www.baeldung.com/java-instrumentation](https://www.baeldung.com/java-instrumentation)
[https://stackify.com/what-are-java-agents-and-how-to-profile-with-them/](https://stackify.com/what-are-java-agents-and-how-to-profile-with-them/)
[https://www.baeldung.com/java-classloaders](https://www.baeldung.com/java-classloaders)
