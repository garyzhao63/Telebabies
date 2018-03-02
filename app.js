
/**
 * Module dependencies.
 */

var express = require('express');
var http = require('http');
var path = require('path');
var handlebars = require('express3-handlebars')
var vcapServices = require('vcap_services');

const fs = require('fs'); 

var login = require('./routes/login');
var loginB = require('./routes/loginB');
var index = require('./routes/index');
var indexB = require('./routes/indexB');
var settings = require('./routes/settings');
var settingsroutine = require('./routes/settings-routine');
var settingsroutineB = require('./routes/settings-routineB');
var profile = require('./routes/profile');
var record = require('./routes/record'); 
var result = require('./routes/result'); 
var resulthistory = require('./routes/result-history'); 

var watson = require('watson-developer-cloud');
var ToneAnalyzerV3 = require('watson-developer-cloud/tone-analyzer/v3');


// Example route
// var user = require('./routes/user');

var sttAuthService1 = new watson.AuthorizationV1(
  Object.assign(
    {
		/*
      username: "377a73cd-72b3-4072-a03f-a06fba891995", 
      password: "3YARE0HbQKJV"
			*/
			username: "21cb51ae-b6f5-4543-964b-bae05dd78b2b",
  		password: "h0rYIhMr5EsA"
    },
    vcapServices.getCredentials('speech_to_text') // pulls credentials from environment in bluemix, otherwise returns {}
  )
);

var toneAnalyzer = new ToneAnalyzerV3({
 	username: "75f2d442-c777-45db-be7d-28fe9c4325a7",
  password: "aVCmfZ4GL77M", 
	/*
  username: "94ebc458-8622-4774-bea4-ebd897e43eb0", 
  password: "cyt76COBKvEo", 
	*/
  version_date: '2017-09-21'
});

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

app.use('/api/speech-to-text/token', function(req, res) {
  sttAuthService1.getToken(
    {
      url: watson.SpeechToTextV1.URL
    },
    function(err, token) {
      if (err) {
        console.log('Error retrieving token: ', err);
        res.status(500).send('Error retrieving token');
        return;
      }
      res.send(token);
    }
  );
});

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

app.get('/', login.view);
app.get('/loginB', loginB.view);
app.get('/index', index.view);
app.get('/indexB', indexB.view);
app.get('/settings', settings.view); 
app.get('/settings-routine', settingsroutine.view); 
app.get('/settings-routineB', settingsroutineB.view); 
app.get('/profile', profile.view); 
app.get('/record', record.view); 
app.get('/result', result.view); 
app.get('/result2', result.view2); 
app.get('/result-history', resulthistory.view); 
// Example route
// app.get('/users', user.list);

app.post('/api/tone', function(req, res, next) {
  toneAnalyzer.tone(req.body, function(err, data) {
    if (err) {
      return next(err);
    }
    return res.json(
		Object.assign({
			'data': data, 
			'content': req.body
		})
		);
  });
});

app.post('/wResult', function(req, res, next) {
	let data = JSON.stringify(req.body); 
	console.log(req.body); 
	fs.writeFileSync('./result.json', data);  
}); 

app.post('/rResult', function(req, res, next) {
	fs.readFile('./result.json', function read(err, data) {
			if (err) {
					throw err;
			}
			res.send(data); 
	});
}); 


/***************** user list ***********/

app.post('/wList', function(req, res, next) {
  let data = JSON.stringify(req.body);  
  console.log(data); 
  fs.writeFileSync('./user_list.json', data);  
});

app.get('/rList', function(req, res, next) {
  fs.readFile('./user_list.json', function read(err, data) {
      if (err) {
          throw err;
      }
      res.send(data); 
  });
});







http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});


