const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

const connectionString =
  'mongodb://contacts-mongo-db:VrKdXrtHCYD1w7n4FJZdX0vBLkCF319wnOEhcjfbxu64DAplwqE2ixMGMyotWphQ5y7n3zZW5nKuiAQiDKBN8w==@contacts-mongo-db.documents.azure.com:10255/?ssl=true';

function connect() {
  return mongoose.connect(
    connectionString,
    { useNewUrlParser: true, dbName: 'contacts-mongo-db' }
  );
}

module.exports = { connect };
