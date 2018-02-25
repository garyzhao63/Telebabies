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
	
	var username = document.getElementById('username').value;
	var data = JSON.parse($.ajax({type: "GET", url: "rList", async: false}).responseText);
	for(var i = 0; i < data.length; i++){
		if (data[i].username == username) {
			//update user json with the correct user
			$.post('wUser', data[i]);
			break; 
		}
	}
}
