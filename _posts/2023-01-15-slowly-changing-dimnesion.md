---
title: "A Data Engineer's Guide to Slowly Changing Dimension"
layout: post
description: "In this blog, we'll take a deep dive into the concept of Slowly Changing Dimension (SCD) with real-world examples of each type and scenarios for implementation to help data professionals understand and implement the right type of SCD for their data warehouse."
excerpt: "In this blog, we'll take a deep dive into the concept of Slowly Changing Dimension (SCD) with real-world examples of each type and scenarios for implementation to help data professionals understand and implement the right type of SCD for their data warehouse."
date: '2023-01-15 17:31:36'
image: "/images/blogs/scd/slowly_changing_dimension.png"
image_caption: 'Photo by <a href="https://unsplash.com/de/@chrislawton?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">Chris Lawton</a> on <a href="https://unsplash.com/photos/5IHz5WhosQE?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">Unsplash</a>slowly_'
author: "Balakrishnan Sathiyakugan"
tags:
- scd_
- data_engineering
- data_warehouse
---
The use of two tables, a Source System Table and a Data Warehouse Table, is common in data warehousing because it allows for the separation of operational data from analytical data. As a data engineer, understanding the concept of Slowly Changing Dimension (SCD) and how to implement it in your data warehouse is crucial in ensuring the consistency, accuracy, and completeness of your data.

In this article, we will dive deep into the different types of SCD and provide examples and explanations of how each type works. We will also explore the scenarios in which each type is best suited and the potential challenges that may arise when implementing them. By the end of this article, data engineers will have a better understanding of SCD and the knowledge to choose the appropriate type for their specific use case.

>Slowly Changing Dimension (SCD) is a technique used in data warehousing to handle changes in dimension data over time. Dimension data refers to the data that describes a certain aspect of the business, such as customers, products, or time. As this data changes over time, it can be difficult to track and manage these changes in a traditional relational database.

For an example, The ecommerce store may have a customer dimension that contains information about each customer, such as their name, address, and contact information. As customers move or update their contact information, the store must update its customer dimension to reflect these changes.

<hr style="border-top: 1.5px solid #a39dee; width: 100%; margin: 2em auto; text-align:center">

There are several types of SCD, each with its own advantages and disadvantages. Some common types include:

### **What is a Slowly Changing Dimension (SCD)?**

SCD is a technique used in data warehousing to manage changes in dimension data over time. Dimension data describes aspects of the business, like customers, products, or time. Tracking and managing these changes in a traditional relational database can be challenging. SCDs offer strategies to handle historical data in a way that reflects business operations over time.

---

## **Types of Slowly Changing Dimensions**

### **Type 0: Static Dimension**

- **What it is:** No history is kept. The most recent data overwrites any previous data.
- **When to use it:** Use Type 0 when the dimension data is static and not expected to change.

### Example

**Source System Table:**

| Customer ID | Name | Address | Phone |
| --- | --- | --- | --- |
| 1 | John | 123 Main St | 555-555-5555 |
| 2 | Jane | 456 Queen Ave | 555-555-5556 |

**Data Warehouse Table (Before Update):**

| Customer ID | Name | Address | Phone |
| --- | --- | --- | --- |
| 1 | John | 123 Main St | 555-555-5555 |
| 2 | Jane | 456 Queen Ave | 555-555-5556 |

**Data Warehouse Table (After Update):**

| Customer ID | Name | Address | Phone |
| --- | --- | --- | --- |
| 1 | John | 456 Park Ave | 555-555-5557 |
| 2 | Jane | 456 Queen Ave | 555-555-5556 |

*Note: John's updated address and phone number overwrite the previous data.*

---

### **Type 1: Overwrite**

- **What it is:** When a change occurs, the existing record is updated (overwritten), leading to the loss of historical data.
- **When to use it:** Use Type 1 when tracking historical changes is not important.

### Example

**Source System Table:**

| Customer ID | Name | Address | Phone |
| --- | --- | --- | --- |
| 1 | John | 123 Main St | 555-555-5555 |
| 2 | Jane | 456 Park Ave | 555-555-5556 |

**Data Warehouse Table (Before Update):**

| Customer ID | Name | Address | Phone |
| --- | --- | --- | --- |
| 1 | John | 123 Main St | 555-555-5555 |
| 2 | Jane | 456 Park Ave | 555-555-5556 |

**Data Warehouse Table (After Update):**

| Customer ID | Name | Address | Phone |
| --- | --- | --- | --- |
| 1 | John | 456 Park Ave | 555-555-5557 |
| 2 | Jane | 456 Park Ave | 555-555-5556 |

