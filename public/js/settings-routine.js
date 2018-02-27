'use strict';

var data = JSON.parse(window.localStorage.getItem("user"));
var list = JSON.parse($.ajax({type: "GET", url: "rList", async: false}).responseText);

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
	var dateObj = new Date(Date.parse(selectedTime)); 
	console.log(dateObj.getHours());
	console.log(dateObj.getMinutes());

	var size = data.routine.length;
	if (dateObj.getHours() && dateObj.getMinutes()) {

		var minuteStr = dateObj.getMinutes().toString();
		if (dateObj.getMinutes().toString().length < 2) {
			minuteStr = "0" + dateObj.getMinutes();
		}

		var hourStr = dateObj.getHours().toString();
		var M; 
		if (dateObj.getHours().toString().length < 2) {
			hourStr = "0" + dateObj.getHours();
		}
		if (dateObj.getHours() > 12) {
			hourStr = (dateObj.getHours() - 12).toString(); 
			M = ' PM'; 
		} else if (dateObj.getHours() = 12) {
			M = ' PM'; 
		} else {
			M = ' AM'; 
		}

		var newJSON = {
			"time": hourStr + ":" + minuteStr + M, 
		"repeat": "daily",
		"id": size
		};

		data.routine.push(newJSON);
		list[data.username] = data;
		window.localStorage.setItem("user", JSON.stringify(data));
		$.post('wList', list); 
		location.href = '/settings'; 
	} else {
		alert("choose time"); 
	}
	

}
