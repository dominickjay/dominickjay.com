import {
  EleventyEdge,
  precompiledAppData,
} from "./_generated/eleventy-edge-app.js";

export default async (request, context) => {
  try {
    let edge = new EleventyEdge("edge", {
      request,
      context,
      precompiled: precompiledAppData,

      // default is [], add more keys to opt-in e.g. ["appearance", "username"]
      cookies: [],
    });

    const tv = await fetch(
      'https://api.trakt.tv/users/dominickjay217/watched/shows', {
        headers: {
          "Content-Type": "application/json",
          "trakt-api-version": "1",
          "trakt-api-key": Deno.env.get("TRAKT_API")
        },
      }
    )

    const music = await fetch(
      'http://ws.audioscrobbler.com/2.0/?method=user.getrecenttracks&user=zerosandones217&limit=10&api_key=' + Deno.env.get("LASTFM_API") + '&format=json'
    )

    const artistResponse = await fetch(
      'http://ws.audioscrobbler.com/2.0/?method=user.getweeklyartistchart&user=zerosandones217&limit=10&api_key=' + Deno.env.get("LASTFM_API") + '&format=json'
    )

    const tvData = await tv.json();
    const data = await music.json();
    const artistData = await artistResponse.json();

    console.log(tvData[0].seasons[Object.keys(tvData[0].seasons).pop()].episodes[Object.keys(tvData[0].seasons[Object.keys(tvData[0].seasons).pop()]).pop()]);

    edge.config((eleventyConfig) => {
      // Add some custom Edge-specific configuration
      // e.g. Fancier json output
      eleventyConfig.addGlobalData('tracks', artistData.weeklyartistchart.artist)
      eleventyConfig.addGlobalData('lastTVEpisode', tvData.weeklyartistchart.artist)
      eleventyConfig.addGlobalData('lastPlayedTrack', data.recenttracks.track[0].name)
      eleventyConfig.addGlobalData('lastPlayedArtist', data.recenttracks.track[0].artist['#text'])
      eleventyConfig.addFilter("json", obj => JSON.stringify(obj, null, 2));
    });

    return await edge.handleResponse();
  } catch (e) {
    console.log("ERROR", { e });
    return context.next(e);
  }
};
