---
layout: post
title: "Freeda Simple Hoot"
date: 2026-04-20 23:11:18 +0530
description: "CTF write-up for Freeda Simple Hoot by Narain Krishna."
categories: ["Writeups", "CTF", "HeroCTF"]
tags: [ctf, writeup]
author: Narain Krishna
toc: true
---

## Challenge Description
```
Try to find the password to open this vault!

Don't waste too much time statically analyzing the application; there are much faster ways.
```
## Solution

### Analysis

We can start by installing and opening the APK in our emulator

![alt text](/images/ctf/heroctf-freedasimplehook/image-1.png)

The APP, asks for a password to open the vault and if we input a random string we get a message `Password incorrect,try again`

Now, we can inspect the APK in jadx to understand the logic

![alt text](/images/ctf/heroctf-freedasimplehook/image-2.png)

This is cleary not the actual logic handling the password validation, but we know that it changes the textview to `Password incorrect,try again` when we enter anything random, So we should do a global search of this phrase to find the actual logic that handles it.

![alt text](/images/ctf/heroctf-freedasimplehook/image-3.png)

The logic is actually inside a class `c8`, in this we see that it calls a static method `checkflag()` , We can inspect that class now

![alt text](/images/ctf/heroctf-freedasimplehook/image-4.png)

If the passed string is not `null`, a method `get_flag` of the class `com.heroctf.freeda1.utils.Vault` is called but the returned value (probably the flag) is not logged/stored/displayed anywhere

So, we can hook the `get_flag` of the class `com.heroctf.freeda1.utils.Vault` and log the returned string.

```
Java.perform(() => {
    var Interceptor = Java.use("com.heroctf.freeda1.utils.Vault");
    console.log(Interceptor.get_flag())

})
```
We can load this script, and in out REPL -

![alt text](/images/ctf/heroctf-freedasimplehook/image-5.png)

## Flag

`FLAG:Hero{1_H0P3_Y0U_D1DN'T_S7A71C_4N4LYZ3D}`
