---
layout: post
title: "Freeda Simple Hook - HeroCTF"
date: 2026-04-20 23:11:18 +0530
description: "Walkthrough for Freeda Simple Hoot from HeroCTF."
categories: ["Writeups", "CTF", "HeroCTF"]
tags: [ctf, writeup, androidsecurity, mobileCTF, frida, jadx]
author: Narain Krishna
cover: https://i.pinimg.com/736x/4a/c3/91/4ac3914b99cf563e58e29fd09331b3d4.jpg
toc: true
---

## Challenge Description
```text
Try to find the password to open this vault!

Don't waste too much time statically analyzing the application; there are much faster ways.
```
## Solution

### Analysis

We can start by installing and opening the APK in our emulator

![App screen](/images/ctf/heroctf-freedasimplehook/image-1.png)

The APP, asks for a password to open the vault and if we input a random string we get a message `Password incorrect,try again`

Now, we can inspect the APK in jadx to understand the logic

![MainActivity](/images/ctf/heroctf-freedasimplehook/image-2.png)

This is cleary not the actual logic handling the password validation, but we know that it changes the textview to `Password incorrect,try again` when we enter anything random, So we should do a global search of this phrase to find the actual logic that handles it.

![c8 class](/images/ctf/heroctf-freedasimplehook/image-3.png)

The logic is actually inside a class `c8`, in this we see that it calls a static method `checkflag()` , We can inspect that class now

![Vault](/images/ctf/heroctf-freedasimplehook/image-4.png)

If the passed string is not `null`, a method `get_flag` of the class `com.heroctf.freeda1.utils.Vault` is called but the returned value (probably the flag) is not logged/stored/displayed anywhere

So, we can hook the `get_flag` of the class `com.heroctf.freeda1.utils.Vault` and log the returned string.

```javascript
Java.perform(() => {
    var Interceptor = Java.use("com.heroctf.freeda1.utils.Vault");
    console.log(Interceptor.get_flag())

})
```
We can load this script, and in out REPL -

![Flag](/images/ctf/heroctf-freedasimplehook/image-5.png)

## Flag

<flag>Hero{1_H0P3_Y0U_D1DN'T_S7A71C_4N4LYZ3D}</flag>
