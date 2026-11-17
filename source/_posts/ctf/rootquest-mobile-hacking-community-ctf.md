---
layout: post
title: "Root Quest - Mobile Hacking Community CTF"
date: 2026-04-24 19:19:57 +0530
description: "Walkthrough for Root Quest from Mobile Hacking Community CTF."
categories: ["Writeups", "CTF", "Mobile Hacking Community CTF"]
tags: [ctf, writeup, androidsecurity, mobileCTF, frida, root-detection]
author: Narain Krishna
cover: /images/covers/rootquest-mobile-hacking-community-ctf.jpg
toc: true
---

## Challenge Description
```text
An application implements checks to detect rooted devices and emulators, preventing normal usage. Can you bypass these protections?
```

## Solution

### Analysis

We can start by installing and opening the APK,

![Rooted block](/images/ctf/mobile-hacking-community-ctf-rootquest/image-1.png)

As expected, we cant enter the app as we are running it on a rooted emulator

Now, we can inspect it in jadx to understand how we should craft the bypass

![jadx](/images/ctf/mobile-hacking-community-ctf-rootquest/image-2.png)

It just calls two static methods `isRunningOnEmulator()` and `isDeviceRooted` from the classes `EmulationUtil` and `RootUtil` respectively.

We can use frida to force the return values of both the methods to `0`(false)

```javascript
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

![Flag](/images/ctf/mobile-hacking-community-ctf-rootquest/image-3.png)

## Flag

<flag>MHC{j1qwqc01kbi1a08wamce3}</flag>
