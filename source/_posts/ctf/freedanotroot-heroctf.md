---
layout: post
title: "Freeda Not Root - HeroCTF"
date: 2026-04-20 23:11:18 +0530
description: "Walkthrough for Freeda Not Root from HeroCTF."
categories: ["Writeups", "CTF", "HeroCTF"]
tags: [ctf, writeup, androidsecurity, mobileCTF, frida, objection]
author: Narain Krishna
cover: https://i.pinimg.com/736x/45/57/b7/4557b7dcd032bec32156f01a06383067.jpg
toc: true
---

## Challenge Description
```text
Try to find the password to open this vault!

I was told that it was dangerous to let my application install on a rooted machine. I fixed the problem!

Don't waste too much time statically analyzing the application; there are much faster ways.
```
## Solution

### Analysis

We can install and open the app in our emulator

![Rooted popup](/images/ctf/heroctf-freedanotroot/image-1.png)
We are instantly thrown out with a pop-up saying `Rooted Devices Detected`

Now, we can inspect the apk in jadx,

![jadx](/images/ctf/heroctf-freedanotroot/image-2.png)

We see that the apk has native library `libtoolChecker.so` which is probably a libary used for detecting rooted devices, We can open the native lib in Ghidra to understand more about it

![libtoolChecker](/images/ctf/heroctf-freedanotroot/image-3.png)

As suspected, it is a standard libary `rootbeer` which is used for detection of root devices, This libary particularly checks for root binaries for that

We can use an anti-root bypass script to bypass this check, I used `antiroot` from frida-codeshare

sauce:https://codeshare.frida.re/@dzonerzy/fridantiroot/
We can load this script, to bypass the check -

![Bypass](/images/ctf/heroctf-freedanotroot/image-4.png)

Here on now, the logic is same as the level before

logic is somewhere else --> it calls Checkflag() --> get_flag() is to be called --> log the return value
```javascript
// after the bypass script
Java.perform(() => {
    var Interceptor = Java.use("com.heroctf.freeda2.utils.Vault");
    console.log(Interceptor.get_flag())

})
```
Now, we can load both the scripts

![Flag](/images/ctf/heroctf-freedanotroot/image-5.png)

## Flag

<flag>HERO{D1D_Y0U_U53_0BJ3C71ON}</flag>
