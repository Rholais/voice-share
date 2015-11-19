var context;
window.addEventListener('load', init, false);
function init() {
	try {
		var dogBarkingBuffer = null;
		// Fix up prefixing
		window.AudioContext = window.AudioContext || window.webkitAudioContext;
		var context = new AudioContext();
		
		url = 'https://commons.wikimedia.org/wiki/File:Sound-of-dog.ogg';
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
			alert('Request sent.');
		}
	}
	catch(e) {
		alert('Web Audio API is not supported in this browser');
	}
}
