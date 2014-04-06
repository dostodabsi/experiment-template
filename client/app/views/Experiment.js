var $           = require('jquery');
var _           = require('underscore');
var Backbone    = require('backbone');
var Flanker     = require('../experiment/flanker');
Backbone.$ = $;

var ExperimentView = Backbone.View.extend({

  experiment: new Flanker(),

  initialize: function() {
    this.experiment.startExperiment();
  }

});

module.exports = ExperimentView;
