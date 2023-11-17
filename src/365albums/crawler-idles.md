---
title: '#9. Crawler - Idles'
metaDesc: 'Day 9 of my album-a-day mini-project'
date: 2023-11-18
albumTitle: Crawler
albumArtist: Idles
albumArt: https://lastfm.freetls.fastly.net/i/u/770x0/5cbb621500562a568d92ca9b934c50d3.jpg#5cbb621500562a568d92ca9b934c50d3
albumTracks: 14 tracks, 46:32
albumReleaseDate: 12 November 2021
embedUrl: https://odesli.co/embed/?url=https%3A%2F%2Falbum.link%2Fi%2F1570477692&theme=light
tags:
  - music365
  - writing
layout: post
templateEngineOverride: njk,md
eleventyExcludeFromCollections: true
---

<aside class="album-profile" style="--shadow: rgb(46,35,30);">
  <div class="album-profile__image">
    <img width="250" height="250" crossorigin="anonymous" src="{{ albumArt }}"/>
  </div>
  <div class="aside__content">
    <h1><strong>{{ albumTitle }}</strong>by {{ albumArtist }}</h1>
    <dl>
      <div>
        <dd><strong>Length:</strong></dd>
        <dt>{{ albumTracks }}</dt>
      </div>
      <div>
        <dd><strong>Release Date:</strong></dd>
        <dt>{{ albumReleaseDate }}</dt>
      </div>
      <div class="singles">
        <span>Singles:</span>
        <ul>
          <li>The Beachland Ballroom</li>
          <li>Car Crash</li>
          <li>When the Lights Come On</li>
          <li>Crawl!</li>
        </ul>
      </div>
    </dl>
    <div class="color-grid" style="--opacity: 1;">
      <div class="color-grid__container">
					<span class="color color--1" style="--firstColor: rgb(46,35,30);"></span>
					<span class="color color--2" style="--secondaryColor: rgb(217,158,100);"></span>
					<span class="color color--3" style="--thirdColor: rgb(138,160,168);"></span>
      </div>
    </div>
  </div>
</aside>

<iframe width="100%" height="52" src={{ embedUrl }} frameborder="0" allowfullscreen sandbox="allow-same-origin allow-scripts allow-presentation allow-popups allow-popups-to-escape-sandbox" allow="clipboard-read; clipboard-write"></iframe>

### The current playlist:

<iframe allow="autoplay *; encrypted-media *; fullscreen *; clipboard-write" frameborder="0" height="450" style="width:100%;max-width:660px;overflow:hidden;border-radius:10px;" sandbox="allow-forms allow-popups allow-same-origin allow-scripts allow-storage-access-by-user-activation allow-top-navigation-by-user-activation" src="https://embed.music.apple.com/gb/playlist/music365/pl.u-AkAmEd9ix4MAZYJ"></iframe>
