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
	$(".switch-button").click(switchClick);
	$(".notes-routine-right").click(repeatClick);

}

function switchClick(e) {
	e.preventDefault();

	var ID = $(this).closest(".routine-bar").attr('id');
	var btnQuery = '#' + ID + ' ' + '.switch-button';
	var rtnQuery = '#' + ID + '.routines';

	if ($(btnQuery).attr('src') == '/images/switchoff.png') {
		$(btnQuery).attr("src","/images/switchon.png");
		$(rtnQuery).show(); 
	} else {
		$(btnQuery).attr("src","/images/switchoff.png");
		$(rtnQuery).hide(); 
	}
}

function repeatClick(e) {

	var ID = $(this).closest(".routines").attr('id');
	var data = JSON.parse($.ajax({type: "GET", url: "rUser", async: false}).responseText);
	
	var curJSON = data.routine[ID];

	e.preventDefault();

	var curRepeat = $(this).html();

	if(curRepeat == "daily<br>") {
		$(this).html("weekly<br>");
		curJSON.repeat = "weekly";
		$.post('wUser', data); 
	} 
	else if (curRepeat == "weekly<br>") {
		$(this).html("monthly<br>");
		curJSON.repeat = "monthly";
		$.post('wUser', data); 
	} 
	else {
		$(this).html("daily<br>");
		curJSON.repeat = "daily";
		$.post('wUser', data); 
	}

}
