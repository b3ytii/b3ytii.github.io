---
layout: post
title: "Spin And Win"
date: 2026-01-01 00:00:00 +0000
categories: ["Writeups", "CTF", "Mobile Hacking Community CTF"]
tags: [ctf, writeup]
author: Narain Krishna
toc: true
---

# Spin And Win

## Description 
```
A vulnerable app stores sensitive data using insecure methods. Can you uncover where they’re hidden and retrieve them all?
```

## Solution 

- ![alt text](/images/ctf/mobile-hacking-community-ctf-spinandwin/image-1.png)
- Using adb we can search it one by one
1. Shared Preferences
-  ![alt text](/images/ctf/mobile-hacking-community-ctf-spinandwin/image-3.png)
- In the dir `/data/data/com.just.mobile.sec.challenge_1/shared_prefs` , we can run `cat com.just.mobile.sec.challenge1.FlagHintActivity.xml `
- ![alt text](/images/ctf/mobile-hacking-community-ctf-spinandwin/image-2.png)
2. Databases
- ![alt text](/images/ctf/mobile-hacking-community-ctf-spinandwin/image-5.png)
- In the dir `/data/data/com.just.mobile.sec.challenge_1/databases`
```
vbox86p:/data/data/com.just.mobile.sec.challenge_1/databases # sqlite3 app-database                                             
SQLite version 3.28.0 2020-05-06 18:46:38
Enter ".help" for usage hints.
sqlite> .tables
Flags              android_metadata   room_master_table
sqlite> select * from Flags;
1|Flag_Part_2: svji4wiecm
sqlite> 

```
3. External Storage
- ![alt text](/images/ctf/mobile-hacking-community-ctf-spinandwin/image-4.png)
- In the dir `/storage/emulated/0/Android/data/com.just.mobile.sec.challenge_1/files/InsecureStorage`,
```                            
vbox86p:/storage/emulated/0/Android/data/com.just.mobile.sec.challenge_1/files/InsecureStorage # ls
VulnerableFile
cat VulnerableFile                           
Flag_Part_3: eho7r4np}
```
- `FLAG:MHC={4n0hzeesvji4wiecmeho7r4np}`
