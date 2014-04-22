/* global emit */
var url  = process.env.CLOUDANT_URL || 'http://localhost:5984';
var nano = require('nano')(url);
var db   = nano.use('bakk');

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

db.insert(queries, '_design/bakk', function(err, res) {
  if (!err) {
    console.log('inserted queries');
  }
});
