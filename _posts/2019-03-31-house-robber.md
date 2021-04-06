---
title: House Robber - Leetcode
id: 35
date: '2019-03-31 06:33:23 +0700'
author: sathiyakugan
layout: post
guid: null
permalink: "/house-robber/"
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
- leetcode
image: assets/images/posts/leetcode/house-robber/houserobber.jpg
tags:
- Programming
- ds-and-algo
---

**You are a professional robber planning to rob houses along a street.** Each house has a certain amount of money stashed, the only constraint stopping you from robbing each of them is that adjacent houses have security system connected and it will automatically contact the police if two adjacent houses were broken into on the same night.

Given a list of non-negative integers representing the amount of money of each house, determine the maximum amount of money you can rob tonight without alerting the police.

 

### Example 1:

~~~~
Input: nums = [1,2,3,1]
Output: 4
Explanation: Rob house 1 (money = 1) and then rob house 3 (money = 3).
Total amount you can rob = 1 + 3 = 4.
~~~~


### Example 2:

~~~~ 
Input: nums = [2,7,9,3,1]
Output: 12
Explanation: Rob house 1 (money = 2), rob house 3 (money = 9) and rob house 5 (money = 1).
Total amount you can rob = 2 + 9 + 1 = 12.
~~~~


### Answer Hint

Suppose we know the solution for first n houses, now to find the solution for `n` th house
1. We can either rob the nth house
		 If we rob the `n` th house we can use the solution of `n-2` th house and add amount in nth house to it.
2. We can leave the nth house
		If we do not want to rob `n` th house we can just use the solution for `n-1` th house. 

![]({{ site.baseurl }}/assets/images/posts/leetcode/house-robber/eg.png)
