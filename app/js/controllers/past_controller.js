module.exports = function(app) {
  app.controller('PastController', ['$location', '$cookies', function($location, $cookies) {

    var eat = $cookies.get('eat');
    if (!(eat && eat.length))
      $location.path('/signup');

    }
  ]);
};
