module.exports = function(app) {
  app.controller('locationCtrl', ['$rootScope','$scope','$http', 'Gservice', function($rootScope, $scope, $http, Gservice){

    $scope.locations = [];           
    var googleMapService = Gservice($scope.locations);

    $scope.lat = 'LATITUDE';
    $scope.lng = 'LONGITUDE';
    $scope.name = 'NAME';
    $scope.temp = {};

    $scope.modalShown = false;
    $scope.addTrip = false;

    $scope.toggleModal = function() {
      console.log('toggleModal!!');
      $scope.modalShown = !$scope.modalShown;
    };
    $scope.hideModal = function() {
       $scope.modalShown = !$scope.modalShown;
       $scope.addTrip = false;
    };

    $rootScope.$on('geocodeLatLng', function(event, geocoder, data){
      geocoder.geocode({'location': data}, function(results, status) {
        if (status === google.maps.GeocoderStatus.OK){
          if (results[1]) {
            $scope.$apply(function(){
              $scope.click = true;
              $scope.lat = data.lat;
              $scope.lng = data.lng;
              $scope.name = results[1].formatted_address;
              console.log('geocode: ' + $scope.name);
              $scope.temp = { lat: data.lat, lng: data.lng, name: results[1].formatted_address};
            });
          };
        };
      });
      $scope.toggleModal();
    });

    $scope.getAll = function() {
      $http.get('/api/locations/getAll')
      .then(
        function(res){
          $scope.locations = res.data;
          googleMapService.initMap($scope.locations);
        },
        function(res){
          alert('not working');
        }
      )
    };

    $scope.createFutureTrip = function(location) {
      $scope.hideModal();
      $http.post('/api/locations/create', location)
      .then(
        function(res){
          location.lat = $scope.temp.lat;
          location.lng = $scope.temp.lng;
          location.memo = '';
          location.name = $scope.temp.name; 
          location.type = 'future';
          $scope.locations.push(location);
          console.log('create future trip');
          googleMapService.setMarker(location);          
      },
        function(res){
          alert('Didnt work');
        }
      )
    };

    $scope.createPastTrip = function(location) {
      $scope.hideModal();
      $http.post('/api/locations/create', location)
      .then(
        function(res){
          location.lat = $scope.temp.lat;
          location.lng = $scope.temp.lng;
          location.memo = '';
          location.name = $scope.temp.name; 
          location.type = 'past';
          $scope.locations.push(location);
          console.log('create past trip');
          googleMapService.setMarker(location);          
      },
        function(res){
          alert('Didnt work');
        }
      )
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