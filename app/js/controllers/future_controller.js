module.exports = function(app){
  app.controller('FutureTripsController', ['$scope', '$http', '$location', '$cookies', function($scope, $http, $location, $cookies){
    
    var eat = $cookies.get('eat');
    if (!(eat && eat.length))
      $location.path('/signup');
    
    $http.defaults.headers.common.token = eat;
    
    $scope.trips;
    $scope.getTrips = function(){
      $http.get('/api/locations/getAll')
      .then(
        function(res){
          $scope.trips = res.data;
        },
        function(res){
          console.log(res);
          console.log('we had an error in Future Trips Get All');
        }
      )
    }

  }]);
};