var context;
window.addEventListener('load', init, false);
function init() {
	try {
	  var dogBarkingUrl = 'File:Sound-of-dog.ogg';
		var dogBarkingBuffer = null;
		// Fix up prefixing
		window.AudioContext = window.AudioContext || window.webkitAudioContext;
		context = new AudioContext();
	
		loadDogSound(dogBarkingUrl);
		alert('Sound Loaded');
		playSound(dogBarkingBuffer);
	}
	catch(e) {
		alert('Web Audio API is not supported in this browser');
	}
}

function loadDogSound(url) {
	var request = new XMLHttpRequest();
	request.open('GET', url, true);
	request.responseType = 'arraybuffer';
	
	// Decode asynchronously
	request.onload = function() {
		context.decodeAudioData(
			request.response, 
			function(buffer) {
				dogBarkingBuffer = buffer;
			}, 
			onError
		);
	}
	request.send();
}

function playSound(buffer) {
  var source = context.createBufferSource(); // creates a sound source
  source.buffer = buffer;                    // tell the source which sound to play
  source.connect(context.destination);       // connect the source to the context's destination (the speakers)
  source.start(0);                           // play the source now
                                             // note: on older systems, may have to use deprecated noteOn(time);
}
