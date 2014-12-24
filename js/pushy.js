/*! jquery-pushy - v0.1 - 2014-12-23
* jQuery Navigation Menu plugin using Responsive CSS transforms &amp; transitions with multiple instances and differents positions (left / right / top)
* https://github.com/eduestrella/jquery-pushy
* by Eduardo Estrella Rosario
*/

$.fn.Pushy = function(options) {

	// number of Pushy instances
 	var instanceNumber = $.fn.Pushy.numInstances = ($.fn.Pushy.numInstances || 0) + 1;

 	// settings
	var options = options || {};

	this.menu = this.selector || "#menuPushy";
	this.button = options.button || "menuPushyButton";
	this.container = options.container || "container";
	this.menuPosition = options.menuPosition || "left";
	this.menuOpen = (options.menuOpen == undefined ? false : options.menuOpen);
	this.overlayShow = (options.overlayShow == undefined ? true : options.overlayShow);

	// Create the Overlay Div
	if( this.overlayShow === true){
		$('body').prepend('<div id="pushyOverlay'+ instanceNumber +'" ></div>');		
	}

	// Global vars
	var pushy = $(this.menu), //menu css class
		body = $('body'),
		container = $('#'+this.container), //container css class
		overlayPushy = $('#pushyOverlay'+ instanceNumber), //site overlay
		menuBtn = $('#'+this.button), //css classes to toggle the menu
		menuSpeed = 200, //jQuery fallback menu speed
		menuWidth = pushy.width() + "px",//jQuery fallback menu width
		pushyClass = "pushy-" + this.menuPosition + " pushy-" + this.menuPosition + "-open", //menu position & menu open class
		pushyActiveClass = "overlay-pushy overlay-active ", //css class to toggle site overlay
		containerClass = "container-" + this.menuPosition + "-push"; //container open class

	// Adding Default CSS classes
	pushy.addClass('pushy pushy-' + this.menuPosition);
	menuBtn.addClass('menu-btn');

	// Default Menu status (open / close)
	if(this.menuOpen === true){
		togglePushy();
	}

	function togglePushy(){				
		overlayPushy.toggleClass(pushyActiveClass); 
		pushy.toggleClass(pushyClass);
		container.toggleClass(containerClass);
	}

	function openPushyFallback(){
		overlayPushy.addClass(pushyActiveClass);
		pushy.animate({left: "0px"}, menuSpeed);
		container.animate({left: menuWidth}, menuSpeed);		
	}

	function closePushyFallback(){
		overlayPushy.removeClass(pushyActiveClass);
		pushy.animate({left: "-" + menuWidth}, menuSpeed);
		container.animate({left: "0px"}, menuSpeed);
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