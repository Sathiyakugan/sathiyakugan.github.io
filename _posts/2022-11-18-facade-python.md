---
layout: post
title: Using Modules and Packages to Create Facade in Python
description: Modules and packages in Python can be used to implement the Facade design pattern, which provides a simplified interface to a complex system. By creating a package or module that serves as a facade, you can expose a simplified interface to the rest of the system, allowing users to access and use the features of the system with ease. This can be useful in situations where you want to provide a simple, easy-to-use interface to a complex system.
date: 2022-11-18 18:05:55 +0300
image: '/images/blogs/python_packages/facade.jpg'
tags: [python, design_pattern, facade]
---
In the [previous blog](/blog/modules-packages-help-implement-design-pattern) post, I discussed ,how modules and packages are used in python and how it allows for the implementation of design patterns to improve the structure and efficiency of your application specially for the Singleton pattern. In this article
I will cover how to implement Facade pattern using python moduels and packages.

## Facade pattern
The Facade pattern is a design pattern that provides a simplified interface to a complex system. This is useful in situations where you want to provide a simple, easy-to-use interface to a complex system, without exposing the underlying complexity to the user.

### Real-world scenario

Imagine that you are developing a software application that connects to a variety of different databases and data sources. These databases and data sources have different interfaces and protocols, and it can be complex and time-consuming to connect to and retrieve data from each one individually.

To make it easier for users of your application to access data from these different sources, you could implement the Facade pattern by creating a `DataAccessFacade` class or module that provides a simplified interface for accessing data. This facade class or module could then handle the complexities of connecting to and retrieving data from the various databases and data sources, allowing the user to access data with a simple, easy-to-use interface.

For example, the user might be able to access data from a MySQL database like this:

```python
data = get_data_from_mysql("SELECT * FROM table")
```
The `DataAccessFacade` class or module would then handle the details of connecting to the MySQL database and executing the SQL query, and would return the data to the user in a simple, easy-to-use format.


### Implementation

Folder structure 

```
main_package
    __init__.py
    databases.py
main.py
```

Here is an example of how you might implement the `databases` class or module in the scenario described above:

```python
# Package containing the various database and data source components
def execute_query_mysql(query):
    # Code to connect to MySQL database and execute query
    return data

def read_data_csv(file_path):
    # Code to read data from CSV file
    return data
```

Implement the `facade` module in the scenario described above using packages and modules, and exposing the facade functions as part of the package's `init.py` file:

```python
# __init__.py within the package serving as a facade
from .databases import *

def get_data_from_mysql(query):
    return execute_query_mysql(query)

def get_data_from_csv(file_path):
    return read_data_csv(file_path)
```

```python
# Example usage of the facade functions
from main_package import get_data_from_mysql

data = get_data_from_mysql("SELECT * FROM table")
```


In this example, the `__init__.py`  serves as a facade, providing a simplified interface for accessing data from different sources. It has functions for getting data from a MySQL database and from a CSV file, and these functions handle the complexities of connecting to and retrieving data from these sources.

The facade functions are then exposed as part of the `init` module within the `main_package` package, allowing the user to access them as if they were part of the package itself. When the `main_package` functions are called, they use the underlying functions in the `main_package` package to access and retrieve data from the respective sources.

Overall, this implementation of the Facade pattern using packages and modules provides a simplified interface for accessing data from different sources, allowing the user to access and use the features of the application with ease. The facade functions are easily accessible as part of the package, making it easy for the user to use them without having to import the facade module directly.