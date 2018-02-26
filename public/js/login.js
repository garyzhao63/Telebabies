'use strict';


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

	var userExist = false;
	
	var username = document.getElementById('username').value;
	var data = JSON.parse($.ajax({type: "GET", url: "rList", async: false}).responseText);
	data["123"];

	for(var i = 0; i < data.length; i++){
		if (data[i].username == username) {
			//update user json with the correct user
			userExist = true;
			$.post('wUser', data[i]);
			break; 
		}
	}

	if (!userExist) {

		var jsonNew = {
		"name":"123123123123123",
		"username":"test2",
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
	};
	//var newArr = JSON.parse(jsonNew);
	data.push(jsonNew);

	console.log(data);
	let data2 = JSON.stringify(data);  
	$.post('wList', data2);
	}
		

}
