var fs           = require('fs');
var _            = require('underscore');
var $            = require('jquery');
var Backbone     = require('backbone');
Backbone.$ = $;

var explanation = fs.readFileSync(
     __dirname + '/../templates/explanation.html', 'utf-8');

var Explanation = Backbone.View.extend({

  el: '.page',
  template: _.template(explanation),

  events: {
    'click .proceed': 'check',
    'click .explanation-heading': 'start'
  },

  render: function() {
    this.$el.html(this.template);
    return this;
  },

  check: function(ev) {
    alert('Please read the Explanation carefully, before you proceed!');
  },

  start: function(ev) {
    Backbone.history.navigate('questions', { trigger: true });
  }

});

module.exports = Explanation;
