---
layout: post
title: "Hello World"
date: 2026-01-01 00:00:00 +0000
categories: ["Writeups", "CTF", "Eschaton CTF"]
tags: [ctf, writeup]
author: Narain Krishna
toc: true
---

# Hello World 

## Description 
```
Hello World
```

## Solution 
- For this challenge, we are given an encrypted Android Backup
- ![alt text](/images/ctf/eschaton-ctf-helloworld/image-1.png)
- To extract the file we would need a password, for that im using the tool - `john` 
- The steps to use it :
1. `androidbackup2john helloworld.dat > helloworld.txt` -> this is to identIfy all the parameters required for decryption
2. `john --wordlist=/usr/share/dict/rockyou.txt helloworld.txt` -> brute forcing the encryption with `rockyou.txt` which has about 14 million common passwords
- ![alt text](/images/ctf/eschaton-ctf-helloworld/image-2.png)
- The password of the file is `hello world`, now we can use android backup extractor to extract it  \
`android-backup-unpack -p "hello world" -t ~/Downloads ~/Downloads/helloworld.dat`
- We can inspect the `/apps/com.mcsc.helloworld/a/base.apk` in jadx
- ![alt text](/images/ctf/eschaton-ctf-helloworld/image-3.png)
- We see that it app imports `sqlcipher` and a particulartly interesting string `1s_th1s_th3_fl4g?` and also a hidden database is mentioned `.notinhere.db`
- We can navigate to `/apps/com.mcsc.helloworld/db` and do `ls -al`
- ![alt text](/images/ctf/eschaton-ctf-helloworld/image-4.png)
- We can access `.notinhere.db` using `sqlcipher` and try the pragma key as `1s_th1s_th3_fl4g?`
- ![alt text](/images/ctf/eschaton-ctf-helloworld/image-5.png)
- The flag is inside the table `notes` \
`FLAG:esch{he1!0o0o0o0o0_w0r!d}`
