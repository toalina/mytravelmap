var menuRight = document.getElementById( 'nav-main-s2' ),
    showRight = document.getElementById( 'showRight' ),
    body = document.body;

$('#showRight').on('click', function() {
  classie.toggle( this, 'active' );
  classie.toggle( menuRight, 'nav-main-open' );
});

