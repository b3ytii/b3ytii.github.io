---
layout: post
title: "Freeda Native Hook - HeroCTF"
date: 2026-04-20 23:22:38 +0530
description: "Walkthrough for Freeda Native Hook from HeroCTF."
categories: ["Writeups", "CTF", "HeroCTF"]
tags: [ctf, writeup, androidsecurity, mobileCTF, frida, ghidra, native-library]
author: Narain Krishna
cover: /images/covers/freedanativehook-heroctf.jpg
toc: true
---

## Challenge Description
```text
Try to find the password to open this vault!

I was told that it was dangerous to let my application install on a rooted machine. I fixed the problem!
I was also told that it was safer to move sensitive functions from my code to a native library, so that's what I did!

Don't waste too much time statically analyzing the application; there are much faster ways.
```

## Solution

### Analysis

We can start by installing and opening the app in our emulator

![Rooted crash](/images/ctf/heroctf-freedanativehook/image-1.png)

Same as before, the app terminates because we are on a rooted device

We can proceed to inspect in further in jadx,

![jadx](/images/ctf/heroctf-freedanativehook/image-2.png)

This time, the apk has two native libs

`libtoolChecker.so`

`libv3.so`

`libtoolChecker.so` is same as before - the root beer library, For that we can use the same script we used before

![CheckFlag](/images/ctf/heroctf-freedanativehook/image-3.png)

Also, this time the flag is hidden behind the native lib - `libv3.so`

We can inspect `libv3.so` in Ghidra, to get an idea about the frida script we have to write

![Ghidra](/images/ctf/heroctf-freedanativehook/image-4.png)

The native library , has another function `get_flag` which probably is the one hiding the flag

We see that this `get_flag()` calls a second `check_root()` function before proceeding,

![check_root](/images/ctf/heroctf-freedanativehook/image-5.png)

This function `check_root()` also follows some method for detecting rooted device, and if it detects it the flag will remain hidden

Fortunately, this is a `boolean` function i.e we can use frida to alter its return value regardless of the state of the device

Upon closer inspection, the function `check_root()` is pretty pointless here because `&DAT_001054c0` is returned before calling `check_root()` and `&DAT_001054c0` is a memory location of (probably) the flag.

So, our frida script should:

bypass the rootbeer library's check

Read the content at `&DAT_001054c0`

```javascript
// aftr rootbees's bypass
const NativeMethod = Process.getModuleByName('libv3.so');
const f = NativeMethod.getExportByName('get_flag');
Interceptor.attach(f, {
  onEnter(args) {
    },
    onLeave(retval){
      console.log(retval.readCString());
    }
  });
```
Now, we just have to run this script,

![Flag](/images/ctf/heroctf-freedanativehook/image-6.png)

## Flag

<flag>Hero{F1NAL_57EP_Y0U_KN0W_H0W_TO_R3V3R53_4NDR01D}</flag>
