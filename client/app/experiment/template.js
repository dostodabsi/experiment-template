var $        = require('jquery');
var _        = require('underscore');
var Backbone = require('backbone');
Backbone.$   = $;


var ExperimentTemplate = Backbone.Model.extend({

  defaults: {
    RT: 0,
    resp: '',
    trials: []
  },

  ISI: 0.5,
  random: true,
  stimuli: 'please override',
  fixCross: 'please override',
  binaryMap: 'please override',

  extend: function(func, context) {
    ExperimentTemplate.prototype[func].call(context);
  },

  initialize: function() {
    this.on('startExperiment', this.startExperiment);
    this.on('startTrial', this.startTrial);
    this.on('endTrial', this.showfixCross);
  },

  startExperiment: function() {
    this.trigger('startTrial');
  },

  startTrial: function() {},

  prepareStim: function() {},

  changeStim: function(file) {},

  showfixCross: function() {},

  onKeyPress: function(binaryMap, ev) {
    var code = ev.keyCode || ev.which;
    var map = _.map(binaryMap, function(val, key) {
      if (val == code) return key;
    });
    var pressed = _.first(_.filter(map, Boolean));
    if (pressed) {
      this.set('resp', pressed);
      this.trigger('endTrial');
    }
  }

});

module.exports = ExperimentTemplate;
