---
layout: post
title: "Secure Catalog APK"
date: 2026-04-17 11:23:25 +0530
description: "Walkthrough for Secure Catalog APK from Cyberchaze CTF."
categories: ["Writeups", "CTF", "Cyberchaze CTF"]
tags: [ctf, writeup, androidsecurity, mobileCTF]
author: Narain Krishna
cover: https://i.pinimg.com/736x/e8/c3/31/e8c3316dd4bea8ee4ce5c1d4629a73d6.jpg
toc: true
---

## Solution

### Analysis

![alt text](/images/ctf/cyberchaze-ctf-securecatalog/image.png)

The app when launched first asks for email id and a password

If we dig through the string.xml file in jadx, we would find the email id and the password required to login in

![alt text](/images/ctf/cyberchaze-ctf-securecatalog/image-4.png)

![alt text](/images/ctf/cyberchaze-ctf-securecatalog/image-5.png)

email : admin@catalog.com

password : password

![alt text](/images/ctf/cyberchaze-ctf-securecatalog/image-1.png)

When we login we see a potential flag, but its encrypted with shift cipher(key=3) and if we decrypt it,

ciphertext: Cixd{qefp_fp_klq_qeb_obxi_cixd_illh_xolrka}

plaintext: Flag{this_is_not_the_real_flag_look_around}

After we login we can inspect the app with adb

We can see two databases in the /databases dir

product_part1.db

product_part2.db

We cannot directly access the database, it is protected by sqlcipher,So we need to find the key to access it

![alt text](/images/ctf/cyberchaze-ctf-securecatalog/image-2.png)

Further, if we inspect the Manifest..we see the DBUtil activity and if we inspect that

![alt text](/images/ctf/cyberchaze-ctf-securecatalog/image-3.png)

![alt text](/images/ctf/cyberchaze-ctf-securecatalog/image-6.png)

We can see a base64 encoded value which is used while executing the SQL query

base64 encoded: `cGFzczEyMw==`

decoded: `pass123`

Potentially `pass123` could be the key to access the database

We pull both the databases to our system using adb

and then use `sqlcipher product_part1.db` and enter

```
PRAGMA key = 'pass123';
.tables
```
![alt text](/images/ctf/cyberchaze-ctf-securecatalog/image.webp)
We see a tablle `secret` and if the run `SELECT * FROM SECRET;` we get the flag

## Flag

`flag: cyberchaze{h4rdcoded_pa$s_y0u_g0t_th3_fl@g}`
