---
title: 'What is CSS reading-flow?'
description: "I've had this demo kicking around in the dusty corners of my Codepen account for a while, let's see how it's put together"
intro: ""
pubDate: 'February 10 2025'
tags:
  - css

draft: true
---

- The Problem: Visually reordered elements (Flexbox/Grid) break accessibility. Screen readers and keyboard navigation follow the DOM order, not the visual order, creating a confusing experience.
  - The Solution: reading-flow bridges this gap! It tells browsers to make the accessibility and focus order follow the visual layout.
  - Why it Matters: This is huge for accessibility. It ensures users relying on screen readers or keyboard navigation have a logical, predictable experience.
  - Key Values: Briefly mention flex-visual and grid-rows/grid-columns as common use cases.
  - Future of Web Design: reading-flow empowers designers to create stunning layouts without sacrificing accessibility. It's a game-changer!
