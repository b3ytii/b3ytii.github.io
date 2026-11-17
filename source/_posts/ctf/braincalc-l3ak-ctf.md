---
layout: post
title: "Brain Calc - l3ak CTF"
date: 2026-04-29 21:30:12 +0530
description: "Walkthrough for Brain Calc from l3ak CTF."
categories: ["Writeups", "CTF", "l3ak CTF"]
tags: [ctf, writeup, androidsecurity, mobileCTF, base64, jadx]
author: Narain Krishna
cover: https://i.pinimg.com/736x/02/19/1a/02191a206c63249be95ee85e4fe82e12.jpg
toc: true
---

## Challenge Description
```text
Quick and fun math quiz app for practicing.
```

## Solution

### Analysis

We can start by inspecting the app in jadx

![Chaquopy](/images/ctf/l3ak-ctf-braincalc/image-1.png)

From the decompiled Main Activity, we understand that the whole app run on python

The python source code is usually stored in `assets/chaquopy`

![Chaquopy assets](/images/ctf/l3ak-ctf-braincalc/image-2.png)

We can see `app.imy` in `assets/chaquopy` , we can export that file and analyze it

```bash
 file app.imy
app.imy: Zip archive data, made by v2.0, extract using at least v2.0, last modified Feb 01 1980 00:00:00, uncompressed size 0, method=deflate
```
It is a Zip archive data, we can extract it using `7z x app.imy`

After extracting it, we can navigate to `/BrainCalc` under which `app.pyc` is present which is compiled python file

We can convert it to `.py` using a tool - pycdc

`pycdc app.pyc`
We see the flag's logic,

```python
#code above
def get_secret_reward():
Warning: Stack history is not empty!
Warning: block stack is not empty!
    compressed_flag = 'eJzzMXb0rvYqLS6JN4kPNynKjQ8tiHfOMMnJqQUAeHcJQA=='

    try:
        decoded = base64.b64decode(compressed_flag)
        flag = zlib.decompress(decoded).decode('utf-8')
        return flag
    except:
        return 'Error: Could not decode secret'
#code below

```
We can just reconstruct the flag logic in a python file and run it to get the flag

```python
import zlib
import base64
compressed_flag = 'eJzzMXb0rvYqLS6JN4kPNynKjQ8tiHfOMMnJqQUAeHcJQA=='
decoded = base64.b64decode(compressed_flag)
flag = zlib.decompress(decoded).decode('utf-8')
print(flag)
```

## Flag

<flag>L3AK{Just_4_W4rm_Up_Ch4ll}</flag>
