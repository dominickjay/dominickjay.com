const { DateTime } = require("luxon");
const markdownIt = require("markdown-it");

module.exports = function (eleventyConfig) {
    let options = {
        html: true,
        breaks: true,
        linkify: true
    };

    eleventyConfig.setLibrary("md", markdownIt(options));

    eleventyConfig.addPassthroughCopy('css')
    eleventyConfig.addPassthroughCopy('images')
    eleventyConfig.addPassthroughCopy('fonts')

    eleventyConfig.addFilter("readableDate", dateObj => {
        return DateTime.fromJSDate(dateObj, {zone: 'utc'}).toFormat("dd LLL yyyy");
    });

    // https://html.spec.whatwg.org/multipage/common-microsyntaxes.html#valid-date-string
    eleventyConfig.addFilter('htmlDateString', (dateObj) => {
        return DateTime.fromJSDate(dateObj, {zone: 'utc'}).toFormat('yyyy-LL-dd');
    });

  eleventyConfig.addPlugin(require("eleventy-load"), {
    rules: [
      {
        test: /\.(md|html)$/,
        loaders: [
          {
            loader: require("eleventy-load-html"),
          },
        ],
      },
      {
        test: /\.js$/,
        loaders: [
          {
            loader: require("eleventy-load-js"),
          },
          {
            loader: require("eleventy-load-file"),
          },
        ],
      },
    ],
  });

    return {
        passthroughFileCopy: true
    }
}