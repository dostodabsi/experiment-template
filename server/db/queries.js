/* global emit */

var getAll = function(doc) {
  if (doc._id) {
    emit(doc._id, doc);
  }
};


module.exports = {
  'views': {

    'getAll': {
      'map': getAll
    },

  }
};
