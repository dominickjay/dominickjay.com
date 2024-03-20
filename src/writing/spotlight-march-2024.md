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
shareimage: "spotlight-march-2024.jpg"
---

## Life...stuff
- started to teach kids how to ride their bikes
- viral flu over half term
- started back at the gym
    - [Workout routine](https://hardy.app/routine/531-triumvirate-28)
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

## Web...stuff
- blogging
- fixed my site
  - removed og-image plugin as was causing an memory leak *somewhere*
  - moved to a manual creation of og image templates, less time to set up initially, small bit of time to create them
- cypress/playwright


## Media

### Dropout/D&D

For d20;
- fantasy high
- starstruck odyssey
- misfits and magic
- escape from the bloodkeep

<div class="poster-grid">
  <div>{% imagePlaceholder "./src/assets/images/posts/vip.avif", "A row of cards with long content" %}</div>
  <div>{% imagePlaceholder "./src/assets/images/posts/gamechanger.avif", "A row of cards with long content" %}</div>
  <div>{% imagePlaceholder "./src/assets/images/posts/dimension-twenty.avif", "A row of cards with long content" %}</div>
</div>

### TV Series

<div class="poster-grid">
  <div>{% imagePlaceholder "./src/assets/images/posts/bodies.jpg", "A row of cards with long content" %}</div>
  <div>{% imagePlaceholder "./src/assets/images/posts/airbender.jpeg", "A row of cards with long content" %}</div>
  <div>{% imagePlaceholder "./src/assets/images/posts/killing-eve.jpeg", "A row of cards with long content" %}</div>
</div>

### Movies

<div class="poster-grid">
  <div>{% imagePlaceholder "./src/assets/images/posts/matrix-resurrections.webp", "A row of cards with long content" %}</div>
  <div>{% imagePlaceholder "./src/assets/images/posts/the-marvels.webp", "A row of cards with long content" %}</div>
</div>

We got round to catching up on a few movies that have been out for a while now. I think it's safe to say that neither where at the top of our lists to watch, and they'll probably stay that way when looking for something to watch again. I think my review of both - don't come after me - is 3/5 🤷 for both.

### Music

{% set results = musicDateFrom | apiCall(musicDateTo) %}
{% if results.length > 8 %}
  {% set layout = 'flex' %}
{% else %}
  {% set layout = 'grid' %}
{% endif %}

<div class="music-grid" style="--layout: {{ layout }}">
  {% for album in results %}
    <a href="{{ album.url }}"><img height="174" width="174" src="{{ album.art }}" loading="lazy" /></a>
  {% endfor %}
</div>
