'use strict';

$('.welcome a').on('click', function(e) {
  e.preventDefault();
  var target = this.hash;
  var $target = $(target);
  var $targetOffset = $target.offset().top-80;
  // top-80 is for where the scroll stops
  // offset from top by 80px
  $('html, body').stop().animate({
      'scrollTop': $targetOffset
  }, 1600, 'swing', function () {
      window.location.hash = target;
  });
});

// Adapted from: http://www.paulund.co.uk/smooth-scroll-to-internal-links-with-jquery
