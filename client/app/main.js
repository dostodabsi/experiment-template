var _            = require('underscore');
var $            = require('jquery');
var Backbone     = require('backbone');

Backbone.$ = $;

var Router       = require('./routers/Router');
var Instruction  = require('./views/Instruction');
var Participant  = require('./models/Participant');
var Participants = require('./collections/Participants');

Router.on('route:home', function() {
  Instruction.render();
});

Backbone.history.start();
