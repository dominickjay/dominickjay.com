const Cache = require('@11ty/eleventy-cache-assets');
// require('dotenv').config();

const API_KEY = '86a5b41a85035739e32c576f027c4765'
const USERNAME = 'zerosandones217';
const API = 'http://ws.audioscrobbler.com/2.0/'

module.exports = async () => {
    try {
        const json = await Cache(`${API}?method=user.getrecenttracks&user=${USERNAME}&limit=10&api_key=${API_KEY}&format=json`, {
            duration: '60s',
            type: 'json',
        });
        return json;
    } catch (ex) {
        console.log(ex); return [];
    }
};