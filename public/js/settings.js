'use strict';

var data = JSON.parse(window.localStorage.getItem("user"));
var list = JSON.parse($.ajax({type: "GET", url: "rList", async: false}).responseText);


// Call this function when the page loads (the "ready" event)
$(document).ready(function() {
	initializePage();
})

/*
 * Function that is called when the document is ready.
 */
function initializePage() {
	console.log("Javascript connected!");

	for (var i = 0; i < data.routine.length; i ++) {
		var str1 = `<div class="routine-bar" id=`;
		var str2 = `><span class="notes">`;
		var str3 = `</span>
            <span>
                <a href="#" id="routine-button">
                    <img src="/images/switchoff.png" class="switch-button img-responsive" align="right">
                </a>
            </span>
        </div><div class="routines" id=`;
    	var str4 = `>
            <div class="notes-routine-left"> REPEAT<br></div>
            <div class="notes-routine-right">`;
    	var str5 = `<br></div></div>`;

   		var routineID = document.getElementById('routineID');

    	var ID = "\"" + i + "\"";
   		routineID.insertAdjacentHTML( 'beforeend', str1 + ID + str2 + data.routine[i].time + str3 + ID + str4 + data.routine[i].repeat + str5);
	}
	

	$(".switch-button").click(switchClick);
	$(".notes-routine-right").click(repeatClick);

}

function switchClick(e) {
	e.preventDefault();

	var ID = $(this).closest(".routine-bar").attr('id');
	var rtnQuery = '#' + ID + '.routines';

	if ($(this).attr('src') == '/images/switchoff.png') {
		$(this).attr("src","/images/switchon.png");
		$(rtnQuery).show(); 
	} else {
		$(this).attr("src","/images/switchoff.png");
		$(rtnQuery).hide(); 
	}
}

function repeatClick(e) {

	
	var ID = $(this).closest(".routines").attr('id');
	
	var curJSON = data.routine[ID];

	e.preventDefault();

	var curRepeat = $(this).html();

	if(curRepeat == "daily<br>") {
		$(this).html("weekly<br>");
		curJSON.repeat = "weekly";
		//update user_list json with the new data
		list[data.username] = data;
		//update local stroage
		window.localStorage.setItem("user", JSON.stringify(data));
		$.post('wList', list); 
	} 
	else if (curRepeat == "weekly<br>") {
		$(this).html("monthly<br>");
		curJSON.repeat = "monthly";
		list[data.username] = data;
		window.localStorage.setItem("user", JSON.stringify(data));
		$.post('wList', list); 
	} 
	else {
		$(this).html("daily<br>");
		curJSON.repeat = "daily";
		list[data.username] = data;
		window.localStorage.setItem("user", JSON.stringify(data));
		$.post('wList', list); 
	}

}
