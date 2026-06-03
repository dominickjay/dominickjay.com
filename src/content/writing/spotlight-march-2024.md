---
title: 'Spotlight: March 2024'
description: Highlights from the month
pubDate: '2024-03-31'
tags:
  - spotlight
  - personal

musicDateFrom: '1709251200'
musicDateTo: '1711843200'
---
<!--
## Life

We've had some relatively good weather down in the West Coast of England this month, so took the opportunity to get the kids bikes out and get them learning without stabilisers. Both of them are doing super well with it - and hopefully that continues in time for our trek along a biking trail in a couple of months!

I've also started back at the gym after a year long break due to life being...life. Getting into a routine again with it is super hard, I'm not quite there with it yet, but there's still time. I've been using a system that I used previously and it's a pretty good one for me to keep on track with it. I don't want any fuss with my routine and don't overly enjoy routines that have everything-but-the-kitchen-sink in it, as a lot of times it's just not necessary. For those interested, my workout template is [here](https://hardy.app/routine/531-triumvirate-28).

## Web

I've not been writing as much this year and my focus hasn't been there to start up consistently recently either. That being said, I've got some things in pre-planning so hope to get something out. I've been keen for a while to get some interactive demos into my posts, so looking into how to implement them as well. On top of that, I've been doing an album-a-day mini project which I'm listing [here](/365albums) - and have managed to keep it up for the most part.

Another thing holding me up was this site suddenly failing to build - both locally and on production, with a `WebAssembly.instantiate(): Out of memory: wasm memory` error. It really was infuriating, as I couldn't pinpoint exactly what was causing the problem. I would remove what looked to be issue, and it would build again....for a few days. I was super close to rebuilding the site from scratch, and was looking to try Astro out on it. After a well-timed visit to Front End Horses' Discord, I found a similar issue had been reported and was able to narrow it down. It ended up being the plugin I was using to create social media preview images. I can't say I honestly know what the issue was still, just that it came from this, so it gave me a chance to rethink how my preview images were being created. For the meantime, I'm happy manually creating them - gives me a bit more freedom into how those images look on a per-post basis.

## Media

### Books

<div class="poster-grid">
  <div>{% imagePlaceholder "./src/assets/images/posts/murdle.jpg", "The front cover of the book 'Murdle'" %}</div>
  <div>{% imagePlaceholder "./src/assets/images/posts/hitchhikers-guide.jpg", "The front cover of the book 'The Hitchhikers Guide to the Galaxy'" %}</div>
  <div>{% imagePlaceholder "./src/assets/images/posts/restaurant-end.jpg", "The front cover of the book 'The Restaurant at the End of the World'" %}</div>
  <div>{% imagePlaceholder "./src/assets/images/posts/leviathan-wakes.jpg", "The front cover of the book 'Leviathan Wakes'" %}</div>
</div>

### Dropout

Over the past year, I've gotten quite into TTRPG's (Table-top Role Playing Games for the unaware), and this has solely been the work of Dropout TV - formerly College Humour - and their Dimension 20 program. Each season is a different theme/setting, and the cast - mainly consisting of improv comedians - works _so_ well together. I'm on my fourth season of Dimension 20, having gone through these;

- Fantasy High - a great one to start with, lays out the rules pretty well.
- A Starstruck Odyssey - a Sci-Fi setting about a group of misfits that end up working together in a Hot Dog shaped spaceship called 'The Wurst'
- Misfits and Magic - a Harry Potter-esque story about a wizarding school
- Escape from the Bloodkeep - a short series where the characters are villains

If I've piqued your interest even slightly, Dropout have made the first episode of Fantasy High free to watch outside of a subscription, which you can see on YouTube [here](https://www.youtube.com/watch?v=_zZxCVBi7-k)

Outside of their TTRPG offerings, they also do some **excellent** other shows. I've been watching their Gamechanger series which a gameshow where the game is different every episode, and VIP, which is a improvised interview with a host and a guest who has had to create a character based on a surprise costume. Dropout are by far my best TV based finding over the past few years.

<div class="poster-grid fl-mt-l">
  <div>{% imagePlaceholder "./src/assets/images/posts/vip.avif", "A poster of the series 'VIP'" %}</div>
  <div>{% imagePlaceholder "./src/assets/images/posts/gamechanger.avif", "A poster of the series 'Gamechanger'" %}</div>
  <div>{% imagePlaceholder "./src/assets/images/posts/dimension-twenty.avif", "A poster of the series 'Dimension Twenty'" %}</div>
</div>

### TV Series

<div class="poster-grid">
  <div>{% imagePlaceholder "./src/assets/images/posts/bodies.jpg", "A poster of the series 'Bodies'" %}</div>
  <div>{% imagePlaceholder "./src/assets/images/posts/airbender.jpeg", "A poster of the series 'The Last Airbender'" %}</div>
  <div>{% imagePlaceholder "./src/assets/images/posts/killing-eve.jpeg", "A poster of the series 'Killing Eve'" %}</div>
  <div>{% imagePlaceholder "./src/assets/images/posts/extraordinary.jpeg", "A poster of the series 'Extraordinary'" %}</div>
</div>

### Movies

<div class="poster-grid">
  <div>{% imagePlaceholder "./src/assets/images/posts/matrix-resurrections.webp", "A poster for the film 'Matrix Resurrections'" %}</div>
  <div>{% imagePlaceholder "./src/assets/images/posts/the-marvels.webp", "A poster for the film 'The Marvels'" %}</div>
</div>

We got round to catching up on a few movies that have been out for a while now. I think it's safe to say that neither where at the top of our lists to watch, and they'll probably stay that way when looking for something to watch again. I think my review of both - don't come after me - is 3/5 🤷 for both.

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

<iframe allow="autoplay *; encrypted-media *; fullscreen *; clipboard-write" frameborder="0" height="450" style="width:100%;max-width:660px;overflow:hidden;border-radius:10px;" sandbox="allow-forms allow-popups allow-same-origin allow-scripts allow-storage-access-by-user-activation allow-top-navigation-by-user-activation" src="https://embed.music.apple.com/gb/playlist/march/pl.u-leylK86UMkpRDlV"></iframe> -->
