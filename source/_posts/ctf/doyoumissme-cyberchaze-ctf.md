---
layout: post
title: "Do You Miss Me? - Cyberchaze CTF"
date: 2026-04-17 11:36:08 +0530
description: "Walkthrough for Do You Miss Me? from Cyberchaze CTF."
categories: ["Writeups", "CTF", "Cyberchaze CTF"]
tags: [ctf, writeup, androidsecurity, mobileCTF, base64, jadx]
author: Narain Krishna
cover: https://i.pinimg.com/736x/3b/66/48/3b66485dcd5f069a513a5763c20f42a9.jpg
toc: true
---

## Challenge Description
```text
Just like the Joker’s return to Gotham, this mobile app has a hidden surprise waiting for you. Unearth the hardcoded flag tucked away in the shadows and show us that you’ve missed the thrill of the chase!
```

## Solution

### Analysis

We can start by installing and opening the APK in our emulator

![alt text](/images/ctf/cyberchaze-ctf-doyoumissme/image-1.png)

It just has a textview with a text `Do You Miss Me`, Now we can further inspect it in jadx

![alt text](/images/ctf/cyberchaze-ctf-doyoumissme/image-2.png)

As expected, nothing much happening in Main Activity

Since, the description suggests that the flag is hardcoded and hidden, we can inspect possible candidate files like `strings.xml`

![alt text](/images/ctf/cyberchaze-ctf-doyoumissme/image-3.png)

We find a particularly interesting string with the name `flag` and value `Q3liZXJjaGF6ZXtsOWdSUDhyakxiUHZ6djFtWTNWdVE2TXNSUjYzZUxqZDN4bE53bVQyNnExOXhZMGd4Sn0`

This seems like a flag which is encoded in base64, We can run `echo "Q3liZXJjaGF6ZXtsOWdSUDhyakxiUHZ6djFtWTNWdVE2TXNSUjYzZUxqZDN4bE53bVQyNnExOXhZMGd4Sn0" | base64 -d` in our terminal

## Flag

<flag>Cyberchaze{l9gRP8rjLbPvzv1mY3VuQ6MsRR63eLjd3xlNwmT26q19xY0gxJ}</flag>
