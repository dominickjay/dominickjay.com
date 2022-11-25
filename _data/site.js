const site = {
  name: 'dom jay | front end developer',
  baseURL: 'https://dominickjay.com',
  description:
    'Dominick Jay is an experienced creative Front-End Developer from Plymouth, UK, that specializes in fun, creative solutions.',
}

module.exports = function () {
  // use the URL that is set via an environment variable
  if (process.env.ELEVENTY_URL) {
    site.baseURL = process.env.ELEVENTY_URL
  }

  return site
}
