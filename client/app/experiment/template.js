var $        = require('jquery');
var _        = require('underscore');
var utils    = require('../utils');

function ExperimentTemplate() {
  // no private stuff
}

ExperimentTemplate.prototype = {

  data: {
    trials      : [],
    quitter     : false,
    changedTab  : false,
    changedSize : false,
    start       : undefined,
    correct     : undefined
  },

  stimuli      : 'please override',
  feedback     : 'please override',
  fixCross     : 'please override',
  participant  : 'please override',
  responseKeys : 'please override',


  initialize: function() {
    this.userKeyPress = _.partial(this.onKeyPress, this.responseKeys);
  },


  extend: function(func, context) {
    ExperimentTemplate.prototype[func].call(context);
  },


  delay: function(func, time) {
    return setTimeout(_.bind(func, this), time);
  },


  startExperiment: function() {
    this.initialize();
    this.addTabCheck();
    this.addWindowCheck();
    this.leftExperiment();
  },

  /*
   * Methods that should be overriden by the specific Experiment
   */

  startTrial: function() {
    this.addKeyEvents();
    this.startRecording();
  },


  prepareStim: function() {},
  showfixCross: function() {},
  checkAnswer: function() {},
  changeStim: function(file) {},

  /*
   * Methods for recording the Reaction Time and
   * computation of the feedback - mean RT and error count
   */

  startRecording: function() {
    this.set('start', +new Date());
  },


  endRecording: function(pressed, start) {
    var response = pressed || 'too slow';
    var time     = pressed ? +new Date() - start : 1500;
    var correct  = pressed ? this.get('correct') : false;

    this.get('trials').push({ time: time,
                              response: response,
                              correct: correct });
  },


  computeFeedback: function() {
    var trials = this.get('trials');
    var rTimes = _.pluck(trials, 'time');

    var meanRT     = this.sum(rTimes) / rTimes.length;
    var errorCount = _.where(trials, { correct: false }).length;

    return {
      errorCount: errorCount,
      meanRT: meanRT.toFixed(2)
    };
  },

  /**********************************************************************
   * Methods that are important for Participant Tracking:
   *
   * - onKeyPress:
   *   provided a resp-code map, checks if user has given the right answer
   *
   * - addTabCheck: checks if the User has switchted tabs
   * - addWindowCheck: checks if the User has changed the window size
   * - leftExperiment: checks if the User has left the experiment, warn her
   *
   ***********************************************************************/

  onKeyPress: function(responseKeys, ev) {
    var code = ev.keyCode || ev.which;
    var pressed = _.invert(responseKeys)[code];
    if (pressed) {
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
    $(window).on('keyup', _.bind(this.userKeyPress, this));
  },


  removeKeyEvents: function() {
    $(window).unbind('keyup');
  },


  finish: function() {
    this.removeKeyEvents();
    $(window).unbind('beforeunload');
    var exp = _.omit(this.get('all'), ['start', 'correct']);

    !this.participant ? console.log(exp) :
                        this.participant.save({ exp: exp });
  },


  get: function(key) {
    return key === 'all' ? this.data : this.data[key];
  },


  set: function(key, val) {
    this.data[key] = val;
  },


  sum: function(array) {
    return _.reduce(array, function(a, b) {
      return a + b;
    }, 0);
  },

};

module.exports = ExperimentTemplate;
