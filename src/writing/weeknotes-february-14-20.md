---
title: 'Weeknotes: February 14 - 20, 2022'
description: Highlights from the week
date: 2022-02-20
tags:
  - weeknotes
  - personal
  - writing
musicDateFrom: '1644835833'
musicDateTo: '1645354233'
layout: weeknotes
templateEngineOverride: njk,md
---

### Professional

1. A blog post I had written for Rowe IT on Imposter Syndrome went live this week [https://www.roweit.co.uk/imposter-syndrome](https://www.roweit.co.uk/imposter-syndrome)
1. Finished off a post I had been writing about the React 'Create React App' tool.

### Personal

1. Went Axe throwing with my partner and was surprisingly pleased at the results.
1. Been watching 'This is Going to Hurt' on BBC iPlayer - quite enjoyed the book and while the TV series comes off a lot darker, I'm still enjoying it.
1. Bought tickets to see Nine Inch Nails in June at the Eden Project. First concert since all that COVID mess and absolutely stoked for it.

### Reading

1. The Daily Stoic
1. Harry Potter and the Philosophers Stone

### Music

<div class="music-grid">
  {% set results = musicDateFrom | apiCall(musicDateTo) %}
  {% for album in results %}
    <a href="{{ album.url }}"><img height="174" width="174" src="{{ album.art }}" loading="lazy" /></a>
  {% endfor %}
</div>