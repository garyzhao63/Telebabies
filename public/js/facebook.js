var data = JSON.parse($.ajax({type: "GET", url: "rList", async: false}).responseText);
  

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

  console.log(response.email);

  var username = response.email;

  //case when user exists
  if (data[username] != undefined) {
    window.localStorage.setItem("user", JSON.stringify(data[username]));
  }
  else {
    var jsonNew =  `{
    "name":"Rick Ord",
    "username":"test123",
    "password":"123456",
    "phone":"6191234567",
    "picture":"http://jacobsschool.ucsd.edu/faculty/images/teacherawards/RickOrd.jpg",
  
    "recording": 
      [
        {"date":"12/08/2017"},
        {"date":"11/08/2017"},
        {"date":"10/08/2017"}
      ],
    

    "family":
      [
        {"name":"Kevin"},
        {"name":"Sarah"}
      ],
    

    "routine":
      [
        {"time":"06:00 PM","repeat":"daily","id":"0"},
        {"time":"04:15 PM","repeat":"daily","id":"1"},
        {"time":"01:00 AM","repeat":"monthly","id":"2"}
      ]
  }`;

  data[username] = JSON.parse(jsonNew);
  data[username].name = response.name;
  data[username].username = response.email;
  data[username].picture = response.picture.data.url;

  window.localStorage.setItem("user", JSON.stringify(data[username]));
  $.post('wList', data);

}


}