---
layout: post
title: "Shadow Vault"
date: 2026-05-04 20:20:08 +0530
description: "CTF write-up for Shadow Vault by Narain Krishna."
categories: ["Writeups", "CTF", "Pearl CTF"]
tags: [ctf, writeup]
author: Narain Krishna
toc: true
---

## Challenge Description
```
A mysterious app called ShadowVault has surfaced, rumored to hide secrets within its code. Can you unravel its mystery?
```

## Solution

### Analysis

We can start by installing and opening the app in our emulator

![alt text](/images/ctf/pearl-ctf-shadowvault/image-1.png)

The launcher activity is a login screen, when we entry to enter the app it shows a toast `Wrong details provided`

We can find the logic that handles the login screen by doing a global search of `Wrong details provided`

![alt text](/images/ctf/pearl-ctf-shadowvault/image-2.png)

The credentials are hardcoded in the app itself, we can use those to enter into the app

username : `Player118`

Password : `Gv8@kz#1qP$Xy!tM`

![alt text](/images/ctf/pearl-ctf-shadowvault/image-3.png)

It has a `Get Flag` and when we click it shows a toast `OOPS, You must travel to moon🌚 for the flag!`

![alt text](/images/ctf/pearl-ctf-shadowvault/image-4.png)

Looking further in jadx we can find a Retrofit Client class and a hardcoded link `https://pearlctf.pythonanywhere.com/`, When we click the `Get Flag` button the app sends a https request

We can capture the request via `BurpSuite` and check the passed parameters, to bypass the ssl pinning we can use `android-unpinner`

`android-unpinner all app-debug.apk`
sauce:https://github.com/mitmproxy/android-unpinner
![alt text](/images/ctf/pearl-ctf-shadowvault/image-5.png)

We have successfully captured the `POST` request, it is sending two parameters

latitude

longitude

We can perform a global search for these in jadx, to find more about it

![alt text](/images/ctf/pearl-ctf-shadowvault/image-6.png)

The values of `desiredLatitude` and `desiredLongitude` is hardcoded,

`desiredLatitude = 100 `

`desiredLongitude = 200`

We just need to modify the captured request and send it again to get the flag

![alt text](/images/ctf/pearl-ctf-shadowvault/image-7.png)
