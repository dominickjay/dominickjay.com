---
title: 'Weeknotes: March 14 - 20, 2022'
description: Highlights from the week
date: 2022-03-14
tags:
  - weeknotes
  - personal
  - writing
musicDateFrom: '1647255033'
musicDateTo: '1647773433'
layout: weeknotes
templateEngineOverride: njk,md
---

### Professional

1. Finished up at Rowe IT as a Software Engineer. Great place to work, and lovely people - will miss the company a lot!
1. Started up a draft for creating a dynamic twitter header with Cloudinary and Netlify.
1. Carried on writing my deep dive into React components.

### Personal

1. Went to Bournemouth to visit my parents and friends I haven't seen properly since the pandemic started.
1. Saw all my nieces, and was great to have some family time.

### Reading

1. The Daily Stoic
1. Harry Potter and the Chamber of Secrets
1. [Resetting on Fridays](https://www.getrevue.co/profile/aspit/issues/resetting-on-fridays-1069745?via=twitter-card&client=DesktopWeb&element=issue-card)
1. [Making dynamic Twitter header](https://blog.devgenius.io/making-dynamic-twitter-header-e7dcd5e08f4a)
1. [How I made my Twitter header dynamic](https://daily-dev-tips.com/posts/how-i-made-my-twitter-header-dynamic)
1. [Dynamic Color Manipulation with CSS Relative Colors](https://blog.jim-nielsen.com/2021/css-relative-colors/)

### Music

<div class="music-grid">
  {% set results = musicDateFrom | apiCall(musicDateTo) %}
  {% for album in results %}
    <a href="{{ album.url }}"><img height="174" width="174" src="{{ album.art }}" loading="lazy" /></a>
  {% endfor %}
</div>