---
layout: post
title: "Prints - Mobile Hacking Community CTF"
date: 2026-04-25 00:05:56 +0530
description: "Walkthrough for Prints from Mobile Hacking Community CTF."
categories: ["Writeups", "CTF", "Mobile Hacking Community CTF"]
tags: [ctf, writeup, androidsecurity, mobileCTF, biometrics]
author: Narain Krishna
cover: /images/covers/prints-mobile-hacking-community-ctf.jpg
toc: true
---

## Solution

### Analysis

We can start by installing and opening the app in our emulator

![Login screen](/images/ctf/mobile-hacking-community-ctf-prints/image-1.png)

It is a login screen and it says that we need biometrics to login but of course we cannot do that since we are running it in an emulator

We must use a biometric bypass frida script to login

For that, I used ` Universal Android Biometric Bypass`

link:https://codeshare.frida.re/@ax/universal-android-biometric-bypass/
We can load this script and try to login,

![Flag](/images/ctf/mobile-hacking-community-ctf-prints/image-2.png)

We do see the flag after login, /

## Flag

<flag>MHC{by3_by3_f1ng3r_b4nk}</flag>
