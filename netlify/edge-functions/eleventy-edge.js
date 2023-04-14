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
      'https://api.trakt.tv/users/id/history/type/item_id?start_at=2023-03-01T00%3A00%3A00.000Z&end_at=2023-04-14T23%3A59%3A59.000Z'
    )

    const music = await fetch(
      'http://ws.audioscrobbler.com/2.0/?method=user.getrecenttracks&user=zerosandones217&limit=10&api_key=' + Deno.env.get("LASTFM_API") + '&format=json'
    )

    const artistResponse = await fetch(
      'http://ws.audioscrobbler.com/2.0/?method=user.getweeklyartistchart&user=zerosandones217&limit=10&api_key=' + Deno.env.get("LASTFM_API") + '&format=json'
    )

    const data = await music.json();
    const artistData = await artistResponse.json();

    console.log(artistData.weeklyartistchart.artist);

    edge.config((eleventyConfig) => {
      // Add some custom Edge-specific configuration
      // e.g. Fancier json output
      eleventyConfig.addGlobalData('tracks', artistData.weeklyartistchart.artist)
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
