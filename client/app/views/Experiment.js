var fs           = require('fs');
var _            = require('underscore');
var $            = require('jquery');
var Backbone     = require('backbone');
var Flanker      = require('../experiment/flanker');
var participant  = require('../models/Participant');
Backbone.$ = $;

var experiment = fs.readFileSync(
    __dirname + '/../templates/experiment.html', 'utf8');

var Experiment = Backbone.View.extend({
  el: '.page',
  model: participant,
  experiment: new Flanker(),
  template: _.template(experiment),

  initialize: function() {
    this.experiment.start(); // start the experiment
  },

  events: {
    'click .finished': 'finished'
  },

  render: function() {
    this.$el.html(this.template);
    return this;
  },

  finished: function(ev) {
    ev.preventDefault();
    var exp = this.experiment.getData();
    participant.save({ exp: exp });
  }
});

module.exports = Experiment;
