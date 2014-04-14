var $  = require('jquery');
var _  = require('underscore');
var ExperimentTemplate = require('./template');


function Flanker(config, callback) {

  this.stop         = config.stop || 2;
  this.ISI          = config.ISI || 500;
  this.timeout      = config.timeout || 1500;
  this.pauseTime    = config.pauseTime || 200;
  this.primeTime    = config.primeTime || 500;
  this.feedbackTime = config.feedbackTime || 1000;

  this.prime         = config.prime;
  this.stimuli       = config.stimuli;
  this.fixCross      = config.fixCross;
  this.participant   = config.participant;
  this.negFeedback   = config.negFeedback || 'X';
  this.posFeedback   = config.posFeedback || 'O';
  this.blockFeedback = config.blockFeedback || 'Hurry up!';

  this.blockCount   = 0;
  this.corrAns      = undefined;
  this.responseKeys = config.responseKeys || { 's': 83, 'h': 72 };


  this.prepareBlock = function() {
    var onehand = _.shuffle(this.stimuli.onehand);
    var twohand = _.shuffle(this.stimuli.twohand);
    var trials  = _.map(this.stimuli.trials, function(trial, index) {
      var i = index % onehand.length;
      trial[0] = _.contains(trial, 'onehand') ? onehand[i] : twohand[i];
      return trial;
    });

    this.block = _.shuffle(trials);
  };


  this.prepareTrial = function() {
    var stim     = this.block.shift();
    this.corrAns = _.contains(stim[1], 'H') ? 'h' : 's';

    this.trial = {
      list: stim,
      prime: stim[0],
      flanker: this.stimuli[stim[1]]
    };
  };


  this.startExperiment = function() {
    this.extend('startExperiment', this);
    this.prepareBlock();
    this.showfixCross();
  },


  this.showfixCross = function() {
    clearTimeout(this.fbTimeout);
    if (this.experimentHasEnded()) {
      this.finish();
    }
    else if (this.blockHasEnded()) {
      this.endBlock();
    }
    else {
      this.prepareTrial();
      this.changeStim(this.fixCross);
      this.delay(this.showPrime, this.ISI);
    }
  };


  this.showPrime = function() {
    var temp = { feedback: this.trial.prime, color: 'none' };
    this.changeStim(this.prime(temp));
    this.delay(this.startFlanker, this.primeTime);
  };


  this.startFlanker = function() {
    this.extend('startTrial', this);
    this.checkTooSlow();
    this.changeStim(this.trial.flanker, this.trial.list);
  };


  this.checkAnswer = function(answer) {
    clearTimeout(this.tooSlowTimeout);
    this.removeKeyEvents();

    var correct = (answer === this.corrAns);
    this.set('correct', correct);

    correct ? this.drawFeedback('positive') :
              this.drawFeedback('negative');
  };


  this.drawFeedback = function(type) {
    var pos      = (type === 'positive');
    var color    = pos ? 'green' : 'red';
    var feedback = pos ? this.posFeedback : this.negFeedback;

    this.changeStim(feedback);
    this.changeStimColor(color);
    this.fbTimeout = this.delay(this.pause, this.feedbackTime);
  };


  this.endBlock = function() {
    clearTimeout(this.tooSlowTimeout);
    this.removeKeyEvents();

    var fb       = this.computeFeedback();
    var feedback = { meanRT: fb.meanRT, errorCount: fb.errorCount };

    this.changeStim(this.blockFeedback(feedback));
    $(window).on('keyup', _.bind(this.onBlockEnd, this));
  };


  this.onBlockEnd = function(ev) {
    var code = ev.keyCode || ev.which;
    if (code === 32) {
      this.removeKeyEvents();
      this.saveBlockData();
      this.prepareBlock();
      this.showfixCross();
    }
  };


  this.saveBlockData = function() {
    var block    = {};
    var count    = this.blockCount++;
    block[count] = this.get('block');
    var save     = this.get('trials').concat(block);

    this.set('trials', save);
    this.set('block', []);
  };


  this.hasTimedOut = function() {
    clearTimeout(this.tooSlowTimeout);
    this.removeKeyEvents();
    this.endRecording(null);
    this.drawFeedback('negative');
  };


  this.finish = function() {
    this.extend('finish', this);
    clearTimeout(this.fbTimeout);
    clearTimeout(this.pauseTimeout);
    clearTimeout(this.tooSlowTimeout);
    callback();
  };


  this.checkTooSlow = function() {
    this.tooSlowTimeout = this.delay(this.hasTimedOut, this.timeout);
  };


  this.pause = function() {
    this.changeStim('');
    this.pauseTimeout = this.delay(this.showfixCross, this.pauseTime);
  },


  this.changeStimColor = function(color) {
    $('.feedback').css('color', color);
  };


  this.changeStim = function(file, list) {
    $('.page').html(file);
    if (list && _.contains(list, 'gap')) {
      $('.flanker-stim').css('margin-left', '50px');
      $('.flanker-stim').css('letter-spacing', '50px');
    }
  };


  this.changeImage = function(img) {
    this.changeStim('');
    $('.prime').attr('src', img);
  };


  this.experimentHasEnded = function() {
    return this.blockCount === this.stop;
  };


  this.blockHasEnded = function() {
    return (_.isEmpty(this.block));
  };

}

Flanker.prototype = new ExperimentTemplate();
module.exports = Flanker;
