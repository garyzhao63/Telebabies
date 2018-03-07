'use strict';

window.localStorage.setItem("user", "{}");

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
	//Use Facebook login instead
	//$(".login-button").click(loginClick);

}

function loginClick(e) {
	e.preventDefault();

	var data = JSON.parse($.ajax({type: "GET", url: "rList", async: false}).responseText);
	
	var username = document.getElementById('username').value;
	
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
				{"date":"1519702627312"}
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
	console.log(data);
	$.post('wList', data);
	}
	
}
		

