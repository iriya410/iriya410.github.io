(function(window){
	'use strict';

	// svg buttons
	var btn_left 	= '<svg class="slider3d_svg_prev" viewBox="0 0 100 100"><polyline points="30,50 70,0 70,100"/></svg>',
		btn_right 	= '<svg class="slider3d_svg_next" viewBox="0 0 100 100"><polyline points="70,50 30,0 30,100"/></svg>',
		btn_top 	= '<svg class="slider3d_svg_prev" viewBox="0 0 100 100"><polyline points="50,30 0,70 100,70"/></svg>',
		btn_bottom 	= '<svg class="slider3d_svg_next" viewBox="0 0 100 100"><polyline points="50,70 100,30 0,30"/></svg>';

	window.slider3d = class slider3d {
		constructor(selector, axis, deg, dist) {
			// this.element
			this.element = document.querySelector(selector);
			if(this.element.nodeType !== 1) {
				return console.log("this element is not ELEMENT_NODE");
			}

			this.initAxis(axis);
			this.initAxisToRotateZ(deg);
			this.initDistance(dist);

			this.initSlider(this);
		}

		initSlider(slider) {
			var element_object = slider.element;
			var element_children = Array.from(element_object.children);
			var element_children_length = element_children.length;

			if( element_children_length !== 0) {
				this.element_child_width = parseInt(getComputedStyle(element_children[0]).width);
				this.element_child_height = parseInt(getComputedStyle(element_children[0]).height);
				if(this.axis === "Y") {
					this.perspective_basic = this.element_child_width;
				} else {
					this.perspective_basic = this.element_child_height;
				}
				this.perspective_div = Math.ceil(element_children_length/4);

				// element_children wrapping
				for(var i=0; i<element_children_length; i++) {
					var slider3d_item = document.createElement("div");
					slider3d_item.setAttribute("class", "slider3d_item");
					slider3d_item.appendChild(element_children[i]);
					element_object.appendChild(slider3d_item);
				}
				// element_object wrapping
				element_object.innerHTML = '<div class="slider3d_perspective" style="perspective: '+(this.perspective_basic*this.perspective_div)+'px;">\
												<div class="slider3d_container" style="transform: rotateZ('+this.rotate_z+'deg) translateZ(-'+(this.perspective_basic*this.perspective_div)+'px);">'
													+element_object.innerHTML+
												'</div>\
											</div>';
				
				this.perspective_object = element_object.firstElementChild;

				// button setting
				var nav_btns = '<button type="button" class="slider3d_btn_prev" aria-label="previous content"></button>\
								<button type="button" class="slider3d_btn_next" aria-label="next content"></button>';
				element_object.firstElementChild.innerHTML += nav_btns;
				this.btn_prev = element_object.querySelector(".slider3d_btn_prev");
				this.btn_next = element_object.querySelector(".slider3d_btn_next");
				this.initButton();

				this.container_object = this.perspective_object.firstElementChild;
				
				// display
				this.slider_items = Array.from(element_object.querySelectorAll(".slider3d_item"));
				this.slider_items_length = this.slider_items.length;
				this.deg = 360 / element_children_length;
				this.translate_z = this.perspective_basic*this.perspective_div*this.dist/2;
				for(var i=0; i<this.slider_items_length; i++) {
					this.slider_items[i].style.transform = "rotate"+this.axis+"("+(i*this.deg)+"deg) rotateZ("+this.reverse_rotate_z+"deg) translateZ("+this.translate_z+"px) scale("+this.reverse_dist+")";
				}

				// sorting
				this.select_slide_item = 0;
				this.sort(this.select_slide_item);

				// binding event
				this.btn_prev.onclick = this.rotate.bind(this.btn_prev, slider, slider.deg*1);
				this.btn_next.onclick = this.rotate.bind(this.btn_next, slider, slider.deg*(-1));
			} else {
				return console.log("content does not exist");
			}
		}

		//////////////////////////////////////////////////
		// rotate function
		//////////////////////////////////////////////////
		rotate(slider, var_deg) {
			var deg;
			var slider_transform;
			for(var i=0; i<slider.slider_items_length; i++) {
				slider_transform = slider.slider_items[i].style.transform.split(" ");
				deg = slider_transform[0].substring(8, slider_transform[0].length-4);
				deg = (deg*1) + var_deg;
				slider_transform[0] = "rotate"+slider.axis+"("+deg+"deg)";
				slider.slider_items[i].style.transform = slider_transform.join(" ");
			}

			// sort setting
			if( var_deg < 0) {
				slider.select_slide_item = (slider.select_slide_item+1)%slider.slider_items_length;
			} else if( var_deg > 0) {
				slider.select_slide_item = (slider.select_slide_item-1+slider.slider_items_length)%slider.slider_items_length;
			}
			slider.sort(slider.select_slide_item);
		}
		//////////////////////////////////////////////////

		//////////////////////////////////////////////////
		// sort function
		//////////////////////////////////////////////////
		sort(n) {
			for(var i=0; i<this.slider_items_length; i++) {
				this.slider_items[i].style.zIndex = -10;
			}
			for(var i=n-1; i<=n+1; i++) {
				var setNum = (i+this.slider_items_length)%this.slider_items_length;
				i === n ? this.slider_items[setNum].style.zIndex = 0 : this.slider_items[setNum].style.zIndex = -5;
			}
		}
		//////////////////////////////////////////////////

		//////////////////////////////////////////////////
		// Axis function
		//////////////////////////////////////////////////
		initAxis(axis) {
			this.axis = axis;
			if(this.axis !== "Y" && this.axis !== "X") {
				return console.log("axis is only \"X\" | \"Y\"");
			}
		}
		setAxis(axis) {
			this.initAxis(axis);
			var deg;
			var slider_transform;
			for(var i=0; i<this.slider_items_length; i++) {
				slider_transform = this.slider_items[i].style.transform.split(" ");
				deg = slider_transform[0].substring(8, slider_transform[0].length-4);
				slider_transform[0] = "rotate"+this.axis+"("+deg+"deg)";
				this.slider_items[i].style.transform = slider_transform.join(" ");
			}
			this.initButton();
		}
		//////////////////////////////////////////////////

		//////////////////////////////////////////////////
		// AxisRotateZ function
		//////////////////////////////////////////////////
		initAxisToRotateZ(deg) {
			this.rotate_z = deg || 0;
			if(Object.prototype.toString.call(this.rotate_z).slice(8, -1).toLowerCase() !== "number") {
				return console.log("deg is not number");
			}
			this.rotate_z !== 0 ? this.reverse_rotate_z = this.rotate_z*(-1) : this.reverse_rotate_z = this.rotate_z;
		}
		setAxisToRotateZ(deg) {
			this.initAxisToRotateZ(deg);
			
			// container rotateZ setting
			var container_transform = this.container_object.style.transform.split(" ");
			container_transform[0] = "rotateZ("+this.rotate_z+"deg)"; 
			this.container_object.style.transform = container_transform.join(" ");
			
			// slider_items rotateZ setting
			var slider_transform;
			for(var i=0; i<this.slider_items_length; i++) {
				slider_transform = this.slider_items[i].style.transform.split(" ");
				slider_transform[1] = "rotateZ("+this.reverse_rotate_z+"deg)";
				this.slider_items[i].style.transform = slider_transform.join(" ");
			}
		}
		//////////////////////////////////////////////////

		//////////////////////////////////////////////////
		// Distance function
		//////////////////////////////////////////////////
		initDistance(dist) {
			this.dist = dist || 1.0;
			if(this.dist < 1.0 || this.dist > 2.0) {
				return console.log("dist is only \"1.0 <= dist <= 2.0\"");
			}
			this.reverse_dist = 2.0 - this.dist;
		}
		setDistance(dist) {
			this.initDistance(dist);
			this.translate_z = this.perspective_basic*this.perspective_div*this.dist/2;
			var slider_transform;
			for(var i=0; i<this.slider_items_length; i++) {
				slider_transform = this.slider_items[i].style.transform.split(" ");
				slider_transform[2] = "translateZ("+this.translate_z+"px)";
				slider_transform[3] = "scale("+this.reverse_dist+")";
				this.slider_items[i].style.transform = slider_transform.join(" ");
			}
		}
		//////////////////////////////////////////////////

		//////////////////////////////////////////////////
		// Button function
		//////////////////////////////////////////////////
		initButton() {
			// button object setting
			if(this.axis === "Y") {
				this.btn_prev.innerHTML = btn_left;
				this.btn_next.innerHTML = btn_right;
			} else {
				this.btn_prev.innerHTML = btn_top;
				this.btn_next.innerHTML = btn_bottom;
			}
			// button position setting
			this.axis === "Y" ? this.perspective_object.style.flexDirection = "row" : this.perspective_object.style.flexDirection = "column";
		}
		//////////////////////////////////////////////////

		//////////////////////////////////////////////////
		// Perspective function
		//////////////////////////////////////////////////
		setPerspectiveOrigin(value) {
			this.perspective_object.style.perspectiveOrigin = value;
		}
		//////////////////////////////////////////////////

		//////////////////////////////////////////////////
		// AutoPlay function
		//////////////////////////////////////////////////
		setAutoPlay(ms) {
			var slider = this;
			this.interval = setInterval(function() {
				slider.rotate(slider, slider.deg*(-1));
			}, ms);

		}
		stopAutoPlay() {
			clearInterval(this.interval);
		}
		//////////////////////////////////////////////////

		//////////////////////////////////////////////////
		// swipe function
		//////////////////////////////////////////////////
		swipe() {
			
		}
		//////////////////////////////////////////////////
	}
})(this);