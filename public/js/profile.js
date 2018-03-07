//'use strict';
var data;
var list = JSON.parse($.ajax({type: "GET", url: "rList", async: false}).responseText);

// Call this function when the page loads (the "ready" event)
$(document).ready(function() {
	initializePage();
})


function initializePage() {
	data = JSON.parse(window.localStorage.getItem("user"));
	$(".username").html(data.name);
	$('.phone-input')[0].value = data.phone;
	$("#userid").html(data.username);
	$(".profile").html("<img src=" + data.picture + " class=\"profile-photo\">");


	$(".phone-input").keyup(function(e) {
		e.preventDefault();
		if (e.which !== 13) return; 
		window.alert("Phone number set succesfully!")
		var phone = $('.phone-input')[0].value;

		data.phone = phone;
		list[data.username] = data;
		window.localStorage.setItem("user", JSON.stringify(data));
		$.post('wList', list); 
		
	});
	//initGestures(); 
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
