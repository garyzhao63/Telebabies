var credential = require('./credential.json')

var accountSid = credential.accountSid; // Your Account SID from www.twilio.com/console
var authToken = credential.authToken;   // Your Auth Token from www.twilio.com/console

console.log(accountSid);

var twilio = require('twilio');
var client = new twilio(accountSid, authToken);

var data = require('./user.json');


client.messages.create({
    body: 'Alert from Telebabies: ' + data.rickord123[3].routine[0].time,
    to: '+14158607298',  //TODO: get this number from JSON
    from: '+16195682588' // From a valid Twilio number
})
.then((message) => console.log(message.sid));