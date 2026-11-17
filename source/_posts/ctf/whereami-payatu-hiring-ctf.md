---
layout: post
title: "Where Am I - Payatu Hiring CTF"
date: 2026-04-18 19:42:46 +0530
description: "Walkthrough for Where Am I from Payatu Hiring CTF."
categories: ["Writeups", "CTF", "Payatu Hiring CTF"]
tags: [ctf, writeup, androidsecurity, mobileCTF, adb, broadcast-receiver]
author: Narain Krishna
cover: /images/covers/whereami-payatu-hiring-ctf.jpg
toc: true
---

## Solution

### Analysis

We start by installing and opening the app in our emulator

![App screen](/images/ctf/payatu-hiring-ctf-whereami/image-1.png)

It shows a text that strongly hints this challenge involves `broadcasts` also it has a `7 sec` timer after that the app is terminated

Now, we can inspect it in Jadx,

![jadx](/images/ctf/payatu-hiring-ctf-whereami/image-2.png)

As expected, it does a Broadcast Receiver which probably contains the logic behind the flag

The Main Activity does not have much in it, just the logic behind the timer and termination

![Receiver code](/images/ctf/payatu-hiring-ctf-whereami/image-3.png)

```java
lic void onReceive(Context context, Intent intent) {
        if (new String(Base64.decode(context.getString(R.string.code), 0)).equals(intent.getStringExtra("loc"))) {
            Intent intent2 = new Intent(context, (Class<?>) ImTheSecond.class);
            intent2.addFlags(268435456);
            context.startActivity(intent2);
        }
    }
```
The value of R.string.code is `TWpvbG5pcg==` which when decoded is `Mjolnir`

Basically, our broadcast must contain a string extra with key `loc` and value `Mjolnir`, thats it the condition will be true and it will launch the activity which displays the flag

So, in our adb shell

`am start -n com.payatu.whereami/.MainActivity` --> launches the app

`am broadcast -a com.payatu.whereami.MY_ACTION -n com.payatu.whereami/.BroadCastListener --es loc Mjolnir` --> To launch the flag activity

![Flag](/images/ctf/payatu-hiring-ctf-whereami/image-4.png)

## Flag

<flag>PAYATU{WAMI-G0d0F7HUND3RONHUNT}</flag>
