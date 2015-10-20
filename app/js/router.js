module.exports = function(mapsApp) {
  mapsApp.config(['$routeProvider', function($routeProvider){
    $routeProvider
      .when('/locations/getAll', {
        controller: 'locationCtrl'
      })
      .otherwise({
        redirectTo: '/locations/getAll'
      });
  }]);
}