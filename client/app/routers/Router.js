var _        = require('underscore');
var Backbone = require('backbone');

var Router = Backbone.Router.extend({

  routes: {
    ''          : 'instruction',
    'questions' : 'questions',
    'exp'       : 'exp',
    'debriefing': 'debriefing'
  },

});

module.exports = new Router();
