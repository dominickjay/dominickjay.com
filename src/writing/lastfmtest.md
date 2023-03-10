---
title: 'lastfmtest'
description: Highlights from the week
date: Created
tags:
  - weeknotes
  - personal
  - writing
layout: post
templateEngineOverride: njk,md
---

{% set results = '1672531200,1673136000' | apiCall %}

{% for track in results.album %}
  {{ track.artist['#text'] }}
  {{ track.name }}
{% endfor %}