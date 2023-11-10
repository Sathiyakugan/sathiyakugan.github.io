---
title: 'Mastering Data Analytics with Window Functions'
layout: post
description: 'This blog post discusses the importance and usefulness of window functions in data analytics, including their ability to perform complex calculations, aggregate data, rank data, compare data, and analyze data over a set of rows.'
date: '2022-12-27 17:31:35'
image: "/images/blogs/sql/window_functions.jpg"
image_caption: 'Photo by <a href="https://unsplash.com/@rotekirsche20?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">rotekirsche20</a> on <a href="https://unsplash.com/wallpapers/desktop/windows?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">Unsplash</a>'
author: "Balakrishnan Sathiyakugan"
tags:
- sql_
- window_functions
- data_analytics
---

Window functions are a powerful tool in SQL that allow you to perform calculations across rows of data, without the need for a self-join or subquery. This can be especially useful when you want to compare one row to another, or when you want to compute a running total or cumulative average. 

>People's SQL education ends before this so adding these skills to your toolkit and learning to use them in a number of different situations will make you an extremely effective analyst.

A window function performs a calculation across a set of table rows that are somehow related to the current row. This is similar to the type of calculation that can be done with an aggregate function, but unlike regular aggregate functions, **the use of a window function does not cause rows to be grouped into a single output row** – the rows retain their separate identities.

To understand window functions, it's helpful to first understand the concept of a "window" in SQL. 
A window is a set of rows that a window function operates on, determined by the `OVER()` clause. For example, you might specify a window of all rows in a table, or a window of just the rows in a particular partition.

The `OVER()` clause can be used with a variety of statements, including `PARTITION BY`, `ORDER BY`, and `ROWS BETWEEN`. 
- The **`PARTITION BY`** statement divides the rows in the window into groups, and the window function is applied separately to each group. 
- The **`ORDER BY`** statement sorts the rows in the window according to the specified column or expression. 
- The **`ROWS BETWEEN`** statement specifies the number of rows before and after the current row to include in the window.

There are several types of window functions available in SQL, including:

- Aggregate functions: These functions perform an operation on a set of rows, such as `SUM()` or `AVG()`.
- Ranking functions: These functions assign a rank to each row in a set, such as `RANK()` or `DENSE_RANK()`.
- Offset functions: These functions return a value from a row a certain number of rows before or after the current row, such as `LAG()` or `LEAD()`.
- Analytic functions: These functions perform a calculation across a set of rows, such as `FIRST_VALUE()` or `LAST_VALUE()`.

## Reasons why window functions are useful:

- Perform complex calculations on a set of rows, without the need to use a self-join or a subquery. This makes it easier and more efficient to analyze data.
- Aggregate data over a set of rows and return a single result for each row. This is useful for tasks such as calculating the running sum or running average of a metric.
- Rank data within a set of rows, based on a specified criterion. This is useful for tasks such as finding the top or bottom performers in a dataset.
- Compare data within a set of rows, using the LAG() and LEAD() functions. This is useful for tasks such as comparing the current row to the previous or next row in a dataset.
- Analyze data over a set of rows, using the FIRST_VALUE(), LAST_VALUE(), and NTH_VALUE() functions. This is useful for tasks such as finding the first, last, or nth value in a dataset.

## Real World Scenario
I will delve deeply into the use of window functions in data analytics, using a specific scenario as an example. This blog covers the Rank functions. 

### Scenario 1
As a data analyst at `X` company, your Lead Account Manager(AM) has asked you to help motivate the sales team responsible for North America region by identifying the top-performing Account Manager and rewarding them with prizes. To do this, you will need to analyze the Account Manager from the past quarter to see which reps had the highest number of conversions.

Here is a sample of the data that might be used in the scenario I described, in which a company is trying to analyze the performance of its Account Manager over the past quarter:

| Name   | Conversions |
|--------|-------------|
| John   | 8           |
| Mary   | 6           |
| Jane   | 7           |
| Tom    | 8           |
| David  | 5           |


To analyze this data, the analyst might use `RANK()`, `DENSE_RANK()`, and `ROW_NUMBER()` in the following ways:

- `RANK()`: The company could use the rank function to determine the Account Manager's position relative to other Account Manager in terms of total conversions. For example, the Account Manager with the highest sales conversions would have a rank of 1, the salesperson with the second highest sales revenue would have a rank of 2, and so on.
- `DENSE_RANK()`: The company could also use the dense rank function to assign a rank to each Account Manager, but with the difference that dense rank does not leave any gaps between ranks. For example, if two Account Manager have the same conversions, they would both receive the same rank, and the next salesperson would receive a rank that is one greater than the previous rank, rather than skipping a rank as in the regular rank function.
- `ROW_NUMBER()`: The company could use the row number function to assign a unique number to each row in the data set, starting from 1. This could be useful for identifying and referencing specific Account Manager within the data set.

Here is a sample query that uses the above functions to analyze the sample data table, ordered by the number of conversions:


```sql
SELECT 
  Name, 
  Conversions, 
  RANK() OVER (ORDER BY Conversions DESC) AS Rank,
  DENSE_RANK() OVER (ORDER BY Conversions DESC) AS DenseRank,
  ROW_NUMBER() OVER (ORDER BY Conversions DESC) AS RowNumber
FROM sales_data
ORDER BY Conversions DESC;
```

