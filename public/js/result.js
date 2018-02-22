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
		renderText(content['text']); 
	}); 
}

function renderText(content) {
	for (var i = 0; i < content.length; i++) {
		var text = content[i]['content']; 
		var style = content[i]['style']; 
		$('.text-panel').append('<div class="text-trans" id="text' + i + 
				'">' + text + '</div>'); 
		$('#text' + i).css('background-color', style);
				
	}
}
