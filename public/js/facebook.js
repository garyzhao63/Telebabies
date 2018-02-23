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
         FB.api('/me?fields=name,first_name,picture.width(480)', changeUser);
  }
  location.href = '/index';
}

function changeUser(response) {
  var data = JSON.parse($.ajax({type: "GET", url: "rSetting", async: false}).responseText);
  var curJSON = data.rickord123[0].info[0];
  console.log(curJSON.picture);

  curJSON.name = response.name;
  curJSON.picture = response.picture.data.url;
  $.post('wSetting', data); 
}