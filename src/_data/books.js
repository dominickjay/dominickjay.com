require('dotenv').config()

const Airtable = require('airtable')
const airtableBaseId = process.env.AIRTABLE_ID
const airtableTable = 'Books'
const airtableTableView = 'All'

var base = new Airtable({ apiKey: process.env.AIRTABLE_API }).base(
  airtableBaseId
)

module.exports = () => {

  return new Promise((resolve, reject) => {
    let allDatasets = [];

    base(airtableTable)
      .select({
        view: airtableTableView,
        // optional sorting params
        sort: [{ field: "started", direction: "asc" }],
      })
      .eachPage(
        function page(records, fetchNextPage) {
          records.forEach((record) => {
            allDatasets.push({
              id: record._rawJson.id,
              ...record._rawJson.fields,
            });
          });
          fetchNextPage();
        },
        function done(err) {
          if (err) {
            reject(err)
          } else {
            resolve(allDatasets)
          }
        }
      );
  });
};


// module.exports = () => {
//   return new Promise((resolve, reject) => {
//     let allDatasets = [] // change 'allDatasets' to something more relevant to your project
//     base('Books') // change 'New' to your base name
//       .select({ view: 'All' }) // change 'All' to your view name
//       .eachPage(
//         function page(records, fetchNextPage) {
//           records.forEach((record) => {
//             allDatasets.push({
//               id: record._rawJson.id,
//               ...record._rawJson.fields,
//             })
//           })
//           fetchNextPage()
//         },
//         function done(err) {
//           if (err) {
//             reject(err)
//           } else {
//             resolve(allDatasets)
//           }
//         }
//       )
//   })
// }
