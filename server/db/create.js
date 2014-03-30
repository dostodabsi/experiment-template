var nano   = require('nano')('http://localhost:5984');
var db     = nano.use('bakk');
var getAll = require('./query').all;

db.insert(getAll, '_design/bakk', function(err, res) {
  console.log('inserted!');
});
