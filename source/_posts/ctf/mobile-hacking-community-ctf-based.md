---
layout: post
title: "Based"
date: 2026-04-23 23:43:03 +0530
description: "CTF write-up for Based by Narain Krishna."
categories: ["Writeups", "CTF", "Mobile Hacking Community CTF"]
tags: [ctf, writeup]
author: Narain Krishna
cover: https://i.pinimg.com/736x/44/52/c6/4452c6c68d0499faa766ed77c6c4febb.jpg
toc: true
---

## Solution

### Analysis

We can start by installing and opening the apk in our emulator

![alt text](/images/ctf/mobile-hacking-community-ctf-based/image-1.png)

Very simple launcher activity, which ask to input a code and shows a toast based on our input

Now, we can proceed to inspect it in jadx,

![alt text](/images/ctf/mobile-hacking-community-ctf-based/image-2.png)

We see that our input is validated using a method `check()` of the class `Based`, To understand the checking we must inspect the `Based` class.

![alt text](/images/ctf/mobile-hacking-community-ctf-based/image-3.png)

So, our input is compared against the returned value of another method `getPayload()`

We can use frida to get the return value of `getPayload()`

```
Java.perform(() => {
    var Interceptor = Java.use("com.appknox.based.Based");
    var InterceptorObj = Interceptor.$new();
    console.log(InterceptorObj.getPayload());
})
```
We can load this script to get the flag,

## Flag

`FLAG:MHC{50_Y0U_T00_4R3_4_B453D_P3R50N}`
