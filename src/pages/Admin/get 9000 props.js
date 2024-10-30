/* global use, db */
// MongoDB Playground
// Use Ctrl+Space inside a snippet or a string literal to trigger completions.

// The current database to use.
use('test');

// Search for documents in the current collection.
db.getCollection('listings')
  .find(
    {
        "data.prices.basePriceUSD":9000
    },
    )
  .sort({
    "data.xdata.country"
  });
