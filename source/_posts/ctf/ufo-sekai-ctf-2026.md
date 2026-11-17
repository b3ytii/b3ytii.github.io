---
layout: post
title: "UFO - Sekai CTF (2026)"
date: 2026-08-07 17:48:57 +0530
description: "Walkthrough for UFO from Sekai CTF (2026)."
categories: ["Writeups", "CTF", "Sekai CTF (2026)"]
tags: [ctf, writeup, androidsecurity, mobileCTF, frida, jadx]
cover: https://i.pinimg.com/1200x/97/c4/a9/97c4a9e103b361eae6439bf9234cf174.jpg
author: Narain Krishna
toc: true
---

## Challenge Description
```text
This app is pretty handy
```

## Solution

### Analysis

We can start by opening the apk in our emulator,

![App screen](/images/ctf/sekai-ctf-2026-ufo/image-1.png)

This seems like a file opener application which supports a variety of extensions, after searching for a bit...I found that this same application is available in playstore

link:https://play.google.com/store/apps/details?id=com.krauq.universalfileopener&hl=en_IN
This app has a premium subscription, but since this is a legit app we can rule out a possibility of bypassing them to find the flag.

Now, we can proceed to inspect it in jadx,

![jadx](/images/ctf/sekai-ctf-2026-ufo/image-2.png)

An obfuscated code, which makes it much harder to find anything related to the flag, But after some time of searching through the code we find something interesting

![Obfuscated code](/images/ctf/sekai-ctf-2026-ufo/image-3.png)

The class `b7.w` initializes an integer preference key `ambient_trace` and if we track this key ,

![b7.w](/images/ctf/sekai-ctf-2026-ufo/image-4.png)

In class `b7.a` we find something, we open particular file types like spreadsheet,pdf with signature etc the value of `ambient_trace` updates, more clearly -

bit 1 = PdfSignature

bit 2 = PdfMetadata

bit 4 = OfficeText

bit 8 = Spreadsheet

bit 16 = ImageTransform

As this value changes a pixel art starts to appear in the main screen, to see the full pixel art we must set the value of `ambient_trace` to `0b11111` or `31`

To do that we can :

Open all those files and set it manually

modify the config file i.e `ufo_prefs.preferences_pb` which is present in `/data/data/com.krauq.universalfileopener/files/datastore/` using a hex editor and change the value

Use frida to force the value to be 31

I will be using method 3 here, The script i used :

```javascript
Java.perform(function() {
    var m0 = Java.use('r7.m0');
    m0.g.overload('int', 'int', 'y0.k').implementation = function(i3, i10, k) {
        return this.g(31, i10, k);
    };
});
```
After loading this script, We see

![Pixel art](/images/ctf/sekai-ctf-2026-ufo/image-5.png)

We can use Gemini to clean up the background and to only keep the colour pixels

![Cleaned](/images/ctf/sekai-ctf-2026-ufo/image-6.png)

Now, we can load this photo into a photo editor and turn it into black and white and darken the black pixels

![Grayscale](/images/ctf/sekai-ctf-2026-ufo/image-7.png)

Now, this looks like a qr code but it does not contain the three black boxes at the corners

We can try to reconstruct this qr for that I used [Qrazybox](https://merri.cx/qrazybox/)

The error correction level is L and Mask pattern is 5

After reconstructing it, we get the final QR -

![Final QR](/images/ctf/sekai-ctf-2026-ufo/image-8.png)

Google lens or Camera might not be able to scan this qr, So we might need to install a qr and barcode scanner from playstore,

After scanning the qr, we get a text `clankedormiscgod` and it was mentioned in the desc to wrap the flag in `SEKAI{}`

## Flag

<flag>SEKAI{clankedormiscgod}</flag>
