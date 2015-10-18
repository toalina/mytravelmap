var menuLeft = document.getElementById( 'nav-main-s1' ),

    showLeft = document.getElementById( 'showLeft' ),

    body = document.body;

$('#showLeft').on('click', function() {
  classie.toggle( this, 'active' );
  classie.toggle( menuLeft, 'nav-main-open' );
  disableOther( 'showLeft' );
});



// function disableOther( button ) {
//   if( button !== 'showLeft' ) {
//     classie.toggle( showLeft, 'disabled' );
//   }
//   if( button !== 'showRight' ) {
//     classie.toggle( showRight, 'disabled' );
//   }
//   if( button !== 'showTop' ) {
//     classie.toggle( showTop, 'disabled' );
//   }
//   if( button !== 'showBottom' ) {
//     classie.toggle( showBottom, 'disabled' );
//   }
//   if( button !== 'showLeftPush' ) {
//     classie.toggle( showLeftPush, 'disabled' );
//   }
//   if( button !== 'showRightPush' ) {
//     classie.toggle( showRightPush, 'disabled' );
//   }
// }
