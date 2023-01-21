---
title: "Weblock"

about: "Non abrasive automatic door lock for my apartment. Designed in Fusion 360, Coded in C++ and Javascript, and soldered with love"

socialImage: /images/projects/door_lock.png

date: "2023-01-01"

tags:
  - nextjs
---

# Overview: 

We wanted to create an easy way to toggle the lock mechanism. The first idea we had was to use the ESP8266 because of its easy-to-use Wi-Fi module and IO. The idea was to run a website and communicate to the chip over the web. When researching this project, we came accosted the esp8266-iot-framework library by maakbaas on GitHub. This would allow us to host a webserver on the EP8266 and connect to it via an IP address. The browser would then direct you to a webpage and allow us to comminate with the IO. Perfect! 

We created the website in ReactJS which would then be compiled down into binary and stored on the chip. First, the only accessible page of the website is the password page. Once the correct password is entered it will then redirect you to the lock control screen. All other pages will not be available until the correct password is submitted for the given browser id. Controlling the IO is done through an API using https, so the communication between the server and client is secure. The password, lock control, and authentication are all handled on the ESP8266, which is not accessible by anyone besides the chip itself. There may be security flaws that we are not aware of, but the fact is, it would be easier to pick the lock than hack the webserver. 

# Login System: 

It would be annoying to type the password every time you wanted to lock the door. So, we came up with an idea to save create a browser id using the UUID v4 format and save it to local storage. This way we can write code to recognize if the user has already used login with that browser. We designed the login system as a linked list of structs that stores th e ID and last time the user has logged in. It will store 20 different users and remove them after 10 days. 

![Alt text](/images/projects/door_lock.png)