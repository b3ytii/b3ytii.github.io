---
layout: post
title: "Couple Gallery"
date: 2026-05-02 23:27:53 +0530
description: "CTF write-up for Couple Gallery by Narain Krishna."
categories: ["Writeups", "CTF", "Eschaton CTF"]
tags: [ctf, writeup]
author: Narain Krishna
toc: true
---

## Challenge Description
```
So my girlfriend, she stored all our private images on a "Secure App". As expected, she forget the passcode and now all our memories are lost! Can you help us recovering them? 🙂. Just remember that the passcode is a '6 DIGIT NUMBER'.
```

## Solution

### Analysis

We can start by installing and open the apk in our emulator

![alt text](/images/ctf/eschaton-ctf-couplegallery/image-1.png)

We need a six digit pincode to unlock the app, we can proceed to inspect it in jadx

![alt text](/images/ctf/eschaton-ctf-couplegallery/image-2.png)

While inspecting it we can see that the app is written in `React Native` , So to actually decompile the apk we would need a `React Native` like - `Hermes Decompiler`

sauce:https://github.com/P1sec/hermes-dec
We can clone the repo and follow the steps given

`7z x com.mcsc.couplegallery.apk -o./out`

`cd out`

`hbc-file-parser assets/index.android.bundle`

`hbc-decompiler assets/index.android.bundle ./my_output_file.js`

Now using `grep` we can search for any hardcoded 6 digits inside the `my_output_file.js` file

`cat my_output_file.js | grep -nE "r[0-9]+ = '[0-9]{6}'"`
![alt text](/images/ctf/eschaton-ctf-couplegallery/image-3.png)

We get a code `369963` , we can try to input that in the apk

![alt text](/images/ctf/eschaton-ctf-couplegallery/image-4.png)

In the apk we find a image which contains the second part of the flag

`_1s_s3cure_k3y_w4s_369963`
We can guess and use grep to get the first part of the flag from `my_output_file.js`.

![alt text](/images/ctf/eschaton-ctf-couplegallery/image-5.png)

## Flag

`FLAG: esch{wh0_s3aid_r3act_n4t1v3_1s_s3cure_k3y_w4s_369963}`
