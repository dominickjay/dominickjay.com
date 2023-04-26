---
title: '2023 in Review'
description: 'A public reflection of 2023, both professionally and personally.'
intro: 'This year has been crazy busy, both on a Personal and Professional Level - starting a new role, bringing with it a whole wealth of new challenges, and increasing my personal skills outside of my professional career As the year closes out, I thought I would take a bit of time to review how the year has gone publicly, rather than the normal ‘well that year went ok’ type introspection that normally happens.'
date: 2023-12-30
music: 2023
language: 2023
tags:
  - personal
  - writing
layout: post
templateEngineOverride: njk,md
eleventyExcludeFromCollections: true
---

## Books

{% set books = 'CfctG' | booksApi %}
{% for item in books %}

   <li>
      <span class="font-bold">{{ item.title }}</span>
      by
      <span class="font-bold">{{ item.authors }}</span>
   </li>

{% endfor %}
