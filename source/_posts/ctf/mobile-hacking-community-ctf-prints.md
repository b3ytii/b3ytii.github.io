---
layout: post
title: "Prints"
date: 2026-01-01 00:00:00 +0000
categories: ["Writeups", "CTF", "Mobile Hacking Community CTF"]
tags: [ctf, writeup]
author: Narain Krishna
toc: true
---

# Prints

- We can start by installing and opening the app in our emulator
- ![alt text](/images/ctf/mobile-hacking-community-ctf-prints/image-1.png)
- It is a login screen and it says that we need biometrics to login but of course we cannot do that since we are running it in an emulator
- We must use a biometric bypass frida script to login
- For that, I used ` Universal Android Biometric Bypass` \
sauce:https://codeshare.frida.re/@ax/universal-android-biometric-bypass/
- We can load this script and try to login,
- ![alt text](/images/ctf/mobile-hacking-community-ctf-prints/image-2.png)
- We do see the flag after login, /
`FLAG:MHC{by3_by3_f1ng3r_b4nk}`
