---
layout: post
title: "Knight"
date: 2026-04-24 16:53:08 +0530
description: "CTF write-up for Knight by Narain Krishna."
categories: ["Writeups", "CTF", "P3RF3CTR00T CTF"]
tags: [ctf, writeup]
author: Narain Krishna
toc: true
---

## Challenge Description
```
Uncover the secrets of the Dark knight to get the flag
```

## Solution

### Analysis

We can start by installing the apk and opening it in our emulator

![alt text](/images/ctf/p3rf3ctr00t-ctf-knight/image-1.png)

The activity says that input the flag to proceed and if we input anything random it says `Incorrect Flag.Try Harder`

We can inspect the APK in jadx,

![alt text](/images/ctf/p3rf3ctr00t-ctf-knight/image-2.png)

The Main Activity does not have anything related to the checking logic, But we know the it displays `Incorrect Flag.Try Harder` for wrong input

So, we can do a global search for `Incorrect Flag.Try Harder` to identify the class implementing the logic

![alt text](/images/ctf/p3rf3ctr00t-ctf-knight/image-3.png)

The actual logic is being implemented in the class `ei` and see that a base64 encoded AES encrypted cipher text is being decrypted to which our input is compared.

So, we just need to decrypt the ciphertext and the `IV` and `KEY` are hardcoded in other class `jv`

Rather than the traditional approach of getting the `IV` and `KEY` and then decrypting it ourselves, I wanted to try out a frida script i found , which hooks all the cryptographic function in a apk and logs its output

sauce:https://codeshare.frida.re/@L0WK3Y-IAAN/crypto-detection/
We just need to load this script and click the button once,

![alt text](/images/ctf/p3rf3ctr00t-ctf-knight/image-4.png)

We should confirm the flag,

![alt text](/images/ctf/p3rf3ctr00t-ctf-knight/image-5.png)

## Flag

`FLAG:k0t_r3v3rs3_kn1ght_n1nj4_07a51b8`
