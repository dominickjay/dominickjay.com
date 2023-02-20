/**
 * I strive to keep the `.eleventy.js` file clean and uncluttered. Most adjustments must be made in:
 *  - `./config/collections/index.js`
 *  - `./config/filters/index.js`
 *  - `./config/plugins/index.js`
 *  - `./config/shortcodes/index.js`
 *  - `./config/transforms/index.js`
 */


// module import filters
// const {
//   limit,
//   toHtml,
//   where,
//   toISOString,
//   formatDate,
//   toAbsoluteUrl,
//   stripHtml,
//   minifyCss,
//   minifyJs,
//   mdInline,
//   splitlines
// } = require('./config/filters/index.js');

// module import shortcodes
const {
  imageShortcodePlaceholder,
} = require('./config/shortcodes/index.js');

// module import collections
// const {getAllPosts} = require('./config/collections/index.js');

// module import events
// const {svgToJpeg} = require('./config/events/index.js');

// plugins
// const markdownLib = require('./config/plugins/markdown.js');
// const {EleventyRenderPlugin} = require('@11ty/eleventy');
// const syntaxHighlight = require('@11ty/eleventy-plugin-syntaxhighlight');
// const {slugifyString} = require('./config/utils');
// const {escape} = require('lodash');
// const pluginRss = require('@11ty/eleventy-plugin-rss');
const fs = require('fs');
const { EleventyEdgePlugin } = require('@11ty/eleventy');
const { DateTime } = require('luxon');
const now = String(Date.now());
const readingTime = require('eleventy-plugin-reading-time');
const pluginTOC = require('eleventy-plugin-toc');
const metagen = require('eleventy-plugin-metagen');
const syntaxHighlight = require('@11ty/eleventy-plugin-syntaxhighlight');
const EleventyPluginOgImage = require('eleventy-plugin-og-image');

module.exports = eleventyConfig => {
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

  eleventyConfig.addFilter('htmlDateString', (dateObj) => {
    return DateTime.fromJSDate(dateObj, { zone: 'utc' }).toFormat('yyyy-LL-dd')
  })

  eleventyConfig.addFilter('limit', function (array, limit) {
    return array.slice(0, limit)
  })

  // 	--------------------- Custom shortcodes ---------------------
  eleventyConfig.addNunjucksAsyncShortcode('imagePlaceholder', imageShortcodePlaceholder);
  eleventyConfig.addShortcode('year', () => `${new Date().getFullYear()}`) // current year, stephanie eckles
  eleventyConfig.addShortcode('version', function () { return now })

  // 	--------------------- Plugins ---------------------
  eleventyConfig.addPlugin(EleventyEdgePlugin)
  eleventyConfig.addPlugin(readingTime)
  eleventyConfig.addPlugin(pluginTOC)
  eleventyConfig.addPlugin(metagen)
  eleventyConfig.addPlugin(syntaxHighlight)

  eleventyConfig.addPlugin(EleventyPluginOgImage, {
    satoriOptions: {
      fonts: [
        {
          name: 'Erode',
          data: fs.readFileSync('./src/assets/fonts/erode/Erode-Bold.woff'),
          weight: 700,
          style: 'normal',
        },
      ],
    },
  })

  // 	--------------------- Custom Template Languages ---------------------
  eleventyConfig.addPlugin(require('./config/template-languages/css-config.js'))

  // 	--------------------- Passthrough File Copy -----------------------

  // same path
  ;['src/assets/fonts/', 'src/assets/images/'].forEach((path) =>
    eleventyConfig.addPassthroughCopy(path)
  )

  // social icons to root directory
  eleventyConfig.addPassthroughCopy({
    'src/assets/images/favicon/*': '/',
  });

  eleventyConfig.addPassthroughCopy({
    'src/assets/css/global.css': 'src/_includes/global.css',
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
