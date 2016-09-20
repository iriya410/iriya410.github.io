(function(window){
	'use strict';

	window.slider_test.setAutoPlay(800);

	setTimeout(function(){
		window.slider_test.setDistance(1.5);
		window.slider_test.setPerspectiveOrigin("50% 50%");
		setInterval(function(){
			window.slider_test.setDistance(1.5);
			window.slider_test.setPerspectiveOrigin("50% 50%");
		}, 12000);
	}, 2400);
	setTimeout(function(){
		window.slider_test.setAxis("X");
		window.slider_test.setPerspectiveOrigin("80% 50%");
		setInterval(function(){
			window.slider_test.setAxis("X");
			window.slider_test.setPerspectiveOrigin("80% 50%");
		}, 12000);
	}, 4800);
	setTimeout(function(){
		window.slider_test.setDistance(1.09);
		window.slider_test.setPerspectiveOrigin("50% 50%");
		window.slider_test.setAxisToRotateZ(30);
		setInterval(function(){
			window.slider_test.setDistance(1.09);
			window.slider_test.setPerspectiveOrigin("50% 50%");
			window.slider_test.setAxisToRotateZ(30);
		}, 12000);
	}, 7200);
	setTimeout(function(){
		window.slider_test.setAxis("Y");
		window.slider_test.setAxisToRotateZ(0);
		setInterval(function(){
			window.slider_test.setAxis("Y");
			window.slider_test.setAxisToRotateZ(0);
		}, 12000);
	}, 9600);
	setTimeout(function(){
		window.slider_test.setDistance(1.2);
		window.slider_test.setPerspectiveOrigin("20% 80%");
		setInterval(function(){
			window.slider_test.setDistance(1.2);
			window.slider_test.setPerspectiveOrigin("20% 80%");
		}, 12000);
	}, 12000);

})(this);