var fs           = require('fs');
var _            = require('underscore');
var $            = require('jquery');
var Backbone     = require('backbone');
Backbone.$ = $;

var instruction = fs.readFileSync(
    __dirname + '/../templates/instruction.html', 'utf8');

var Instruction = Backbone.View.extend({
  el: '.page',
  template: _.template(instruction),

  initialize: function() {
    var self = this;
    var width = window.innerWidth;
    var height = window.innerHeight;
    $(window).on('resize', function() {
      var fullscreen = (window.innerWidth > width &&
                       window.innerHeight > height);
      if (fullscreen) { self.showButton(); }
    });
  },

  events: {
    'click .agree': 'participate'
  },

  render: function() {
    this.$el.html(this.template);
    this.$el.find('.listened').hide();
    return this;
  },

  showButton: function() {
    this.$el.find('.listened').fadeIn(2400);
  },

  participate: function(ev) {
    ev.preventDefault();
    Backbone.history.navigate('questions', { trigger: true });
  }

});

module.exports = Instruction;
