---
title: Maximum Subarray
id: 2
date: '2021-04-07 06:33:23 +0700'
author: sathiyakugan
layout: post
guid: null
permalink: "/blog/maximum-subarray/"
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
image: assets/images/posts/leetcode/maximum-subarray/max-sub.jpg
tags:
- Programming
- ds-and-algo
- dynamic-programming
---

Given an integer array `nums`, find the contiguous subarray (containing at least one number) which has the largest sum and return its sum.


**Example 1:**

~~~~
Input: nums = [-2,1,-3,4,-1,2,1,-5,4]
Output: 6
Explanation: [4,-1,2,1] has the largest sum = 6.
~~~~

**Example 2:**

~~~~
Input: nums = [1]
Output: 1
~~~~

	
**Example 3:**

~~~~
Input: nums = [5,4,-1,7,8]
Output: 23
~~~~


Important thing to notice is 
- contiguous subarray - which means array should not break. Take Example 3  `[5, 4, 7]` is not subarray.  since `-1` is missed.

- - -

<ins>**Naive solution**</ins>

Check all the possible sub array and find the maximum sum out of it. Which will take the time complexity of  this solution is `O(N*N)` 


<ins>**Efficent solution**</ins>

In order to  single element contribute to the maximum sub array , 

+ the single element  it self is a maximum  or 
+ the addition to the previous contiguous array is the maximum

-  `prev_max = max( prev_max + current, current )`

The problem here is out of these contiguous array,  the array might break because of the negative numbers present (from the above equation `current value` is set to `prev_max`). This will lead to  different subarrays.

**we need to find the maximum out of it.**

- `overall_max=max(overall_max, prev_max)`


the time complexity  of  this solution is  `O(N)` 

~~~~python
class Solution:
    def maxSubArray(self, nums: List[int]) -> int:
        if not nums:
            return float("-inf")
        
        #current maximum in the flow.
        prev_max=nums[0]
        # Overall flow.
        overall_max=nums[0]
        for i in range(1,len(nums)):
            prev_max= max(prev_max+nums[i],nums[i])
            # We need to find the maximum out of it.
            overall_max=max(overall_max, prev_max)
        return overall_max
~~~~


The **Example 1** is illustrated here.

Zoom this image to get clear view
![Zoom this image to get clear view]({{ site.baseurl }}/assets/images/posts/leetcode/maximum-subarray/dyn-table.png)
