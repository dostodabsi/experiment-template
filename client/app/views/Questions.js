var fs           = require('fs');
var _            = require('underscore');
var $            = require('jquery');
var Backbone     = require('backbone');
var participant  = require('../models/Participant');
Backbone.$ = $;

var questions = fs.readFileSync(
    __dirname + '/../templates/questions.html', 'utf8');

var Questions = Backbone.View.extend({

  el: '.page',
  template: _.template(questions),

  events: {
    'submit .create-new-participant': 'saveAnswers'
  },

  render: function() {
    this.$el.html(this.template);
    return this;
  },

  checkAnswers: function(ev) {
    ev.preventDefault();
    var data = $(ev.currentTarget).serializeObject();
    if (!(data.sex && data.handedness && data.age)) {
      alert('Upps, you forgot to answer one or more questions!');
      return false;
    }
    return true;
  },

  getInfo: function() {
    var w = window.innerWidth;
    var h = window.innerHeight;
    var windowSize = [w, h].join(', ');
    var userAgent = navigator.userAgent;
    return {
      userAgent: userAgent,
      windowSize: windowSize
    };
  },

  saveAnswers: function(ev) {
    if (this.checkAnswers(ev)) {
      var browserInfo = this.getInfo();

      var details = $(ev.currentTarget).serializeObject();
      _.extend(details, browserInfo);
      participant.save(details, {
        success: function(user) {
          Backbone.history.navigate('exp', { trigger: true });
        }
      });
    }
  }

});

module.exports = Questions;
