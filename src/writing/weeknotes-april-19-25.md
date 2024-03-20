---
title: 'Weeknotes: April 19 – 25, 2021'
description: Highlights from the week
date: 2021-04-25
tags:
  - weeknotes
  - personal
  - writing
musicDateFrom: '1618825833'
musicDateTo: '1619344233'
layout: weeknotes
templateEngineOverride: njk,md
---

### Professional

1. Booked my AWS Cloud Practitioner certification exam
2. Read '[What are design tokens?](https://piccalil.li/tutorial/what-are-design-tokens "Article for 'What are design tokens?'")' by Andy Bell

### Personal

1. Watched episode 5 of Marvel's Falcon and the Winter Solider
2. Watched episode 5 of BBC's Line of Duty
3. This week I walked 91,391 steps this week according to Google Fit.
4. I did a mix of weightlifting, cardio and bodyweight exercises 2 times this week.
5. I had some annual leave this week so spent plenty of non-screen time with the kids, and our nieces doing various activities.

### Reading

1. The Handmaid's Tale - Margaret Atwood

### Music

<div class="music-grid">
  {% set results = musicDateFrom | apiCall(musicDateTo) %}
  {% for album in results %}
    <a href="{{ album.url }}"><img height="174" width="174" src="{{ album.art }}" loading="lazy" /></a>
  {% endfor %}
</div>
