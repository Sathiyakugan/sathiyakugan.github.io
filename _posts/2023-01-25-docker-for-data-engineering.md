---
title: "Unlocking the Potential of Docker for Data Science and Engineering"
layout: post
description: "This blog examines the use of Docker in data science and engineering, including benefits such as reproducible environments and dependency management. It provides examples and reference links for readers to understand and implement Docker in their workflows."
excerpt: "This blog examines the use of Docker in data science and engineering, including benefits such as reproducible environments and dependency management. It provides examples and reference links for readers to understand and implement Docker in their workflows."
date: '2023-01-24 17:31:36'
image: "/images/blogs/docker/docker_data_engineer.jpg"
image_caption: 'Photo by <a href="https://unsplash.com/@ventiviews?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">Venti Views</a> on <a href="https://unsplash.com/photos/1cqIcrWFQBI?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">Unsplash</a>'
author: "Balakrishnan Sathiyakugan"
tags:
- docker
- data_engineering
- data_science
---

As a data science engineer, I recently found myself in the midst of a common problem: setting up a local environment for a data pipeline script that required a specific version of MS SQL Server which was not supported by Ubuntu 22.04. The process of manually installing and configuring the software, not to mention troubleshooting any issues that arose along the way, was both time-consuming and frustrating.

That's when I discovered the power of Docker. By using a pre-configured MS SQL Server image from Docker Hub, I was able to quickly and easily set up the environment I needed for my pipeline script. Not only did this save me valuable time, but it also ensured that my development environment was consistent and easily reproducible for other team members.

This experience got me thinking about all the other ways that Docker can help data engineers and data scientists streamline their workflows. From running databases and data processing tools to automating pipeline deployments and reproducing development environments, the possibilities are endless

<hr style="border-top: 1.5px solid #a39dee; width: 100%; margin: 2em auto; text-align:center">

There are several ways to run a Docker image, depending on your use case and needs. Here are some common ways:

