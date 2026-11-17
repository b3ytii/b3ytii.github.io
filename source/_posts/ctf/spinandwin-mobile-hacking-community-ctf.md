---
layout: post
title: "Spin And Win - Mobile Hacking Community CTF"
date: 2026-04-24 17:32:06 +0530
description: "Walkthrough for Spin And Win from Mobile Hacking Community CTF."
categories: ["Writeups", "CTF", "Mobile Hacking Community CTF"]
tags: [ctf, writeup, androidsecurity, mobileCTF, adb, insecure-storage]
author: Narain Krishna
cover: https://i.pinimg.com/736x/16/11/5b/16115b5c2dbe92eec41a1f46e2b94f9c.jpg
toc: true
---

## Challenge Description
```text
A vulnerable app stores sensitive data using insecure methods. Can you uncover where they’re hidden and retrieve them all?
```

## Solution

### Analysis

![App screen](/images/ctf/mobile-hacking-community-ctf-spinandwin/image-1.png)

Using adb we can search it one by one

Shared Preferences

![SharedPreferences](/images/ctf/mobile-hacking-community-ctf-spinandwin/image-3.png)

In the dir `/data/data/com.just.mobile.sec.challenge_1/shared_prefs` , we can run `cat com.just.mobile.sec.challenge1.FlagHintActivity.xml `

![Prefs xml](/images/ctf/mobile-hacking-community-ctf-spinandwin/image-2.png)

Databases

![sqlite3](/images/ctf/mobile-hacking-community-ctf-spinandwin/image-5.png)

In the dir `/data/data/com.just.mobile.sec.challenge_1/databases`

```bash
vbox86p:/data/data/com.just.mobile.sec.challenge_1/databases # sqlite3 app-database
SQLite version 3.28.0 2020-05-06 18:46:38
Enter ".help" for usage hints.
sqlite> .tables
Flags              android_metadata   room_master_table
sqlite> select * from Flags;
1|Flag_Part_2: svji4wiecm
sqlite>

```
External Storage

![External storage](/images/ctf/mobile-hacking-community-ctf-spinandwin/image-4.png)

In the dir `/storage/emulated/0/Android/data/com.just.mobile.sec.challenge_1/files/InsecureStorage`,

```bash
vbox86p:/storage/emulated/0/Android/data/com.just.mobile.sec.challenge_1/files/InsecureStorage # ls
VulnerableFile
cat VulnerableFile
Flag_Part_3: eho7r4np}
```

## Flag

<flag>MHC={4n0hzeesvji4wiecmeho7r4np}</flag>
