---
layout: post
title: "Become a Python Pro: Tips for Writing Reliable Code with Testing and Logging"
description: Writing production-level Python code involves ensuring that the code is not only functional, but also efficient, maintainable, and easy to understand. To achieve these goals, it is important to follow best practices in Python development, such as using logging and testing to ensure the code is correct and easy to debug.
date: 2022-10-12 15:01:35 +0300
image: '/images/blogs/clean_code/testing.jpg'
tags: [python, logging, testing]
---

In the previous blog post, I discussed strategies for elevating your Python skills, including,
* Keep it modular, clean & efficient
* Optimizing your code

In the current article I will cover the following topics
* Logging and Instrumentation
* Testing


## Testing the code
Testing your code is an essential part of the development process. It helps you catch errors and faulty conclusions before they make any major impact. In the field of data science, proper testing is especially important because errors and faulty conclusions may not always be easily detectable. You might have values being encoded incorrectly, features being used inappropriately, or unexpected data breaking assumptions. To catch these errors and ensure the quality and accuracy of your analysis, it is necessary to properly test your code.

There are several types of tests that you can use in Python development, including unit tests and integration tests.

### Unit tests

Unit tests are a type of test that cover a "unit" of code, usually a single function, independently from the rest of the program. These tests are useful for verifying the correctness of a small piece of code.

An example of a unit test in Python is shown below:

```python
def test_addition():
    assert add(2, 3) == 5
    assert add(-2, 3) == 1
    assert add(2, -3) == -1
    assert add(-2, -3) == -5
```

In this example, the `add` function is being tested with several different input values. The `assert` statement is used to check if the output of the `add` function is correct. If any of the `assert` statements fail, the test will fail.

Unit tests have several advantages. They are relatively quick to write and run, and they provide a high level of confidence that a small piece of code is working correctly.

However, unit tests have some disadvantages as well. They may not catch interactions between different units of code, and they may not adequately test the overall functionality of the program.

### Test-driven development (TDD)

Test-driven development (TDD) is a development process in which you write tests for tasks before you even write the code to implement those tasks. The idea behind TDD is that you first write a test that checks for the desired behavior of a piece of code, and then you write the code to make the test pass. This process helps ensure that the code you write is well-tested and meets the requirements of the task.

TDD has several benefits. It helps ensure that your code is well-tested, and it can also help you design your code in a more modular and efficient way.

### Integration tests

In addition to unit tests, it is also important to test the integration of different units of code. Integration tests check how different units of code work together and ensure that the overall functionality of the program is working correctly.

An example of an integration test in Python is shown below:

```python
def test_integration():
    result = run_program()
    assert result == expected_output
```

In this example, the `run_program` function is called and the result is compared to the `expected_output`. This test checks that the program is working correctly as a whole, rather than just testing individual units of code.

Here are some resources to learn about testing
* Four Ways Data Science Goes Wrong and How Test-Driven Data Analysis Can Help: [Blog Post](https://www.predictiveanalyticsworld.com/patimes/four-ways-data-science-goes-wrong-and-how-test-driven-data-analysis-can-help/6947/)
* Ned Batchelder: Getting Started Testing: [Slide Deck](https://speakerdeck.com/pycon2014/getting-started-testing-by-ned-batchelder) and [Presentation Video](https://www.youtube.com/watch?v=FxSsnHeWQBY)

## Logging

Logging is a valuable tool for understanding the events that occur while running your program. It can help you troubleshoot issues and track the progress of your code. In this section, we will discuss best practices for logging in Python development.

### Log messages

Log messages are records of events that occur while running your software. They can be used to provide information about the state of the program, as well as any errors or exceptions that may have occurred.

Here are a few tips for writing good log messages:

* Be professional and clear: Log messages should be written in a clear and professional manner. Avoid using slang or colloquial language, and use proper grammar and spelling.

    ```python
    import logging
    
    # Bad log Message
    logging.error("Hmmm... this isn't working???")
    
    # Good log Message
    logging.error("Couldn't parse file.")
    ```
* Be concise: Keep log messages as concise as possible. Avoid using unnecessary words or filler text.

    ```python
    import logging
    
    # Bad log Message
    logging.info("Start Product Recommendation Process")
    logging.info("We have completed the steps necessary and will now proceed with the recommendation process for the records in our product database.")
  
    # Good log Message
    logging.info("Generating product recommendations.")
    ```
* Use normal capitalization: Capitalize log messages in the same way you would a sentence. Do not use all caps, as it can be difficult to read.

    ```python
    import logging
    
    # Bad log Message
    logging.info("GENERATING PRODUCT RECOMMENDATIONS.")

    # Good log Message
    logging.info("Generating product recommendations.")
    ```
* Choose the appropriate level for logging: Different levels of logging are available, including debug, info, warning, and error. Choose the appropriate level for the message you are logging. For example, use the "debug" level for messages that are only needed for debugging purposes, and use the "warning" level for messages that indicate a potential issue.
  - Debug: anything that happens in the program. 
  - Error: any error that occurs. 
  - Info: all user-driven or system-specific actions, such as regularly scheduled operations.

It is important to use logging appropriately in your code. Overuse of logging can result in a large volume of messages, which can make it difficult to find important information. On the other hand, underuse of logging can make it difficult to understand what is happening in your code.

In this article we coverd how testing helps ensure that the code is correct and functions as intended, while logging provides useful information for debugging and understanding the code's behavior. In the [next article](/blog/best-prectices-python-documentation-version-control), we will cover best practices for documentation, version control, and code review.