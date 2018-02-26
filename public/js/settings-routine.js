'use strict';
var selectedTime;
// Call this function when the page loads (the "ready" event)
$(document).ready(function() {
	initializePage();
})

/*
 * Function that is called when the document is ready.
 */
function initializePage() {
	mobiscroll.time('#demo', {
		onSet: function (event, inst) {
            selectedTime = inst.getVal(); // Call the getVal method
       		console.log(selectedTime);
    	},
        theme: 'ios',     // Specify theme like: theme: 'ios' or omit setting to use default
        lang: 'en',            // Specify language like: lang: 'pl' or omit setting to use default
        display: 'bottom'      // Specify display mode like: display: 'bottom' or omit setting to use default
    }); 

	console.log("Javascript connected!");
	$("#plus-button").click(confirm);
}

function confirm(e) {
	e.preventDefault();
	// var selectedTime = $("#demo").mobiscroll('getVal');
	// console.log(selectedTime);
	console.log(selectedTime);
}
