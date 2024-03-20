---
title: 'Spotlight: March 2024'
description: Highlights from the month
date: 2024-03-31
tags:
  - spotlight
  - personal
  - writing
musicDateFrom: '1709251200'
musicDateTo: '1711843200'
layout: weeknotes
templateEngineOverride: njk,md
---

- started to teach kids how to ride their bikes
- started back at the gym
    - Workouts
- fixed my site
- viral flu over half term
- baking
    - Valentine’s Day pies
    - Bread
    - Begnets
    - Pizza
- books
    - Expanse 1
    - Hitchhikers guide to the galaxy
    - Restaurant at the end of the universe
    - Murdle
- music
    - Idles
    -
- blogging
- dropout/D&D
    - VIP
    - Fantasy High
    - A Starstruck Odyssey
- cypress/playwright
- Tv
    - Giselda
    - The last airbender
    - Killing Eve

### Music

<div class="music-grid">
  {% set results = musicDateFrom | apiCall(musicDateTo) %}
  {% for album in results %}
    <a href="{{ album.url }}"><img height="174" width="174" src="{{ album.art }}" loading="lazy" /></a>
  {% endfor %}
</div>
