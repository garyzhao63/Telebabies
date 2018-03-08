'use strict';

var data;


// Call this function when the page loads (the "ready" event)
$(document).ready(function() {
	initializePage();
})

/*
 * Function that is called when the document is ready.
 */
function initializePage() {
	console.log("Javascript connected!");

	$(".login-button").click(loginClick);

}

function loginClick(e) {
	e.preventDefault();

	var data = JSON.parse($.ajax({type: "GET", url: "rList", async: false}).responseText);
	
	var username = document.getElementById('nameinput').value;

	if (data[username] != undefined) {
	    window.localStorage.setItem("user", JSON.stringify(data[username]));
	 }
	 else {
	    var jsonNew =  `{
	    "name":"Rick Ord",
	    "username":"` + username + `",
	    "password":"123456",
	    "phone":"",
	    "picture":"http://jacobsschool.ucsd.edu/faculty/images/teacherawards/RickOrd.jpg",
	  
	    "recording": 
	      [
	        {"date":"1519702627312"}
	      ],
	    

	    "family":
	      [
	        {"name":"Kevin"},
	        {"name":"Sarah"}
	      ],
	    

	    "routine":
	      [
	        {"time":"06:00 PM","repeat":"daily","id":"0","on":false},
	        {"time":"04:15 PM","repeat":"daily","id":"1","on":false},
	        {"time":"01:00 AM","repeat":"monthly","id":"2","on":false}
	      ]
	  }`;

	  console.log(jsonNew);
	  data[username] = JSON.parse(jsonNew);
	  //data[username].name = response.name;
	  //data[username].username = response.email;
	  //data[username].picture = response.picture.data.url;

	  window.localStorage.setItem("user", JSON.stringify(data[username]));
	  $.post('wList', data);

	}
  	location.href = '/index';
	
}
		

