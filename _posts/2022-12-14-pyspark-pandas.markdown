---
title: 'Moving from Pandas to PySpark: An Easy Transition'
layout: post
excerpt: In this tutorial, I will show you how easy it is to transition from Pandas
description: In this tutorial, I will show you how easy it is to transition from Pandas
  to PySpark by providing examples of common operations in both libraries. By following
  this tutorial, you will be able to quickly and easily migrate your data processing
  and analysis pipelines from Pandas to PySpark.
date: '2022-12-14 17:31:35'
image: "/images/blogs/pandas_to_pyspark/main.png"
tags:
- pyspark
- data
- data_engineering
---

The Pandas library is a popular tool among data scientists, with many relying on the module for data processing and analysis due to its capabilities and ease of use. However, as the volume of data increases and the need for distributed processing becomes more pressing, Pandas may no longer be sufficient for handling large amounts of data. In such cases, PySpark, a Python API for Apache Spark, is a superior alternative that can be used to efficiently process and analyze large datasets.

In this tutorial, I will show you how easy it is to transition from Pandas to PySpark by providing examples of common operations in both libraries. By following this tutorial, you will be able to quickly and easily migrate your data processing and analysis pipelines from Pandas to PySpark.

I am going to take a look at both Pandas and PySpark code for a variety of common data operations. I will compare the syntax and capabilities of each library, and provide examples of how to perform each operation in both Pandas and PySpark. So let’s dive in and see how these two libraries compare!

## Create a Spark Session

A Spark session is a crucial component of the PySpark API, and it serves as the entry point for creating and manipulating data frames. Once you have created a Spark session, you can use its various methods to read in data from a variety of sources, transform and manipulate the data, and write the resulting data out to external storage.

Additionally, a Spark session provides an interface to the underlying Spark execution engine, allowing you to configure the execution of Spark jobs and access information about the state of the cluster. This makes the Spark session a central hub for interacting with Spark in your PySpark applications.

~~~python
# Import the necessary modules
from pyspark import SparkContext
from pyspark.sql import SparkSession

# Create a Spark context
sc = SparkContext()

# Create a Spark session with the specified name
spark = SparkSession(sc).builder.appName("Test Session").getOrCreate()
~~~

In the above code, we first create a Spark context, which is required to use PySpark. We then use the `SparkSession.builder` method to create a new `Builder` instance, which allows us to specify the name of the Spark session using the `Builder.appName` method. Finally, we use the `Builder.getOrCreate` method to create the Spark session, or retrieve an existing session if one already exists with the specified name.

Here is a brief overview of how to perform some common data operations in both Pandas and PySpark, along with code examples:
### Loading the data
Here is an example of how to load a CSV file into a Pandas data frame and a PySpark data frame

~~~python
# Pandas example
import pandas as pd

# Load a CSV file into a Pandas data frame
df = pd.read_csv("data.csv")
~~~

In this example, we first use the `pandas.read_csv` function to load a CSV file into a Pandas data frame.

~~~python
# PySpark example
from pyspark import SparkContext
from pyspark.sql import SparkSession

# Create a Spark context and a Spark session
sc = SparkContext()
spark = SparkSession(sc).builder.appName("Test Session").getOrCreate()

# Load a CSV file into a PySpark data frame
df = spark.read.csv("data.csv")

# Print the resulting data frame
pyspark_df.show()
~~~

As you can see, we create a Spark context and a Spark session, and use the `SparkSession.read.csv` method to load the same CSV file into a PySpark data frame. Finally, we print data frames to see the resulting data.
### Select
To select specific columns from a data set, you can use the `DataFrame.filter` method in Pandas and the `DataFrame.select` method in PySpark.

~~~python
# Pandas example

# Select the "name" and "age" columns
selected_df = df[['name', 'age']]

# Print the resulting data frame
print(selected_df)
~~~

~~~python
# PySpark example

# Select the "name" and "age" columns
selected_df = df.select("name", "age")

# Print the resulting data frame
selected_df.show()
~~~
### Describe
To get summary statistics for a data set, you can use the `DataFrame.describe` method in Pandas and the `DataFrame.describe` method in PySpark.

~~~python
# Pandas example

# Get summary statistics for the data
summary = df.describe()

# Print the resulting data frame
print(summary)
~~~

~~~python
# PySpark example

