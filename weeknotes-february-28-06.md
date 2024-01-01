---
title: 'Weeknotes: February 28 - March 06, 2022'
description: Highlights from the week
date: 2022-03-06
tags:
  - weeknotes
  - personal
  - writing
musicDateFrom: '1646045433'
musicDateTo: '1646563833'
layout: weeknotes
templateEngineOverride: njk,md
---

### Professional

1. My codepen from last week was picked by the team and has had a slowly growing number of views and likes over the last week, so super happy about that. Currently on 74 'loves' and 2,780 views. [Here it is](https://codepen.io/dominickjay217/pen/BamOBRZ).
1. Added in a dark/light mode toggle to this site (See at the top of the page, above the navigation) as found `prefers-color-scheme` wasn't working on Firefox. **[Editors note] - this was made for an old variation of the site**
1. Refactored a _whole_ bunch of custom property names after a short discussion on the Front End Horse discord about naming conventions.

### Personal

1. According to Apple Health, I have walked 52,106 steps.
1. Started up bodyweight/cardio exercises, replacing my purely free-weight workouts, and feel much better for it.
1. Went to Paignton Zoo for my niece's birthday. It's somewhere we have visited at least once a year since my eldest was born and it's always a good day out.
1. Had family round a few nights this week so got to see my 3 week old niece.
1. Went to see 'The Batman'.

### Reading

1. The Daily Stoic
1. Harry Potter and the Philosophers Stone
1. Harshil Patel - [6 Creative Ideas for CSS Link Hover Effects](https://css-tricks.com/css-link-hover-effects/?utm_source=swlinks-tw)
1. Dieter Raber- [Creating Color Themes With Custom Properties, HSL, and a Little calc() ](https://css-tricks.com/creating-color-themes-with-custom-properties-hsl-and-a-little-calc/)

### Music

<div class="music-grid">
  {% set results = musicDateFrom | apiCall(musicDateTo) %}
  {% for album in results %}
    <a href="{{ album.url }}"><img height="174" width="174" src="{{ album.art }}" loading="lazy" /></a>
  {% endfor %}
</div>
