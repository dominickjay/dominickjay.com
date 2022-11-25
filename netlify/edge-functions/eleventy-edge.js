import { EleventyEdge } from "eleventy:edge";
import precompiledAppData from "./_generated/eleventy-edge-app-data.js";

export default async (request, context) => {
  try {
    const edge = new EleventyEdge("edge", {
        request,
        context,
        precompiled: precompiledAppData,

        // default is [], add more keys to opt-in e.g. ["appearance", "username"]
        cookies: [],

    });

    const response = await fetch(
      'http://ws.audioscrobbler.com/2.0/?method=user.getrecenttracks&user=zerosandones217&limit=10&api_key=86a5b41a85035739e32c576f027c4765&format=json'
    )

    const data = await response.json();

    // console.log(data.recenttracks[0].track.name)

    edge.config((eleventyConfig) => {
        // Add some custom Edge-specific configuration
        // e.g. Fancier json output
        // eleventyConfig.addGlobalData('lastfm', data)
        eleventyConfig.addFilter("json", obj => JSON.stringify(obj, null, 2));
    });

    return await edge.handleResponse();
  } catch (e) {
    console.log("ERROR", { e });
    return context.next(e);
  }
};
