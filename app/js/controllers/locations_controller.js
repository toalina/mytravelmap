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
    
    $scope.google.maps.event.addListener(googleMapService.this.map,'click', function(event){
                  console.log(event.latLng);
                  
      });
    $scope.createLocation = function(location) {
      $http.post('/api/locations/create', location)
      .then(
        function(res){
          locations.push(res.data);
          googleMapService.setMarker(location);
          location.lat = '';
          location.lng = '';
          location.memo = '';
          location.name = ''; 
      },
        function(res){
          alert('Didnt work');
        }
      );
    };

    $scope.updateLocation = function(location) {
      locationResource.update(location, function(err){
        location.editing = false;
        if (err) return console.log(err);
        googleMapService.setMarker(location);
      });
    };

    $scope.deleteLocation = function(location) {
      $http.delete('/delete/')
    };
  }]);
};


