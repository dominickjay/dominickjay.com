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
draft: true
---

## So What Happened This Year

This year for the most of it, to put it briefly, had a lot of stress in it. Like, *a lot*. But rather than wading through the negatives, I'm looking forward to next year with a more positive spin, and tucking away my negative side into the shadows again. But before I move onto next year, this is some of the good parts of the year.

## Travel

I took a couple of family trips this year, starting with Butlins over the Spring for 5 days. We've gone pretty much ever year since my 2 kids were able to walk, and it's always been a blast. This year we went with my brother-in-law and his family and it was chaos of the best kind. While I think it's a great choice, I think _maybe_ it might be time to move on from it annually, and instead look to going elsewhere. We're also _super_ keen to get the kids on a plane and take them abroad.

We're big fans of camping, and living in the South West of the UK gives us ample opportunity to do that without spending hours on the road to do so. We went to a campsite a couple of hours away from us for the week.

Lastly, as part of Series Eight's [annual team trip](https://serieseight.com/journal/team-trip-2023), we went out to Prague for 3 days. Super good time, and great to see the rest of the team in person too.

## Books

I set myself a personal goal after conducting my [review last year](/writing/2022-in-review/) to read more books this year than I did in 2022. I'm not typically a great reader, and struggle to find the "right" book to get stuck into for hours at a time. Feeling optimistic about the amount I read - way more than ever that I can recall - and armed with a few decent recommendations, I got started with it. It didn't go _quite_ to plan...I _didn't_ read more than last year, *but* I did really some quality books, and hope to keep it up into 2024. Here's what I got through over the year.

{% set books = 'CfctG' | booksApi %}

<ul>

{% for item in books %}

   <li>
      <span class="font-bold">{{ item.title }}</span>
      by
      <span class="font-bold">{{ item.authors }}</span>
   </li>

{% endfor %}

   <li>
      <span class="font-bold">Mort</span>
      by
      <span class="font-bold">Terry Pratchett</span>
   </li>

   <li>
      <span class="font-bold">Reaper Man</span>
      by
      <span class="font-bold">Terry Pratchett</span>
   </li>

   <li>
      <span class="font-bold">The Storyteller</span>
      by
      <span class="font-bold">Dave Grohl</span>
   </li>

   <li>
      <span class="font-bold">Leviathan Wakes</span>
      by
      <span class="font-bold">James S. A. Corey</span>
   </li>

</ul>

I'm keeping track of my reading habit and lists on Literal.club, you can follow me [here](https://literal.club/dominickjay217) to see how I'm progressing.

## Music

### Top Artists

{% for artist in music._2023.topArtists.topartists.artist %}

1. {{ artist.name }}
   {% endfor %}

### Top Albums

<div class="music-grid music-grid--5">
  {% for album in music._2023.topAlbums.topalbums.album %}
    <a href="{{ album.url }}"><img height="174" width="174" src="{{ album.image[3]['#text'] }}" loading="lazy" /></a>
  {% endfor %}
</div>

{% set postslistCounter = collections.music365 | length %}

Started posting late November an [album a day](/365albums/) inspired by [Matt](https://birchtree.me/blog/the-365-albums-project/). I've currently posted {{ postslistCounter }} albums, and it's been interesting so far. Tried to keep it relatively simple, but always looking for improvements, so if you have any feedback please drop me a line on [Mastodon](https://mastodon.social/@dominickjay) or [LinkedIn](https://www.linkedin.com/in/dominickjay/)! Below is the current playlist from this mini-project, one song off each album posted.

<iframe allow="autoplay *; encrypted-media *; fullscreen *; clipboard-write" frameborder="0" height="450" style="width:100%;max-width:660px;overflow:hidden;border-radius:10px;" sandbox="allow-forms allow-popups allow-same-origin allow-scripts allow-storage-access-by-user-activation allow-top-navigation-by-user-activation" src="https://embed.music.apple.com/gb/playlist/music365/pl.u-AkAmEd9ix4MAZYJ"></iframe>

## TV Series

I worked my way through a bunch of TV series this year, and while I don't think any of them knocked The Sopranos off my #1 spot, some were really close! I think if I was to narrow it down to a Top 5, it would probably be this;

1. Loki
2. What We Do in the Shadows
3. The Bear
4. Happy Valley
5. New Amsterdam

I also watched; 'His Dark Materials', 'Wednesday', and 'Succession' (controversial opinion maybe but I found this super underwhelming). I'm also partly through 'Fresh off the Boat' but that's been off-roaded by revisiting Doctor Who, got caught up in the recent hype for the 60th anniversary and started rewatching Peter Capaldi's time as The Doctor. Love it.

## Blog posts

This year I wanted to get back on track with writing more posts, and achieved that. I've tried to steer away from the 'this post *must* be the best thing ever written', and leant more into just learning and writing about those experiences. Andy Bell's post [https://andy-bell.co.uk/just-post/]('Just Post') was greatly influential with this decision, that is, to dial back the monolithic efforts that made me ditch a lot of posts, filled with a lot of nothing and going nowhere, and instead make them more succinct and brief. Straight to the point. Doing so led me learn more about `line-clamp`, `variable fonts` and `:has()`. Awesome. Here's the posts from this year.

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
- [https://andy-bell.co.uk/just-post/](https://andy-bell.co.uk/just-post/)
- [https://joshcollinsworth.com/blog/antiquated-react](https://joshcollinsworth.com/blog/antiquated-react)
- [https://joshcollinsworth.com/blog/great-transitions](https://joshcollinsworth.com/blog/antiquated-react)
- [https://ryanmulligan.dev/blog/scroll-driven-animations/](https://ryanmulligan.dev/blog/scroll-driven-animations/)

## Wrap up

Overall, some good bits, some bad bits. Here's to 2024. Cheers! 🍻
