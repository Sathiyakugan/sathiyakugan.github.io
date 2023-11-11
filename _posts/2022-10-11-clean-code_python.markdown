---
layout: post
title: "Elevate Your Python Skills: Techniques for Writing Production-Ready Code"
description: I have extensive experience in Python, including developing an authentication SDK for WSO2 Identity Server and mentoring an anomaly detection project. In my work, I have implemented standards to ensure that our Python projects meet production-level. I am sharing my key learnings in this article to help other Python developers create stable, readable, and extendable code for production environments.
excerpt: I have extensive experience in Python, including developing an authentication SDK for WSO2 Identity Server and mentoring an anomaly detection project. In my work, I have implemented standards to ensure that our Python projects meet production-level. I am sharing my key learnings in this article to help other Python developers create stable, readable, and extendable code for production environments.
date: 2022-10-11 15:01:35 +0300
image: '/images/blogs/clean_code/clean_code.jpg'
tags: [python, clean_code, programming]
---
Writing production-level Python code is about more than just writing code that works. It's about writing code that is efficient, maintainable, and easy to understand. In this blog post, we will cover several key strategies for achieving this, including

* Keep it modular, clean & efficient
* Optimizing your code

In the next two article we will cover the following topics
* Logging and Instrumentation
* Testing
* Documentation
* Version control and Code review

## Keep it clean, modular & efficient

When you work in the industry or contribute to an open-source project, there are higher chances that your code will be running on the production. The code should be reliable, efficient, and bug-free, but this is not always the case. We should break the code logically into functions and modules.

#### Writing Clean Code
Code that is readable, simple, and concise. Clean production-quality code is crucial for collaboration and maintainability in software development.

Using meaningful names in your code is an important aspect of writing clean and readable code. There are several guidelines you should follow to ensure that your names are effective:
* Be descriptive and imply type: Choose names that accurately describe the purpose or type of the entity you are naming (such as a variable, function, or class). For example, `customer_name` is a more descriptive and meaningful name than simply `name`.
* Be consistent but clearly differentiate: Use a consistent naming convention throughout your code and ensure that similar entities have similar names. However, also make sure to clearly differentiate between different entities by using unique names.
* Avoid abbreviations and single letters: Abbreviations and single letters can be hard to understand and may not accurately describe the purpose or type of the entity. Instead, use full, descriptive words.
* Long names aren't the same as descriptive names: While descriptive names are important, it is also important to strike a balance between conciseness and clarity. Avoid using excessively long names that are difficult to read and understand.

  ```python
  # BAD
  def get_customer_data(cust_id):
    # do something
  
  # GOOD
  def get_customer_information(customer_id):
    # do something
  
  # BAD
  def get_employee_names(emp_ids):
    # do something
  
  # GOOD
  def get_employee_names_by_id(employee_ids):
    # do something
  ```
In this example, the function `get_customer_information` uses a descriptive and meaningful name that implies the type (customer information). It is also consistent in its use of snake case for variable names. The function `get_employee_names_by_id` also follows these guidelines, using a descriptive and meaningful name that clearly differentiates it from other functions (such as `get_customer_information`). It also avoids abbreviations (such as "emp") and single letters (such as "e") in favor of more descriptive names. Finally, it is worth noting that long names are not always the same as descriptive names. It is important to strike a balance between conciseness and clarity.



#### Writing Modular Code

Follow the tips below to write modular code.

