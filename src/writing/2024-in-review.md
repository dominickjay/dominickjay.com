---
title: '2024 in Review'
description: 'A public reflection of 2024, both professionally and personally.'
intro: 'This year has been crazy busy, both on a Personal and Professional Level - starting a new role, bringing with it a whole wealth of new challenges, and increasing my personal skills outside of my professional career As the year closes out, I thought I would take a bit of time to review how the year has gone publicly, rather than the normal ‘well that year went ok’ type introspection that normally happens.'
date: 2024-12-31
music: 2024
language: 2024
musicDateFrom: '1704067200'
musicDateTo: '1735689599'
tags:
  - personal
  - writing
layout: post
templateEngineOverride: njk,md
draft: true
---

## notable points

- I read x books - [goal](https://literal.club/dominickjay217/goal/dom-jays-2024-reading-goal-ujuz80y)

{% set results = musicDateFrom | apiCall(musicDateTo) %}

<div class="music-grid" style="--layout: grid">
  {% for album in results %}
    <a href="{{ album.url }}"><img height="174" width="174" src="{{ album.art }}" loading="lazy" /></a>
  {% endfor %}
</div>

## favourite books

## favourite albums

## wrote some things

{% set postslist = collections.writing %}
{% set postslistCounter = collections.writing | length %}

<ol style="counter-reset: start-from {{ (postslistCounter or postslist.length) + 1 }}">
   {% for post in postslist %}
      {% if '2024' in post.date | readableDate() %}
         <li class=""><a href="{{ post.url | url }}">{{ post.data.title }}</a></li>
      {% endif %}
   {% endfor %}
</ol>
