---
layout: post
title: "Path Finder - Payatu Hiring CTF"
date: 2026-04-20 23:22:38 +0530
description: "Walkthrough for Path Finder from Payatu Hiring CTF."
categories: ["Writeups", "CTF", "Payatu Hiring CTF"]
tags: [ctf, writeup, androidsecurity, mobileCTF, deeplink, webview, adb]
cover: https://i.pinimg.com/736x/90/bc/d8/90bcd8c3231f039c800edd11b42c32b9.jpg
author: Narain Krishna
toc: true
---

## Solution

### Analysis

We can start by inspecting the APK in jadx, since this is a webview-XSS challenge

![Manifest](/images/ctf/payatu-hiring-ctf-pathfinder/image-1.png)

The Main Activity itself has intent filers for a deeplink, from this we get an idea on how our link should be i.e `ctf://payatu/web`

Now, we can proceed to MainActivity to check how the web view is loaded and url is handled

From strings.xml,

R.sting.host = payatu.com

R.string.url_param = url

![Strings](/images/ctf/payatu-hiring-ctf-pathfinder/image-4.png)

The flow of checking is:

`data` stores the value of data of the intent and the path of the data should not be null and path should match `/web`

`urlToLoad` stores whatever input we give as a parameter of `url`

It checks that `urlToLoad` contains `"payatu.com"`

Parallely this file `"file:///android_asset/WebViewRedirect.html;`  is loaded in the webview

The `urlToLoad` is passed to `redirect()`(this is a function inside WebViewRedirect.html)

We can inspect `WebViewRedirect.html`,

![showflag()](/images/ctf/payatu-hiring-ctf-pathfinder/image-2.png)

This file contains  `showflag()` , which we should call

So, deeplink should bypass all this checks and call the `showflag()` function

We, can use `ctf://payatu/weburl=javascript:AndroidFunction.showFlag()//payatu.com` to get the flag.

This link follows

The scheme,host and path specified in the manifest

javascript code is passed as an parameter of `url`

The javascript code contains `AndroidFunction.showFlag()` , which calls the functions we want

The link contains `payatu.com` which is commented out so it does not interfere with the code execution

We can pass with through adb `am start -a android.intent.action.VIEW -d tf://payatu/weburl=javascript:AndroidFunction.showFlag()//payatu.com`

![Flag](/images/ctf/payatu-hiring-ctf-pathfinder/image-3.png)

## Flag

<flag>PAYATU{Th1s_i5_th3_w4y}</flag>
