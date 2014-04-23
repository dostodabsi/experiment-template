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
      onehand: ['fork.png', 'screwdriver.png', 'scissors.png', 'hammer.png'],
      twohand: ['shovel.png', 'rollingpin.png', 'snow_shovel.png','broom.png'],

      congrH   : _.template(flanker, { stim: 'HHHHHHH', color: 'white' }),
      congrS   : _.template(flanker, { stim: 'SSSSSSS', color: 'white' }),
      incongrH : _.template(flanker, { stim: 'SSSHSSS', color: 'white'  }),
      incongrS : _.template(flanker, { stim: 'HHHSHHH', color: 'white'  }),

      trials: [
        ['onehand' , 'congrH'   , 'no_gap' , 'congruent compatible'],
        ['onehand' , 'congrS'   , 'no_gap' , 'congruent compatible'],
        ['twohand' , 'congrH'   , 'gap'    , 'congruent compatible'],
        ['twohand' , 'congrS'   , 'gap'    , 'congruent compatible'],

        ['onehand' , 'congrH'   , 'gap'    , 'congruent incompatible'],
        ['onehand' , 'congrS'   , 'gap'    , 'congruent incompatible'],
        ['twohand' , 'congrH'   , 'no_gap' , 'congruent incompatible'],
        ['twohand' , 'congrS'   , 'no_gap' , 'congruent incompatible'],

        ['onehand' , 'incongrH' , 'no_gap' , 'incongruent compatible'],
        ['onehand' , 'incongrS' , 'no_gap' , 'incongruent compatible'],
        ['twohand' , 'incongrH' , 'gap'    , 'incongruent compatible'],
        ['twohand' , 'incongrS' , 'gap'    , 'incongruent compatible'],

        ['onehand' , 'incongrH' , 'gap'    , 'incongruent incompatible'],
        ['onehand' , 'incongrS' , 'gap'    , 'incongruent incompatible'],
        ['twohand' , 'incongrH' , 'no_gap' , 'incongruent incompatible'],
        ['twohand' , 'incongrS' , 'no_gap' , 'incongruent incompatible'],
      ]

    };

    this.config = {
      practice      : false,
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

    stimuli.onehand = [_.first(_.shuffle(this.stimuli.onehand))];
    stimuli.twohand = [_.first(_.shuffle(this.stimuli.twohand))];
    stimuli.trials = [
        ['onehand' , 'congrH'   , 'no_gap' , 'congruent compatible'],
        ['twohand' , 'congrS'   , 'gap'    , 'congruent compatible'],
        ['onehand' , 'congrS'   , 'gap'    , 'congruent incompatible'],
        ['twohand' , 'congrH'   , 'no_gap' , 'congruent incompatible'],
        ['onehand' , 'incongrH' , 'no_gap' , 'incongruent compatible'],
        ['twohand' , 'incongrS' , 'gap'    , 'incongruent compatible'],
        ['onehand' , 'incongrS' , 'gap'    , 'incongruent incompatible'],
        ['twohand' , 'incongrH' , 'no_gap' , 'incongruent incompatible'],
      ];

    config.practice = true;
    config.timeout  = 99999999;
    config.stimuli  = stimuli;

    var practice = new Flanker(config, _.bind(this.startExperiment, this));
    practice.startExperiment();
  },

  startExperiment: function() {
    var experiment = new Flanker(this.config, _.bind(this.onExpEnd, this));
    experiment.startExperiment();
  },

  onExpEnd: function() {
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
