const EleventyFetch = require('@11ty/eleventy-fetch')
require('dotenv').config();

const API_KEY = process.env.LASTFM_API_KEY;
const USERNAME = process.env.LASTFM_USERNAME;
const API = 'http://ws.audioscrobbler.com/2.0/'

module.exports = async function () {

  /* This returns a promise */
  let json = await EleventyFetch(
    `${API}?method=user.getrecenttracks&user=${USERNAME}&limit=10&api_key=${API_KEY}&format=json`,
    {
      duration: '60s', // save for 1 minute
      type: 'json', // we’ll parse JSON for you
    }
  )
  return json;
}
