---
title: 'ELI5 - animation-timeline'
description: "When writing a recent post on scroll-driven animations, I found it tricky to understand the animation-timeline property. This is breaking it down to understand the options a bit better!"
intro: ""
published: Created
updated: Last Modified
tags:
  - css
  - writing
layout: post
draft: true
---

This is a continuation of my post on ['Replacing GSAP with Scroll Driven Animations'](/writing/replace-gsap-wth-scroll-animations/)

Different types of timelines;

- default
- scroll progress timeline
  - named scroll progress timeline
  - anonymous scroll progress timeline
- view progress timeline
  - named view progress timeline - this is what is used in my previous demo
  - anonymous view progress timeline

WARNING FROM MDN - animation-timeline is included in the animation shorthand as a reset-only value. This means that including animation resets a previously-declared animation-timeline value to auto, but a specific value cannot be set via animation. When creating CSS scroll-driven animations, you need to declare animation-timeline after declaring any animation shorthand for it to take effect.

### Default

### scroll progress timeline

#### named scroll progress timeline

#### anonymous scroll progress timeline

### view progress timeline

#### named view progress timeline

#### anonymous view progress timeline

## Resources

[https://developer.mozilla.org/en-US/docs/Web/CSS/animation-timeline](https://developer.mozilla.org/en-US/docs/Web/CSS/animation-timeline)
