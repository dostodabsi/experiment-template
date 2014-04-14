var fs           = require('fs');
var _            = require('underscore');
var $            = require('jquery');
var Backbone     = require('backbone');
Backbone.$ = $;

var debriefing = fs.readFileSync(
    __dirname + '/../templates/debriefing.html', 'utf-8');

var Debriefing = Backbone.View.extend({

  el: '.page',
  template: _.template(debriefing, { number: Math.random() * 100 }),

  render: function() {
    this.$el.html(this.template);
    return this;
  }

});

module.exports = Debriefing;
