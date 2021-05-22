---
title: Decode String
id: 2
date: '2021-05-22 05:03:23'
author: sathiyakugan
layout: post
guid: null
permalink: "/blog/decode-string/"
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
image: assets/images/posts/leetcode/decode-string/decodestring.jpeg
tags:
- Programming
- ds-and-algo
- dfs
- strings
---

Given an encoded string, return its decoded string.

The encoding rule is: `k[encoded_string],`  where the `encoded_string` inside the square brackets is being repeated exactly `k` times. Note that `k`  is guaranteed to be a positive integer.

You may assume that the input string is always valid; No extra white spaces, square brackets are well-formed, etc.

Furthermore, you may assume that the original data does not contain any digits and that digits are only for those repeat numbers, `k`. For example, there won't be input like `3a` or `2[4]`.


**Example 1:**

~~~~
Input: s = "3[a]2[bc]"
Output: "aaabcbc"
~~~~

**Example 2:**

~~~~
Input: s = "3[a2[c]]"
Output: "accaccacc"
~~~~

	
**Example 3:**

~~~~
Input: s = "2[abc]3[cd]ef"
Output: "abcabccdcdcdef"
~~~~


**Example 4:**

~~~~
Input: s = "abc3[cd]xyz"
Output: "abccdcdcdxyz"
~~~~

Important thing to notice is 
- contiguous subarray - which means array should not break. Take Example 3  `[5, 4, 7]` is not subarray.  since `-1` is missed.


**Constraints:**

* `1 <= s.length <= 30`
* `s` consists of lowercase English letters, digits, and square brackets ` '[]'`.
* `s` is guaranteed to be a valid input.
* All the integers in `s` are in the range` [1, 300]`.

- - -

<ins>**Solution**</ins>


* We know that if the `s` is a string without any digit or square brackets then it's obviously . the same string 

	if `s = 'aaa' ` then  answer is  `'aaa'`

*  If the string   `s = 2[b]` then think what we do?
	we will first take the number `2` then when you see the `[` you know that you need to multiply that string inside.
	
* 	If the string is simpler like in the example then it's easy.
	
* 	Say if the string is bit complex
	
	`s = 2[3[b]]`
	
	`3[b]` this part is repeated again ?... Hmm what can we do ?
	
* 	It's seems like onion pealing right ?
	
	So can we solve it using recursion ? Well yes. 
	
	Let's think of a graph visit.  
	
	Say Depth First Search. 
	
	- You will visit a node. Then you expand the child. until you find no childs. 
	
	-  Expanding and see what is inside.
	
	- Here in this problem what we need to expand  is `[]` 
	
	- So After expanding we need to get the inside the result inorder to multiply by the number outside. 
	

the time complexity  of  this solution is  `O(N)` 

~~~~python
class Solution:
    def decodeString(self, s: str) -> str:
        def decode(s):
            num=''
            out=''
            while s:
                ch=s.pop()
                if ch.isdigit():
                    num+=ch
                elif ch.isalpha():
                    out+=ch
                elif ch=='[':
		    #Expanding part
                    out=out+(decode(s))*int(num)
                    num=''
                elif ch==']' :
                    return out
            if not s:
                return out
        # reversed to utilize the pop 
        # can be used deque as well
        
        return decode(list(s[::-1])) 
~~~~
