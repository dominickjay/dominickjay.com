---
title: 'Spotlight: April 2024'
metaDesc: 'Highlights from the month'
description: Highlights from the month
date: 2024-05-01
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

<iframe allow="autoplay *; encrypted-media *; fullscreen *; clipboard-write" frameborder="0" height="450" style="width:100%;max-width:660px;overflow:hidden;border-radius:10px;" sandbox="allow-forms allow-popups allow-same-origin allow-scripts allow-storage-access-by-user-activation allow-top-navigation-by-user-activation" src="https://embed.music.apple.com/gb/playlist/april/pl.u-RRbVolVsmvjbapA"></iframe>
