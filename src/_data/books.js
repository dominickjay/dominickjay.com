const xml2json = require('xml2json');

async function run() {
  const books = await fetch("https://oku.club/rss/collection/p9twg")
    .then(response => response.text())
    .then(str => xml2json.toJson(str, { object: true }))
    .then(data => {
        // console.log(data.rss.channel.item[0]['dc:creator']['$t'])
        return data.rss.channel.item.slice(0, 5).map(b => {
            return {
                title: b.title,
                link: b.link,
                image: b['oku:cover'],
                authors: b['dc:creator']['$t'],
            }
        })
    })

    console.log(books);
    return books
}

module.exports = run();