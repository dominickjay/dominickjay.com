---
title: 'Spotlight: April 2024'
description: Highlights from the month
date: 2024-04-31
tags:
  - spotlight
  - personal
  - writing
musicDateFrom: '1711926000'
musicDateTo: '1714517999'
layout: weeknotes
templateEngineOverride: njk,md
draft: true
---

## Life...stuff

## Web...stuff

## Media

### Books

<div class="poster-grid">
  <div>{% imagePlaceholder "./src/assets/images/posts/murdle.jpg", "A row of cards with long content" %}</div>
  <div>{% imagePlaceholder "./src/assets/images/posts/hitchhikers-guide.jpg", "A row of cards with long content" %}</div>
  <div>{% imagePlaceholder "./src/assets/images/posts/restaurant-end.jpg", "A row of cards with long content" %}</div>
  <div>{% imagePlaceholder "./src/assets/images/posts/leviathan-wakes.jpg", "A row of cards with long content" %}</div>
</div>

### Dropout/D&D

For d20;
- escape from the bloodkeep

<div class="poster-grid">
  <div>{% imagePlaceholder "./src/assets/images/posts/vip.avif", "A row of cards with long content" %}</div>
  <div>{% imagePlaceholder "./src/assets/images/posts/gamechanger.avif", "A row of cards with long content" %}</div>
  <div>{% imagePlaceholder "./src/assets/images/posts/dimension-twenty.avif", "A row of cards with long content" %}</div>
</div>

### TV Series

only murders in the building

<div class="poster-grid">
  <div>{% imagePlaceholder "./src/assets/images/posts/killing-eve.jpeg", "A row of cards with long content" %}</div>
  <div>{% imagePlaceholder "./src/assets/images/posts/extraordinary.jpeg", "A row of cards with long content" %}</div>
</div>

### Movies

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
