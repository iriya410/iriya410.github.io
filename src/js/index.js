(function(window){
	'use strict';

	var play_btn = document.querySelector(".demo button.play");
	
	function playSlider() {
		window.slider_test.setAutoPlay(800);

		setTimeout(function(){
			window.slider_test.setDistance(1.5);
		}, 2400);
		setTimeout(function(){
			window.slider_test.setAxis("X");
			window.slider_test.setPerspectiveOrigin("80% 50%");
		}, 4800);
		setTimeout(function(){
			window.slider_test.setDistance(1.09);
			window.slider_test.setPerspectiveOrigin("50% 50%");
			window.slider_test.setAxisToRotateZ(30);
		}, 7200);
		setTimeout(function(){
			window.slider_test.setAxis("Y");
			window.slider_test.setAxisToRotateZ(0);
		}, 9600);
		setTimeout(function(){
			window.slider_test.setDistance(1.2);
			window.slider_test.setPerspectiveOrigin("20% 80%");
		}, 12000);
		setTimeout(function(){
			window.slider_test.setPerspectiveOrigin("50% 50%");
		}, 14400);
		setTimeout(function(){
			window.slider_test.stopAutoPlay();
		}, 16800);
	}

	play_btn.onclick = function() {
		return playSlider();
	};

})(this);