---
layout: post
title: "No Matter What You See - Mobile Hacking Community CTF"
date: 2026-04-24 17:10:53 +0530
description: "Walkthrough for No Matter What You See from Mobile Hacking Community CTF."
categories: ["Writeups", "CTF", "Mobile Hacking Community CTF"]
tags: [ctf, writeup, androidsecurity, mobileCTF, adb, exported-activity]
author: Narain Krishna
cover: https://i.pinimg.com/736x/f5/ea/73/f5ea734a80883d98fbbd62299f4270dd.jpg
toc: true
---

## Challenge Description
```text
This app mistakenly exposes a sensitive Activity. Can you leverage this exported component to uncover the hidden flag?
```

## Solution

### Analysis

Since the description metions about `exported component`, we can begin with inspecting the Manifest file in jadx

![Manifest](/images/ctf/mobile-hacking-community-ctf-nomatterwhatyousee/image-1.png)

We see an `HiddenActivity` with the attribute `android:exported="true"` i.e this activity is exposed and can we direclty accessed via intent targeted towards this activity

In our adb shell,

`am start -n com.just.mobile.sec.challenge2/.HiddenActivity`
![adb](/images/ctf/mobile-hacking-community-ctf-nomatterwhatyousee/image-2.png)

## Flag

<flag>MHC={6xejitv015ldpw7f4hgndb7u}</flag>
