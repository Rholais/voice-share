var context;
window.addEventListener('load', init, false);
function init() {
	try {
		// Fix up for prefixing
		window.AudioContext = window.AudioContext||window.webkitAudioContext;
		context = new AudioContext();
		alert('Web Audio API is supported in this browser');
	}
	catch(e) {
		alert('Web Audio API is not supported in this browser');
	}
}
