---
layout: post
title: "Hello World - Eschaton CTF"
date: 2026-05-02 20:51:05 +0530
description: "Walkthrough for Hello World from Eschaton CTF."
categories: ["Writeups", "CTF", "Eschaton CTF"]
tags: [ctf, writeup, androidsecurity, mobileCTF, sqlite, jadx]
author: Narain Krishna
cover: https://i.pinimg.com/736x/24/b6/42/24b642891733fc30346131864588f98f.jpg
toc: true
---

## Challenge Description
```text
Hello World
```

## Solution

### Analysis

For this challenge, we are given an encrypted Android Backup

![file](/images/ctf/eschaton-ctf-helloworld/image-1.png)

To extract the file we would need a password, for that im using the tool - `john`

The steps to use it :

`androidbackup2john helloworld.dat > helloworld.txt` -> this is to identIfy all the parameters required for decryption

`john --wordlist=/usr/share/dict/rockyou.txt helloworld.txt` -> brute forcing the encryption with `rockyou.txt` which has about 14 million common passwords

![john](/images/ctf/eschaton-ctf-helloworld/image-2.png)

The password of the file is `hello world`, now we can use android backup extractor to extract it

`android-backup-unpack -p "hello world" -t ~/Downloads ~/Downloads/helloworld.dat`
We can inspect the `/apps/com.mcsc.helloworld/a/base.apk` in jadx

![jadx](/images/ctf/eschaton-ctf-helloworld/image-3.png)

We see that it app imports `sqlcipher` and a particulartly interesting string `1s_th1s_th3_fl4g` and also a hidden database is mentioned `.notinhere.db`

We can navigate to `/apps/com.mcsc.helloworld/db` and do `ls -al`

![Databases](/images/ctf/eschaton-ctf-helloworld/image-4.png)

We can access `.notinhere.db` using `sqlcipher` and try the pragma key as `1s_th1s_th3_fl4g`

![sqlcipher](/images/ctf/eschaton-ctf-helloworld/image-5.png)

The flag is inside the table `notes`

## Flag

<flag>esch{he1!0o0o0o0o0_w0r!d}</flag>