1. From Docker Hub: The easiest way to run an image is by pulling it from a public or private registry, such as Docker Hub. This can be done using the `docker pull` command, followed by the image name and tag (if specified). For example, to pull the latest version of the official Ubuntu image, you would use the command `docker pull ubuntu`. You can find more information and examples on the [Docker Docs](https://docs.docker.com/engine/reference/commandline/pull/).
2. From a Registry: You can also pull images from a private or enterprise registry. You have to first login to the registry using `docker login` command and then use `docker pull` command to pull the image. You can find more information and examples on this [link](https://medium.com/codex/running-your-own-docker-registry-made-easy-549086b2e6db).
3. From a Dockerfile: You can also build an image from a `Dockerfile`, which is a script that contains instructions for building an image. The `docker build` command is used to build an image from a `Dockerfile`, and it takes the path to the `Dockerfile` as an argument. For example, to build an image from a `Dockerfile` located in the current directory, you would use the command `docker build .` You can find more information and examples on the [valohai.com](https://valohai.com/blog/docker-for-data-science/).
4. From a Compose file: You can use `docker-compose` command to create and start one or more containers from a compose file. This is a great way to organize multiple containers and services in a single file. The `docker-compose up` command is used to start the services defined in the compose file. You can find more information and examples on the [Docker Docs](https://docs.docker.com/compose/reference/up/)

<hr style="border-top: 1.5px solid #a39dee; width: 100%; margin: 2em auto; text-align:center">

Now that we have a better understanding of how to pull down or create our own Docker images, let's dive into some of the ways that Docker can be used in data engineering and science.

### Setting up and running database systems
Setting up and running database systems, such as MS SQL Server, MySQL, and PostgreSQL, without the need for manual installation and configuration. For example, 
- after running these commands, you can easily connect to the MS SQL Server instance from SQL Server Management Studio or sqlcmd on your host machine using the server name `localhost,1433` and the `SA` password you specified. Setting up and running a MS SQL Server on Docker:
 ```shell
 docker pull mcr.microsoft.com/mssql/server:2022-latest
 docker run -e "ACCEPT_EULA=Y" -e "MSSQL_SA_PASSWORD=<YourStrong@Passw0rd>" \
-p 1433:1433 --name sql1 --hostname sql1 \
-d \
mcr.microsoft.com/mssql/server:2022-latest
 ```
- The first code snippet pulls the latest version of MS SQL Server from the official Microsoft container registry on Docker Hub. 
- The second code snippet then runs a container using this image, with environment variables set for the 'ACCEPT_EULA' and 'SA_PASSWORD' for the SQL Server, and maps the host's port 1433 to the container's port 1433. This allows us to access the SQL Server from our host machine.

### Creating isolated development environments
Creating isolated development environments that can be easily shared and reproduced across teams, without the need for complex setup and configuration. The following code is a sample of a `docker-compose.yml`file, 
- which allows us to define and run multiple containers together. In this example, 
- we have two services defined, "web" and "db". The "web" service is built from the current directory and maps port 8000 of the host to port 8000 of the container. The "db" service uses the official PostgreSQL image from Docker Hub and sets environment variables for the user, password, and database name. 
- By running `docker-compose up` in the same directory as this file, it will spin up these two services and make them available for the host to use.
 ```shell
 version: '3'
 services:
   web:
     build: .
     ports:
      - "8000:8000"
   db:
     image: postgres
     environment:
       POSTGRES_USER: user
       POSTGRES_PASSWORD: password
       POSTGRES_DB: dbname
 ```

### Running data processing and analysis tools
Running data processing and analysis tools, such as Apache Spark and Apache Hadoop, in a containerized environment, which can help to simplify deployment and scaling. This code snippet 
- pulls the latest version of Apache Spark from the official SequenceIQ image on Docker Hub. 
- The second command runs an interactive container using this image and runs the bootstrap script which sets up the environment and runs bash shell.
```shell
version: '3'
services:
  pipeline_component_1:
    build: .
    command: python script1.py
  pipeline_component_2:
    build: .
    command: python script2.py
  pipeline_component_3:
    build: .
    command: python script3.py
```

### Automating the build and deployment of data pipelines
Automating the build and deployment of data pipelines, by containerizing the pipeline components and using Docker Compose to manage their dependencies. In this example, 
- we have three services defined, "pipeline_component_1", "pipeline_component_2", and "pipeline_component_3". 
- Each service is built from the current directory and runs a specific python script, this allows us to automate the pipeline deployment and execution.
```shell
docker pull tableau/server:latest
docker run -p 8850:8850 -p 8800:8800 --name tableau -d -v /your/local/path:/var/opt/tableau/tableau_server/data/tabsvc/files/ tableau/server:latest
```

### Running data visualization and reporting tools
Running data visualization and reporting tools, such as Tableau and Power BI, in a containerized environment, which can help to simplify deployment and scaling.
   This code snippet,
   - pulls the latest version of Tableau Server from the official Tableau image on Docker Hub.
   - The second command runs a container using this image, maps port 8850 and 8800 of the host to the container's ports 8850 and 8800 respectively and creates a volume for the container to persist data.
```shell
docker pull tableau/server:latest
docker run -p 8850:8850 -p 8800:8800 --name tableau -d -v /your/local/path:/var/opt/tableau/tableau_server/data/tabsvc/files/ tableau/server:latest
```

### Using Docker to run Jupyter notebook, RStudio
Using Docker to run Jupyter notebook, RStudio, and other interactive development environments, making it easy to share and reproduce the code, data and dependencies. This command,
   - runs a container using the official Jupyter Data Science Notebook image on Docker Hub, it maps port 8888 of the host to the container's port 8888 and creates a volume for the container to access the host files.
   ```shell
   docker run -it --rm -p 8888:8888 -v /your/local/path:/app jupyter/datascience-notebook
   ```

### Using Docker to run Machine Learning and Deep Learning frameworks
Using Docker to run Machine Learning and Deep Learning frameworks like Tensorflow, Pytorch, and scikit-learn, which can help to simplify the deployment of these frameworks.
   ```shell
   docker pull tensorflow/tensorflow:latest-gpu-py3
   docker run --rm -it -p 8888:8888 tensorflow/tensorflow:latest-gpu-py3
   ```
   
In summary, this blog has demonstrated the advantages of using Docker in data science and engineering, including reproducible environments and dependency management. The use cases and example provided illustrate the potential of Docker in streamlining data professionals' workflows. To learn more about using Docker with Python, check out the blog [Isolate, Organize, and Deploy: The Benefits of Virtual Environments and Docker for Python](https://sathiyakugan.dev/blog/how-to-create-virtual-environment).


## Reference

1. [Docker for data science](https://medium.com/analytics-vidhya/docker-for-data-science-442299c5203c)
2. [Docker for Data Science: What every data scientist should know about Docker](https://valohai.com/blog/docker-for-data-science/)
3. [Docker for Data Science – A Step by Step Guide](https://dagshub.com/blog/setting-up-data-science-workspace-with-docker/)
4. [Everything you need to know about Docker for data science and ML](https://www.qwak.com/post/everything-you-need-to-know-about-docker-for-data-science-and-ml)
4. [How to use Docker for your data science projects](https://practicaldatascience.co.uk/data-engineering/how-to-use-docker-for-your-data-science-projects)