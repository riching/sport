$(document).ready(function(){

	$('.fullscreen-button-box').on('click', function(){

		// Set the element you want to go fullscreen
		var elm = $(this).parent().parent().parent()[0];

		// Now request fullscreen on the element. Need to use browser prefix.
		if (elm.requestFullscreen) {
          elm.requestFullscreen();
        } else if (elm.msRequestFullscreen) {
          elm.msRequestFullscreen();
        } else if (elm.mozRequestFullScreen) {
          elm.mozRequestFullScreen();
        } else if (elm.webkitRequestFullscreen) {
          elm.webkitRequestFullscreen();
        }
	});

});

