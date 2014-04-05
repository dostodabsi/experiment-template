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
  5: 'block',
  7: comp,
  8: incomp,
  9: comp,
  10: incomp
};


var Flanker = ExperimentTemplate.extend({

  order: true,
  timeout: 1500,
  feedbackTime: 1000,

  curStim: undefined,
  keys: _.keys(files),
  stimuli: _.values(files),
  binaryMap: { 'f': 70, 'h': 72 },

  feedback: feedback,
  fixCross: _.template(fixCross, { feedback: '+' }),
  negFeedback: _.template(fixCross, { feedback: 'X' }),
  posFeedback: _.template(fixCross, { feedback: 'O' }),

  /**************************************************************************
   * Trial specific methods:
   *
   * - starTrial just starts the trial, starts a Feedback Block or
   *   ends the experiment if there are no stimuli left
   * - prepareStim operates on the stimuli as a function of the
   *   conditions and the specific order they should be presented in
   * - showFixCross shows the fixation Cross for the time of the ISI
   *
   * - giveFeedback checks if the User has given the right answer (as
   *   indicated by the isRight property, which is set by the checkAnswer
   *   method, and either draws positive (green O) or negative (red X) Feedback
   **************************************************************************/

  startTrial: function() {
    this.extend('startTrial', this);
    this.checkToSlow();

    if (_.isEmpty(this.stimuli)) {
      this.finish();
    }
    var stim = this.prepareStim();
    if (stim == 'block') {
      this.endBlock();
    }
    else {
      this.changeStim(stim);
    }
  },

  prepareStim: function() {
    if (!_.isArray(this.order)) {
      _.shuffle(this.stimuli);
    }
    this.curStim = this.keys.shift() % 2 === 0 ? 'f' : 'h';
    return this.stimuli.shift();
  },

  showfixCross: function() {
    var self = this;
    this.clearFeedback();
    this.changeStim(this.fixCross);
    setTimeout(function() {
      self.startTrial();
    }, this.ISI);
  },

  hasTimedOut: function() {
    this.negativeFeedback();
    this.endRecording(null);
  },

  drawFeedback: function(type) {
    var self = this;
    if (type.indexOf('pos') !== -1) {
      this.changeStim(this.posFeedback);
      this.changeStimColor('green');
    }
    else {
      this.changeStim(this.negFeedback);
      this.changeStimColor('red');
    }
    this.fbTimeout = setTimeout(function() {
      self.showfixCross();
    }, this.feedbackTime);
  },

  checkAnswer: function(answer) {
    var isRight = (answer == this.curStim);
    this.set('isRight', isRight);

    this.removeKeyEvents();
    this.clearToSlow();
    this.giveFeedback();
  },

  checkToSlow: function() {
    var self = this;
    this.check = setTimeout(function() {
      self.hasTimedOut();
    }, this.timeout);
  },

  endBlock: function() {
    var self = this;
    this.clearToSlow();
    this.removeKeyEvents();

    var fb = { mean: this.computeFeedback() };
    this.changeStim(_.template(this.feedback, fb));

    $(window).on('keyup', function(ev) {
      var code = ev.keyCode || ev.which;
      if (code == 32) {
        $(window).unbind('keyup');
        self.startTrial();
      }
    });
  },

  finish: function() {
    this.extend('finish', this);
    this.clearFeedback();
    this.clearToSlow();
    this.removeKeyEvents();
  },

  /*
   * semantic utility function
   */

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

  clearFeedback: function() {
    clearTimeout(this.fbTimeout);
  },

  clearToSlow: function() {
    clearTimeout(this.check);
  },

  changeStimColor: function(color) {
    $('.feedback').css('color', color);
  },

  changeStim: function(file) {
    $('.page').html(file);
  }

});

module.exports = Flanker;
