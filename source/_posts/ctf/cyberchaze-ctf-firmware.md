---
layout: post
title: "Firmware"
date: 2026-04-17 16:29:52 +0530
description: "Walkthrough for Firmware from Cyberchaze CTF."
categories: ["Writeups", "CTF", "Cyberchaze CTF"]
tags: [ctf, writeup, androidsecurity, mobileCTF]
author: Narain Krishna
cover: https://i.pinimg.com/474x/0c/0c/85/0c0c8537f19b7526429c3978635376f3.jpg
toc: true
---

## Challenge Description
```
Within a plain mobile firmware update, a secret quietly lies hidden. Overlapping memory writes whisper hints of a concealed message—if you're willing to look beyond the surface.
```

## Solution

### Analysis

This challenge's description strongly hints that the flag is hidden within a firmware update

In APKs, these firmware are usually found in `res/rax` or `assets`

We can check that using jadx.

![alt text](/images/ctf/cyberchaze-ctf-firmware/image-1.png)

There is a `firmware.bin` file in `res/raw`, we can right click on it to export it from jadx

We can check the file type : `file firmware.bin`,

![alt text](/images/ctf/cyberchaze-ctf-firmware/image-2.png)

It is a 7zip archieve, we can use `7z x firmware.bin` to extract..but it requires a password to do so, That password is probably in the APK itself

When we inspeact `strings.xml`,

![alt text](/images/ctf/cyberchaze-ctf-firmware/image-3.png)

There is a string with a name `useful` and value `nullc0n_2025`, which was indeed the password

After extracting,

```
muahahaha...~/Documents> file firmware.bin
firmware.bin: ELF 64-bit LSB pie executable, x86-64, version 1 (SYSV), dynamically linked, interpreter /lib64/ld-linux-x86-64.so.2, BuildID[sha1]=48b35161a51a8d49c58438d3a98f7a14baa8077c, for GNU/Linux 3.2.0, not stripped
muahahaha...~/Documents> chmod 777 firmware.bin
muahahaha...~/Documents> ./firmware.bin
Welcome to the Flag Challenge!
Can you find the hidden flag?

```
It was an executale file, we can try running strings in it

![alt text](/images/ctf/cyberchaze-ctf-firmware/image-4.png)

## Flag

`FLAG:cyberchaze{R0n_1s_H1gh}`