# Get summary statistics for the data
summary = df.describe()

# Print the resulting data frame
summary.show()
~~~
### Rename

To rename columns in a data frame, you can use the `DataFrame.rename` method in Pandas and the `DataFrame.withColumnRenamed` method in PySpark.

```python
# Pandas example

# Rename the "old_name" column to "new_name"
renamed_df = df.rename(columns={"old_name": "new_name"})

# Print the resulting data frame
print(renamed_df)
```

```python
# PySpark example

# Rename the "old_name" column to "new_name"
renamed_df = df.withColumnRenamed("old_name", "new_name")

# Print the resulting data frame
renamed_df.show()
```
### Filter

To filter rows based on a condition, you can use the `DataFrame.filter` method in Pandas and the `DataFrame.where ` method in PySpark.

```python
# Pandas example

# Filter rows where the value of the "age" column is greater than 30
filtered_df = df.filter(df["age"] > 30)

# Print the resulting data frame
print(filtered_df)
```

```python
# PySpark example

# Filter rows where the value of the "age" column is greater than 30
filtered_df = df.where(df["age"] > 30)

# Print the resulting data frame
filtered_df.show()
```
### Group by

To group rows by the values of a specific column and perform an aggregation, you can use the `DataFrame.groupby` method in Pandas and the `DataFrame.groupBy` method in PySpark.

```python
# Pandas example

# Group the data by the "city" column and calculate the average "age" for each group
grouped_df = df.groupby("city").mean()

# Print the resulting data frame
print(grouped_df)
```


```python
# PySpark example

# Group the data by the "city" column and calculate the average "age" for each group
grouped_df = df.groupBy("city").mean()

# Print the resulting data frame
grouped_df.show()
```


Spark SQL provides built-in methods for the most common aggregations such as `count()`, `countDistinct()`, `avg()`, `max()`, `min()`, etc. in the `pyspark.sql.functions` module. These methods are not the same as the built-in methods in the Python Standard Library, where we can find min() for example as well, hence you need to be careful not to use them interchangeably. If we would like to use different functions on different columns, agg() comes in handy. For example `agg({“salary”: “avg”, “age”: “max”})` computes the average salary and maximum age.

### Sort

To sort rows by the values of a specific column, you can use the `DataFrame.sort_values` method in Pandas and the `DataFrame.orderBy` method in PySpark.

```python
# Pandas example
import pandas as pd

# Sort the data by the "age" column in ascending order
sorted_df = df.sort_values("age")

# Print the resulting data frame
print(sorted_df)
```

```python
# PySpark example
from pyspark import SparkContext
from pyspark.sql import SparkSession

# Sort the data by the "age" column in ascending order
sorted_df = df.orderBy("age")

# Print the resulting data frame
sorted_df.show()
```

###  Drop duplicates
To remove duplicate rows from a data set, you can use the `DataFrame.drop_duplicates` method in Pandas and the `DataFrame.dropDuplicates` method in PySpark.

```python
# Pandas example
import pandas as pd

# Remove duplicate rows
deduped_df = df.drop_duplicates()

# Print the resulting data frame
print(deduped_df)
```
	
```python
# PySpark example
from pyspark import SparkContext
from pyspark.sql import SparkSession

# Remove duplicate rows
deduped_df = df.dropDuplicates()

# Print the resulting data frame
deduped_df.show()
```
	
### Add/update column
	
To add or update a column in a data frame, you can use the `DataFrame.assign` method in Pandas and the `DataFrame.withColumn` method in PySpark.
	
	
```python
# Pandas example

# Add a new "age_squared" column that is the square of the "age" column
df["age_squared"] = df["age"] * df["age"]

# Print the resulting data frame
print(df)
```

In this example, we use the `DataFrame[]` operator to add a new "age_squared" column to the data frame, which is calculated by squaring the values in the "age" column. This operator can also be used to update an existing column by providing a new expression for the column value.

```python
# PySpark example

# Add a new "age_squared" column that is the square of the "age" column
updated_df = df.withColumn("age_squared", df["age"] * df["age"])

# Print the resulting data frame
updated_df.show()
```

In this example, we use the `DataFrame.withColumn` method to add a new "age_squared" column to the data frame, which is calculated by squaring the values in the "age" column. This method can also be used to update an existing column by providing a new expression for the column value.


