/*! jquery-pushy - v0.2 - 2014-12-26
* jQuery Navigation Menu plugin using Responsive CSS transforms &amp; transitions with multiple instances and differents positions (left / right / top)
* https://github.com/eduestrella/jquery-pushy
* by Eduardo Estrella Rosario
*/

$.fn.Pushy = function(options) {

	// CONSTANTS
	var POSITION_TOP = "top";
	var POSITION_LEFT = "left";
	var POSITION_RIGHT = "right";

	// SCOPE
	var that = this;

	// PUSHY INSTANCES
 	var instanceNumber = $.fn.Pushy.numInstances = ($.fn.Pushy.numInstances || 0) + 1; 	
 	
 	// SETTINGS
	var options = options || {};

	this.menu = this.selector || "#menuPushy";
	this.button = options.button || "menu-pushy-button";
	this.container = options.container || "container";
	this.containerPush = (options.containerPush == undefined ? true : options.containerPush);
	this.containerCustomClass = options.containerClass || ""; 
	this.menuPosition = options.menuPosition || POSITION_LEFT;
	this.menuOpen = (options.menuOpen == undefined ? false : options.menuOpen);
	this.overlayShow = (options.overlayShow == undefined ? true : options.overlayShow);

	// FORMAT INPUT DATA
	this.menuPosition = this.menuPosition.toLowerCase();
	
	// CREATE DYNAMIC OVERLAY DIV
	if( this.overlayShow === true){
		$(this.menu).after('<div id="pushyOverlay'+ instanceNumber +'" ></div>');		
	}

	// GLOBAL VARS
	var pushy = $(this.menu), //menu css class
		body = $('body'),
		container = $('#'+this.container), //container css class
		overlayPushy = $('#pushyOverlay'+ instanceNumber), //site overlay
		push = $('.push'), //css class to add pushy capability
		menuBtn = $('.'+this.button), //css classes to toggle the menu
		menuSpeed = 200, //jQuery fallback menu speed
		menuWidth = pushy.width() + "px",//jQuery fallback menu width
		pushClass = "push-push", //css class to add pushy capability
		pushyClass = "pushy-" + this.menuPosition + " pushy-" + this.menuPosition + "-open", //menu position & menu open class
		pushyActiveClass = "overlay-pushy overlay-active ", //css class to toggle site overlay
		containerClass = "container-" + this.menuPosition + "-push" +  " " + this.containerCustomClass; //container open class

	// DEFAULT CSS CLASSES
	pushy.addClass('pushy pushy-' + this.menuPosition);
	menuBtn.addClass('menu-btn');	
	
	// DEFAULT STATUS MENU (open / close)
	if(this.menuOpen === true){
		togglePushy();
	}

	function togglePushy(){				
		overlayPushy.toggleClass(pushyActiveClass); 
		pushy.toggleClass(pushyClass);
		push.toggleClass(pushClass); //css class to add pushy capability
		
		if(that.containerPush){
			container.toggleClass(containerClass);
			

			// if TOP position the height calculate dynamicaly
			if(that.menuPosition == POSITION_TOP){
				if(isOpenPushy())
				{
					container.css('transform', 'translate3d(0,' + pushy.height() + 'px,0)');							
				}else{
					container.css('transform', 'translate3d(0,0,0)');		
				}				
			}
		}
	}

	function isOpenPushy(){
		var open = false;

		switch(that.menuPosition){
			case POSITION_TOP:
				open = pushy.hasClass("pushy-top-open");
			break;
			case POSITION_LEFT:
				open = pushy.hasClass("pushy-left-open");	
			break;
			case POSITION_RIGHT:
				open = pushy.hasClass("pushy-right-open");
			break;
		}

		return open;
	}

	function openPushyFallback(){
		overlayPushy.addClass(pushyActiveClass);
		pushy.animate({left: "0px"}, menuSpeed);
		container.animate({left: menuWidth}, menuSpeed);
		push.animate({left: menuWidth}, menuSpeed); //css class to add pushy capability
	}

	function closePushyFallback(){
		overlayPushy.removeClass(pushyActiveClass);
		pushy.animate({left: "-" + menuWidth}, menuSpeed);
		container.animate({left: "0px"}, menuSpeed);
		push.animate({left: "0px"}, menuSpeed); //css class to add pushy capability
	}

	//checks if 3d transforms are supported removing the modernizr dependency
	cssTransforms3d = (function csstransforms3d(){
		var el = document.createElement('p'),
		supported = false,
		transforms = {
		    'webkitTransform':'-webkit-transform',
		    'OTransform':'-o-transform',
		    'msTransform':'-ms-transform',
		    'MozTransform':'-moz-transform',
		    'transform':'transform'
		};

		// Add it to the body to get the computed style
		document.body.insertBefore(el, null);

		for(var t in transforms){
		    if( el.style[t] !== undefined ){
		        el.style[t] = 'translate3d(1px,1px,1px)';
		        supported = window.getComputedStyle(el).getPropertyValue(transforms[t]);
		    }
		}

		document.body.removeChild(el);

		return (supported !== undefined && supported.length > 0 && supported !== "none");
	})();

	if(cssTransforms3d){
		//toggle menu
		menuBtn.click(function() {
			togglePushy();
		});
		
		//close menu when clicking site overlay
		overlayPushy.click(function(){ 			
			togglePushy();
		});
		
	}else{
		//jQuery fallback
		pushy.css({left: "-" + menuWidth}); //hide menu by default
		container.css({"overflow-x": "hidden"}); //fixes IE scrollbar issue

		//keep track of menu state (open/close)
		var state = true;

		//toggle menu
		menuBtn.click(function() {
			if (state) {
				openPushyFallback();
				state = false;
			} else {
				closePushyFallback();
				state = true;
			}
		});

		//close menu when clicking site overlay
		siteOverlay.click(function(){ 
			if (state) {
				openPushyFallback();
				state = false;
			} else {
				closePushyFallback();
				state = true;
			}
		});
	}
}
