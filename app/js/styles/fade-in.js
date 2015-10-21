'use strict';

// dashboard links
$('.fade-in').hide(0).delay(1000).fadeIn(3000);

'use strict';

$('.searchbox-input').hide();

$('.icon-search').on('click', function() {
  $('.searchbox-input').animate({width:'toggle'},800);
});

