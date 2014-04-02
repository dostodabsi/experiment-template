var $        = require('jquery');
var _        = require('underscore');
var utils    = require('../utils');
var Backbone = require('backbone');
var Flanker  = require('./flanker');
var Participant = require('../models/Participant');
Backbone.$ = $;


var Experiment = Backbone.Model.extend({

  defaults: {
    quitter: false,
    changedTab: false,
    changedSize: false
  },

  participant: Participant,
  experiment: new Flanker(),

  initialize: function() {
    this.userKeyPress = _.partial(this.experiment.onKeyPress,
                                  this.experiment.binaryMap);
    this.listenTo(this.experiment, 'startExperiment', this.addTabCheck);
    this.listenTo(this.experiment, 'startExperiment', this.addWindowCheck);
    this.listenTo(this.experiment, 'startExperiment', this.leftExperiment);

    this.listenTo(this.experiment, 'startTrial', this.addKeyEvents);
    this.listenTo(this.experiment, 'startTrial', this.startRecording);

    this.listenTo(this.experiment, 'endTrial', this.removeKeyEvents);
    this.listenTo(this.experiment, 'endTrial', this.endRecording);
  },

  start: function() {
    this.experiment.trigger('startExperiment');
  },

  addTabCheck: function() {
    var self = this;
    var vendor = utils.hidden();
    var changeVis = (vendor == 'hidden' ? '' : vendor) + 'visibilitychange';
    $(document).on(changeVis, function(ev) {
      if (!self.get('changedTab')) {
        self.set('changedTab', true);
      }
    });
  },

  addWindowCheck: function() {
    var self = this;
    $(window).on('resize', function() {
      if (!self.get('changedSize')) {
        self.set('changedSize', true);
      }
    });
  },

  leftExperiment: function() {
    var self = this;
    var msg = 'By leaving, you opt out of the Experiment, are you sure?';
    $(window).on('beforeunload', function() {
      self.set('quitter', true);
      self.finish();
      return msg;
    });
  },

  addKeyEvents: function() {
    $(window).on('keyup', $.proxy(this.userKeyPress, this.experiment));
  },

  startRecording: function() {
    this.experiment.set('RT', +new Date());
  },

  removeKeyEvents: function() {
    $(window).unbind('keyup', this.userKeyPress);
  },

  endRecording: function() {
    var resp = [this.experiment.get('resp')];
    var time = [+ new Date() - this.experiment.get('RT')];
    this.experiment.get('trials').push(_.object(resp, time));
  },

  finish: function() {
    var exp = _.omit(this.experiment.attributes, ['RT', 'resp']);
    _.extend(exp, this.attributes);
    this.participant.save({ exp: exp });
  }
});

module.exports = Experiment;