### Remove missing values

To remove rows with missing values from a data frame, you can use the `DataFrame.dropna` method in Pandas and the `DataFrame.na.drop` method in PySpark.


```python
# Pandas example

# Drop rows with missing values
cleaned_df = df.dropna()

# Print the resulting data frame
print(cleaned_df)
```

```python
# PySpark example

# Drop rows with missing values
cleaned_df = df.na.drop()

# Print the resulting data frame
cleaned_df.show()
```

### Joins
To join two data frames on a common key, you can use the `DataFrame.merge` method in Pandas and the `DataFrame.join` method in PySpark.

```python
# Pandas example

# Load two CSV files into Pandas data frames
df1 = pd.read_csv("data1.csv")
df2 = pd.read_csv("data2.csv")

# Join the data frames on the "key" column
joined_df = df1.merge(df2, on="key")

# Print the resulting data frame
print(joined_df)
```

```python
# PySpark example

# Load two CSV files into PySpark data frames
df1 = spark.read.csv("data1.csv")
df2 = spark.read.csv("data2.csv")

# Join the data frames on the "key" column
joined_df = df1.join(df2, on="key")

# Print the resulting data frame
joined_df.show()
```

## General functions
We have used the following general functions that are quite similar to methods of pandas dataframes:

* `select()`: returns a new DataFrame with the selected columns
* `filter()`: filters rows using the given condition
* `where()`: is just an alias for `filter()`
* `groupBy()`: groups the DataFrame using the specified columns, so we can run aggregation on them
* `sort()`: returns a new DataFrame sorted by the specified column(s). By default the second parameter 'ascending' is True.
* `dropDuplicates()`: returns a new DataFrame with unique rows based on all or just a subset of columns
* `withColumn()`: returns a new DataFrame by adding a column or replacing the existing column that has the same name. The first parameter is the name of the new column, the second is an expression of how to compute it.

In the previous section, I discussed some general data operations and how to perform them in Pandas and PySpark. In the next section, I am going to move on to some more complex operations, such as applying custom functions and using lambda functions, that are commonly used in data processing and analysis. Let’s dive in and see how these operations can be performed in both Pandas and PySpark!


### Pivot Tables

In Pandas, you can use the `DataFrame.pivot_table` method to create a pivot table from a data frame. The `DataFrame.pivot_table` method takes three main arguments: the `index` argument specifies the column(s) to use as the row labels of the pivot table, the `columns` argument specifies the column(s) to use as the column labels of the pivot table, and the `values` argument specifies the column(s) to use as the values in the pivot table.


```python

# Create a pivot table with the "row_column" as the index, the "column_column" as the columns, and the "value_column" as the values
pivot_table = df.pivot_table(index="row_column", columns="column_column", values="value_column")

print(pivot_table)
```

Here are the sample results when you run the code examples provided above:

```
row_column,column_column,value_column
a,x,1
a,y,2
b,x,3
b,y,4
```

The resulting pivot table will be:

```
         x  y
row_column
a         1  2
b         3  4
```

In PySpark, you can use the `DataFrame.groupBy` and `DataFrame.pivot` methods to create a pivot table from a data frame. The `DataFrame.groupBy` method takes the column(s) that you want to use as the row labels of the pivot table as its argument, and returns a `GroupedData` object. You can then use the `GroupedData.pivot` method to create the pivot table, using the `Column_column` as the column labels and the `value_column` as the values.


```python
# Group the data frame by the "row_column" column
grouped_df = df.groupBy("row_column")

# Create a pivot table with the "column_column" as the columns and the "value_column" as the values
pivot_table = grouped_df.pivot("column_column", "value_column")

# Print the resulting pivot table
pivot_table.show()
```

```
+-----------+---+---+
|row_column | x | y |
+-----------+---+---+
|a          | 1 | 2 |
|b          | 3 | 4 |
+-----------+---+---+
```

As you can see, the pivot tables generated by the Pandas and PySpark code are similar, but the formatting of the output may be different depending on the library that you use.

### Window functions

In Pandas, you can use the `DataFrame.rolling` method to apply a window function to a data frame. The `DataFrame.rolling` method takes three main arguments: the `window` argument specifies the size of the window, the `min_periods` argument specifies the `minimum number` of observations in the window required to have a value, and the `center` argument specifies whether the window should be centered on the data point or not. You can then use the `DataFrame.mean`, `DataFrame.sum`, or any other Pandas method to apply the desired window function to the data.


