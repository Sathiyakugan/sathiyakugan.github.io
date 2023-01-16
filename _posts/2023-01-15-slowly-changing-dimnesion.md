---
title: "A Data Engineer's Guide to Slowly Changing Dimension"
layout: post
description: "In this blog, we'll take a deep dive into the concept of Slowly Changing Dimension (SCD) with real-world examples of each type and scenarios for implementation to help data professionals understand and implement the right type of SCD for their data warehouse."
date: '2023-01-15 17:31:36'
image: "/images/blogs/scd/slowly_changing_dimension.png"
image_caption: 'Photo by <a href="https://unsplash.com/de/@chrislawton?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">Chris Lawton</a> on <a href="https://unsplash.com/photos/5IHz5WhosQE?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">Unsplash</a>slowly_'
author: "Balakrishnan Sathiyakugan"
tags:
- scd
- data_engineering
- data_warehouse
---
The use of two tables, a Source System Table and a Data Warehouse Table, is common in data warehousing because it allows for the separation of operational data from analytical data. As a data engineer, understanding the concept of Slowly Changing Dimension (SCD) and how to implement it in your data warehouse is crucial in ensuring the consistency, accuracy, and completeness of your data.

In this article, we will dive deep into the different types of SCD and provide examples and explanations of how each type works. We will also explore the scenarios in which each type is best suited and the potential challenges that may arise when implementing them. By the end of this article, data engineers will have a better understanding of SCD and the knowledge to choose the appropriate type for their specific use case.

>Slowly Changing Dimension (SCD) is a technique used in data warehousing to handle changes in dimension data over time. Dimension data refers to the data that describes a certain aspect of the business, such as customers, products, or time. As this data changes over time, it can be difficult to track and manage these changes in a traditional relational database.

For an example, The ecommerce store may have a customer dimension that contains information about each customer, such as their name, address, and contact information. As customers move or update their contact information, the store must update its customer dimension to reflect these changes.

<hr style="border-top: 1.5px solid #a39dee; width: 100%; margin: 2em auto; text-align:center">

There are several types of SCD, each with its own advantages and disadvantages. Some common types include:


## Type 0: 
> No history is kept. The most recent data overwrites any previous data.

This means that whenever a change occurs in the source system table, the previous data in the dimension table is replaced with the new data, and the historical data is lost. This type of SCD is typically used when the dimension data is expected to never change, meaning that there is no need to track the history of the data.

For example, let's say you have a dimension table for customers in your data warehouse and the source system table has customer information such as customer ID, name, address, and phone number.

Source System Table:

| Customer ID | Name | Address       | Phone |
| --- | --- |---------------| --- |
| 1 | John | 123 Main St   | 555-555-5555 |
| 2 | Jane | 456 Queen Ave | 555-555-5556 |

Data Warehouse Table:

| Customer ID | Name | Address | Phone |
| --- | --- | --- | --- |
| 1 | John | 123 Main St | 555-555-5555 |
| 2 | Jane | 456 Queen Ave | 555-555-5556 |

Let's say John updates his address to "456 Queen Ave" and his phone number to "555-555-5557". The Resulted tables will be,

Source System Table:

| Customer ID | Name | Address | Phone |
| --- | --- | --- | --- |
| 1 | John | 456 Park Ave | 555-555-5557 |
| 2 | Jane | 456 Queen Ave | 555-555-5556 |

Data Warehouse Table:

| Customer ID | Name | Address | Phone |
| --- | --- | --- | --- |
| 1 | John | 456 Park Ave | 555-555-5557 |
| 2 | Jane | 456 Queen Ave | 555-555-5556 |

Notice that in the Data warehouse table, the address and phone number of John were updated without keeping the previous data.

Type 0 is the simplest and least complex of all the SCD types, it is useful in scenarios where the dimension data is expected to never change, or the historical data is not important. This type of SCD is not suitable for scenarios where the historical data is needed for analysis or reporting. However, it can be beneficial in situations where the storage space is limited and the dimension data is relatively static, as it will keep the dimension table small and simple.

<hr style="border-top: 1.5px solid #a39dee; width: 75%; margin: 2em auto; text-align:center">

## Type 1: 
>A new record is created each time a change occurs, and the previous record is kept in the dimension table.

It is used in Data Warehousing when the dimension data is expected to change infrequently. In this type, when a new data arrives in source system table, a new record is created in dimension table with the updated data, and the previous record is kept in the dimension table without any flag indicating that it is no longer the current one.

