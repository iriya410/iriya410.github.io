(function(window){
	'use strict';

	window.slider_test.setAutoPlay(800);

	var intervals = [];

	setTimeout(function(){
		window.slider_test.setDistance(1.5);
		window.slider_test.setPerspectiveOrigin("50% 50%");
		intervals[0] = setInterval(function(){
			window.slider_test.setDistance(1.5);
			window.slider_test.setPerspectiveOrigin("50% 50%");
		}, 12000);
	}, 2400);
	setTimeout(function(){
		window.slider_test.setAxis("X");
		window.slider_test.setPerspectiveOrigin("80% 50%");
		intervals[1] = setInterval(function(){
			window.slider_test.setAxis("X");
			window.slider_test.setPerspectiveOrigin("80% 50%");
		}, 12000);
	}, 4800);
	setTimeout(function(){
		window.slider_test.setDistance(1.09);
		window.slider_test.setPerspectiveOrigin("50% 50%");
		window.slider_test.setAxisToRotateZ(30);
		intervals[2] = setInterval(function(){
			window.slider_test.setDistance(1.09);
			window.slider_test.setPerspectiveOrigin("50% 50%");
			window.slider_test.setAxisToRotateZ(30);
		}, 12000);
	}, 7200);
	setTimeout(function(){
		window.slider_test.setAxis("Y");
		window.slider_test.setAxisToRotateZ(0);
		intervals[3] = setInterval(function(){
			window.slider_test.setAxis("Y");
			window.slider_test.setAxisToRotateZ(0);
		}, 12000);
	}, 9600);
	setTimeout(function(){
		window.slider_test.setDistance(1.2);
		window.slider_test.setPerspectiveOrigin("20% 80%");
		intervals[4] = setInterval(function(){
			window.slider_test.setDistance(1.2);
			window.slider_test.setPerspectiveOrigin("20% 80%");
		}, 12000);
	}, 12000);

	setTimeout(function() {
		window.slider_test.stopAutoPlay();
		for(var i=0; i<intervals.length; i++) {
			clearInterval(intervals[i]);
		}
	}, 120000);

})(this);