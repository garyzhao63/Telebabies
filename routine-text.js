var accountSid = 'ACc76f6e2d5908a1224753cc5d6b170d95'; // Your Account SID from www.twilio.com/console
var authToken = 'fd1ad3d198e851aeae21a1f83ea8ebe1';   // Your Auth Token from www.twilio.com/console

var twilio = require('twilio');
var client = new twilio(accountSid, authToken);

var data = require('./user.json');

client.messages.create({
    body: 'Alert from Telebabies: ' + data.rickord123[3].routine[0].time,
    to: '+14158607298',  //TODO: get this number from JSON
    from: '+16195682588' // From a valid Twilio number
})
.then((message) => console.log(message.sid));