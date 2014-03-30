/* global emit */
var getAll = function(doc) {
  if (doc._id) {
    emit(doc._id, doc);
  }
};

exports.all = {
  'views': {
    'all': {
      'map': getAll
    }
  }
};
