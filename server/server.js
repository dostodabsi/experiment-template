var db      = require('./db');
var express = require('express');

var app = express();
var files = '../client/static';

app.use(express.static(files));
app.use(express.urlencoded());
app.use(express.json());
app.use(express.methodOverride());
app.use(express.cookieParser());
app.use(express.session({ secret: 'change-to-secret-string' }));
app.use(app.router);

var port = process.env.PORT || 4000;
app.listen(port, function() {
  console.log('Listening on port ' + port);
});
