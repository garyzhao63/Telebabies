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
	function () {startRecording(token1); }, 1000); 
	setInterval(function() {startTone(); }, 1000 ); 
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

function getToneAnalysis(text) {
	$.post('/api/tone', {'text': text,'language': 'en'},
	toneCallback).fail(function() {console.log('fail')});
}
function startTone() {
	var text = $('#toBeAdded').html(); 
	console.log(text); 
	if (text != '') {
		getToneAnalysis(text); 
	}
}

function toneCallback(data) {
	console.log(data); 
	var text = $('#toBeAdded').html(),  
	emotionTone = data.document_tone.tones.slice(0),
  sentences, sentenceTone = []

	if (typeof(data.sentences_tone) === 'undefined' || data.sentences_tone === null) {
      sentences = [{
        sentence_id: 0, // eslint-disable-line camelcase
        text: text,
        tones: data.document_tone.tones.slice(0)
      }];
  } else {
      //Deep copy data.sentences_tone
      sentences = JSON.parse(JSON.stringify(data.sentences_tone));
  }
	/*
	sentences.forEach(function(elements) {
      elements.tones.forEach(function(item) {
        if (sentenceTone[item.tone_id] == null || sentenceTone[item.tone_id].score < item.score) {
          sentenceTone[item.tone_id] = item;
        }
      });

    });
		*/
	var item = sentences.slice(-1)[0].tones.slice(-1)[0]; 
	if (item != undefined) {
		console.log(item.tone_id); 
		$('.notes2').html('current mood: ' + item.tone_id); 
	} else {
		$('.notes2').html('current mood: not detected'); 
	}
}
