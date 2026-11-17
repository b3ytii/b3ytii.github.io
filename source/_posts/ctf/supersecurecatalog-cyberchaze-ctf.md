---
layout: post
title: "Super Secure Catalog - Cyberchaze CTF"
date: 2026-04-17 11:23:25 +0530
description: "Walkthrough for Super Secure Catalog from Cyberchaze CTF."
categories: ["Writeups", "CTF", "Cyberchaze CTF"]
tags: [ctf, writeup, androidsecurity, mobileCTF, cryptography, jadx]
author: Narain Krishna
cover: https://i.pinimg.com/1200x/6b/92/7e/6b927e328e32a0f402e09aa1f2ad267b.jpg
toc: true
---

## Solution

### Analysis

![alt text](/images/ctf/cyberchaze-ctf-supersecurecatalog/image.png)

The app on opening, asks for a username and a password

We can move on to inspecting in it JADX

![alt text](/images/ctf/cyberchaze-ctf-supersecurecatalog/image-1.png)

The entered username and password is being verified in another class names `Cryto`

Now,we can inspect the Crypto class

![alt text](/images/ctf/cyberchaze-ctf-supersecurecatalog/image-2.png)

A part of the flag was hardcoded,

`cyberchaze{th3_encRYpt3d_STR1ng_in_3nc6yPtE6_`

There was also the use of Native Libraries, we can inspect it in:

![alt text](/images/ctf/cyberchaze-ctf-supersecurecatalog/image-3.png)

The function was a string encoded in hexa, we can convert it to string value

![alt text](/images/ctf/cyberchaze-ctf-supersecurecatalog/image-4.png)

hexa : 666921457d

ASCII : fi!E}

If we join them together we get the flag

## Flag

<flag>cyberchaze{th3_encRYpt3d_STR1ng_in_3nc6yPtE6_fi!e}</flag>
