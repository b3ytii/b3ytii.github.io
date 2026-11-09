---
layout: post
title: "Super Secure Catalog"
date: 2026-01-01 00:00:00 +0000
categories: ["Writeups", "CTF", "Cyberchaze CTF"]
tags: [ctf, writeup]
author: Narain Krishna
toc: true
---

# Super Secure Catalog

- ![alt text](/images/ctf/cyberchaze-ctf-supersecurecatalog/image.png)
- The app on opening, asks for a username and a password
- We can move on to inspecting in it JADX
- ![alt text](/images/ctf/cyberchaze-ctf-supersecurecatalog/image-1.png)
- The entered username and password is being verified in another class names `Cryto`
- Now,we can inspect the Crypto class 
- ![alt text](/images/ctf/cyberchaze-ctf-supersecurecatalog/image-2.png)
- A part of the flag was hardcoded,
- `cyberchaze{th3_encRYpt3d_STR1ng_in_3nc6yPtE6_`
- There was also the use of Native Libraries, we can inspect it in:
- ![alt text](/images/ctf/cyberchaze-ctf-supersecurecatalog/image-3.png)
- The function was a string encoded in hexa, we can convert it to string value
- ![alt text](/images/ctf/cyberchaze-ctf-supersecurecatalog/image-4.png)
1. hexa : 666921457d
2. ASCII : fi!E}
- If we join them together we get the flag 
- flag : `cyberchaze{th3_encRYpt3d_STR1ng_in_3nc6yPtE6_fi!e} `
