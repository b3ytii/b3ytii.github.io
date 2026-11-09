---
layout: post
title: "No Matter What You See"
date: 2026-01-01 00:00:00 +0000
description: "CTF write-up for No Matter What You See by Narain Krishna."
categories: ["Writeups", "CTF", "Mobile Hacking Community CTF"]
tags: [ctf, writeup]
author: Narain Krishna
toc: true
---

## Challenge Description
```
This app mistakenly exposes a sensitive Activity. Can you leverage this exported component to uncover the hidden flag?
```

## Solution

### Analysis

Since the description metions about `exported component`, we can begin with inspecting the Manifest file in jadx

![alt text](/images/ctf/mobile-hacking-community-ctf-nomatterwhatyousee/image-1.png)

We see an `HiddenActivity` with the attribute `android:exported="true"` i.e this activity is exposed and can we direclty accessed via intent targeted towards this activity

In our adb shell,

`am start -n com.just.mobile.sec.challenge2/.HiddenActivity`
![alt text](/images/ctf/mobile-hacking-community-ctf-nomatterwhatyousee/image-2.png)

## Flag

`FLAG:MHC={6xejitv015ldpw7f4hgndb7u}`
