---
title: 'Get lastfm in eleventy-edge'
description: 'How I created a edge function to bring in live data from Last.fm'
intro: "On my about page, there's a 'Now Playing' section, that gives live data about my last played song according to Last.fm. Using the eleventy-edge plugin, let's see how this is set up."
date: Created
tags:
  - javascript
  - writing
layout: post
links:
  [
    {
      'title': 'Eleventy Edge',
      'target': 'https://www.11ty.dev/docs/plugins/edge/',
    },
    {
      'title': 'Last.fm Music Discovery API',
      'target': 'https://www.last.fm/api',
    },
    {
      'title': 'Eleventy - Getting Started',
      'target': 'https://www.11ty.dev/docs/getting-started',
    },
  ]
draft: true
---

<div class="fyi-block fyi-block--prerequisites fl-p-l font-medium fl-text-step-1 font-heading fl-my-l rounded-br-[80px] lg:w-[calc(100%+10em)] relative">
  <div class="svg-icon">
    {% include "partials/icons/logo.svg" %}
  </div>
  <span class="fl-text-step-2 heading">Prerequisites</span>
  <ul>
    <li>a Last.fm <a href="https://www.last.fm/join" target="_blank">account</a></li>
    <li>basic knowledge of Eleventy</li>
    <li>a Netlify account</li>
  </ul>
</div>

## Get lastfm api key

First off, set up an API key for Last.fm. You'll need to apply for one at [https://www.last.fm/api/account/create](https://www.last.fm/api/account/create), but it's not an arduous process, nor does it take long to be approved for one.

### Explain endpoint that is used

For the API endpoint that we're going to use, we're going to retrieve the data from `getRecentTracks`, which is part of the group of user [data](https://www.last.fm/api/show/user.getRecentTracks).

## Get Eleventy, eleventy-edge and the Netlify CLI

Next, let's set up a bare-bones eleventy project, creating a blank directory and then using `npm init -y` to initialise the directory with a `package.json` file. After that we can use `npm install --save-dev @11ty/eleventy` to install eleventy, and then `npx @11ty/eleventy` to run it. `npm install netlify-cli -g` Luckily, the eleventy-edge plugin is already included in our project (thanks, Zach) - at least, if you've installed a version of Eleventy with at _at least_ `v2.0.0-beta.1`

## Setup plugin

In `eleventy.js`:

```js
const { EleventyEdgePlugin } = require('@11ty/eleventy')

module.exports = function (eleventyConfig) {
  eleventyConfig.addPlugin(EleventyEdgePlugin)
}
```

The above plugin will automatically generate an Eleventy Edge Function file for you at: `./netlify/edge-functions/eleventy-edge.js`.

<div class="fyi-block fyi-block--warning fl-p-l bg-red/[0.25] font-medium fl-text-step-1 font-heading fl-my-l rounded-br-[80px] lg:w-[calc(100%+10em)]">
  <span class="fl-text-step-2 heading">Don't be a wally</span>
	<p>Deploy your function before running it locally - otherwise it'll report no errors but retrieve nothing.</p>
</div>

```js
const response = await fetch(
  'http://ws.audioscrobbler.com/2.0/?method=user.getrecenttracks&user=zerosandones217&limit=10&api_key=86a5b41a85035739e32c576f027c4765&format=json'
)

const data = await response.json()

edge.config((eleventyConfig) => {
  eleventyConfig.addGlobalData('lastPlayedTrack', data.recenttracks.track[0].name)
  eleventyConfig.addGlobalData(
    'lastPlayedArtist',
    data.recenttracks.track[0].artist['#text']
  )
  eleventyConfig.addFilter('json', (obj) => JSON.stringify(obj, null, 2))
})
```

## Refer to discord chat

[Discord chat](https://discord.com/channels/741017160297611315/1040730014926254110/1043258902248181833)
