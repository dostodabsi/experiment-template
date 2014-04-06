var fs          = require('fs');
var $           = require('jquery');
var _           = require('underscore');
var Backbone    = require('backbone');
var Flanker     = require('../experiment/flanker');
var Participant = require('../models/Participant');
Backbone.$ = $;

var flanker = fs.readFileSync(
    __dirname + '/../experiment/stimuli/flanker.html', 'utf-8');
var fixCross = fs.readFileSync(
    __dirname + '/../experiment/stimuli/fixCross.html', 'utf-8');
var feedback = fs.readFileSync(
    __dirname + '/../experiment/stimuli/feedback.html', 'utf-8');

var ExperimentView = Backbone.View.extend({

  comp       : _.template(flanker, { outer: 'h', inner: 'h' }),
  incomp     : _.template(flanker, { outer: 'h', inner: 'f' }),

  initialize: function() {

    this.stimuli = {
      1: this.comp,
      2: this.incomp,
      3: this.comp,
      4: this.incomp,
      5: 'block',
      7: this.comp,
      8: this.incomp,
      9: this.comp,
      10: this.incomp
    };

    this.config = {
      blockFeedback : feedback,
      participant   : Participant,
      stimuli       : this.stimuli,
      fixCross      : _.template(fixCross, { feedback : '+' }),
      posFeedback   : _.template(fixCross, { feedback : 'O' }),
      negFeedback   : _.template(fixCross, { feedback : 'X' }),
    };

    // callback are the new GOTOs ...
    var experiment = new Flanker(this.config, this.whenFinished);
    experiment.startExperiment();
  },

  whenFinished: function() {
    Backbone.history.navigate('debriefing', { trigger: true });
  }

});

module.exports = ExperimentView;
