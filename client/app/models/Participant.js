var _        = require('underscore');
var Backbone = require('backbone');

var Participant = Backbone.Model.extend({

  urlRoot: '/api/participant',

  defaults: {
    'age': 0,
    'sex': '',
    'userAgent': '',
    'windowSize': '',
    'handedness': ''
  }

});

module.exports = new Participant();
