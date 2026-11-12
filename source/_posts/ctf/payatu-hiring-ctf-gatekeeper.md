---
layout: post
title: "Gate Keeper"
date: 2026-04-18 10:56:56 +0530
description: "Walkthrough for Gate Keeper from Payatu Hiring CTF."
categories: ["Writeups", "CTF", "Payatu Hiring CTF"]
tags: [ctf, writeup, androidsecurity, mobileCTF]
cover: https://i.pinimg.com/736x/04/e0/0b/04e00b83a64eaf4b9ae7c746843d321c.jpg
author: Narain Krishna
toc: true
---

## Solution

### Analysis

We can by opening the app in our emulator

![alt text](/images/ctf/payatu-hiring-ctf-gatekeeper/image-1.png)

The app shows a hint `🔐There is a phrase I expect, only the right people can C` , and if we input anything random it shows `"Wrong key. Try again."`

Now, we can proceed to inspect it in jadx to understand the logic it implements

![alt text](/images/ctf/payatu-hiring-ctf-gatekeeper/image-2.png)

A native library `libnative-lib.so` is loaded, our input is passed to a native function `sumbitKey` and if we enter the correct key , the flag is returned and displayed in the textview

We can inspect `libnative-lib.so` in ghidra, to understand what the KEY could be

![alt text](/images/ctf/payatu-hiring-ctf-gatekeeper/image-3.png)

Our input is checked using `strcmp()` against `"undefined"` , and if it matches the flag is returned

So, now can we submit `undefined` in the app to get the flag

![alt text](/images/ctf/payatu-hiring-ctf-gatekeeper/image-4.png)

## Flag

`FLAG:PATATU{NOW_U_C_M3}`
