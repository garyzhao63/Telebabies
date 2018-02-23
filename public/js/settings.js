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
	$("#routine-button").click(switchClick);

}

function switchClick(e) {
	e.preventDefault();
	if ($(".switch-button").attr('src') == '/images/switchoff.png') {
		$(".switch-button").attr("src","/images/switchon.png");
		$(".routines").show(); 
	} else {
		$(".switch-button").attr("src","/images/switchoff.png");
		$(".routines").hide(); 
	}
}
