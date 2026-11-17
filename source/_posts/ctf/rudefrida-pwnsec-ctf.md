---
layout: post
title: "Rude Frida - Pwnsec CTF"
date: 2026-04-21 19:02:53 +0530
description: "Walkthrough for Rude Frida from Pwnsec CTF."
categories: ["Writeups", "CTF", "Pwnsec CTF"]
tags: [ctf, writeup, androidsecurity, mobileCTF, frida, ghidra, native-library]
author: Narain Krishna
cover: https://i.pinimg.com/736x/a5/0a/86/a50a86ff513150750977777306f5ae4e.jpg
toc: true
---

## Challenge Description
```text
Say hello to RudeFrida, it is like your toxic ex who gaslighted you for loving her. - @TK
```
## Solution

### Analysis

We can install the APK and try to open it in our emulator, but we are instantly thrown out

To know , whats happening we can inspect it in Jadx

![App crash](/images/ctf/pwnsec-ctf-rudefrida/image-1.png)

There isnt much in MainActivity, But we see a native lib `libRudeFrida.so` being loaded , we can open this native lib in Ghidra to understand whats happening

![jadx](/images/ctf/pwnsec-ctf-rudefrida/image-2.png)

The `stringfromJNI()` calls two other functions:

is_root_simple()

FridaCheck()

We can inspect both these functions to understand what they are doing-

![is_root_simple](/images/ctf/pwnsec-ctf-rudefrida/image-3.png)

`is_root_simple()` is trying to access some root binaries in the device for root detection

![FridaCheck](/images/ctf/pwnsec-ctf-rudefrida/image-4.png)

`FridaCheck()` checks for the default ports used by frida-server

We would have to bypass both the checks to open the app

Also, on inspecting in ghidra we see another function `get_flag` which takes in two integer parameters

```c
if (param_1 + param_2 == 0x539) {
 uVar12 = 0xdeadbeefcafebabe;
 local_a00 = (undefined **)0xdeadbeefcafebabe;
 lVar9 = 1;
 lVar10 = 2;
 while( true )
```
And the sum of the passed parameters has to be equal to `0x539` which is `1337` in decimal

And if we scroll down a bit,

![get_flag](/images/ctf/pwnsec-ctf-rudefrida/image-5.png)

This function does not return anything , but logs some strings which probably could be the flag

So, our frida script must :

bypass root check

bypass frida check

call `get_flag`

To bypass the root check, I'm using a script from the frida-codeshare

link:https://codeshare.frida.re/@fdciabdul/frida-multiple-bypass/
This also includes `ssl-unpinning` which we do not require here, so we only need to take till line `805`

To bypass the frida checks im using `phantom-frida`

link:https://github.com/TheQmaks/phantom-frida
![phantom-frida](/images/ctf/pwnsec-ctf-rudefrida/image-6.png)

`phatom-frida` bypasses all the major 16 detection techniques

To call the `get_flag` method , we should first know the exported symbol - To find that we just need to do a search in ghidra

![Symbols](/images/ctf/pwnsec-ctf-rudefrida/image-8.png)

Now, our frida script -

```javascript
// after our root bypass
const NativeMethod = Process.getModuleByName('libRudefrida.so');
const f = NativeMethod.getExportByName('_Z8get_flagii');
const myNative= new NativeFunction(f,['void'],['int','int']);
myNative(1330,7);
```
P.S: Our script will not have any anti-frida bypass since we are using `phantom-frida`

Now, we just need to run this script and check our logs,

![Flag](/images/ctf/pwnsec-ctf-rudefrida/image-7.png)

## Flag

<flag>flag{w3_l4ugh3d_4t_y0ur_Fr1d4_scr1p7_but_it_st1ll_w0rk5_lol}</flag>
