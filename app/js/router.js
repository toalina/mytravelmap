module.exports = function(mapsApp) {
  mapsApp.config('$routeProvider', function($route){
    $route
      .when('/locations/getAll', {
        controller: 'locationCtrl'
      })
      .otherwise({
        redirectTo: '/locations/getAll'
      });
  });
}