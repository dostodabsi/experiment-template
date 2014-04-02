var fs       = require('fs');
var $        = require('jquery');
var _        = require('underscore');
var Backbone = require('backbone');
var ExperimentTemplate = require('./template');
Backbone.$   = $;


var flanker = fs.readFileSync(
    __dirname + '/stimuli/flanker.html', 'utf-8');

var fixCross = fs.readFileSync(
    __dirname + '/stimuli/fixCross.html', 'utf-8');

var files = {
  1: _.template(flanker, { outer: 'h', inner: 'f' }),
  2: _.template(flanker, { outer: 'h', inner: 'h' })
};

var Flanker = ExperimentTemplate.extend({

  order: true,
  fixCross: fixCross,
  stimuli: _.values(files),
  binaryMap: { 'f': 70, 'h': 72 },

  startTrial: function() {
    var next = this.prepareStim();
    this.changeStim(next.stim);
  },

  prepareStim: function() {
    if (!_.isArray(this.order)) { _.shuffle(this.stimuli); }
    return { stim: this.stimuli.shift() };
  },

  showfixCross: function() {
    this.changeStim(this.fixCross);
  },

  changeStim: function(file) {
    $('.page').html(file);
  },

});

module.exports = Flanker;
