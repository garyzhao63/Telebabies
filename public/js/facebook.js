function checkLoginState() {
  FB.getLoginStatus(function(response) {
    statusChangeCallback(response);
  });
}

function statusChangeCallback(response) {
  console.log('Facebook login status changed.');
  console.log(response);
  // The response object is returned with a status field that lets the
  // app know the current login status of the person.
  // Full docs on the response object can be found in the documentation
  // for FB.getLoginStatus().
  if (response.status === 'connected') {
    // Logged into your app and Facebook.
        console.log('Successfully logged in with Facebook');
         FB.api('/me?fields=name,first_name,picture.width(480),email', changeUser);
  }
  //location.href = '/index';
}

function changeUser(response) {

  
  var username = document.getElementById('username').value;
  var data = JSON.parse($.ajax({type: "GET", url: "rList", async: false}).responseText);
  for(var i = 0; i < data.length; i++){
    if (data[i].username == username) {
      //update user json with the correct user
      $.post('wUser', data[i]);
      break; 
    }
  }

  var data = JSON.parse($.ajax({type: "GET", url: "rUser", async: false}).responseText);

  data.name = response.name;
  data.username = response.email;
  data.picture = response.picture.data.url;

  $.post('wUser', data);
}