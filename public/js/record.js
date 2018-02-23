'use strict';

var count = 0; 

var resultJSON = {}; 
resultJSON.date = Date.now(); 
resultJSON.text = []; 

var user = 'rickord123'; 

var mood = {
	'anger': 'red', 
	'analytical': 'blue', 
	'confident': 'purple', 
	'fear': 'green', 
	'tentative': 'cyan', 
	'joy': 'orange', 
	'not detected': 'transparent'
};

var curTone = {
	tone: 'not detected', 
	score: 0
}; 

var docStream;

// Call this function when the page loads (the "ready" event)
$(document).ready(function() {
	initializePage();
})

/*
 * Function that is called when the document is ready.
 */
function initializePage() {
	console.log("Javascript connected!");

	var token1;
	fetch('/api/speech-to-text/token')
	.then(function(response) {
    	return response.text();
	}).then(function(_token) {
    	token1 = _token;
	}).catch(function(error) {
    	console.log(error);
	});
	setTimeout(
	function () {startRecording(token1); }, 2000); 
}

function startRecording(token) {

	var stream =
	WatsonSpeech.SpeechToText.recognizeMicrophone(getRecognizeOptions(token));

  stream.on('error', function(err) {
      console.log(err);
  }).on('data', handleMsg);
	docStream = stream; 
  document.querySelector('.stop-btn').onclick = function() {
    stream.stop();
		$.post('wResult', resultJSON); 
  };
}

function getToneAnalysis(text) {
	$.post('/api/tone', {'tone_input': text,'content_type': 'text/plain'},
	toneCallback).fail(function() {console.log('fail')});
}

function toneCallback(result) {
	var data = result.data; 
	var text = result.content['tone_input']; 

	var item = data.document_tone.tones; 
	curTone.score = 0; 
	curTone.tone = 'not detected'; 
	if (item.length != 0) {
		for (var i = 0; i < item.length; i++) {
			if (item[i].score >= curTone.score) {
				curTone.score = item[i].score; 
				curTone.tone = item[i].tone_id; 
			}
		}
	} 
	$('.notes2').html('Current mood: ' + curTone.tone); 
}

function getRecognizeOptions(token) {
    return Object.assign({
      // formats phone numbers, currency, etc. (server-side)
      smart_formatting: true,
      format: true, // adds capitals, periods, and a few other things (client-side)
			model: 'en-US_BroadbandModel', 
      objectMode: true,
      interim_results: true,
      // note: in normal usage, you'd probably set this a bit higher
      word_alternatives_threshold: 0.01,
      timestamps: true, // set timestamps for each word - automatically turned on by speaker_labels
      // includes the speaker_labels in separate objects unless resultsBySpeaker is enabled
      speaker_labels: true,
      // combines speaker_labels and results together into single objects,
      // making for easier transcript outputting
      resultsBySpeaker: true,
      // allow interim results through before the speaker has been determined
      speakerlessInterim: true,
			token: token 
    });
}

function handleMsg(msg) {
	var r = msg.results; 
	var text; 
	var sentence; 
	count = r.length - 1; 

	text = r[count].alternatives[0].transcript; 
	text = text.slice(0, -1);

	if (text != '') {
		getToneAnalysis(text); 
		if (r[count].speaker != undefined) {
			sentence = 'Speaker' + r[count].speaker + ': ' + text + '.'; 
		} else {
			sentence = text + '.'; 
		}
		if (!$('#text' + count).length) {
			$('.text-panel').append('<div class="text-trans" id="text' + count + 
				'">' + sentence + '</div>'); 
		} else {
			$('#text' + count).html(sentence); 	
		}
		if (!resultJSON.text[count]) {
			resultJSON.text[count] = {}; 
		}
		resultJSON.text[count].content = sentence; 
		resultJSON.text[count].style = mood[curTone.tone]; 
		$('#text' + count).css('background-color', mood[curTone.tone]);
		$(".text-panel").scrollTop($(".text-panel")[0].scrollHeight);
	}
}
