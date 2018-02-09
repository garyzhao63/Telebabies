
/**
 * Module dependencies.
 */

var express = require('express');
var http = require('http');
var path = require('path');
var handlebars = require('express3-handlebars')

var index = require('./routes/index');
var settings = require('./routes/settings');
var settingsroutine = require('./routes/settings-routine');
var profile = require('./routes/profile');
var record = require('./routes/record'); 
var result = require('./routes/result'); 
var result2 = require('./routes/result2'); 
var resulthistory = require('./routes/result-history'); 
// Example route
// var user = require('./routes/user');

var app = express();

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.engine('handlebars', handlebars());
app.set('view engine', 'handlebars');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride());
app.use(express.cookieParser('IxD secret key'));
app.use(express.session());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

app.get('/', index.view);
app.get('/settings', settings.view); 
app.get('/settings-routine', settingsroutine.view); 
app.get('/profile', profile.view); 
app.get('/record', record.view); 
app.get('/result', result.view); 
app.get('/result2', result2.view); 
app.get('/result-history', resulthistory.view); 
// Example route
// app.get('/users', user.list);

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
