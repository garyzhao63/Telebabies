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
	$.post('/rResult', function(data) {
		var content = JSON.parse(data); 
		renderText(content); 
		console.log(content); 
	}); 
}

function renderText(content) {
/*
	for (var i = 0; i < content.length; i++) {
		var text = content[i]['content']; 
		var style = content[i]['style']; 
		$('.text-panel').append('<div class="text-trans" id="text' + i + 
				'">' + text + '</div>'); 
		$('#text' + i).css('background-color', style);
				
	}
*/
var user; 
var time; 
var userdata = JSON.parse(window.localStorage.getItem('user'));  
if (userdata && userdata.username) {
	user = userdata.username; 
} else {
	user = 'rickord123'; 
}
if (window.localStorage.getItem('time')) {
	time = window.localStorage.getItem('time'); 
} else {
	time = 0; 
}

if (content[user]) {
	
	for (var i = 0; i < content[user].length; i++) {
		console.log(dateConvert(user[i].date));
		if (content[user][i].date == time) {
			$('.text-panel').append(content[user][i].text); 
			break; 
		}
	}
}
}
