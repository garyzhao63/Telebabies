//check for alert every minnute
var CronJob = require('cron').CronJob;
new CronJob('* * * * *', function() {

  console.log("Checking for alert");

  //clear the cache to get the latest user_list
  delete require.cache[require.resolve('../user_list.json')];
  var list = require('../user_list.json');

  var credential = require('../credential.json')

  var accountSid = credential.accountSid; // Your Account SID from www.twilio.com/console
  var authToken = credential.authToken;   // Your Auth Token from www.twilio.com/console

  var twilio = require('twilio');
  var client = new twilio(accountSid, authToken);

  //get current time and parse it to the database time string
  var currTime;
  var dateObj = new Date(Date.now());
  if (dateObj.getHours() && dateObj.getMinutes()) {

      var minuteStr = dateObj.getMinutes().toString();
      if (dateObj.getMinutes().toString().length < 2) {
        minuteStr = "0" + dateObj.getMinutes();
      }

      var hourStr = dateObj.getHours().toString();
      var M; 
      if (dateObj.getHours().toString().length < 2) {
        hourStr = "0" + dateObj.getHours();
      }
      if (dateObj.getHours() > 12) {
        hourStr = (dateObj.getHours() - 12).toString(); 
        M = ' PM'; 
      } else if (dateObj.getHours() == 12) {
        M = ' PM'; 
      } else {
        M = ' AM'; 
      }

      currTime = hourStr + ":" + minuteStr + M;
    }

    //loop through each user in user_list
    for(var user in list) {
      var routines = list[user].routine;
      //loop through each routine to get time
      for(var id in routines) {
        var alertTime = routines[id].time;

        if(alertTime == currTime && routines[id].on) {
          //send the text msg
          client.messages.create({
            body: 'Alert from Telebabies: ' + alertTime,
            to: list[user].phone,  
            from: '+16195682588' // From a valid Twilio number
          })
          .then((message) => console.log(message.sid));
        }

        //TODO: console.log(list[user].phone); send to specific phone
      }
    }



}, null, true, 'America/Los_Angeles');