For example, let's say you have a dimension table for customers in your data warehouse and the source system table has customer information such as customer ID, name, address, and phone number.

Source System Table:

| Customer ID | Name | Address | Phone |
| --- | --- | --- | --- |
| 1 | John | 123 Main St | 555-555-5555 |
| 2 | Jane | 456 Park Ave | 555-555-5556 |

Data Warehouse Table:

| Customer ID | Name | Address | Phone | Date |
| --- | --- | --- | --- | --- |
| 1 | John | 123 Main St | 555-555-5555 | 1/1/2022 |
| 2 | Jane | 456 Park Ave | 555-555-5556 | 1/1/2022 |

Let's say John updates his address to "456 Park Ave" and his phone number to "555-555-5557"

Source System Table:

| Customer ID | Name | Address | Phone |
| --- | --- | --- | --- |
| 1 | John | 456 Park Ave | 555-555-5557 |
| 2 | Jane | 456 Park Ave | 555-555-5556 |

Data Warehouse Table:

| Customer ID | Name | Address | Phone | Date |
| --- | --- | --- | --- | --- |
| 1 | John | 123 Main St | 555-555-5555 | 1/1/2022 |
| 1 | John | 456 Park Ave | 555-555-5557 | 1/2/2022 |
| 2 | Jane | 456 Park Ave | 555-555-5556 | 1/1/2022 |

Notice that in the Data warehouse table, a new record was created for John with the new address and phone number, while the previous record is kept with the original

Type 1 is useful in scenarios where the dimension data is expected to change infrequently and the historical data is not important. This type of SCD allows for the preservation of historical data, but it can lead to an increase in the dimension table size and a more complex data warehouse. Additionally, it is important to keep track of which record is the current one, and which records are the previous ones. It is a simple solution that is easy to implement, but it does not provide the ability to track historical changes, which can be a significant limitation for some use cases.

<hr style="border-top: 1.5px solid #a39dee; width: 75%; margin: 2em auto; text-align:center">

## Type 2: 
>A new record is created each time a change occurs, and the previous record is kept in the dimension table, but a flag is added to indicate that the record is no longer the current one.

This means that whenever a change occurs in the source system table, a new record is created in the dimension table with the new data, and the previous record is kept in the dimension table with a flag indicating that it is no longer the current one.

For example,

Source System Table:

| Customer ID | Name | Address | Phone |
| --- | --- | --- | --- |
| 1 | John | 123 Main St | 555-555-5555 |
| 2 | Jane | 456 Park Ave | 555-555-5556 |

Data Warehouse Table:

| Customer ID | Name | Address | Phone | Date | Current |
| --- | --- | --- | --- | --- | --- |
| 1 | John | 123 Main St | 555-555-5555 | 1/1/2022 | 1 |
| 2 | Jane | 456 Park Ave | 555-555-5556 | 1/1/2022 | 1 |

Let's say John updates his address to "456 Park Ave" and his phone number to "555-555-5557"

Source System Table:

| Customer ID | Name | Address | Phone |
| --- | --- | --- | --- |
| 1 | John | 456 Park Ave | 555-555-5557 |
| 2 | Jane | 456 Park Ave | 555-555-5556 |

Data Warehouse Table:

| Customer ID | Name | Address | Phone | Date | Current |
| --- | --- | --- | --- | --- | --- |
| 1 | John | 123 Main St | 555-555-5555 | 1/1/2022 | 0 |
| 1 | John | 456 Park Ave | 555-555-5557 | 1/2/2022 | 1 |
| 2 | Jane | 456 Park Ave | 555-555-5556 | 1/1/2022 | 1 |

Notice that in the Data warehouse table, a new record was created for John with the new address and phone number, while the previous record is kept with the original data and a flag indicating that it is no longer the current one.

Type 2 is useful in scenarios where the dimension data is expected to change frequently and the historical data is important. This type of SCD allows for the preservation of historical data and easy querying of current data. However, it can lead to an increase in the dimension table size and a more complex data warehouse. Additionally, it is important to keep track of which record is the current one, and which records are the previous ones. It is important to consider the specific requirements of your data warehouse and the level of change that is expected for the dimension data when deciding whether to use Type 2 SCD.

<hr style="border-top: 1.5px solid #a39dee; width: 75%; margin: 2em auto; text-align:center">

## Type 3:

> Additional columns are added to the dimension table to store the previous data, and a flag is added to indicate that the record is no longer the current one.

