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

    const response = await fetch(
      `http://ws.audioscrobbler.com/2.0/?method=user.getrecenttracks&user=zerosandones217&limit=10&api_key=${process.env.LASTFM_API}&format=json`
    )

    const data = await response.json();

    // console.log(data.recenttracks.track[0].name)
    // console.log(data.recenttracks.track[0].artist['#text'])

    edge.config((eleventyConfig) => {
      // Add some custom Edge-specific configuration
      // e.g. Fancier json output
      eleventyConfig.addGlobalData('lastfmTrack', data.recenttracks.track[0].name)
      eleventyConfig.addGlobalData('lastfmArtist', data.recenttracks.track[0].artist['#text'])
      eleventyConfig.addFilter("json", obj => JSON.stringify(obj, null, 2));
    });

    return await edge.handleResponse();
  } catch (e) {
    console.log("ERROR", { e });
    return context.next(e);
  }
};
