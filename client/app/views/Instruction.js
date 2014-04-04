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
    this.width  = window.innerWidth;
    this.height = window.innerHeight;
    $(window).on('resize', $.proxy(this.checkResize, this));
  },

  events: {
    'click .agree': 'participate'
  },

  checkResize: function(ev) {
    var fullscreen = (window.innerWidth > this.width &&
                      window.innerHeight > this.height);
    if (fullscreen) { this.showButton(); }
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
