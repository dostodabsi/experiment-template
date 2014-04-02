var _        = require('underscore');
var Backbone = require('backbone');

var Router = Backbone.Router.extend({

  routes: {
    ''          : 'instruction',
    'questions' : 'questions',
    'exp'       : 'exp'
  },

});

module.exports = new Router();