*Note: John's updated address and phone number replace the previous record.*

---

### **Type 2: Versioning**

- **What it is:** A new record is created for each change, preserving historical data. A flag indicates the current record.
- **When to use it:** Use Type 2 when historical data and the ability to track changes over time are important.

### Example

**Source System Table:**

| Customer ID | Name | Address | Phone |
| --- | --- | --- | --- |
| 1 | John | 123 Main St | 555-555-5555 |
| 2 | Jane | 456 Park Ave | 555-555-5556 |

**Data Warehouse Table (Before Update):**

| Customer ID | Name | Address | Phone | Current |
| --- | --- | --- | --- | --- |
| 1 | John | 123 Main St | 555-555-5555 | Yes |
| 2 | Jane | 456 Park Ave | 555-555-5556 | Yes |

**Data Warehouse Table (After Update):**

| Customer ID | Name | Address | Phone | Current |
| --- | --- | --- | --- | --- |
| 1 | John | 123 Main St | 555-555-5555 | No |
| 1 | John | 456 Park Ave | 555-555-5557 | Yes |
| 2 | Jane | 456 Park Ave | 555-555-5556 | Yes |

*Note: A new record for John is created, preserving the old record as historical data.*

---

### **Type 3: Previous Value Columns**

- **What it is:** Adds new columns to store previous values of changed attributes. Only the latest changes are tracked.
- **When to use it:** Use Type 3 when you need to track a limited history or specific changes.

### Example

**Data Warehouse Table (Before Update):**

| Customer ID | Name | Address | Phone | Prev Address | Prev Phone |
| --- | --- | --- | --- | --- | --- |
| 1 | John | 123 Main St | 555-555-5555 |  |  |
| 2 | Jane | 456 Park Ave | 555-555-5556 |  |  |

**Data Warehouse Table (After Update):**

| Customer ID | Name | Address | Phone | Prev Address | Prev Phone |
| --- | --- | --- | --- | --- | --- |
| 1 | John | 456 Park Ave | 555-555-5557 | 123 Main St | 555-555-5555 |
| 2 | Jane | 456 Park Ave | 555-555-5556 |  |  |

*Note: John's current and previous addresses and phone numbers are all stored in the same record.*

---

### **Type 4: History Table**

- **What it is:** Uses a separate history table to store changes, keeping the dimension table only with the current data.
- **When to use it:** Use Type 4 when you need to isolate historical changes from current data for performance reasons.

### Example

**Source System Table:**

| Customer ID | Name | Address | Phone |
| --- | --- | --- | --- |
| 1 | John | 123 Main St | 555-555-5555 |
| 2 | Jane | 456 Park Ave | 555-555-5556 |

**Data Warehouse Table (After Update):**

| Customer ID | Name | Address | Phone |
| --- | --- | --- | --- |
| 1 | John | 456 Park Ave | 555-555-5557 |
| 2 | Jane | 456 Park Ave | 555-555-5556 |

**History Table:**

| Customer ID | Name | Address | Phone | Date |
| --- | --- | --- | --- | --- |
| 1 | John | 123 Main St | 555-555-5555 | 1/1/2022 |

*Note: The history table stores John's previous address and phone number*

In summary, SCD is a crucial technique in data warehousing that allows for the tracking of changes in dimension data over time. As a data engineer, having a good understanding of the different types of SCD and how to implement them is essential in ensuring the consistency, accuracy, and completeness of the data in the data warehouse. It is important to evaluate the specific requirements of the data warehouse and choose the appropriate type of SCD to ensure the best performance and results.

## Reference

1. [Understanding Slowly Changing Dimensions](https://docs.oracle.com/cd/E41507_01/epm91pbr3/eng/epm/phcw/concept_UnderstandingSlowlyChangingDimensions-405719.html)
2. [Implementing Slowly Changing Dimensions (SCDs) in Data Warehouses](https://www.sqlshack.com/implementing-slowly-changing-dimensions-scds-in-data-warehouses/)
3. [Slowly Changing Dimension Transformation](https://learn.microsoft.com/en-us/sql/integration-services/data-flow/transformations/slowly-changing-dimension-transformation?view=sql-server-ver16)
4. [Introduction to Slowly Changing Dimensions (SCD) Types](https://adatis.co.uk/introduction-to-slowly-changing-dimensions-scd-types/)
4. [6 Different Types of Slowly Changing Dimensions and How to Apply Them?](https://medium.com/geekculture/6-different-types-of-slowly-changing-dimensions-and-how-to-apply-them-b152ef908d4e)
