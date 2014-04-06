var $  = require('jquery');
var _  = require('underscore');
var ExperimentTemplate = require('./template');


function Flanker(config, callback) {

  this.ISI          = config.ISI || 500;
  this.timeout      = config.timeout || 1500;
  this.feedbackTime = config.feedbackTime || 1000;

  this.stimuli       = config.stimuli;
  this.fixCross      = config.fixCross;
  this.participant   = config.participant;
  this.negFeedback   = config.negFeedback || 'X';
  this.posFeedback   = config.posFeedback || 'O';
  this.blockFeedback = config.blockFeedback || 'Hurry up!';

  this.curStim  = undefined;
  this.keys     = _.keys(this.stimuli);
  this.values   = _.values(this.stimuli);
  this.mainKeys = config.mainKeys || { 'f': 70, 'h': 72 };

  /**************************************************************************
   * Trial specific methods:
   *
   * - starTrial just starts the trial or starts a Feedback Block
   * - prepareStim operates on the stimuli as a function of the
   *   conditions and the specific order they should be presented in;
   *   ends the Experiment if no stimuli are left
   * - showFixCross shows the fixation Cross for the time of the ISI
   *
   * - giveFeedback checks if the User has given the right answer (as
   *   indicated by the isRight property, which is set by the checkAnswer
   *   method, and either draws positive (green O) or negative (red X) Feedback
   **************************************************************************/

  this.startTrial = function() {
    //this.checkToSlow
    this.extend('startTrial', this);
    var stim = this.prepareStim();

    if (stim == 'block') {
      this.endBlock();
    }
    else {
      this.changeStim(stim);
    }
  };

  this.prepareStim = function() {
    if (_.isEmpty(this.values)) {
      this.finish();
    }
    if (!_.isArray(this.order)) {
      _.shuffle(this.values);
    }
    this.curStim = this.keys.shift() % 2 === 0 ? 'f' : 'h';
    return this.values.shift();
  };

  this.showfixCross = function() {
    var self = this;
    this.clearFeedback();
    this.changeStim(this.fixCross);
    setTimeout(function() {
      self.startTrial();
    }, this.ISI);
  };

  this.hasTimedOut = function() {
    this.negativeFeedback();
    this.endRecording(null);
  };

  this.drawFeedback = function(type) {
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
  };

  this.checkAnswer = function(answer) {
    var isRight = (answer == this.curStim);
    this.set('isRight', isRight);

    this.removeKeyEvents();
    //this.clearToSlow();
    this.giveFeedback();
  };

  this.checkToSlow = function() {
    var self = this;
    this.check = setTimeout(function() {
      self.hasTimedOut();
    }, this.timeout);
  };

  this.endBlock = function() {
    var self = this;
    //this.clearToSlow();
    this.removeKeyEvents();

    var mean = this.computeFeedback().toFixed(2);
    this.changeStim(_.template(this.blockFeedback, { mean: mean }));

    $(window).on('keyup', $.proxy(this.onBlockEnd, this));
  };

  this.onBlockEnd = function(ev) {
    var code = ev.keyCode || ev.which;
    if (code === 32) {
      $(window).unbind('keyup');
      this.showfixCross();
    }
  };

  this.finish = function() {
    this.extend('finish', this);
    this.clearFeedback();
    this.clearToSlow();
    this.removeKeyEvents();
    callback();
  };

  /*
   * semantic utility functions
   */

  this.giveFeedback = function() {
    this.get('isRight') ? this.positiveFeedback() :
                          this.negativeFeedback();
  };

  this.negativeFeedback = function() {
    this.drawFeedback('negFeedback');
  };

  this.positiveFeedback = function() {
    this.drawFeedback('posFeedback');
  };

  this.clearFeedback = function() {
    clearTimeout(this.fbTimeout);
  };

  this.clearToSlow = function() {
    clearTimeout(this.check);
  };

  this.changeStimColor = function(color) {
    $('.feedback').css('color', color);
  };

  this.changeStim = function(file) {
    $('.page').html(file);
  };

}

Flanker.prototype = ExperimentTemplate.prototype;
module.exports = Flanker;
