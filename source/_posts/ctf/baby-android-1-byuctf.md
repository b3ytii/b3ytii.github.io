---
layout: post
title: "baby-android-1 - ByuCTF"
date: 2026-04-17 11:23:25 +0530
description: "Walkthrough for baby-android-1 from ByuCTF."
categories: ["Writeups", "CTF", "ByuCTF"]
tags: [ctf, writeup, androidsecurity, mobileCTF, jadx]
author: Narain Krishna
cover: /images/covers/baby-android-1-byuctf.jpg
toc: true
---

## Solution

### Analysis

We can begin by inspecting the Manifest file

![Manifest](/images/ctf/byuctf-baby-android-1/image.png)

Nothing much in the manifest, only one activity

![MainActivity](/images/ctf/byuctf-baby-android-1/image-1.png)

The Main activity does nothing but call the Utils.cleanUp() method

And if we inspect Utils Class

![Utils class](/images/ctf/byuctf-baby-android-1/image-2.png)

Same as the name, Utils.cleanUp() cleans the text in the textviews and sets it to nothing

If we search the `flagpart*` in the resources file,

Inside strings.xml theres nothing there

But in `layout/activity_main.xml` file, we see:

![Layout strings](/images/ctf/byuctf-baby-android-1/image-3.png)

Every text view has one char in it has a text

If we assemble it by order we get,

`b{e4_if_e_efcopukd0inrdccyat}` but this does not make any sense

Every textview has a definite position in the layout, So we can just copy paste the textviews to our POC app to see how it will look

![POC layout](/images/ctf/byuctf-baby-android-1/image-4.png)

Even though, it is distorted we can read it to :

## Flag

<flag>byuctf{android_piece_0f_c4ke}</flag>
