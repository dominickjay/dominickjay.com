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

## Career decisions

## Conferences

- Hey! w/ Nate and Alistair

## Travel

- Prague

## Books

{% set books = 'CfctG' | booksApi %}
{% for item in books %}

   <li>
      <span class="font-bold">{{ item.title }}</span>
      by
      <span class="font-bold">{{ item.authors }}</span>
   </li>

{% endfor %}

## Music

<iframe allow="autoplay *; encrypted-media *; fullscreen *; clipboard-write" frameborder="0" height="450" style="width:100%;max-width:660px;overflow:hidden;border-radius:10px;" sandbox="allow-forms allow-popups allow-same-origin allow-scripts allow-storage-access-by-user-activation allow-top-navigation-by-user-activation" src="https://embed.music.apple.com/gb/playlist/replay-2023/pl.rp-xOOvc4O7B6ng"></iframe>

## Video games

- red dead redemption 2
- super mario deluxe U

## TV Series/Movies

1. His Dark Materials
2. Wednesday
3. The Last of Us
4. Happy Valley
5. Succession
6. The Mandalorian

## Learning things

## Blog posts

Wrote more than ever
Found out about a _whole_ bunch of stuff
Automated majority of weeknotes posts

{% set postslist = collections.writing %}
{% set postslistCounter = collections.writing | length %}

<ol style="counter-reset: start-from {{ (postslistCounter or postslist.length) + 1 }}">
   {% for post in postslist %}
      {% if '2023' in post.date | readableDate() %}
         <li class=""><a href="{{ post.url | url }}">{{ post.data.title }}</a></li>
      {% endif %}
   {% endfor %}
</ol>

## The web

- [https://www.lenesaile.com/en/blog/organizing-the-eleventy-config-file/](https://www.lenesaile.com/en/blog/organizing-the-eleventy-config-file/)

## Wrap up
