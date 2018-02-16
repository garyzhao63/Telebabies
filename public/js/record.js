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

	var token;
	fetch('/api/speech-to-text/token')
	.then(function(response) {
    	return response.text();
	}).then(function(_token) {
	console.log('record.js: ' + _token); 
    	token = _token;
	}).catch(function(error) {
    	console.log(error);
	});
	console.log('record.js: ' + token); 
	setTimeout(
	function () {startRecording(token); }, 3000); 

}

function startRecording(token) {
	var stream = WatsonSpeech.SpeechToText.recognizeMicrophone({
        token: token,
        outputElement: '#toBeAdded' // CSS selector or DOM Element
    });

    stream.on('error', function(err) {
        console.log(err);
    });

    document.querySelector('.stop-btn').onclick = function() {
      stream.stop();
    };
}
