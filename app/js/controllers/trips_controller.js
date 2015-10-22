module.exports = function(app){
  app.controller('TripsController', ['$scope', '$http', '$location', '$cookies', function($scope, $http, $location, $cookies){
    
    var eat = $cookies.get('eat');
    if (!(eat && eat.length))
      $location.path('/signup');
    
    $http.defaults.headers.common.token = eat;
    
    $scope.trips;
    $scope.getFutureTrips = function(){
      $http.get('/api/locations/getAll')
      .then(
        function(res){
          // $scope.trips = res.data;
          var x = res.data;
          var g = x.filter(function(item){
            return item.type === "future";
          });
          $scope.trips = g;
        },
        function(res){
          console.log(res);
          console.log('we had an error in Future Trips Get All');
        }
      )
    }
    $scope.pastTrips;
    $scope.getPastTrips = function(){
      $http.get('/api/locations/getAll')
      .then(
        function(res){
          var y = res.data;
          var h = y.filter(function(item){
            return item.type === "past";
          });
          $scope.pastTrips = h;
        },
        function(res){
          console.log(res);
          console.log('we had an error in Future Trips Get All');
        }
      )
    }

  }]);
};