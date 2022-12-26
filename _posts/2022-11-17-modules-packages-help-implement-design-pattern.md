---
layout: post
title: "How Python Modules and Packages Help You Implement Design Patterns"
description: Bring to the table win-win survival strategies to ensure proactive domination. At the end of the day, going forward, a new normal that. Capitalize on low hanging fruit to identify a ballpark value activity to beta test. Override the digital divide with additional.
date: 2022-11-17 15:01:35 +0300
image: '/images/blogs/python_packages/packages.jpg'
tags: [python, designpattern, singleton]
---

In Python, a package is a collection of modules that can be imported and used in other programs. A module is a file containing Python code that can be imported and used in other parts of a program.

To create a package in Python, you must first create a directory with the name of the package. Inside this directory, you can then create and save your modules. To divide the packages in Python, you can create subdirectories within the main package directory, and these can contain their own modules and subdirectories as well.

Every package in Python contains an `__init__.py` file, which serves as an indicator to Python that the directory is a package. This file can contain code that is executed when the package is imported, such as setting up variables or importing specific modules within the package.

Here is an example of a package in Python with a folder structure:

```
main_package
    __init__.py
    module1.py
    module2.py
    subpackage1
        __init__.py
        submodule1.py
    subpackage2
        __init__.py
        submodule2.py
```
In this example, "main_package" is the main package and contains two modules, "module1.py" and "module2.py". It also contains two subpackages, "subpackage1" and "subpackage2", which each contain their own `__init__.py` file and a module.

Here is an example of what the `__init__.py` file could contain:

```python
from .module1 import *
from .module2 import *
from .subpackage1.submodule1 import *
from .subpackage2.submodule2 import *

# Initialize variables
var1 = "Variable 1"
var2 = "Variable 2"
```
In this example, the `__init__.py` file imports all of the modules and submodules within the package, allowing them to be accessed when the package is imported. It also initializes two variables, "var1" and "var2", which can be accessed by other parts of the program when the package is imported.

To import and use the modules within this package, you would use the following syntax:

```python
from main_package import module1
from main_package.subpackage1 import submodule1
```

This allows you to access the functions and variables within these modules and use them in your code. Overall, using a package with a well-structured folder structure helps to keep your code organized and easy to understand.


> Modules and packages in Python can be used to implement the Singleton, Command and Facade design patterns.

## Singleton pattern

The Singleton pattern is a design pattern that ensures that a class only has one instance, and that this instance is globally accessible. This is useful in situations where you want to ensure that there is only one instance of a certain class, such as when working with resources that are expensive to create or when you want to ensure that there is only one point of access to a shared resource.

To implement the Singleton pattern in Python, you can use the "new" method to ensure that only one instance of the class is created. Here is an example of how to implement the Singleton pattern in Python:

```python
class Singleton:
    _instance = None

    def __new__(cls, *args, **kwargs):
        if not cls._instance:
            cls._instance = super().__new__(cls)
        return cls._instance

# Example usage of the singleton class
singleton1 = Singleton()
singleton2 = Singleton()
print(singleton1 is singleton2)  # Outputs: True
```
In this example, the "Singleton" class uses the "new" method to ensure that only one instance of the class is created. When the "Singleton" class is instantiated, the same instance is returned each time, allowing for easy access to the single instance of the class without having to create multiple copies.

<div class="gallery-box">
  <div class="gallery">
    <img src="/images/blogs/python_packages/A-Singleton-updating-instance-variables.jpg" loading="lazy" alt="Singleton Meme">
  </div>
</div>

There are other ways that you can implement the Singleton pattern such as using decorator and using metaclass.

### Implement Singleton using modules

There is really easy way to implement Singleton using modules.
you can create a class and instantiate it inside a module, and then import the module and use the instance in your code. This can be a useful way to implement the Singleton pattern, as it allows you to ensure that there is only one instance of the class and that it is globally accessible.

Here is an example:

```python
# Module containing the singleton class
class Singleton:
    def __init__(self):
        self.var = "Singleton instance"

# Create the singleton instance
singleton = Singleton()
```

```python
# Code that imports and uses the singleton instance
from singleton_module import singleton

print(singleton.var)  # Outputs: "Singleton instance"
```

In this example, the "Singleton" class is defined in a module called "singleton_module". An instance of this class is then created and saved as a global variable within the module. When the module is imported in other parts of the program, the instance can be accessed and used. Overall, this approach allows you to create a singleton class and instance in a module, and then import and use the instance in your code, ensuring that there is only one instance of the class and that it is globally accessible.

In this article we have covered how modules and packages are used in python and how it allows for the implementation of design patterns to improve the structure and efficiency of your application specially for the Singleton pattern. In the next article  
I will cover how to implement [Facade pattern](/blog/facade-python) using python moduels and packages. Thanks for the read.



