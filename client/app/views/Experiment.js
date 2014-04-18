var fs          = require('fs');
var $           = require('jquery');
var _           = require('underscore');
var Backbone    = require('backbone');
var Flanker     = require('../experiment/flanker');
var Participant = require('../models/Participant');

var flanker  = fs.readFileSync(
    __dirname + '/../experiment/stimuli/flanker.html', 'utf-8');

var blockFeedback = fs.readFileSync(
    __dirname + '/../experiment/stimuli/blockFeedback.html', 'utf-8');


var ExperimentView = Backbone.View.extend({

  initialize: function() {
    this.stimuli = {
      onehand: ['hammer'],/* 'teapot', 'spoon', 'knife',*/
                //'scissors', 'screwdriver', 'tweezer', 'fork'],

      twohand: ['rake'],/*, 'axe', 'shovel', 'reaping hook']*/
                //'paddle', 'staple gun', 'ladder', 'hand scraper'],

      congrH   : _.template(flanker, { stim: 'HHHHHHH', color: 'white' }),
      congrS   : _.template(flanker, { stim: 'SSSSSSS', color: 'white' }),
      incongrH : _.template(flanker, { stim: 'SSSHSSS', color: 'white'  }),
      incongrS : _.template(flanker, { stim: 'HHHSHHH', color: 'white'  }),

      trials: [
        //['onehand' , 'congrH'   , 'no_gap' , 'congruent compatible'],
        //['onehand' , 'congrS'   , 'no_gap' , 'congruent compatible'],
        ['twohand' , 'congrH'   , 'gap'    , 'congruent compatible'],
        //['twohand' , 'congrS'   , 'gap'    , 'congruent compatible'],

        ['onehand' , 'congrH'   , 'gap'    , 'congruent incompatible'],
        //['onehand' , 'congrS'   , 'gap'    , 'congruent incompatible'],
        //['twohand' , 'congrH'   , 'no_gap' , 'congruent incompatible'],
        //['twohand' , 'congrS'   , 'no_gap' , 'congruent incompatible'],

        //['onehand' , 'incongrH' , 'no_gap' , 'incongruent compatible'],
        //['onehand' , 'incongrS' , 'no_gap' , 'incongruent compatible'],
        //['twohand' , 'incongrH' , 'gap'    , 'incongruent compatible'],
        ['twohand' , 'incongrS' , 'gap'    , 'incongruent compatible'],

        //['onehand' , 'incongrH' , 'gap'    , 'incongruent incompatible'],
        ['onehand' , 'incongrS' , 'gap'    , 'incongruent incompatible'],
        //['twohand' , 'incongrH' , 'no_gap' , 'incongruent incompatible'],
        //['twohand' , 'incongrS' , 'no_gap' , 'incongruent incompatible'],
      ]
    };

    this.config = {
      participant   : Participant,
      stimuli       : this.stimuli,
      prime         : _.partial(_.template(flanker)),
      blockFeedback : _.partial(_.template(blockFeedback)),
      fixCross      : _.template(flanker, { stim : '+', color: 'white' }),
      posFeedback   : _.template(flanker, { stim : 'o', color: 'green' }),
      negFeedback   : _.template(flanker, { stim : 'x', color: 'red' }),
    };
  },

  render: function() {
    this.hideCursor();
    this.startPractice();
  },

  startPractice: function() {
    var config  = _.clone(this.config);
    var stimuli = _.clone(this.stimuli);

    stimuli.trials  = _.shuffle(this.stimuli.trials).splice(0, 4);
    stimuli.onehand = [_.first(_.shuffle(this.stimuli.onehand))];
    stimuli.twohand = [_.first(_.shuffle(this.stimuli.twohand))];

    config.practice    = true;
    config.timeout     = 99999;
    config.stimuli     = stimuli;
    config.participant = undefined;

    var practice = new Flanker(config, _.bind(this.onPracticeEnd, this));
    practice.startExperiment();
  },

  onPracticeEnd: function() {
    this.startExperiment();
  },

  startExperiment: function() {
    var experiment = new Flanker(this.config, _.bind(this.whenFinished, this));
    experiment.startExperiment();
  },

  whenFinished: function() {
    this.showCursor();
    Backbone.history.navigate('debriefing', { trigger: true });
  },

  showCursor: function() {
    $('.container').css('width', $(window).width() * 0.6)
                   .removeClass('hideCursor');
  },

  hideCursor: function() {
    $('.container').css('width', $(window).width())
                   .css('height', $(window).height() - 1)
                   .addClass('hideCursor');
  },

});

module.exports = ExperimentView;
