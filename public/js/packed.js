/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(1);
	__webpack_require__(2);
	__webpack_require__(3);

	// require('./slick/slick.js');
	__webpack_require__(4);
	// require('./slick/jquery.js');
	__webpack_require__(5);
	__webpack_require__(6);



/***/ },
/* 1 */
/***/ function(module, exports) {

	'use strict';

	$('.searchbox-input').hide();

	$('.icon-search').on('click', function() {
	  $('.searchbox-input').animate({width:'toggle'},800);
	});



/***/ },
/* 2 */
/***/ function(module, exports) {

	( function( window ) {

	'use strict';

	// class helper functions from bonzo https://github.com/ded/bonzo

	function classReg( className ) {
	  return new RegExp("(^|\\s+)" + className + "(\\s+|$)");
	}

	// classList support for class management
	// altho to be fair, the api sucks because it won't accept multiple classes at once
	var hasClass, addClass, removeClass;

	if ( 'classList' in document.documentElement ) {
	  hasClass = function( elem, c ) {
	    return elem.classList.contains( c );
	  };
	  addClass = function( elem, c ) {
	    elem.classList.add( c );
	  };
	  removeClass = function( elem, c ) {
	    elem.classList.remove( c );
	  };
	}
	else {
	  hasClass = function( elem, c ) {
	    return classReg( c ).test( elem.className );
	  };
	  addClass = function( elem, c ) {
	    if ( !hasClass( elem, c ) ) {
	      elem.className = elem.className + ' ' + c;
	    }
	  };
	  removeClass = function( elem, c ) {
	    elem.className = elem.className.replace( classReg( c ), ' ' );
	  };
	}

	function toggleClass( elem, c ) {
	  var fn = hasClass( elem, c ) ? removeClass : addClass;
	  fn( elem, c );
	}

	window.classie = {
	  // full names
	  hasClass: hasClass,
	  addClass: addClass,
	  removeClass: removeClass,
	  toggleClass: toggleClass,
	  // short names
	  has: hasClass,
	  add: addClass,
	  remove: removeClass,
	  toggle: toggleClass
	};

	})( window );


/***/ },
/* 3 */
/***/ function(module, exports) {

	var menuRight = document.getElementById( 'nav-main-s2' ),
	    showRight = document.getElementById( 'showRight' ),
	    body = document.body;

	$('#showRight').on('click', function() {
	  classie.toggle( this, 'active' );
	  classie.toggle( menuRight, 'nav-main-open' );
	});



/***/ },
/* 4 */
/***/ function(module, exports) {

	'use sctrict';
	$(document).ready(function(){
	  $('.carousel-wrapper').slick({
	    dots: true,
	    arrows: false,
	    autoplay: true,
	    autoplaySpeed: 5000
	  });
	});


/***/ },
/* 5 */
/***/ function(module, exports) {

	/* scroll-up-bar v0.3.0 (https://github.com/eduardomb/scroll-up-bar) */
	(function($) {
	  'use strict';

	  var _destroyFn;

	  $.scrollupbar = function($bar, options) {
	    // Default options
	    options = $.extend({
	      enterViewport: $.noop,
	      fullyEnterViewport: $.noop,
	      exitViewport: $.noop,
	      partiallyExitViewport: $.noop
	    }, options);

	    function isFullyInViewport() {
	      return $window.scrollTop() <= $bar.offset().top;
	    }

	    function isInViewport() {
	      return $window.scrollTop() < $bar.offset().top + $bar.outerHeight();
	    }

	    var $window = $(window),
	        $document = $(document),
	        minY = $bar.css('position') == 'fixed' ? 0 : $bar.offset().top,
	        lastY = $window.scrollTop(), // Use last Y to detect scroll direction.
	        initialPosTop = $bar.position().top,
	        iOS = /(iPad|iPhone|iPod)/g.test(navigator.userAgent),
	        timeout;

	    $.scrollupbar.isInViewport = isInViewport();
	    $.scrollupbar.isFullyInViewport = isFullyInViewport();

	    // iOS can't handle momentum scroll properly (See discussion on
	    // http://stackoverflow.com/questions/2863547).
	    if (!iOS) {
	      $window.on('scroll.scrollupbar', function() {
	        var y = $window.scrollTop(),
	            barHeight = $bar.outerHeight();

	        // Ignore elastic scrolling.
	        if (y < 0 || y > ($document.height() - $window.height())) {
	          return;
	        }

	        // Cancel the event fired by the previous scroll.
	        if (timeout) {
	          clearTimeout(timeout);
	        }

	        if (y < lastY) { // Scrolling up
	          // If the bar is hidden, place it right above the top frame.
	          if (!$.scrollupbar.isInViewport && lastY - barHeight >= minY) {
	            $bar.css('top', lastY - barHeight);
	            $.scrollupbar.isInViewport = true;
	            options.enterViewport();
	          }

	          // Scrolls up bigger than the bar's height fixes the bar on top.
	          if (isFullyInViewport()) {
	            if (y >= minY) {
	              $bar.css({
	                'position': 'fixed',
	                'top': 0
	              });
	            } else {
	              $bar.css({
	                'position': 'absolute',
	                'top': initialPosTop
	              });
	            }

	            if (!$.scrollupbar.isFullyInViewport) {
	              $.scrollupbar.isFullyInViewport = true;
	              options.fullyEnterViewport();
	            }
	          }

	          // Fire an event to reveal the entire bar after 400ms if the scroll
	          // wasn't big enough.
	          timeout = setTimeout(function() {
	            if (!isFullyInViewport()) {
	              $bar.css({
	                'position': 'fixed',
	                'top': $bar.offset().top - y
	              });

	              $bar.animate({'top': 0}, 100, function() {
	                $.scrollupbar.isFullyInViewport = true;
	                options.fullyEnterViewport();
	              });
	            }
	          }, 400);
	        } else if (y > lastY) { // Scrolling down
	          // Unfix the bar allowing it to scroll with the page.
	          if ($.scrollupbar.isFullyInViewport) {
	            $bar.css({
	              'position': 'absolute',
	              'top': lastY > minY ? lastY : initialPosTop
	            });

	            if (!isFullyInViewport()) {
	              $.scrollupbar.isFullyInViewport = false;
	              options.partiallyExitViewport();
	            }
	          }

	          if ($.scrollupbar.isInViewport && !isInViewport()) {
	            $.scrollupbar.isInViewport = false;
	            options.exitViewport();
	          }

	          // Fire an event to hide the entire bar after 400ms if the scroll
	          // wasn't big enough.
	          timeout = setTimeout(function() {
	            if (isInViewport() && y - barHeight >= minY) {
	              $bar.animate({'top': y - barHeight}, 100, function() {
	                $.scrollupbar.isInViewport = false;
	                options.exitViewport();
	              });
	            }
	          }, 400);
	        }

	        lastY = y;
	      });
	    } else { // Fallback simplified behaviour for iOS.
	      $window.on('touchstart.scrollupbar', function () {
	        lastY = $window.scrollTop();
	      });

	      $window.on('touchend.scrollupbar', function () {
	        var y = $window.scrollTop();

	        if (y < lastY || y - $bar.outerHeight() < minY) { // Scrolling up
	          if (y <= minY) {
	            // Restore original position.
	            $bar.css({
	              'position': 'absolute',
	              'top': initialPosTop
	            });

	            $bar.show(function() {
	              $.scrollupbar.isInViewport = true;
	              $.scrollupbar.isFullyInViewport = true;
	              options.enterViewport();
	              options.fullyEnterViewport();
	            });
	          } else {
	            $bar.css({
	              'position': 'fixed',
	              'top': 0
	            });

	            $.scrollupbar.isInViewport = true;
	            options.enterViewport();

	            $bar.slideDown(function() {
	              $.scrollupbar.isFullyInViewport = true;
	              options.fullyEnterViewport();
	            });
	          }
	        } else if (y > lastY) { // Scrolling down
	          $.scrollupbar.isFullyInViewport = false;
	          options.partiallyExitViewport();

	          $bar.slideUp(function() {
	            $.scrollupbar.isInViewport = false;
	            options.exitViewport();
	          });
	        }

	        lastY = y;
	      });
	    }

	    _destroyFn = function() {
	      // Unbind all listeners added by scrollupbar plugin
	      $window.off('.scrollupbar');

	      // Restore original bar position.
	      $bar.css({
	        'position': 'absolute',
	        'top': initialPosTop
	      });
	    };

	    return $bar;
	  };

	  $.scrollupbar.destroy = function() {
	    if (_destroyFn) {
	      return _destroyFn();
	    }
	  };

	  $.fn.scrollupbar = function(options) {
	    return $.scrollupbar(this, options);
	  };
	})(jQuery);


/***/ },
/* 6 */
/***/ function(module, exports) {

	$('#topbar').scrollupbar();


/***/ }
/******/ ]);