* DRY (Don't Repeat Yourself) : Instead of repeating the same code in multiple places, it is better to abstract it out into a separate function. For example:

  ```python
  # BAD
  def calculate_area(length, width):
    return length * width
  
  def calculate_volume(length, width, height):
    return length * width * height
  
  # GOOD
  def calculate_area(length, width):
    return length * width
  
  def calculate_volume(length, width, height):
    return calculate_area(length, width) * height
  ```

* Abstract out logic to improve readability :
It is often useful to break up complex logic into smaller, more manageable chunks by using functions. This makes the code easier to understand and maintain. For example:

  ```python
  # BAD
  def calculate_price(item, quantity, discount):
    if item == 'apple':
      price = 0.5
    elif item == 'banana':
      price = 0.25
    else:
      price = 1
    return price * quantity * (1 - discount)
  
  # GOOD
  def get_item_price(item):
    if item == 'apple':
      return 0.5
    elif item == 'banana':
      return 0.25
    else:
      return 1
  
  def calculate_price(item, quantity, discount):
    price = get_item_price(item)
    return price * quantity * (1 - discount)
  ```

* Minimize the number of entities (functions, classes, modules, etc.)
  There are trade-offs to having function calls instead of inline logic. If you have broken up your code into an unnecessary amount of functions and modules, you'll have to jump around everywhere if you want to view the implementation details for something that may be too small to be worth it. Creating more modules doesn't necessarily result in effective modularization. For example:

  ```python
  # BAD
  def get_car_info(car_id):
    # retrieve and return information about the car with the given ID
  
  def get_truck_info(truck_id):
    # retrieve and return information about the truck with the given ID
  
  def get_motorcycle_info(motorcycle_id):
    # retrieve and return information about the motorcycle with the given ID
    
  # GOOD
  Class Vehicle:
    def __init__(self, id, type):
      self.id = id
      self.type = type
      self.info = get_vehicle_info(id, type)
  
  def get_vehicle_info(vehicle_id, vehicle_type):
    # retrieve and return information about the vehicle with the given ID and type
  
  car = Vehicle(1, "car")
  truck = Vehicle(2, "truck")
  motorcycle = Vehicle(3, "motorcycle")
  ```

* Functions should do one thing
  It is generally a good idea to design your functions so that they perform a single, well-defined task. This makes the functions easier to understand and maintain. For example:

  ```python
  # BAD
  def process_order(order):
    # validate the order
    if order['quantity'] > 100:
      raise ValueError('Invalid quantity')
    if order['price'] < 0:
      raise ValueError('Invalid price')
    # send confirmation email
    send_email(order['email'], 'Order Confirmation')
    # update database
    update_database(order)
  
  # GOOD
  def validate_order(order):
    if order['quantity'] > 100:
      raise ValueError('Invalid quantity')
    if order['price'] < 0:
      raise ValueError('Invalid price')
  
  def send_confirmation(order):
    send_email(order['email'], 'Order Confirmation')
  
  def update_database(order):
    # update database
  
  def process_order(order):
    validate_order(order)
    send_confirmation(order)
    update_database(order)
  ```

* Arbitrary variable names can be more effective in certain functions
In some cases, it can be more effective to use arbitrary or "dummy" variable names in a function, especially if the function is intended to be used as a utility or helper function. For example:

  ```python
  # BAD
  def add(x, y):
    return x + y
  
  # GOOD
  def add(a, b):
    return a + b
  ```

* Try to use fewer than three arguments per function
It is generally a good idea to use fewer than three arguments per function, as this helps to keep the function simple and easy to understand. If a function needs to accept more than three arguments, it may be a sign that the function is trying to do too much and could be refactored into smaller, more focused functions. For example:

  ```python
  # BAD
  def process_order(order_id, customer, items, quantity, discount, shipping_address):
    # do something
  
  # GOOD
  def process_order(order_info):
    # do something
  ```

## Optimising your code

Python is a language that offers a wide range of tools and features for solving problems in an efficient and elegant manner. Before writing any code, it is always a good idea to do some research and see if there is a built-in or well-established way to accomplish your task. Resources such as StackOverflow can be helpful in this regard. However, it is important to remember that writing a custom function to solve a problem that has already been addressed by the Python ecosystem is not considered a best practice. Instead, strive to make use of the existing tools and resources available to you in a pythonic way.

* `collections.defaultdict`: This is a subclass of the built-in dict class that provides a default value for a key that does not exist in the dictionary. This can be useful if you want to avoid having to check if a key exists in the dictionary before accessing it, and can lead to more concise and readable code. For example:

  ```python
  from collections import defaultdict
  
  # Without defaultdict
  fruits = {}
  if 'apple' in fruits:
      count = fruits['apple']
  else:
      count = 0
  fruits['apple'] = count + 1
  
  # With defaultdict
  fruits = defaultdict(int)
  fruits['apple'] += 1
  ```

* `zip(iterable1, iterable2)`: This function returns an iterator that aggregates elements from each of the input iterables. It is often used to iterate over two or more iterables at the same time, for example to pair elements from different lists or to loop over the elements of a list and their indices. For example:

  ```python
  names = ['Alice', 'Bob', 'Charlie']
  ages = [25, 30, 35]
  
  for name, age in zip(names, ages):
      print(f'{name} is {age} years old')
  
  # Output:
  # Alice is 25 years old
  # Bob is 30 years old
  # Charlie is 35 years old
  ```

* `"".join(iterable)`: This method concatenates all the elements of an iterable (such as a list) into a single string, using the specified string as a separator. It is generally faster than using the += operator to concatenate strings, especially for large lists. For example:

  ```python
  words = ['Hello', 'world', '!']
  
  # Using +=
  sentence = ''
  for word in words:
      sentence += word + ' '
  print(sentence)
  
  # Output: Hello world !
  
  # Using join
  sentence = " ".join(words)
  print(sentence)
  
  # Output: Hello world !
  ```

* `for i, element in enumerate(iterable)`: This is a common idiom for iterating over the elements of a list and their indices. It is more concise and readable than using a for loop with range and indexing. For example:

  ```python
  numbers = [1, 2, 3, 4, 5]
  
  # Using range and indexing
  for i in range(len(numbers)):
      print(i, numbers[i])
  
  # Output:
  # 0 1
  # 1 2
  # 2 3
  # 3 4
  # 4 5
  
  # Using enumerate
  for i, number in enumerate(numbers):
      print(i, number)
  
  # Output:
  # 0 1
  # 1 2
  # 2 3
  # 3 4
  # 4 5
  ```

* `bisect, bisect_left, bisect_right`: These functions are part of the bisect module and are used to perform binary search on a sorted list. They allow you to quickly find the index where an element should be inserted in order to maintain the list's sorted order, or to find the indices of the elements that match a given value. For example:

  ```python
  import bisect
  
  # Find the index where 50 should be inserted in a sorted list to maintain its sorted order
  numbers = [10, 20, 30, 40, 50, 60, 70, 80, 90]
  index = bisect.bisect(numbers, 50)
  print(index)  # 5
  
  # Find the index of the leftmost occurrence of 50 in the list
  index = bisect.bisect_left(numbers, 50)
  print(index)  # 4
  
  # Find the index of the rightmost occurrence of 50 in the list
  index = bisect.bisect_right(numbers, 50)
  print(index)  # 5
  
  # Find the indices of all occurrences of 50 in the list
  left_index = bisect.bisect_left(numbers, 50)
  right_index = bisect.bisect_right(numbers, 50)
  occurrences = numbers[left_index:right_index]
  print(occurrences)  # [50]
  ```
As you can see, `bisect` returns the index where an element should be inserted in order to maintain the list's sorted order, `bisect_left` returns the index of the leftmost occurrence of an element in the list, and `bisect_right` returns the index of the rightmost occurrence of an element in the list.


* `collections.deque`: This is a double-ended queue that supports fast insertion and deletion at both ends. It is useful for implementing data structures that need to efficiently support adding and removing elements from both ends, such as queues and double-ended queues (deques). For example:

  ```python
  from collections import deque
  
  # Create a deque with initial elements 1, 2, 3
  d = deque([1, 2, 3])
  
  # Append 4 to the right side
  d.append(4)
  print(d)  # deque([1, 2, 3, 4])
  
  # Prepend 0 to the left side
  d.appendleft(0)
  print(d)  # deque([0, 1, 2, 3, 4])
  
  # Pop an element from the right side
  x = d.pop()
  print(x)  # 4
  print(d)  # deque([0, 1, 2, 3])
  
  # Pop an element from the left side
  x = d.popleft()
  print(x)  # 0
  print(d)  # deque([1, 2, 3])
  ```

* `heapq`: This is a module that provides an implementation of the heap queue algorithm, also known as the priority queue algorithm. It allows you to efficiently find the smallest element in a dataset, or to find the elements with the smallest or largest values for a specific key function. For example:

  ```python
  import heapq
  
  # Find the three smallest elements in a list
  numbers = [10, 20, 30, 40, 50, 60, 70, 80, 90]
  smallest = heapq.nsmallest(3, numbers)
  print(smallest)  # [10, 20, 30]
  
  # Find the three smallest elements in a list, using a key function
  words = ['apple', 'banana', 'cherry', 'date', 'elderberry', 'fig', 'grape']
  shortest = heapq.nsmallest(3, words, key=len)
  print(shortest)  # ['fig', 'date', 'apple']
  ```

In this article, we covered several strategies for writing clean, efficient, and maintainable Python code. We discussed the importance of keeping your code modular and organized, using meaningful names and nice whitespace, and following best practices for code structure and style. In the next article, we will delve deeper into some of the other key aspects of writing production-level Python code, including logging and instrumentation, testing, documentation, and version control and code review. Stay tuned for [more tips](/blog/best-practices-logging-testing) and best practices on how to take your Python skills to the next level.