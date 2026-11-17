---
layout: post
title: "Droid Cryptor - m0leC0n CTF"
date: 2026-05-07 21:48:19 +0530
description: "Walkthrough for Droid Cryptor from m0leC0n CTF."
categories: ["Writeups", "CTF", "m0leC0n CTF"]
tags: [ctf, writeup, androidsecurity, mobileCTF, cryptography, base64]
author: Narain Krishna
cover: https://i.pinimg.com/736x/bc/17/55/bc1755d9b973bfbb8b1ed5da5d269dff.jpg
toc: true
---

## Challenge Description
```text
One of my friends told me about this application that promised to keep your data safe. When I tried to encrypt the data, I found out later that there is no way to view it! Can you retrieve my message?
```

## Solution

### Analysis

We can start by installing and opening the APK

![App home](/images/ctf/m0lec0n-ctf-droidcryptor/image-1.png)

The launcher activity has two buttons :

Encrypt

Decrypt

When we click the `Encrypt` it takes us to the `EncryptFragment` and encrypts our message

![Encryption](/images/ctf/m0lec0n-ctf-droidcryptor/image-2.png)

From the output, it is clear that is uses `AES` encryption, but when we click on the `Decrypt` button,

![jadx](/images/ctf/m0lec0n-ctf-droidcryptor/image-3.png)

Now, we can proceed to inspect the APK in the jadx,

From the class `AesLaboratory,

![AesLaboratory](/images/ctf/m0lec0n-ctf-droidcryptor/image-4.png)

We get the `SUPER_SECRET_KEY = "YWYwYjAyYjkzNmRhZjU3Yg==`, from the `.txt` provided we already have the `ciphertext` and `token (IV)`, we can use [cyberchef.io](gchq.github.io/CyberChef/) to decrypt the ciphertext

## Flag

<flag>ptm{th3nk_y0u_f0r_r3st0r1ng_mY_m3ss4g3!}</flag>
