var _        = require('underscore');
var Backbone = require('backbone');

var Participant = Backbone.Model.extend({
  urlRoot: '/api/participant',
  defaults: function() {
    return {
      'age': 0,
      'country': '',
      'userAgent': window.navigator.userAgent
    };
  }
});

module.exports = Participant;
