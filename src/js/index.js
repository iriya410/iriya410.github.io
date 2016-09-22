(function(window){
	'use strict';

	var play_btn = document.querySelector(".demo button.play");
	
	function playSlider() {
		window.slider_test.setAutoPlay(1000);

		setTimeout(function(){
			window.slider_test.setDistance(1.5);
		}, 3000);
		setTimeout(function(){
			window.slider_test.setAxis("X");
			window.slider_test.setPerspectiveOrigin("80% 50%");
		}, 6000);
		setTimeout(function(){
			window.slider_test.setDistance(1.09);
			window.slider_test.setPerspectiveOrigin("50% 50%");
			window.slider_test.setAxisToRotateZ(30);
		}, 9000);
		setTimeout(function(){
			window.slider_test.setAxis("Y");
			window.slider_test.setAxisToRotateZ(0);
		}, 12000);
		setTimeout(function(){
			window.slider_test.setDistance(1.2);
			window.slider_test.setPerspectiveOrigin("20% 80%");
		}, 15000);
		setTimeout(function(){
			window.slider_test.setPerspectiveOrigin("50% 50%");
		}, 18000);
		setTimeout(function(){
			window.slider_test.stopAutoPlay();
		}, 21000);
	}

	play_btn.onclick = function() {
		return playSlider();
	};

})(this);