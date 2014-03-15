var _        = require('underscore');
var Backbone = require('backbone');

var Router = Backbone.Router.extend({
  routes: {
    '': 'home'
  },
});

module.exports = new Router();


