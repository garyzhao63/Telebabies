'use strict';

var user; 
var userdata = JSON.parse(window.localStorage.getItem('user'));  
if (userdata && userdata.username) {
	user = userdata.username; 
} else {
	user = 'rickord123'; 
}

var resultJSON = {}; 
resultJSON.date = Date.now(); 
resultJSON.user = user; 
resultJSON.text = ''; 
resultJSON.time = '0:0:0'; 


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

var content; 

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
	console.log(dateConvert(resultJSON.date)); 
	$.post('/rResult', function(data) {
		content = JSON.parse(data); 
		console.log(content); 
	}); 

  document.querySelector('.stop-btn').onclick = function() {
		resultJSON.text = $('.text-panel').html(); 
		if (!content[user]) {
			content[user] = []; 
		}
		content[user].push(resultJSON); 
		window.localStorage.setItem('time', resultJSON.date); 
		$.post('wResult', content); 
  };


	var token;
	fetch('/api/speech-to-text/token')
	.then(function(response) {
    	return response.text();
	}).then(function(_token) {
    	token = _token;
	}).catch(function(error) {
    	console.log(error);
	});
	setTimeout(
	function () {startRecording(token); }, 2000); 
	timeStart(); 
	setInterval(function() {
		var time = elapsedTimeConvert(timeEnd()); 
		$('.time').html(time); 
		resultJSON.time = time; 
	}, 1000);
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
		resultJSON.text = $('.text-panel').html(); 
		if (!content[user]) {
			content[user] = []; 
		}
		content[user].push(resultJSON); 
		window.localStorage.setItem('time', resultJSON.date); 
		$.post('wResult', content); 
  };
}

function getToneAnalysis(text, id) {
	$.post('/api/tone', {'tone_input': text,'content_type': 'text/plain'},
	function(result) {toneCallback(result, id)}).fail(function() {console.log('fail')});
}

function toneCallback(result, id) {
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
	$('#text' + id).css('background-color', mood[curTone.tone]);
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
      word_alternatives_threshold: 0.1,
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
	$('.temp').remove(); 
	for (var i = 0; i < r.length; i++) {
		text = r[i].alternatives[0].transcript; 
		text = text.slice(0, -1);

		if (text != '') {
			if (r[i].speaker != undefined) {
				sentence = 'Speaker' + r[i].speaker + ': ' + text; 
			} else {
				sentence = text; 
			}
			if (sentence[sentence.length - 1] != '.') {
				if (!$('#text' + i).length) {
					$('.text-panel').append('<div class="text-trans temp" id="text' + i + 
						'">' + sentence + '</div>'); 
				} else {
					$('#text' + i).html(sentence); 	
				}
				getToneAnalysis($('#text' + i).html(), i); 
			} else {
				if (!$('#text' + i).length) {
					$('.text-panel').append('<div class="text-trans" id="text' + i + 
						'">' + sentence + '</div>'); 
					getToneAnalysis($('#text' + i).html(), i); 
				} 
			}

		}
		$(".text-panel").scrollTop($(".text-panel")[0].scrollHeight);
	}

}
