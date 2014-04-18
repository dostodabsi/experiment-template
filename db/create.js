var nano    = require('nano')('http://localhost:5984');
var db      = nano.use('bakk');
var queries = require('./queries');


db.insert(queries, '_design/bakk', function(err, res) {
  if (!err) {
    console.log('inserted queries');
  }
});
