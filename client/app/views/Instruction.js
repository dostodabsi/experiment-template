var fs           = require('fs');
var _            = require('underscore');
var $            = require('jquery');
var Backbone     = require('backbone');
Backbone.$ = $;

var instruction = fs.readFileSync(__dirname + '/../templates/instruction.html', 'utf8');

var Instruction = Backbone.View.extend({
  el: '.page',
  template: _.template(instruction),

  render: function() {
    this.$el.html(this.template);
  }
});

module.exports = new Instruction();
