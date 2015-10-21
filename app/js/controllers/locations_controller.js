module.exports = function(app) {
  app.controller('locationCtrl', ['$rootScope','$scope','$http', 'Gservice', function($rootScope, $scope, $http, Gservice){

    var locations = [];
    var googleMapService = Gservice(locations);

    $scope.lat = 'LATITUDE';
    $scope.lng = 'LONGITUDE';
    $scope.name = 'NAME';
    $scope.temp = {};

    $scope.modalShown = false;

    $scope.toggleModal = function() {
      console.log('toggleModal!!');
      $scope.modalShown = !$scope.modalShown;
    };
    $scope.testSubmit = function() {
      $scope.modalShown = !$scope.modalShown;
      console.log('close windoW!!!: ' + $scope.modalShown);
    }

    // $rootScope.$on('userLatLng', function(event, data){
    //   $scope.$apply(function(){
    //     $scope.lat = data.lat;
    //     $scope.lng = data.lng;
    //   });
    // });

    $rootScope.$on('geocodeLatLng', function(event, geocoder, data){
      geocoder.geocode({'location': data}, function(results, status) {
        if (status === google.maps.GeocoderStatus.OK){
          if (results[1]) {
            $scope.$apply(function(){
              $scope.click = true;
              $scope.lat = data.lat;
              $scope.lng = data.lng;
              $scope.name = results[1].formatted_address;
              $scope.temp = { lat: data.lat, lng: data.lng, name: results[1].formatted_address};
            });
          };
        };
      });
      console.log('temp stuff!: ' + $scope.temp.name);
      $scope.toggleModal();
    });

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
