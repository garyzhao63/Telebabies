var startTime, endTime;

function timeStart() {
  startTime = new Date();
};

function timeEnd() {
  endTime = new Date();
  var timeDiff = endTime - startTime; //in ms
  // strip the ms
  timeDiff /= 1000;

  // get seconds 
  var seconds = Math.round(timeDiff);
	return seconds; 
}

function elapsedTimeConvert(time) {
	var sec = time % 60; 
	var hr = Math.floor(time / 3600); 
	var min = Math.floor((time % 3600) / 60); 
	return hr + ':' + min + ':' + sec; 
}

function dateConvert(time) {
	var timeD = new Date(time); 
	var day = timeD.getDay(); 
	var month = timeD.getMonth() + 1; 
	var year = timeD.getFullYear(); 
	return month +'/' + day + '/' + year; 
}