This means that whenever a change occurs in the source system table, a new version of the record is created in the dimension table with the new data, and the previous versions are kept in the dimension table with a flag indicating the current version.

For example,

Data Warehouse Table:

| Customer ID | Name | Address | Phone | Current | Previous Address | Previous Phone |
| --- | --- | --- | --- | --- | --- | --- |
| 1 | John | 456 Park Ave | 555-555-5557 | 1 | 123 Main St | 555-555-5555 |
| 2 | Jane | 456 Park Ave | 555-555-5556 | 1 | NULL | NULL |

Notice that in the Data warehouse table, the current address and phone number of John were updated, but the previous address and phone number were also stored in the additional columns. A flag indicating that the current record is the updated one is added.

Type 3 is useful in scenarios where the dimension data is expected to change frequently and you need to track the historical changes. This type of SCD allows for the preservation of historical data, easy querying of current data and historical data, and the ability to view the dimension data as of a certain point in time. However, it can lead to an increase in the dimension table size and a more complex data warehouse. Additionally, it is important to keep track of which version is the current one, and which versions are the previous ones. It is important to consider the specific requirements of your data warehouse and the level of change that is expected for the dimension data when deciding whether to use Type 3 SCD.

<hr style="border-top: 1.5px solid #a39dee; width: 75%; margin: 2em auto; text-align:center">

## Type 4: 
It is a hybrid of Type 2 and Type 3, it is used when you need to track both historical data and the current state of the dimension data.
>A separate history table is created to store the previous data, and a flag is added to indicate that the record **is no longer the current one**.

In this type, a new record is created each time a change occurs, and the previous record is kept in the dimension table, but a flag is added to indicate that the record is no longer the current one, and also a new version of the record is created with a flag indicating the current version.

For example,

Source System Table:

| Customer ID | Name | Address | Phone |
| --- | --- | --- | --- |
| 1 | John | 123 Main St | 555-555-5555 |
| 2 | Jane | 456 Park Ave | 555-555-5556 |

Data Warehouse Table:

| Customer ID | Name | Address | Phone | Current |
| --- | --- | --- | --- | --- |
| 1 | John | 123 Main St | 555-555-5555 | 1 |
| 2 | Jane | 456 Park Ave | 555-555-5556 | 1 |

**History Table:**

| Customer ID | Name | Address | Phone | Date |
|------------| --- | --- | --- | --- |
|            |  |   |  |  |

Let's say John updates his address to "456 Park Ave" and his phone number to "555-555-5557"

Source System Table:

| Customer ID | Name | Address | Phone |
| --- | --- | --- | --- |
| 1 | John | 456 Park Ave | 555-555-5557 |
| 2 | Jane | 456 Park Ave | 555-555-5556 |

Data Warehouse Table:

| Customer ID | Name | Address | Phone | Current |
| --- | --- | --- | --- | --- |
| 1 | John | 456 Park Ave | 555-555-5557 | 1 |
| 2 | Jane | 456 Park Ave | 555-555-5556 | 1 |

**History Table:**

| Customer ID | Name | Address | Phone | Date |
| --- | --- | --- | --- | --- |
| 1 | John | 123 Main St | 555-555-5555 | 1/2/2022 |

Notice that in the Data warehouse table, the current address and phone number of John were updated, but the previous data is stored in a separate history table. A flag indicating that the current record is the updated one is added.

Type 4 is useful in scenarios where the dimension data is expected to change frequently and you need to track both historical data and the current state of the dimension data. This type of SCD allows for the preservation of historical data, easy querying of current data and historical data, and the ability to view the dimension data as of a certain point in time. However, it can lead to an increase in the dimension table size and a more complex data warehouse.

<hr style="border-top: 1.5px solid #a39dee; width: 75%; margin: 2em auto; text-align:center">

## Type 6 (Type 1 + Type 2 + Type 3): 
It is a method that combine the best of Type 1, Type 2 and  Type 3, where a new record is created each time a change occurs, and the previous record is kept in the dimension table. It also creates new version of the record with a flag indicating the current version, and also the new data is added to the previous record as additional columns.

> A separate history table is created to store the previous data, and a flag is added to indicate that the record is no longer the current one.

For example,

Source System Table:

| Customer ID | Name | Address | Phone |
| --- | --- | --- | --- |
| 1 | John | 123 Main St | 555-555-5555 |
| 2 | Jane | 456 Park Ave | 555-555-5556 |

Data Warehouse Table:

