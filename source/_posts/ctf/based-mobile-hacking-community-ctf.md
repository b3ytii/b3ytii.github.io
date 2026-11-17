---
layout: post
title: "Based - Mobile Hacking Community CTF"
date: 2026-04-23 23:43:03 +0530
description: "Walkthrough for Based from Mobile Hacking Community CTF."
categories: ["Writeups", "CTF", "Mobile Hacking Community CTF"]
tags: [ctf, writeup, androidsecurity, mobileCTF, frida, base64]
author: Narain Krishna
cover: /images/covers/based-mobile-hacking-community-ctf.jpg
toc: true
---

## Solution

### Analysis

We can start by installing and opening the apk in our emulator

![App screen](/images/ctf/mobile-hacking-community-ctf-based/image-1.png)

Very simple launcher activity, which ask to input a code and shows a toast based on our input

Now, we can proceed to inspect it in jadx,

![jadx](/images/ctf/mobile-hacking-community-ctf-based/image-2.png)

We see that our input is validated using a method `check()` of the class `Based`, To understand the checking we must inspect the `Based` class.

![Check logic](/images/ctf/mobile-hacking-community-ctf-based/image-3.png)

So, our input is compared against the returned value of another method `getPayload()`

We can use frida to get the return value of `getPayload()`

```javascript
Java.perform(() => {
    var Interceptor = Java.use("com.appknox.based.Based");
    var InterceptorObj = Interceptor.$new();
    console.log(InterceptorObj.getPayload());
})
```
We can load this script to get the flag,

## Flag

<flag>MHC{50_Y0U_T00_4R3_4_B453D_P3R50N}</flag>
