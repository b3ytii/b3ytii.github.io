---
layout: post
title: "baby-android-2 - ByuCTF"
date: 2026-05-05 18:58:58 +0530
description: "Walkthrough for baby-android-2 from ByuCTF."
categories: ["Writeups", "CTF", "ByuCTF"]
tags: [ctf, writeup, androidsecurity, mobileCTF, frida, native-library]
author: Narain Krishna
cover: https://i.pinimg.com/736x/76/c3/83/76c383c75e503d362ff2b67823176a51.jpg
toc: true
---

## Challenge Description
```text
If you've never reverse engineered an Android application, now is the time!! Get to it, already!! Learn more about how they work!!
```

## Solution

### Analysis

We can start by installing and opening the app in our emulator

![App screen](/images/ctf/byuctf-baby-android-2/image-1.png)

The app has a textview and button for a `flag sanity` check, we can enter the flag and check if its correct

We can open the APK in jadx,

![MainActivity](/images/ctf/byuctf-baby-android-2/image-2.png)

![FlagChecker](/images/ctf/byuctf-baby-android-2/image-3.png)

We see that the `MainActivity` calls a method `check()` from `FlagChecker` and the class `FlagChecker` loads a native library and has a native method `check`

We can proceed to inspect the native library in Ghidra

![Ghidra](/images/ctf/byuctf-baby-android-2/image-4.png)

Our input is being checked against an encrypted string `bycnu)_aacGly~}tt+=<_MLf^i_vETkG+b{nDJrVp6=)=`, the encryption is very basic and we can use python to reverse it.

```python
print(''.join('bycnu)_aacGly~}tt+?=<_ML?f^i_vETkG+b{nDJrVp6=)='[(i*i)%47] for i in range(23)))
```
We can run this script to get the flag,

![Flag](/images/ctf/byuctf-baby-android-2/image-5.png)

## Flag

<flag>byuctf{c++_in_an_apk}</flag>
