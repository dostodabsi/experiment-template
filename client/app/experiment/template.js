var $        = require('jquery');
var _        = require('underscore');
var utils    = require('../utils');
var Backbone = require('backbone');
var Participant = require('../models/Participant');
Backbone.$   = $;


var ExperimentTemplate = Backbone.Model.extend({

  defaults: {
    trials: [],
    start: undefined,
    isRight: undefined,
    quitter: false,
    changedTab: false,
    changedSize: false
  },

  ISI: 500,
  random: true,
  participant: Participant,
  stimuli: 'please override',
  feedback: 'please override',
  fixCross: 'please override',
  binaryMap: 'please override',

  initialize: function() {
    this.userKeyPress = _.partial(this.onKeyPress, this.binaryMap);
  },

  extend: function(func, context) {
    ExperimentTemplate.prototype[func].call(context);
  },

  startExperiment: function() {
    this.addTabCheck();
    this.addWindowCheck();
    this.leftExperiment();
    this.startTrial();
  },

  /*
   * Methods that should be overriden by the specific Experiment
   */

  startTrial: function() {
    this.addKeyEvents();
    this.startRecording();
  },

  prepareStim: function() {},

  changeStim: function(file) {},

  showfixCross: function() {},

  /*
   * Methods for the Recording of the Reaction Time
   */

  startRecording: function() {
    this.set('start', +new Date());
  },

  endRecording: function(pressed, start) {
    var save;
    if (pressed === null) {
      save = { reaction: 'too slow' };
    }
    else {
      var time = +new Date() - start;
      var obj = _.object([pressed], [time]);
      save = _.extend(obj, { isRight: this.get('isRight') });
    }

    this.get('trials').push(save);
  },

  computeFeedback: function() {
    var trials = this.get('trials');
    var add = function(a, b) { return a + b; };
    var isNumber = function(e) { return !_.isBoolean(e); };
    var reactionTimes = _.filter(_.flatten(_.map(trials, _.values)), isNumber);
    var mean = _.reduce(reactionTimes, add, 0);
    return mean / trials.length;
  },

  /**********************************************************************
   * Methods that are important for the User Interaction:
   * - onKeyPress: provided a map, checks if user gives the right answer
   * - addTabCheck: check if the User changes the Tab 
   * - addWindowCheck: check if the User changes the Window Size
   * - leftExperiment: check if the User leaves the experiment, warn her
   ***********************************************************************/

  onKeyPress: function(binaryMap, ev) {
    var code = ev.keyCode || ev.which;
    var map  = _.map(binaryMap, function(val, key) {
      if (val == code) return key;
    });
    var pressed = _.first(_.filter(map, Boolean));
    if (!_.isEmpty(pressed)) {
      this.checkAnswer(pressed);
      this.endRecording(pressed, this.get('start'));
    }
  },

  addTabCheck: function() {
    var self = this;
    var vendor = utils.hidden();
    var changeVis = (vendor == 'hidden' ? '' : vendor) + 'visibilitychange';
    $(document).on(changeVis, function(ev) {
      if (!self.get('changedTab')) {
        self.set('changedTab', true);
      }
    });
  },

  addWindowCheck: function() {
    var self = this;
    $(window).on('resize', function() {
      if (!self.get('changedSize')) {
        self.set('changedSize', true);
      }
    });
  },

  leftExperiment: function() {
    var self = this;
    var msg = 'By leaving, you opt out of the Experiment, are you sure?';
    $(window).on('beforeunload', function() {
      self.set('quitter', true);
      self.finish();
      return msg;
    });
  },

  addKeyEvents: function() {
    $(window).on('keyup', $.proxy(this.userKeyPress, this));
  },

  removeKeyEvents: function() {
    $(window).unbind('keyup', this.userKeyPress);
  },

  finish: function() {
    $(window).unbind('beforeunload');
    var exp = _.omit(this.attributes, ['start', 'isRight']);
    this.participant.save({ exp: exp });
  }

});

module.exports = ExperimentTemplate;
