---
title: "IoT Light Switch"

about: "Why walk 5 feet to flip your light switch when you could use your phone when you're comfy in bed 😌"

socialImage: /images/projects/light_switch.png 

date: "2023-01-01"

tags:
  - nextjs
---


# Overview:

It's well know that all programmer are lazy and this project is no exception. That's why I made a physical light switcher connected to IoT. In this blog post, I'll explain how i went about making this project.

# Design:

I first went onto thingyverse to see if there were any designs I could screw onto my existing light switch. After I found a design I like, I modeled up the case for the elections and tossed it on the 3d printer. When the print was done screwed the motors into the part and painted it with spray paint and added fun shapes cut out of sticker paper to give it a unique look.

# Electronics

The core of this project is based around the NODE-MCU or the ESP8266 wifi module and two 5 gram servos to flip the switches. The NODE-MCU connects to my wifi network and allows me to control the servos remotely. With this setup, I can control the light switcher from anywhere in the world with an internet connection.

# Programming

The code for this project was fairly simple. I used IFTTT to connect my Google Home with a webhook. When I say "Hey Google, turn on the lights," the Google Home sends a signal to IFTTT, which triggers the webhook. The webhook then sends a signal to the NODE-MCU, which controls the servos to flip the light switches.

![Alt text](/images/projects/light_switch.png)