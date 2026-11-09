---
layout: post
title: "Snorlax"
date: 2026-01-01 00:00:00 +0000
description: "CTF write-up for Snorlax by Narain Krishna."
categories: ["Writeups", "CTF", "Payatu Hiring CTF"]
tags: [ctf, writeup]
author: Narain Krishna
toc: true
---

## Solution

### Analysis

We can install the APK in our emulator,But when we try to open it

![alt text](/images/ctf/payatu-hiring-ctf-snorlax/image-1.png)

We cannot enter the APP, it is doing somekind of checking - probably root/emulator detection which is not allowing us to open the app.

We can inspect it in jadx to get more idea

![alt text](/images/ctf/payatu-hiring-ctf-snorlax/image-2.png)

There isnt much in Main Activity, we just need  to open the app and click on the image to get the flag which is loaded from a native lib

If we check the `lib` folder we see,

![alt text](/images/ctf/payatu-hiring-ctf-snorlax/image-3.png)

There are two native libs

libnative-lib.so --> from where the flag is loaded

libtoolcheck.so --> the root detector

We can further inspect `libtoolcheck.so` to get more idea about it

![alt text](/images/ctf/payatu-hiring-ctf-snorlax/image-4.png)

It is indeed a root check which checks if a particular root binaries are present or not for root detection

We just need to bypass this to get the flag

I used a [frida root detection bypass script from github](https://gist.github.com/pich4ya/0b2a8592d3c8d5df9c34b8d185d2ea35)

And loaded this bypass  script, to get the flag

![alt text](/images/ctf/payatu-hiring-ctf-snorlax/image-5.png)

## Flag

`FLAG:PAYATU{SN0RL3X15BL0CKNGXYZUIQP13J4}`