The results of this query would be as follows:

| Name   | Conversions | Rank | Dense Rank | Row Number |
|--------|-------------|------|------------|------------|
| John   | 8           | 1    |          1 |          1 |
| Tom    | 8           | 1    |          1 |          2 |
| Jane   | 7           | **3**    |          **2** |          3 |
| Mary   | 6           | 4    |          3 |          4 |
| David | 5           | 5    |          4 |          5 |

Here in this example, `RANK()` will keep the ranking, so the numbering may go 1, 1, 3, 4 etc, whereas `DENSE_RANK()` will **never give any gaps**. The `ROW_NUMBER()`  assigns a unique number to each row in the data set, starting from 1.

### Scenario II
Lead Account Manager(AM) further wants you to see how how top 3 Account Manager performs in each region.
He has used Row Number for his evaluation and want the details for John, Tom, Jane.

Here is a sample of the data that might be used in the scenario II described,

| name | region | Conversions |
| --- | --- |-------------|
| John | North America | 8           |
| Tom | North America | 8           |
| Jane | North America | 7           |
| John | Asia | 8           |
| Tom | Europe | 15          |
| Jane | South America | 20          |
| John | Europe | 12          |
| Tom | Asia | 5           |
| Jane | Asia | 20          |
| Jane | Europe | 8           |

Here is a **`SELECT`** statement that uses the Ranking functions to retrieve the performance data for each Account Manager in each region, ordered by conversions:

```sql
SELECT name, region, conversions,
       RANK() OVER (PARTITION BY name ORDER BY conversions DESC) as rank,
       DENSE_RANK() OVER (PARTITION BY name ORDER BY conversions DESC) as dense_rank,
       ROW_NUMBER() OVER (PARTITION BY name ORDER BY conversions DESC) as row_number
FROM sales_data
ORDER BY name, conversions DESC;
```

This `SELECT` statement uses the `PARTITION BY` clause to group the data by name, and the `RANK()`, `DENSE_RANK()`, and `ROW_NUMBER()` functions to assign rankings to the Account Managers based on their conversions. The `ORDER BY` clause orders the results by name and then by conversions in descending order.

In conclusion, there are several different patterns for performing data transformation, each with its own benefits and drawbacks. The appropriate pattern will depend on the specific requirements and constraints of the data transformation scenario. Cloud services such as AWS, Azure, and Google Cloud offer a range of tools and services that can be used to implement these patterns in a scalable and cost-effective manner.

Here is the output of the SELECT statement you provided:

| name | region | conversions | rank | dense_rank | row_number |
| --- | --- |-------------|------|------------|------------|
| Jane | South America | 20          | 1    | 1          | 1          |
| Jane | Asia | 20          | 1    | 1          | 2          |
| Jane | Europe | 8           | 3    | 2          | 3          |
| Jane | North America | 7           | 4    | 3          | 4          |
| John | Asia | 10          | 1    | 1          | 1          |
| John | Europe | 12          | 2    | 2          | 2          |
| John | North America | 8           | 3    | 3          | 3          |
| Tom | North America | 8           | 1    | 1          | 1          |
| Tom | Europe | 15          | 2    | 2          | 2          |
| Tom | Asia | 5           | 3    | 3          | 3          |

In the `SELECT` statement you provided, the `PARTITION BY` clause is used to group the data by `name`. This means that the `RANK()`, `DENSE_RANK()`, and `ROW_NUMBER()` functions are applied separately to each group of rows with the same name.
<div class="gallery-box">
  <div class="gallery">
    <img src="/images/blogs/sql/rank_functions_explanations.png" loading="lazy" alt="SQL rank functions explanations" />
  </div>
</div>

For example, for the rows with the name `Jane`, the `RANK()` function assigns a rank based on the conversions within that group, skipping ranks for reps with the same conversions. The `DENSE_RANK()` function assigns a rank based on the conversions within that group, without skipping ranks and assigning the same rank to all reps with the same conversions. The `ROW_NUMBER()` function assigns a unique number to each row within the `Jane` group, based on the conversions.

The same process is repeated for each group of rows with the same name. This allows you to see how each Account Manager performs within their own group, rather than comparing their conversions to all Account Managers in all regions.

In this discussion, we have looked at what window functions are and how they are used in data analytics. We have also explored two scenarios where rank functions are used in data analytics. In the upcoming blog, we will look at other types of window functions, such as aggregate functions, offset functions, and analytic functions. Stay tuned to learn more about these useful tools in data analytics!


### References 
* [RANK() function documentation](https://www.w3schools.com/sql/func_sqlserver_rank.asp) from W3Schools
* [Micro-Batching: The Best of Both Worlds](https://www.confluent.io/blog/micro-batching-the-best-of-both-worlds/)
* [Window Functions documentation](https://www.postgresql.org/docs/current/functions-window.html) from PostgreSQL
* [Intro to SQL for Data Science](https://www.udacity.com/course/intro-to-sql-for-data-science--ud198) from Udacity