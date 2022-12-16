---
title: '2022 in Review'
description: 'A public reflection of 2022, both professionally and personally.'
intro: 'This year has been crazy busy, both on a Personal and Professional Level - starting a new role, bringing with it a whole wealth of new challenges, and increasing my personal skills outside of my professional career As the year closes out, I thought I would take a bit of time to review how the year has gone publicly, rather than the normal ‘well that year went ok’ type introspection that normally happens.'
date: Created
music: 2022
language: 2022
tags:
  - personal
  - writing
layout: 'layouts/post.njk'
templateEngineOverride: njk,md

---

## I started a new role

The first big thing that happened this year was leaving my previous role at RoweIT for pastures new at Series Eight. For me, this was a huge decision and one that has paid off time and time again. I’ve seen myself heading towards a full time remote role for a matter of years, and the pandemic gave me the opportunity to see if I could work in a remote environment while also having two young children. Luckily the opportunity arose with Series Eight, and its worked out very well! It’s also great to be working properly in the front end side of development again, and seeing what has changed in the couple of years I’ve been out of it.

## I started working with a bunch of new tech

Jumping back into a full time dev role, I was introduced to a whole world of new things, now mainly using Tailwind and AlpineJS on top of Craft and Shopify sites. I’ve also started using Eleventy, finally jumping on the hype train and have been really pleased with the results.

## Dev Community game was weak

After spending a few months near the end of last year being much more active on social media than I normally am, I fell out of habit with it. Mainly due to a busy personal life at the time, so didn’t have the time as much to hang out on the Frontend Horse discord as I would’ve liked to.

I also didn’t write, at all, from March until now. I had been writing a post on React components - at the time it was the start of a series on React as I was keen to learn it. The interest soon waived and I found myself struggling to finish it. Rather than just sling out Weeknote posts in the meantime, I took some time (admittedly more than I wanted in hindsight) to reevaluate what I wanted to write about. I’ve since gathered a ton of inspiration and topics to write about, so hopefully I’ll start posting more next year.

## I went to Portugal

I also went abroad for the first time in years, and in doing so completely went out of my normal comfort zone. Not the biggest fan of flying, or navigating airports by myself, I found myself doing both (well, navigating an airport alone on the way back at least). This was over to Ericeria in Portugal, for Series Eights annual team retreat. It was great to see everyone in person rather than over a webcam.

I did a few activities I’ve always wanted to try but held back from doing it; surfing (kind of, more like “how can I not drown while Im attached to this” and paddleboarding. All in all, a really good time. You can read more about it on S8’s site at [https://serieseight.com/journal/ericeira-2022-our-biggest-and-best-team-trip-yet](https://serieseight.com/journal/ericeira-2022-our-biggest-and-best-team-trip-yet)

## Music stats

### Top Artists

{% for artist in music._2022.topArtists.weeklyartistchart.artist %}
1. {{ artist.name }}
{% endfor %}

### Top Albums

{% for album in music._2022.topAlbums.weeklyalbumchart.album %}
  1. <strong>{{ album.name }}</strong> by {{ album.artist['#text'] }}
{% endfor %}

## German stats

<strong class="font-bold">{{ language._2022.stats.language_data.de.streak }}</strong>

## Read more books than ever

{% for item in books %}
{% if item.finishedYear == '2022' %}
  1. <span class="font-bold">{{ item.title }}</span> by <span class="font-bold">{{ item.author }}</span>
{% endif %}
{% endfor %}
