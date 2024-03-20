// module import shortcodes
const {
  imageShortcodePlaceholder,
  shareImageShortcode
} = require('./config/shortcodes/index.js');

const _ = require("lodash");
const fs = require('fs');
const xml2json = require('xml2json');
const { EleventyEdgePlugin } = require('@11ty/eleventy');
const { DateTime } = require('luxon');
const now = String(Date.now());
const readingTime = require('eleventy-plugin-reading-time');
const metagen = require('eleventy-plugin-metagen');
const syntaxHighlight = require('@11ty/eleventy-plugin-syntaxhighlight');
const pluginRss = require("@11ty/eleventy-plugin-rss");
const markdownIt = require('markdown-it');
const markdownItAnchor = require('markdown-it-anchor');
const canIuse = require("@kevingimbel/eleventy-plugin-caniuse");
const EleventyFetch = require("@11ty/eleventy-fetch");
const Image = require("@11ty/eleventy-img");

module.exports = eleventyConfig => {
  production: process.env.ELEVENTY_RUN_MODE === 'build',
  // 	--------------------- Global  -----------------------
  // When `permalink` is false, the file is not written to disk
	eleventyConfig.addGlobalData("eleventyComputed.permalink", function() {
    return (data) => {
      // Always skip during non-watch/serve builds
			if(data.draft && !process.env.BUILD_DRAFTS) {
				return false;
			}

			return data.permalink;
		}
	});

  // When `eleventyExcludeFromCollections` is true, the file is not included in any collections
	eleventyConfig.addGlobalData("eleventyComputed.eleventyExcludeFromCollections", function() {
		return (data) => {
			// Always exclude from non-watch/serve builds
			if(data.draft && !process.env.BUILD_DRAFTS) {
				return true;
			}

			return data.eleventyExcludeFromCollections;
		}
	});

	eleventyConfig.on("eleventy.before", ({runMode}) => {
		// Set the environment variable
		if(runMode === "serve" || runMode === "watch") {
			process.env.BUILD_DRAFTS = true;
		}
	});

  // 	--------------------- Custom Watch Targets -----------------------
  eleventyConfig.addWatchTarget('./src/assets')

  // --------------------- layout aliases -----------------------
  eleventyConfig.addLayoutAlias('base', 'main.njk')
  eleventyConfig.addLayoutAlias('default', 'default.njk')
  eleventyConfig.addLayoutAlias('home', 'home.njk')
  eleventyConfig.addLayoutAlias('post', 'post.njk')
  eleventyConfig.addLayoutAlias('snippet', 'snippet.njk')

  // 	---------------------  Custom filters -----------------------
  eleventyConfig.addFilter('readableDate', (dateObj) => {
    return DateTime.fromJSDate(dateObj, { zone: 'utc' }).toFormat('dd LLL yyyy')
  })


   // to show "dateModified" data on application/ld+json
	eleventyConfig.addFilter("stat", (file, field="birthtime") => {
		return DateTime.fromJSDate(fs.statSync(file)[field]).toISO();
	});

	eleventyConfig.addNunjucksGlobal("stat", function(file, field="birthtime"){
		return DateTime.fromJSDate(fs.statSync(file)[field]).toISO();
	});

  eleventyConfig.addFilter('htmlDateString', (dateObj) => {
    return DateTime.fromJSDate(dateObj, { zone: 'utc' }).toFormat('yyyy-LL-dd')
  })

  eleventyConfig.addFilter('limit', function (array, limit) {
    return array.slice(0, limit)
  })

  // eleventyConfig.addAsyncFilter('booksApi', async function (collectionId) {
  //   const books = await fetch(`https://oku.club/rss/collection/${collectionId}`)
  //     .then(response => response.text())
  //     .then(str => xml2json.toJson(str, { object: true }))
  //     .then(data => {
  //         return data.rss.channel.item.slice(0, 5).map(b => {
  //             return {
  //                 title: b.title,
  //                 link: b.link,
  //                 image: b['oku:cover'],
  //                 authors: b['dc:creator']['$t'],
  //             }
  //         })
  //     })

  //     return books
  // })

  eleventyConfig.addAsyncFilter('apiCall', async function (from, to) {
    const res = await fetchWeeklyAlbumChart(from, to);
    if (!res) {
      return "";
    }
    const albums = [];

    for (const album of res.weeklyalbumchart.album) {
      if (album.mbid != '') {
        try {
          const url = `https://ws.audioscrobbler.com/2.0/?method=album.getinfo&api_key=86a5b41a85035739e32c576f027c4765&format=json&mbid=${album.mbid}`;
          let albumInfo = await EleventyFetch(url, {
            duration: "30d",
            type: "json",
          });
          if (albumInfo.album != undefined) {
            albums.push({
              art: albumInfo.album.image[3]['#text'],
              artist: albumInfo.album.artist,
              name: albumInfo.album.name,
              url: albumInfo.album.url
            })
          }
        } catch (error) {
          console.error(`Fetch failed for album. ${error}`);
        }
      }
    }
    return albums;
  })

  async function fetchWeeklyAlbumChart(from, to) {
    if (!from || !to) {
      return;
    }
    try {
      const url = `https://ws.audioscrobbler.com/2.0/?method=user.getWeeklyAlbumChart&user=zerosandones217&from=${ from }&to=${to}&api_key=86a5b41a85035739e32c576f027c4765&format=json&limit=18`;
      return EleventyFetch(url, {
        duration: "30d",
        type: "json",
      });
    } catch (error) {
      console.error(`Fetch failed for album. ${error}`);
    }
  }

  // 	--------------------- Custom shortcodes ---------------------
  eleventyConfig.addNunjucksAsyncShortcode('imagePlaceholder', imageShortcodePlaceholder);
  eleventyConfig.addNunjucksAsyncShortcode('shareImageShortcode', shareImageShortcode);
  eleventyConfig.addShortcode('year', () => `${new Date().getFullYear()}`) // current year, stephanie eckles
  eleventyConfig.addShortcode('version', function () { return now })

  // 	--------------------- Plugins ---------------------
  eleventyConfig.addPlugin(EleventyEdgePlugin)
  eleventyConfig.addPlugin(readingTime)
  eleventyConfig.addPlugin(metagen)
  eleventyConfig.addPlugin(syntaxHighlight)
  eleventyConfig.addPlugin(pluginRss)
  eleventyConfig.addPlugin(canIuse, {
    accessible_colors: false,
    periods: "future_2,current,past_2"
  })


  // 	--------------------- Custom Template Languages ---------------------
  eleventyConfig.addPlugin(require('./config/template-languages/css-config.js'))

  // 	--------------------- Passthrough File Copy -----------------------

  eleventyConfig.addPassthroughCopy({
    'src/assets/images/favicon/*': '/',
  });

  eleventyConfig.addPassthroughCopy('src/_redirects');

  // same path
  ['src/assets/fonts/', 'src/assets/images/'].forEach((path) =>
    eleventyConfig.addPassthroughCopy(path)
  )

  // social icons to root directory
  eleventyConfig.addPassthroughCopy({
    'src/assets/images/favicon/*': '/',
  });

  eleventyConfig.addPassthroughCopy({
    'src/assets/css/global.css': './assets/css/global.css'
  });

  eleventyConfig.addPassthroughCopy({
    './node_modules/alpinejs/dist/cdn.min.js': './assets/js/alpine.js',
    './node_modules/@alpinejs/intersect/dist/cdn.min.js': './assets/js/intersect.js',
  });

  // 	--------------------- custom Collections -----------------------

  eleventyConfig.addCollection('tagsList', function (collectionApi) {
    const tagsList = new Set()
    collectionApi.getFilteredByTag('writing').map((item) => {
      if (item.data.tags) {
        // handle pages that don't have tags
        item.data.tags.map((tag) => tagsList.add(tag))
      }
    })
    return tagsList
  })

  eleventyConfig.addCollection("postsByYear", (collection) => {
    return _.chain(collection.getAllSorted())
      .groupBy((post) => post.date.getFullYear())
      .toPairs()
      .reverse()
      .value();
  })

  eleventyConfig.addCollection('snippetTagsList', function (collectionApi) {
    const tagsList = new Set()
    collectionApi.getFilteredByTag('snippets').map((item) => {
      if (item.data.tags) {
        // handle pages that don't have tags
        item.data.tags.map((tag) => tagsList.add(tag))
      }
    })
    return tagsList
  });

  eleventyConfig.addCollection('randomizedPosts', function (collection) {
    return (
      collection
        // Change to the name of your tag
        .getFilteredByTag('writing')
        .sort(() => {
          return 0.5 - Math.random()
        })
        .slice(0, 3)
    )
  });

  // 	--------------------- general config -----------------------

  const mdOptions = {
    html: true,
    breaks: true,
    linkify: true,
    typographer: true,
  }

  const mdAnchorOpts = {
    permalink: true,
    permalinkClass: 'anchor-link',
    permalinkSymbol: '#',
    level: [1, 2, 3],
  }

  eleventyConfig.setLibrary(
    'md',
    markdownIt(mdOptions).use(markdownItAnchor, mdAnchorOpts)
  )

  return {
    // Pre-process *.md, *.html and global data files files with: (default: `liquid`)
    markdownTemplateEngine: 'njk',
    htmlTemplateEngine: 'njk',
    dataTemplateEngine: 'njk',

    // Optional (default is set): If your site deploys to a subdirectory, change `pathPrefix`, for example with with GitHub pages
    pathPrefix: '/',

    dir: {
      output: 'dist',
      input: 'src',
      includes: '_includes',
      layouts: '_layouts',
    },
  }
};
