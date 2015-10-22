module.exports = function(mapsApp) {
  mapsApp.config(['$routeProvider', function($route){
    $route
      .when('/welcome', {
        templateUrl: 'views/welcome.html'
        // controller: Set the $location.path
        // to go to /#/dashboard
      })
      .when('/dashboard', {
        templateUrl: 'views/dashboard.html'
      })
      .when('/signin', {
        templateUrl: 'views/signin.html',
        controller: 'SigninController'
      })
      .when('/signup', {
        templateUrl: 'views/signup.html',
        controller: 'SignupController'
      })
      .when('/future', {
        templateUrl: 'views/future-trips.html',
        controller: 'TripsController'
      })
      .when('/past', {
        templateUrl: 'views/past-trips.html',
        controller: 'TripsController'
      })
      .when('/map', {
        templateUrl: 'views/google-map.html'
        // controller? : Maybe it'll go to form?
      })
      .when('/plan', {
        templateUrl: 'views/plan.html'
      })
      .when('/photos', {
        templateUrl: 'views/photos.html'
      })
      .when('/memos', {
        templateUrl: 'views/memos.html'
      })
      .when('/bookmarks', {
        templateUrl: 'views/bookmarks.html'
      })
      .when('/form', {
        templateUrl: 'views/add-edit-form.html',
        controller: 'photoCtrl'
      })
      .when('/summary', {
        templateUrl: 'views/summary.html'
      })

      .otherwise({
        redirectTo: '/welcome',
      });
  }])

  // angular-animate to fade in views
  .animation('.reveal-animation', function() {
    return {
      enter: function(element, done) {
        element.css('display', 'none');
        element.fadeIn(800, done);
        return function() {
          element.stop();
        };
      },
      leave: function(element, done) {
        element.fadeOut(800, done);
        return function() {
          element.stop();
        };
      }
    };
  });
};
