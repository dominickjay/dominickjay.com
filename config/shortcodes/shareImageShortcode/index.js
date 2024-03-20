// .eleventy.js
const Image = require("@11ty/eleventy-img");

async function shareImageShortcode(src) {
  // src might be small.png - taken from frontmatter
  const { url } = this.page;
  // url might be /blog/hello-world/
  const imageSrc = "./src/assets/images/share-images/" + src;
  let metadata = await Image(imageSrc, {
    widths: [600],
    formats: ["jpeg"],
    urlPath: url,
    outputDir: `./dist/${url}`,
  });

  const data = metadata.jpeg[0];
  // data.url might be /blog/hello-world/xfO_genLg4-600.jpeg
  // note the filename is a content hash-width combination
  return data.url;
}

module.exports = shareImageShortcode;
