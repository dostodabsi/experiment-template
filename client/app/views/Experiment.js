var fs          = require('fs');
var $           = require('jquery');
var _           = require('underscore');
var Backbone    = require('backbone');
var Flanker     = require('../experiment/flanker');
var Participant = require('../models/Participant');
Backbone.$ = $;


var flanker  = fs.readFileSync(
    __dirname + '/../experiment/stimuli/flanker.html', 'utf-8');

var feedback = fs.readFileSync(
    __dirname + '/../experiment/stimuli/feedback.html', 'utf-8');

var blockFeedback = fs.readFileSync(
    __dirname + '/../experiment/stimuli/blockFeedback.html', 'utf-8');


var ExperimentView = Backbone.View.extend({

  initialize: function() {
    this.stimuli = {
      onehand: ['hammer', 'teapot', 'spoon', 'knife',
                'scissors', 'screwdriver', 'tweezer', 'fork'],

      twohand: ['axe', 'rake', 'shovel', 'reaping hook',
                'paddle', 'staple gun', 'ladder', 'hand scraper'],

      congrH   : _.template(flanker, { flanker: 'HHHHHHH' }),
      congrS   : _.template(flanker, { flanker: 'SSSSSSS' }),
      incongrH : _.template(flanker, { flanker: 'SSSHSSS' }),
      incongrS : _.template(flanker, { flanker: 'HHHSHHH' }),

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
      participant   : Participant,
      stimuli       : this.stimuli,
      prime         : _.partial(_.template(feedback)),
      blockFeedback : _.partial(_.template(blockFeedback)),
      fixCross      : _.template(feedback, { feedback : '+', color: 'white' }),
      posFeedback   : _.template(feedback, { feedback : 'o', color: 'green' }),
      negFeedback   : _.template(feedback, { feedback : 'x', color: 'red' }),
    };
  },

  render: function() {
    this.startPractice();
  },

  startPractice: function() {
    var config  = _.clone(this.config);
    var stimuli = _.clone(this.stimuli);

    stimuli.onehand = [_.first(_.shuffle(this.stimuli.onehand))];
    stimuli.twohand = [_.first(_.shuffle(this.stimuli.twohand))];
    stimuli.trials  = _.shuffle(this.stimuli.trials).splice(0, 4);

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
    var experiment = new Flanker(this.config, this.whenFinished);
    experiment.startExperiment();
  },

  whenFinished: function() {
    Backbone.history.navigate('debriefing', { trigger: true });
  },

});

module.exports = ExperimentView;
