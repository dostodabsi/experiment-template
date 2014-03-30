var $        = require('jquery');
var _        = require('underscore');
var utils    = require('../utils');
var Backbone = require('backbone');
Backbone.$ = $;

var experiment = {
  track: {
    changedTab: false,
    changedSize: false
  }
};
_.extend(experiment, Backbone.Events);

/*
 * Event Listeners that should be added
 * before the Experiment starts
 *
 */

function addTabCheck() {
  var vendor = utils.hidden();
  var changeVis = (vendor == 'hidden' ? '' : vendor) + 'visibilitychange';
  $(document).on(changeVis, function(ev) {
    if (!experiment.track.changedTab) {
      experiment.track.changedTab = true;
    }
  });
}

function addWindowCheck() {
  $(window).on('resize', function() {
    if (!experiment.track.changedSize) {
      experiment.track.changedSize = true;
    }
  });
}

experiment.on('preperation', addTabCheck);
experiment.on('preperation', addWindowCheck);

module.exports = experiment;
