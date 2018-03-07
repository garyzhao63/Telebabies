//'use strict';


// Call this function when the page loads (the "ready" event)
$(document).ready(function() {
	initializePage();
})


function initializePage() {
	var data = JSON.parse(window.localStorage.getItem("user"));
	//var data = JSON.parse($.ajax({type: "GET", url: "rUser", async: false}).responseText);
	$(".username").html(data.name);
	$(".infobars #phone").html(data.phone);
	$("#userid").html(data.username);
	$(".profile").html("<img src=" + data.picture + " class=\"profile-photo\">");
	initGestures(); 
}

// init jQuery gestures  
function initGestures() {
	// add gestures listener here
	$(function() {
		$('.profile-photo').bind('taphold', tapholdHandler); 

		function tapholdHandler(event){
			console.log('aaa'); 
			//$('phone-input').show(); 
		}
	
	}); 
}
