---
title: Python Virtual Environment
id: 5
date: '2021-05-25 05:03:23'
author: sathiyakugan
layout: post
guid: null
permalink: "/blog/python-virtual-env/"
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
- python
image: assets/images/projects/virtualenv.jpg
tags:
- python
- virtualenv
- concepts
---

Think of a scenario where you have developed your flask e-commerce application on a particular version of Flask - say version A.  Year later you wanted to develop a python application using the Flask but due to some features addition you need to upgrade the Flask version to B. But version B doesn't support some features that are supported in A.  If you are going to use the system python which is common to all the packages then you are in a  deadlock situation. To mitigate this issue Python has provided a feature called Virtual Env. 

Virtual env is a lightweight, self-contained Python installation, developed to be set up with a minimum of fuss and to just work without demanding extensive configuration or specific knowledge. It is given with Python by default. It's a mechanism that allows you to group Python packages to a specific project. So normally when you install a package it would install into the base Python installation of that operating system. To avoid messing with the base operating system's python dependencies, you can group all the Python dependencies for your particular project in a virtual environment. That way you can maintain a separate set of dependencies for your project separate from another project 

So let's go ahead and create our first Python virtual environment.


**Install virtualenv**

~~~~sh
Pip install virtualenv
~~~~

**Creating a new virtual environment inside the directory:**

~~~~sh
python -m venv <virtualenv_name>
~~~~

	
**Activate  virtualenv to enable it**

~~~~sh
source env/bin/activate
~~~~


**To go back to the system context**

~~~~sh
deactivate
~~~~

#### Before Writing any Python Application Please do this
![]({{ site.baseurl }}/assets/images/posts/python/virtualenv/demo.png)
