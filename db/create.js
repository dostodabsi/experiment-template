/**************************************
 * This creates a CouchDB database
 * named `bakk` and a design document
 * that returns all documents
 *
 * run it before you get started
 ***************************************/

var url  = process.env.CLOUDANT_URL || 'http://localhost:5984';
var nano = require('nano')(url);

var getAll = function(doc) {
  if (doc._id) {
    emit(doc._id, doc);
  }
};

var queries = {
  'views': {
    'getAll': {
      'map': getAll
    },
  }
};

nano.db.create('bakk', function(err, body) {
  if (err) return err;
  console.log('created bakk db');
  var db = nano.use('bakk');

  db.insert(queries, '_design/bakk', function(err, res) {
    if (!err) {
      console.log('inserted design document');
    }
  });
});
