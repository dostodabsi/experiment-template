var nano = require('nano')('http://localhost:5984');
var db   = nano.use('bakk');


exports.getUser = function(req, res, next) {
  db.get(req.session.user, function(err, body) {
    if (err) return next(err);
    res.send(body);
  });
};


exports.createUser = function(req, res, next) {
  db.insert(req.body, function(err, body) {
    if (err) return next(err);
    res.send(body);
  });
};


exports.updateUser = function(req, res, next) {
  var id = req.params.id;

  // Get the document with the specific ID
  db.get(id, function(err, doc) {
    if (err) return next(err);

    // Update the old Document
    doc.exp = req.body.exp;

    // Insert the updated document
    db.insert(doc, doc.id, function(err, body) {
      if (err) return next(err);
      res.send(body);
    });
  });
};


exports.viewData = function(req, res, next) {
  db.view('bakk', 'all', function(err, body) {
    if (err) return next(err);
    res.send(body);
  });
};