```python
# Import the Pandas library
import pandas as pd

# Load a CSV file into a Pandas data frame
df = pd.read_csv("data.csv")

# Apply a rolling mean with a window size of 3 and a minimum of 2 observations in the window
rolling_mean = df.rolling(window=3, min_periods=2).mean()

# Print the resulting data frame
print(rolling_mean)
```

if the input data frame has the following values:

```
group,value
a,1
a,2
a,3
b,4
b,5
```

Here is an example of the results of the Pandas code provided above:

```
group,value,mean(value)
a,1,1.5
a,2,2.0
a,3,2.5
b,4,4.5
b,5,5.0
```

In PySpark, you can use the `DataFrame.select` and `Window.partitionBy` methods to apply a window function to a data frame. The `DataFrame.select` method takes the columns that you want to apply the window function to as its argument, and returns a new data frame. You can then use the `Window.partitionBy` method to specify the column(s) that you want to partition the data by, and the Window.rowsBetween method to specify the size of the window. You can then use the `pyspark.sql.functions.mean`, `pyspark.sql.functions.sum`, or any other PySpark function to apply the desired window function to the data.

```python
# Load a CSV file into a PySpark data frame
df = spark.read.csv("data.csv")

# Create a window function with a window size of 2
w = Window.partitionBy().rowsBetween(-2, 0)

# Apply a rolling mean to the "value" column, partitioned by the "group" column
rolling_mean = df.select("group", mean("value").over(w))

# Print the resulting data frame
rolling_mean.show()
```

The resulting data frame will be:

```
+----+-------------------+
|group|mean(value)        |
+----+-------------------+
|a   |1.5                 |
|a   |2.0                 |
|a   |2.5                 |
|b   |4.5                 |
|b   |5.0                 |
+----+-------------------+
```
### Lambda functions and user-defined function (UDF)
In Pandas, a lambda function is an anonymous function that you can use to transform the values in a column of a data frame. Lambda functions are often used in Pandas in combination with the DataFrame.apply method to apply a custom operation to a column of data.

To use a lambda function to transform a column in a data frame, you can use the `DataFrame.apply` method in Pandas and the `DataFrame.withColumn` method in PySpark.

```python
# Pandas example

# Use a lambda function to transform the "column" column
df["transformed_column"] = df["column"].apply(lambda x: x + 1)

# Print the resulting data frame
print(df)
```

A user-defined function (UDF) is a function that is defined and implemented by the user, rather than being provided by a library or framework. In PySpark, you can define and use UDFs to perform custom operations on data frames.

Both UDFs and lambda functions allow you to perform custom operations on data frames, but they are implemented differently in each library. UDFs are specific to PySpark and are defined using the `pyspark.sql.functions.udf` decorator, while lambda functions are specific to Pandas and are defined using the `lambda` keyword.

```python
# PySpark example

# Define a custom UDF that takes a string as input and returns a string with the first character in upper case
@udf("string")
def upper_first(s):
    return s[0].upper() + s[1:]

# Use the UDF to transform the "column" column
df = df.withColumn("transformed_column", upper_first(col("column")))

# Print the resulting data frame
df.show()
```

In this example, We define a custom UDF that takes a string as input and returns a string with the first character in upper case. We use the `pyspark.sql.functions.udf` decorator to register the UDF, and then use the `DataFrame.withColumn` method to apply the UDF to the "column".

---

In this article, I discussed the limitations of Pandas when dealing with big data, and introduced PySpark as a more powerful and scalable alternative. I explained the basics of PySpark, including the Spark environment and APIs, and provided examples of common operations in both Pandas and PySpark to illustrate the differences between the two libraries. Fortunately, despite the differences between Pandas and PySpark, both libraries have similar syntax, so it should be possible to easily transition from one to the other. By transitioning from Pandas to PySpark, data scientists can continue to use their Python skills to work with large datasets and gain the benefits of distributed processing.

If you found this article helpful and want to learn more about transitioning from Pandas to PySpark, be sure to check out our other articles on the topic. I regularly publish new content on the latest developments in data science and machine learning, so be sure to like and follow us to stay up-to-date on the latest trends and techniques.
