'use strict';

var data = JSON.parse(window.localStorage.getItem("user"));
var swipe;

// Call this function when the page loads (the "ready" event)
$(document).ready(function() {
	initializePage();
})


function initializePage() {
	//var data = JSON.parse($.ajax({type: "GET", url: "rUser", async: false}).responseText);
	$.post('/rResult', function(data) {
		var content = JSON.parse(data); 
		processResult(content); 
	}); 

}

function processResult(content) {
	var username; 
	if (data && data.username) {
		username = data.username;
	} else {
		username = 'rickord123'; 
	}
	var hisList = content[username]; 
	if (hisList) {
		for (var i = 0; i < hisList.length; i++) {
			console.log('aaa');
			$('.notes').append('<li id="' + hisList[i].date + '">' +
			dateConvert(parseInt(hisList[i].date)) + '</li>'); 
		}	
	}

	$('li').click(function() {
		window.localStorage.setItem('time', $(this).attr('id')); 	
		location.href = '/result2'; 
	}); 

	/** Swipe listner */
	swipe = document.querySelector("ol");
	new Slip(swipe);

	swipe.addEventListener('slip:beforeswipe', function(e) {
		console.log("beforeswipe");
	});

	swipe.addEventListener('slip:swipe', function(e) {
    	// e.target list item swiped;
    	console.log("sipweed");
    	if (confirm("Confirm deletion?")) {
        // list will collapse over that element
       		e.target.parentNode.removeChild(e.target);

       		//hide the "repeat" bar
       		

       		
    	} else {
        	e.preventDefault(); // will animate back to original position
    	}
	});

}
