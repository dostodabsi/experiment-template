var _        = require('underscore');
var tracking = require('./tracking');

var Flanker = function() {
  var self = this;

  var data = {
    currentTrial: 0,
    tracking: tracking.track
  };

  this.start = function() {
    tracking.trigger('preperation');
    this.count();
  };

  this.count = function() {
    setInterval(function() {
      data.currentTrial += 1;
    }, 2000);
  };

  this.getData = function() {
    return data;
  };

};

module.exports = Flanker;
