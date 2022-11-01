require('dotenv').config()
const Airtable = require('airtable')
let base = new Airtable({ apiKey: process.env.AIRTABLE_KEY }).base(
  process.env.AIRTABLE_ID
)

module.exports = () => {
  return new Promise((resolve, reject) => {
    let allDatasets = [] // change 'allDatasets' to something more relevant to your project
    base('Books') // change 'New' to your base name
      .select({ view: 'Currently Reading' }) // change 'All' to your view name
      .eachPage(
        function page(records, fetchNextPage) {
          records.forEach((record) => {
            allDatasets.push({
              id: record._rawJson.id,
              ...record._rawJson.fields,
            })
          })
          fetchNextPage()
        },
        function done(err) {
          if (err) {
            reject(err)
          } else {
            resolve(allDatasets)
          }
        }
      )
  })
}
