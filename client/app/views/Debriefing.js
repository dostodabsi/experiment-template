var fs           = require('fs');
var $            = require('jquery');
var _            = require('underscore');
var Backbone     = require('backbone');

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
