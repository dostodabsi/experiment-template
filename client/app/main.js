var _            = require('underscore');
var $            = require('jquery');
var Backbone     = require('backbone');
Backbone.$ = $;

var Router       = require('./routers/Router');
var Instruction  = require('./views/Instruction');
var Questions    = require('./views/Questions');
var Experiment   = require('./views/Experiment');

Router.on('route:instruction', function() {
  var instruction = new Instruction();
  instruction.render();
});

Router.on('route:questions', function() {
  var questions = new Questions();
  questions.render();
});

Router.on('route:exp', function() {
  var experiment = new Experiment();
  experiment.render();
});

Backbone.history.start();
