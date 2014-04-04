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

  extend: function(func, context) {
    ExperimentTemplate.prototype[func].call(context);
  },

  /*
   * Upon Initialization of the Experiment, bind the relevant Actions
   * to the specific Events in the Experiment:
   *
   * - on startExperiment, add the relevant environmental Checks
   * - on startTrial, add the keyEvents and start recording of the RT
   * - on endTrial, remove the keyEvents, show fixCross, compute RT
   *
   */

  initialize: function() {
    this.userKeyPress = _.partial(this.onKeyPress, this.binaryMap);

    this.on('startExperiment', this.addTabCheck);
    this.on('startExperiment', this.addWindowCheck);
    this.on('startExperiment', this.leftExperiment);
    this.on('startExperiment', this.startExperiment);

    this.on('startTrial', this.addKeyEvents);
    this.on('startTrial', this.startTrial);
    this.on('startTrial', this.startRecording);

    this.on('endTrial', this.removeKeyEvents);

    this.on('endExperiment', this.finish);
  },

  startExperiment: function() {
    this.trigger('startTrial');
  },

  /*
   * Methods that should be overriden by the specific Experiment
   */

  startTrial: function() {},

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
    var time = +new Date() - start;
    var right = this.get('isRight');
    var obj = _.object([pressed], [time]);
    this.get('trials').push(_.extend(obj, { isRight: right }));
  },

  computeFeedback: function() {
    var trials = this.get('trials');
    var RT = _.flatten(_.map(trials, _.values));
    return RT / trials.length;
  },

  /*
   * Methods that are important for the User Interaction:
   * - onKeyPress: provided a map, checks if user gives the right answer
   * - addTabCheck: if User changes the Tab, e.g. does something different
   * - addWindowCheck: check if the User changes the Window Size
   * - leftExperiment: check if the User leaves the experiment, warn her
   */

  onKeyPress: function(binaryMap, ev) {
    var code = ev.keyCode || ev.which;
    var map = _.map(binaryMap, function(val, key) {
      if (val == code) return key;
    });
    var pressed = _.first(_.filter(map, Boolean));
    if (pressed) {
      this.endRecording(pressed, this.get('start'));
      this.trigger('queryAnswer', { pressed: pressed });
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
    this.off();
    $(window).unbind('beforeunload');
    var exp = _.omit(this.attributes, ['start', 'isRight']);
    this.participant.save({ exp: exp });
  }

});

module.exports = ExperimentTemplate;
