var _        = require('underscore');
var Backbone = require('backbone');

var Participants = Backbone.Collection.extend({
  url: '/api/participants'
});

module.exports = Participants;
