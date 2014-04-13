var $  = require('jquery');
var _  = require('underscore');
var ExperimentTemplate = require('./template');


function Flanker(config, callback) {

  this.ISI          = config.ISI || 500;
  this.timeout      = config.timeout || 1500;
  this.pauseTime    = config.pauseTime || 200;
  this.feedbackTime = config.feedbackTime || 1000;

  this.stimuli       = config.stimuli;
  this.fixCross      = config.fixCross;
  this.participant   = config.participant;
  this.negFeedback   = config.negFeedback || 'X';
  this.posFeedback   = config.posFeedback || 'O';
  this.blockFeedback = config.blockFeedback || 'Hurry up!';

  this.curStim      = undefined;
  this.keys         = _.keys(this.stimuli);
  this.values       = _.values(this.stimuli);
  this.responseKeys = config.responseKeys || { 's': 83, 'h': 72 };


  this.startExperiment = function() {
    this.extend('startExperiment', this);
    this.showfixCross();
  },


  this.startTrial = function() {
    this.extend('startTrial', this);
    this.checkToSlow();
    var stim = this.prepareStim();

    stim === 'block' ? this.endBlock() :
                       this.changeStim(stim);
  };


  this.prepareStim = function() {
    if (_.isEmpty(this.values)) {
      this.finish();
    }
    if (!_.isArray(this.order)) {
      _.shuffle(this.values);
    }
    this.curStim = this.keys.shift() % 2 === 0 ? 's' : 'h';
    return this.values.shift();
  };


  this.showfixCross = function() {
    clearTimeout(this.fbTimeout);
    this.changeStim(this.fixCross);
    this.delay(this.startTrial, this.ISI);
  };


  this.drawFeedback = function(type) {
    var pos      = (type === 'positive');
    var color    = pos ? 'green' : 'red';
    var feedback = pos ? this.posFeedback : this.negFeedback;

    this.changeStim(feedback);
    this.changeStimColor(color);
    this.fbTimeout = this.delay(this.pause, this.feedbackTime);
  };


  this.checkAnswer = function(answer) {
    var correct = (answer === this.curStim);
    this.set('correct', correct);

    clearTimeout(this.tooSlowTimeout);
    this.removeKeyEvents();

    correct ? this.drawFeedback('positive') :
              this.drawFeedback('negative');
  };


  this.hasTimedOut = function() {
    clearTimeout(this.tooSlowTimeout);
    this.removeKeyEvents();
    this.endRecording(null);
    this.drawFeedback('negative');
  };


  this.endBlock = function() {
    clearTimeout(this.tooSlowTimeout);
    this.removeKeyEvents();

    var fb  = this.computeFeedback();
    var obj = { meanRT: fb.meanRT, errorCount: fb.errorCount };

    this.changeStim(_.template(this.blockFeedback, obj));
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
    clearTimeout(this.fbTimeout);
    clearTimeout(this.pauseTimeout);
    clearTimeout(this.tooSlowTimeout);
    callback();
  };


  this.checkToSlow = function() {
    this.tooSlowTimeout = this.delay(this.hasTimedOut, this.timeout);
  };


  this.pause = function() {
    this.changeStim('');
    this.pauseTimeout = this.delay(this.showfixCross, this.pauseTime);
  },


  this.changeStimColor = function(color) {
    $('.feedback').css('color', color);
  };


  this.changeStim = function(file) {
    $('.page').html(file);
  };

}

Flanker.prototype = ExperimentTemplate.prototype;
module.exports = Flanker;
