---
layout: post
title: "Specialist_Beta - Cyberchaze CTF"
date: 2026-04-17 11:23:25 +0530
description: "Walkthrough for Specialist_Beta from Cyberchaze CTF."
categories: ["Writeups", "CTF", "Cyberchaze CTF"]
tags: [ctf, writeup, androidsecurity, mobileCTF, deeplink, jadx]
author: Narain Krishna
cover: https://i.pinimg.com/1200x/3a/a7/f1/3aa7f14a4d5c3aa1251c27bca81f19f1.jpg
toc: true
---

## Solution

### Analysis

When we inspect the Manifest file,we see ann activity which handles deeplinks

![alt text](/images/ctf/cyberchaze-ctf-specialist-beta/image.png)

Further, we can check the code of that activity

![alt text](/images/ctf/cyberchaze-ctf-specialist-beta/image-1.png)

Our intent should have a data uri, the length of it should be more than 14 chars but not equal to 27

And a base64 value is getting decoded, to which a substring of our data uri is being checked

We can get that value from the strings.xml file

![alt text](/images/ctf/cyberchaze-ctf-specialist-beta/image-2.png)

base64 encoded value : ZGVlcGxpbmstc2VjcmV0LWludGVudC1kYXRh

base64 decoded value : deeplink-secret-intent-data

`strSubstring` will contain the string from the data uri we pass but starting only from the index 14

So the first 14(index 0 - 13) characters of the uri we pass does not matter, to that we can append `deeplink-secret-intent-data`

So, our POC app:

```java
 b1.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                Intent intent = new Intent();
                intent.setAction("android.intent.action.VIEW");
                intent.setComponent(new ComponentName("beta.smartcorp.specialist","beta.smartcorp.specialist.ui.map.MapFragment"));
                Uri data = Uri.parse("11111111111111deeplink-secret-intent-data");
                intent.setData(data);
                startActivity(intent);

            }
        });
```
And then we get the flag,

![alt text](/images/ctf/cyberchaze-ctf-specialist-beta/image-3.png)

## Flag

<flag>cyberchaze{prot3ct_deeplink$_You_F0uNd_tHe_fl3g}</flag>
