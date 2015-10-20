module.exports = function(app) {
  app.controller('locationCtrl', ['$scope', '$http', 'Gservice', function($scope, $http, Gservice){

    var locations = [];           
    var googleMapService = Gservice(locations);

    $scope.getAll = function() {
      $http.get('/api/locations/getAll')
      .then(
        function(res){
          locations = res.data;
          googleMapService.initMap(locations);
        },
        function(res){
          alert('not working');
        }
      )
    };

    $scope.createLocation = function(location) {
      $http.post('/api/locations/create', location)
      .then(
        function(res){
          console.log('SUCCESS MOTHA FUCKA!!!!!!!!!!!!!!!')
          locations.push(res.data);
          googleMapService.setMarker(location); 
      },
        function(res){
          alert('Didnt work');
        }
      );
      // googleMapService.setMarker(location);
    };

    $scope.updateLocation = function(location) {
      locationResource.update(location, function(err){
        location.editing = false;
        if (err) return console.log(err);
        googleMapService.setMarker(location);
      });
    };

    $scope.deleteLocation = function(location) {
      locationResource.remove(location, function(err){
        if (err) return console.log(err);
        $scope.locations.splice($scope.locations.indexOf(location), 1);
      });
    };
  }]);
};