| Customer ID | Name | Address | Phone | Current |
| --- | --- | --- | --- | --- |
| 1 | John | 123 Main St | 555-555-5555 | 1 |
| 2 | Jane | 456 Park Ave | 555-555-5556 | 1 |

History Table:

| Customer ID | Name | Address | Phone | Date | Current |
| --- | --- | --- | --- | --- | --- |
|  |  |  |  |  |

Let's say John updates his address to "456 Park Ave" and his phone number to "555-555-5557"

Source System Table:

| Customer ID | Name | Address | Phone |
| --- | --- | --- | --- |
| 1 | John | 456 Park Ave | 555-555-5557 |
| 2 | Jane | 456 Park Ave | 555-555-5556 |

Data Warehouse Table:

| Customer ID | Name | Address | Phone | Current |
| --- | --- | --- | --- | --- |
| 1 | John | 456 Park Ave | 555-555-5557 | 1 |
| 2 | Jane | 456 Park Ave | 555-555-5556 | 1 |

History Table:

| Customer ID | Name | Address | Phone | Date | Current |
| --- | --- | --- | --- | --- | --- |
| 1 | John | 123 Main St | 555-555 |  |  |

Type 6 is useful in scenarios where the dimension data is expected to change frequently and you need to track both historical data and the current state of the dimension data, and also you want to maintain the original record. This type of SCD allows for the preservation of historical data, easy querying of current data and historical data, and the ability to view the dimension data as of a certain point in time. However, it can lead to an increase in the dimension table size and a more complex data warehouse. Additionally, it is important to keep track of which record is the current one, which records are the previous ones and which version is the current one. It is important to consider the specific requirements of your data warehouse and the level of change that is expected for the dimension data when deciding whether to use Type 6 SCD.

<hr style="border-top: 1.5px solid #a39dee; width: 75%; margin: 2em auto; text-align:center">

Type 5 and Type 7 Slowly Changing Dimension (SCD) are not commonly used in data warehousing and may not be supported by all ETL tools. Type 5 is a variation of Type 2, it creates a new record with the new data and adds a flag to indicate that the record is no longer the current one. Additionally, it adds the new data to the previous record as additional columns. Type 7 is similar to Type 6, it creates a new record with the new data and adds a flag to indicate that the record is no longer the current one. Additionally, it creates new version of the record with a flag indicating the current version and also the new data is added to the previous record as additional columns.

These types of SCD can be useful in certain scenarios where you need to track both historical data and the current state of the dimension data, and also you want to maintain the original record and also the new data in the same record. However, they can lead to an increase in the dimension table size and a more complex data warehouse. Additionally, it is important to keep track of which record is the current one, which records are the previous ones and which version is the current one. It is important to consider the specific requirements of your data warehouse and the level of change that is expected for the dimension data when deciding whether to use these types of SCD.

<hr style="border-top: 1.5px solid #a39dee; width: 100%; margin: 2em auto; text-align:center">

To implement SCD, data engineers should first evaluate the specific requirements of their data warehouse and the level of change that is expected for the dimension data. Based on this, they should choose the appropriate type of SCD and plan the database design and ETL process accordingly.

In summary, SCD is a crucial technique in data warehousing that allows for the tracking of changes in dimension data over time. As a data engineer, having a good understanding of the different types of SCD and how to implement them is essential in ensuring the consistency, accuracy, and completeness of the data in the data warehouse. It is important to evaluate the specific requirements of the data warehouse and choose the appropriate type of SCD to ensure the best performance and results.

## Reference

1. [Understanding Slowly Changing Dimensions](https://docs.oracle.com/cd/E41507_01/epm91pbr3/eng/epm/phcw/concept_UnderstandingSlowlyChangingDimensions-405719.html)
2. [Implementing Slowly Changing Dimensions (SCDs) in Data Warehouses](https://www.sqlshack.com/implementing-slowly-changing-dimensions-scds-in-data-warehouses/)
3. [Slowly Changing Dimension Transformation](https://learn.microsoft.com/en-us/sql/integration-services/data-flow/transformations/slowly-changing-dimension-transformation?view=sql-server-ver16)
4. [ntroduction to Slowly Changing Dimensions (SCD) Types](https://adatis.co.uk/introduction-to-slowly-changing-dimensions-scd-types/)
4. [6 Different Types of Slowly Changing Dimensions and How to Apply Them?](https://medium.com/geekculture/6-different-types-of-slowly-changing-dimensions-and-how-to-apply-them-b152ef908d4e)