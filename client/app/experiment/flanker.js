var $  = require('jquery');
var _  = require('underscore');
var ExperimentTemplate = require('./template');


function Flanker(config, callback) {

  this.stop         = config.stop || 3;
  this.ISI          = config.ISI || 500;
  this.timeout      = config.timeout || 1500;
  this.pauseTime    = config.pauseTime || 500;
  this.primeTime    = config.primeTime || 500;
  this.practice     = config.practice || false;
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
  this.blockStart   = undefined;
  this.responseKeys = config.responseKeys || { 's': 83, 'h': 72 };

  /**************************************************************
   * Preparation of the Stimuli such that each type of trial, e.g.
   * ['onehand', 'congrH', 'no_gap'], results in 8 specific trials.
   * In this example, 'onehand' gets substituted by a onehand
   * picture (which there are 8 of).
   **************************************************************/

  this.prepareStimuli = function(stimuli) {
    return _.reduce(stimuli.trials, function(block, trial) {

      _.each(stimuli.onehand, function(el, i) {
        var cur    = _.clone(trial);
        var change = _.contains(cur, 'onehand') ? stimuli.onehand[i] :
                                                  stimuli.twohand[i];
        cur.splice(0, 1, change);
        block.push(cur);
      });

      return block;
    }, []);
  };


  this.prepareBlock = function() {
    var trials  = this.prepareStimuli(this.stimuli);
    this.block  = _.shuffle(trials);
  };


  this.prepareTrial = function() {
    var stim     = this.block.shift();
    this.corrAns = _.contains(stim[1], 'H') ? 'h' : 's';

    this.trial = {
      list: stim,
      type: stim[3],
      prime: stim[0],
      flanker: this.stimuli[stim[1]]
    };
  };

  /**********************
   * End of Preperation
   *********************/

  /****************************************************************
   * The Experiment starts when the Block has been prepared.
   *
   * A Trial begins with a pause, followed by a fixation cross, followed by
   * a picture prime and the flanker stimulus itself.
   *
   * this.startExperiment:
   * extends the startExperiment function of the Experiment Template.
   * Prepares the block and starts the Experiment with the function call
   * this.pause()
   * 
   * this.pause:
   * is sort of a timeout function, which is used to slow down the experiment.
   * It schedules this.showFixCross to be called after the pauseTime.
   *
   * this.showFixCross:
   * checks if the Experiment / Block has ended. If not, prepares the trial,
   * shows the fixation cross and schedules the prime with this.delay() - which
   * is a wrapper around setTimeout - to be shown after the ISI has passed.
   *
   * this.showPrime:
   * shows the picture for the duration of the variable this.primeTime,
   * schedules the this.startFlanker function to be called after 
   * this.primeTime has passed.
   *
   * this.startFlanker:
   * extends the startTrial function from the Experiment Template. Starts the
   * checkTooSlow timer, which - when the duration of the trial is over - 
   * shows negative Feedback. The participant was too slow to react.
   * this.startFlanker changes the stimulus to the flanker stimulus,
   * which is either congruent, incongruent and gapped, not gapped. 
   * this.changeStim adjusts the css letter-spacing and margin-left properties
   * of the flanker stimulus to account for the gap.
   *
   * summing up, the experiment consists of a loop of function calls,
   * which are scheduled differently:
   *
   * this.pause() => this.showFixCross() => 
   * this.showPrime() => this.startFlanker()
   *****************************************************************/

  this.startExperiment = function() {
    this.extend('startExperiment', this);
    this.prepareBlock();
    this.pause();
  },


  this.pause = function() {
    this.changeStim('');
    this.pauseTimeout = this.delay(this.showFixCross, this.pauseTime);
  },


  this.showFixCross = function() {
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
    var stim = { stim: this.trial.prime, color: 'white' };
    this.changeStim(this.prime(stim));
    this.delay(this.startFlanker, this.primeTime);
  };


  this.startFlanker = function() {
    this.extend('startTrial', this);
    this.checkTooSlow();
    this.changeStim(this.trial.flanker, this.trial.list);
  };

  /********************
   * End of Trial
   ********************/

  /*************************************************************
   * After the participant has given her response,
   * we need to give him positive or negative feedback
   * and save data about the trial, i.e. reaction time,
   * response, if it was correct etc.
   *
   * this.checkAnswer:
   * is called by the Experiment Template when the participant has given
   * an answer (pressed a key). Removes the keyEvents to avoid
   * multiple answers and clears the tooSlowTimeout, because an
   * answer was given.
   * Checks if the answer was correct, draws feedback accordingly and
   * saves the recorded data.
   *
   * this.drawFeedback:
   * if given 'positive' as argument, draws positive feedback, else draws
   * negative feedback. Schedules the call of this.pause() after a
   * specified feedbackTime.
   **************************************************************/

  this.checkAnswer = function(answer) {
    var correct = (answer === this.corrAns);
    this.set('correct', correct);

    this.endRecording(answer, this.get('start'), { type: this.trial.type });
    clearTimeout(this.tooSlowTimeout);
    this.removeKeyEvents();

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

  /********************************
   * End of Recording and Feedback
   ********************************/

  /*********************************************
   * When the block has ended, we want to give the
   * participant feedback about how s/he has mastered
   * the block.
   *
   * this.endBlock:
   * gets called by this.showFixCross() if the block array
   * is empty. Removes the keyEvents, computes the feedback with
   * this.computeFeedback() of the Experiment Template, shows the
   * feedback and adds the onBlockEnd event handler for further
   * keypresses. Additionally, starts a timer that times the duration
   * of how long the block feedback is shown.
   *
   * this.onBlockEnd:
   * checks if the participant has pressed 'space'. if so, clear
   * all keyEvents (which now only is 'space'), save the block data,
   * prepare the next block, and start the first trial with a call
   * to this.pause()
   *
   * this.saveBlockData:
   * moves the data that is saved in this.data.block to this.data.trials,
   * adding the number of the block
   *
   *********************************************/

  this.endBlock = function() {
    clearTimeout(this.tooSlowTimeout);
    this.removeKeyEvents();

    var fb       = this.computeFeedback();
    var feedback = { meanRT     : fb.meanRT,
                     errorCount : fb.errorCount,
                     practice   : this.practice };

    this.blockStart = +new Date();
    this.changeStim(this.blockFeedback(feedback));
    $(window).on('keyup', _.bind(this.onBlockEnd, this));
  };


  this.onBlockEnd = function(ev) {
    var code = ev.keyCode || ev.which;
    if (code === 32) {
      this.removeKeyEvents();
      if (!this.practice) {
        this.saveBlockData();
        this.prepareBlock();
        this.pause();
      }
      else { this.finish(); }
    }
  };


  this.saveBlockData = function() {
    var block    = {};
    var count    = this.blockCount++;
    block[count] = this.get('block');
    block.time   = +new Date() - this.blockStart;
    var save     = this.get('trials').concat(block);

    this.set('trials', save);
    this.set('block', []);
  };

  /*************************
   * End of Block Stuff
   *************************/

  /******************************************************************
   * this.hasTimedOut:
   *
   * checks if the participant was to slow with her response
   * or did not response at all. calls this.endRecording with null,
   * indicating that the participant was too slow. draws negative feedback
   ******************************************************************/

  this.hasTimedOut = function() {
    clearTimeout(this.tooSlowTimeout);
    this.removeKeyEvents();
    this.endRecording(null, null, { type: this.trial.type });
    this.drawFeedback('negative');
  };

  /*******************************************************************
   * this.finish:
   *
   * extends the finish function of the Experiment Template;
   * if the participant has endured the whole experiment, i.e.
   * did not quit, clears all the timeouts and calls a callback function
   ********************************************************************/

  this.finish = function(interrupt) {
    this.extend('finish', this);
    if (!interrupt) {
      clearTimeout(this.fbTimeout);
      clearTimeout(this.pauseTimeout);
      clearTimeout(this.tooSlowTimeout);
      callback();
    }
  };

  /*************************************
   * Some helper functions and functions
   * written for clarity.
   ************************************/

  this.changeStim = function(file, list) {
    $('.page').html(file);

    if (list && _.contains(list, 'gap')) {
      $('.flanker').css('margin-left', '50px');
      $('.flanker').css('letter-spacing', '50px');
    }

    if (list && this.practice) {
      var fb = $('<p id="practice-press">Press {key}</p>'
                .replace('{key}', this.corrAns.toUpperCase()));
      $('.page').append(fb);
    }
  };


  this.checkTooSlow = function() {
    this.tooSlowTimeout = this.delay(this.hasTimedOut, this.timeout);
  };


  this.changeStimColor = function(color) {
    $('.feedback').css('color', color);
  };


  this.changeImage = function(img) {
    this.changeStim();
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
