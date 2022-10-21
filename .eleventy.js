const { DateTime } = require("luxon");
const markdownIt = require("markdown-it");
const now = String(Date.now())
const syntaxHighlight = require('@11ty/eleventy-plugin-syntaxhighlight');

module.exports = function (eleventyConfig) {
  let options = {
    html: true,
    breaks: true,
    linkify: true,
  }

  eleventyConfig.setLibrary('md', markdownIt(options))

  eleventyConfig.addPassthroughCopy('css')
  eleventyConfig.addPassthroughCopy('images')
  eleventyConfig.addPassthroughCopy('fonts')

  eleventyConfig.addFilter('readableDate', (dateObj) => {
    return DateTime.fromJSDate(dateObj, { zone: 'utc' }).toFormat('dd LLL yyyy')
  })

  eleventyConfig.addShortcode('year', () => `${new Date().getFullYear()}`)

  // limit filter
  eleventyConfig.addFilter('limit', function (array, limit) {
    console.log(array.slice(0, limit));
    return array.slice(0, limit)
  })

  eleventyConfig.addShortcode('version', function () {
    return now
  })

  eleventyConfig.addPassthroughCopy({
    './node_modules/alpinejs/dist/cdn.js': './js/alpine.js',
  })

  // https://html.spec.whatwg.org/multipage/common-microsyntaxes.html#valid-date-string
  eleventyConfig.addFilter('htmlDateString', (dateObj) => {
    return DateTime.fromJSDate(dateObj, { zone: 'utc' }).toFormat('yyyy-LL-dd')
  })

  eleventyConfig.addPlugin(syntaxHighlight);

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