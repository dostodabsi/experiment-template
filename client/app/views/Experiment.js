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
      onehand: ['hammer.png', 'teapot.png', 'spoon.png', 'jesus.png',
                'knife.png', 'fork.png', 'shoe.png', 'ketchup.png'],
      twohand: ['congress.png', 'heartbleed.png', 'rake.png', 'car.png',
                'carussell.png', 'einstein.png', 'laptop.png', 'linux.png'],

      congrH   : _.template(flanker, { flanker: 'HHHHHHH' }),
      congrS   : _.template(flanker, { flanker: 'SSSSSSS' }),
      incongrH : _.template(flanker, { flanker: 'SSSHSSS' }),
      incongrS : _.template(flanker, { flanker: 'HHHSHHH' }),

      trials: [
          ['onehand', 'congrH', 'no_gap'],
          ['onehand', 'congrS', 'no_gap'],
          ['twohand', 'congrH', 'gap'],
          ['twohand', 'congrS', 'gap'],
          ['onehand', 'congrH', 'gap'],
          ['onehand', 'congrS', 'gap'],
          ['twohand', 'congrH', 'no_gap'],
          ['twohand', 'congrS', 'no_gap'],
          ['onehand', 'incongrH', 'no_gap'],
          ['onehand', 'incongrS', 'no_gap'],
          ['twohand', 'incongrH', 'gap'],
          ['twohand', 'incongrS', 'gap'],
          ['onehand', 'incongrH', 'gap'],
          ['onehand', 'incongrS', 'gap'],
          ['twohand', 'incongrH', 'no_gap'],
          ['twohand', 'incongrS', 'no_gap'],
        ]
      };

    this.config = {
      participant   : Participant,
      stimuli       : this.stimuli,
      prime         : _.partial(_.template(feedback)),
      blockFeedback : _.partial(_.template(blockFeedback)),
      fixCross      : _.template(feedback, { feedback : '+', color: 'white' }),
      posFeedback   : _.template(feedback, { feedback : 'O', color: 'green' }),
      negFeedback   : _.template(feedback, { feedback : 'X', color: 'red' }),
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
