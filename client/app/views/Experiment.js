var $            = require('jquery');
var _            = require('underscore');
var Backbone     = require('backbone');
var Experiment  = require('../experiment/experiment');
Backbone.$ = $;


var ExperimentView = Backbone.View.extend({

  experiment: new Experiment(),

  initialize: function() {
    var self = this;
    this.experiment.start();
    setTimeout(function() {
      self.experiment.finish();
    }, 10000);
  }

});

module.exports = ExperimentView;
