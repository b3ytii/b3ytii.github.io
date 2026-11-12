---
layout: post
title: "A Strange Door"
date: 2026-04-20 23:22:38 +0530
description: "CTF write-up for A Strange Door."
categories: ["Writeups", "CTF", "Payatu Hiring CTF"]
tags: [ctf, writeup]
cover: https://i.pinimg.com/736x/1c/f7/0e/1cf70ed8495aa1119e814da793a486d8.jpg
author: Narain Krishna
toc: true
---

## Solution

### Analysis

We can start by inspecting the APK in jadx,

![alt text](/images/ctf/payatu-hiring-ctf-astrangedoor/image-1.png)

We have to input a pincode, which is passed to a native function `checkPasscode` and then if its correct the other activity is launched also another native function `decryptflag()` is called and passed along as an intent extra.

![alt text](/images/ctf/payatu-hiring-ctf-astrangedoor/image-2.png)

The second Activity(launched if the passcode is correct) gets the flag from the intent and displays it in a textview

One way of solving this, is to hook the `checkPasscode()` and modify the return value to `1`, so that no matter what we input..`checkPasscode()` will return `true` and `decryptflag()` will be called and the flag will be displayed in the following activity screen

```
const NativeMethod = Process.getModuleByName('libctf.so');
const f = NativeMethod.getExportByName('Java_com_payatu_astragedoor_LoginActivity_checkPasscode');
Interceptor.attach(f, {
  onEnter(args) {
    console.log(' inside the native')
    },
    onLeave(retval){
      retval.replace(1);
    }
  });
```
We can load this frida script,

![alt text](/images/ctf/payatu-hiring-ctf-astrangedoor/image-3.png)

## Flag

We get the flag,`FLAG:PAYATU{ASDS73V3NS7R@NG3P0P}`
