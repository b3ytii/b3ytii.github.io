---
layout: post
title: "Root Quest"
date: 2026-01-01 00:00:00 +0000
description: "CTF write-up for Root Quest by Narain Krishna."
categories: ["Writeups", "CTF", "Mobile Hacking Community CTF"]
tags: [ctf, writeup]
author: Narain Krishna
toc: true
---

## Challenge Description
```
An application implements checks to detect rooted devices and emulators, preventing normal usage. Can you bypass these protections?
```

## Solution

### Analysis

We can start by installing and opening the APK,

![alt text](/images/ctf/mobile-hacking-community-ctf-rootquest/image-1.png)

As expected, we cant enter the app as we are running it on a rooted emulator

Now, we can inspect it in jadx to understand how we should craft the bypass

![alt text](/images/ctf/mobile-hacking-community-ctf-rootquest/image-2.png)

It just calls two static methods `isRunningOnEmulator()` and `isDeviceRooted` from the classes `EmulationUtil` and `RootUtil` respectively.

We can use frida to force the return values of both the methods to `0`(false)

```
Java.perform(() => {
    var Interceptor = Java.use("com.just.mobile.sec.challenge3.EmulationUtil");
    var Interceptor1 = Java.use("com.just.mobile.sec.challenge3.RootUtil");
    Interceptor.isRunningOnEmulator.implementation = function(){
        return 0;
    }
    Interceptor1.isDeviceRooted.implementation = function(){
        return 0
    }

})
```
We just need to load this script,

![alt text](/images/ctf/mobile-hacking-community-ctf-rootquest/image-3.png)

## Flag

`FLAG:MHC{j1qwqc01kbi1a08wamce3}`
