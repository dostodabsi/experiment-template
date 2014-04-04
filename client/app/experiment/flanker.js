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
var feedback = fs.readFileSync(
    __dirname + '/stimuli/feedback.html', 'utf-8');

var comp = _.template(flanker, { outer: 'h', inner: 'h' });
var incomp = _.template(flanker, { outer: 'h', inner: 'f' });

var files = {
  1: comp,
  2: incomp,
  3: comp,
  4: incomp,
  5: comp,
  6: incomp,
  7: comp,
  8: incomp
};


var Flanker = ExperimentTemplate.extend({

  order: true,
  timeout: 1500,
  feedbackTime: 1000,

  curStim: undefined,
  keys: _.keys(files),
  stimuli: _.values(files),

  binaryMap: { 'f': 70, 'h': 72 },

  fixCross: _.template(fixCross, { feedback: '+' }),
  negFeedback: _.template(fixCross, { feedback: 'X' }),
  posFeedback: _.template(fixCross, { feedback: 'O' }),

  /*
   * Initialize the Experiment with some more Event Listeners:
   *
   * - start/endTrial: add checkToSlow, which checks if the User is to slow
   *   with his answer; endTrial removes this setTimeout if s/he was not
   *
   * - endBlock: add endBlock, which gives some Feedback about the average
   *   reaction time of the block the User has just finished
   *
   * - timedOut: add negativeFeedback; if the User really was to slow, draw
   *   negative Feedback (red X)
   *
   * - queryAnswer: add checkAnswer; queryAnswer is triggered
   *   by the Experiment Template in the onKeyPress method, that is,
   *   when the User gives his answer. checkAnswer triggers ...
   *
   * - giveFeedback: which draws Feedback as a function of the given answer
   *
   */

  initialize: function() {
    this.extend('initialize', this);

    this.on('startTrial', this.checkToSlow);
    this.on('endTrial', this.clearToSlow);

    this.on('endBlock', this.endBlock);

    this.on('timedOut', this.negativeFeedback);
    this.on('queryAnswer', this.checkAnswer);
    this.on('giveFeedback', this.giveFeedback);
  },

  /* 
   * Trial specific methods:
   *
   * - starTrial just starts the trial, or ends the experiment if
   *   there are no stimuli left
   * - prepareStim operates on the stimuli as a function of the
   *   conditions and the specific order they should be presented
   * - showFixCross shows the fixation Cross for the time of the ISI
   *
   * - giveFeedback checks if the User has given the right answer (as
   *   indicated by the isRight property, which is set by the checkAnswer
   *   method, and either draws positive (green O) or negative (red X) Feedback
   */

  startTrial: function() {
    if (_.isEmpty(this.stimuli)) {
      this.trigger('endExperiment');
      return;
    }
    var next = this.prepareStim();
    this.changeStim(next.stim);
  },

  prepareStim: function() {
    if (!_.isArray(this.order)) { _.shuffle(this.stimuli); }
    this.curStim = this.keys.shift() % 2 === 0 ? 'f' : 'h';
    return { stim: this.stimuli.shift() };
  },

  showfixCross: function() {
    var self = this;
    this.clearFeedback();
    this.changeStim(this.fixCross);
    setTimeout(function() {
      self.trigger('startTrial');
    }, this.ISI);
  },

  giveFeedback: function() {
    this.get('isRight') ? this.positiveFeedback() :
                          this.negativeFeedback();
  },

  negativeFeedback: function() {
    this.drawFeedback('negFeedback');
  },

  positiveFeedback: function() {
    this.drawFeedback('posFeedback');
  },

  drawFeedback: function(type) {
    var self = this;
    if (type.indexOf('pos') !== -1) {
      this.changeStim(this.posFeedback);
      this.changeColor('green');
    }
    else {
      this.changeStim(this.negFeedback);
      this.changeColor('red');
    }
    this.fbTimeout = setTimeout(function() {
      self.showfixCross();
    }, this.feedbackTime);
  },

  checkAnswer: function(options) {
    var isRight = options.pressed == this.curStim;
    this.set('isRight', isRight);
    this.trigger('endTrial');
    this.trigger('giveFeedback');
  },

  checkToSlow: function() {
    var self = this;
    this.check = setTimeout(function() {
      self.trigger('timedOut');
    }, this.timeout);
  },

  clearToSlow: function() {
    clearTimeout(this.check);
  },

  clearFeedback: function() {
    clearTimeout(this.fbTimeout);
  },

  changeColor: function(color) {
    $('.feedback').css('color', color);
  },

  changeStim: function(file) {
    $('.page').html(file);
  },

  endBlock: function() {
    var fb = { mean: this.computeFeedback() };
    this.changeStim(_.template(this.feedback, fb));
  }

});

module.exports = Flanker;
