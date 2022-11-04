const fs = require('fs')
const { DateTime } = require('luxon')
const markdownIt = require('markdown-it')
const markdownItAnchor = require('markdown-it-anchor')
const now = String(Date.now())
const syntaxHighlight = require('@11ty/eleventy-plugin-syntaxhighlight')
const readingTime = require('eleventy-plugin-reading-time')
const pluginTOC = require('eleventy-plugin-toc')
const path = require('path')
const manifestPath = path.resolve(__dirname, 'dist', 'assets', 'manifest.json')
const manifest = JSON.parse(fs.readFileSync(manifestPath, { encoding: 'utf8' }))

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
    level: [1, 2, 3, 4],
  }

  eleventyConfig.addPlugin(readingTime)

  eleventyConfig.setLibrary(
    'md',
    markdownIt(mdOptions).use(markdownItAnchor, mdAnchorOpts)
  )
  eleventyConfig.addPlugin(pluginTOC)

  // eleventyConfig.addPassthroughCopy('css')
  eleventyConfig.addPassthroughCopy('images')
  eleventyConfig.addPassthroughCopy('fonts')
  eleventyConfig.addPassthroughCopy('docs')

  eleventyConfig.addFilter('readableDate', (dateObj) => {
    return DateTime.fromJSDate(dateObj, { zone: 'utc' }).toFormat('dd LLL yyyy')
  })

  // Adds a universal shortcode to return the URL to a webpack asset. In Nunjack templates:
  // {% webpackAsset 'main.js' %} or {% webpackAsset 'main.css' %}
  eleventyConfig.addShortcode('webpackAsset', function (name) {
    if (!manifest[name]) {
      throw new Error(`The asset ${name} does not exist in ${manifestPath}`)
    }
    return manifest[name]
  })

  eleventyConfig.addShortcode('year', () => `${new Date().getFullYear()}`)

  // limit filter
  eleventyConfig.addFilter('limit', function (array, limit) {
    console.log(array.slice(0, limit))
    return array.slice(0, limit)
  })

  eleventyConfig.addShortcode('version', function () {
    return now
  })

  eleventyConfig.addPassthroughCopy({
    './node_modules/alpinejs/dist/cdn.js': './js/alpine.js',
    './node_modules/@alpinejs/intersect/builds/cdn.js': './js/intersect.js',
  })

  // https://html.spec.whatwg.org/multipage/common-microsyntaxes.html#valid-date-string
  eleventyConfig.addFilter('htmlDateString', (dateObj) => {
    return DateTime.fromJSDate(dateObj, { zone: 'utc' }).toFormat('yyyy-LL-dd')
  })

  eleventyConfig.addPlugin(syntaxHighlight)

  eleventyConfig.addPlugin(require('eleventy-load'), {
    rules: [
      {
        test: /\.(md|html)$/,
        loaders: [
          {
            loader: require('eleventy-load-html'),
          },
        ],
      },
      {
        test: /\.js$/,
        loaders: [
          {
            loader: require('eleventy-load-js'),
          },
          {
            loader: require('eleventy-load-file'),
          },
        ],
      },
    ],
  })

  return {
    passthroughFileCopy: true,
  }
}
