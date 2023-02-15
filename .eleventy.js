const fs = require('fs')
const { EleventyEdgePlugin } = require('@11ty/eleventy')
const { DateTime } = require('luxon')
const markdownIt = require('markdown-it')
const markdownItAnchor = require('markdown-it-anchor')
const now = String(Date.now())
const syntaxHighlight = require('@11ty/eleventy-plugin-syntaxhighlight')
const readingTime = require('eleventy-plugin-reading-time')
const pluginTOC = require('eleventy-plugin-toc')
const path = require('path')
const manifestPath = path.resolve(__dirname, '_site', 'assets', 'manifest.json')
const manifest = JSON.parse(fs.readFileSync(manifestPath, { encoding: 'utf8' }))
const metagen = require('eleventy-plugin-metagen')
const EleventyPluginOgImage = require('eleventy-plugin-og-image');

module.exports = function (eleventyConfig) {

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

  eleventyConfig.addPlugin(readingTime)
  eleventyConfig.addPlugin(EleventyEdgePlugin)
  eleventyConfig.addPlugin(pluginTOC)
  eleventyConfig.addPlugin(metagen)

  eleventyConfig.setLibrary(
    'md',
    markdownIt(mdOptions).use(markdownItAnchor, mdAnchorOpts)
  )

  eleventyConfig.addCollection('randomizedPosts', function (collection) {
    return (
      collection
        // Change to the name of your tag
        .getFilteredByTag('writing')
        .sort(() => {
          return 0.5 - Math.random()
        })
        // Optional limit, remove if unwanted
        .slice(0, 3)
    )
  })

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
  })


  // eleventyConfig.addPassthroughCopy('css')
  eleventyConfig.addPassthroughCopy('images')
  eleventyConfig.addPassthroughCopy('fonts')
  eleventyConfig.addPassthroughCopy('docs')

  eleventyConfig.addFilter('readableDate', (dateObj) => {
    return DateTime.fromJSDate(dateObj, { zone: 'utc' }).toFormat('dd LLL yyyy')
  })

  eleventyConfig.addFilter('sanitise', (value) => {
    return encodeURIComponent(value)
  });

  // Adds a universal shortcode to return the URL to a webpack asset. In Nunjack templates:
  // {% webpackAsset 'main.js' %} or {% webpackAsset 'main.css' %}
  eleventyConfig.addShortcode('webpackAsset', function (name) {
    if (!manifest[name]) {
      throw new Error(`The asset ${name} does not exist in ${manifestPath}`)
    }
    return manifest[name]
  })

  eleventyConfig.addShortcode('year', () => `${new Date().getFullYear()}`)

  eleventyConfig.addShortcode('version', function () {
    return now
  })

  // limit filter
  eleventyConfig.addFilter('limit', function (array, limit) {
    console.log(array.slice(0, limit))
    return array.slice(0, limit)
  })

  eleventyConfig.addPassthroughCopy({
    './node_modules/alpinejs/dist/cdn.min.js': './js/alpine.js',
    './node_modules/@alpinejs/intersect/builds/cdn.min.js': './js/intersect.js',
  })

  // https://html.spec.whatwg.org/multipage/common-microsyntaxes.html#valid-date-string
  eleventyConfig.addFilter('htmlDateString', (dateObj) => {
    return DateTime.fromJSDate(dateObj, { zone: 'utc' }).toFormat('yyyy-LL-dd')
  })

  eleventyConfig.addPlugin(syntaxHighlight);

  eleventyConfig.addPlugin(EleventyPluginOgImage, {
    satoriOptions: {
      fonts: [
        {
          name: 'Erode',
          data: fs.readFileSync('./fonts/Erode-Bold.woff'),
          weight: 700,
          style: 'normal',
        },
      ],
    },
  })

  return {
    passthroughFileCopy: true,
    markdownTemplateEngine: 'njk',
  }
}
