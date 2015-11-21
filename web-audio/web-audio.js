var context;
window.addEventListener('load', init, false);
function init() {
	var dogBarkingUrl = 'https://upload.wikimedia.org/wikipedia/commons/c/ce/Sound-of-dog.ogg';
	var dogBarkingBuffer = null;
	// Fix up prefixing
	window.AudioContext = window.AudioContext || window.webkitAudioContext;
	context = new AudioContext();
	
	loadDogSound(dogBarkingUrl);
	alert('Sound Loaded');
	playSound(dogBarkingBuffer);
}

function loadDogSound(url) {
	var request = new XMLHttpRequest();
	request.open('GET', url, true);
	request.responseType = 'arraybuffer';
	
	// Decode asynchronously
	request.onload = function() {
		context.decodeAudioData(
			request.response,
			playSound,
			function(e){"Error with decoding audio data" + e.err}
		);
	}
	request.send();
}

function playSound(buffer) {
	var source = context.createBufferSource(); // creates a sound source
	source.buffer = buffer;                    // tell the source which sound to play
	source.connect(context.destination);       // connect the source to the context's destination (the speakers)
	source.start(0);                           // play the source now
//	source.noteOn(0);						   // note: on older systems, may have to use deprecated noteOn(time);
}
