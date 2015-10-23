module.exports = function(app) {
  app.controller('locationCtrl', ['$rootScope','$scope','$http', 'Gservice', '$location', '$cookies', function($rootScope, $scope, $http, Gservice, $location, $cookies){

    $scope.locations = [];

    var googleMapService = Gservice($scope.locations);

    var eat = $cookies.get('eat');
    if (!(eat && eat.length))
      $location.path('/signup');

    $http.defaults.headers.common.token = eat;

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
          alert('not working!!!!');
        }
      )
    };


    $scope.createFutureTrip = function(location) {
      $scope.temp.type= 'future';
      $scope.temp.start = location.start;
      $scope.temp.end = location.start + location.durate;
      $scope.hideModal();
      $http.post('/api/locations/create', $scope.temp)
      .then(
        function(res){
          $scope.locations.push($scope.temp);
          googleMapService.setMarker($scope.temp);
          $scope.temp = null;
      },
        function(res){
          alert('Didnt work');
        }
      )
    };

    $scope.createPastTrip = function(location) {
      $scope.temp.type='past';
      $scope.temp.start = location.start;
      $scope.temp.end = location.start + location.durate;
      $scope.hideModal();
      $http.post('/api/locations/create', $scope.temp)
      .then(
        function(res){
          $scope.locations.push($scope.temp);
          googleMapService.setMarker($scope.temp);
          $scope.temp = null;
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
      $http.delete('/api/locations/delete/' + location._id, function(err, res) {
        if (err) return console.log(err);
      })
      $scope.getAll();
      $location.path('/map');
    };


    $scope.deleteTemp;

    $scope.deleteTrip = function() {
      $http.get('api/locations/getAll')
      .then(
        function(res){
          $scope.locations = res.data;
          var x = $scope.locations.filter(function(item){
            return item.name === $scope.anchor;
          });
          $scope.deleteTemp = x[0];
          $scope.deleteLocation($scope.deleteTemp);
        }, function(res){
          console.log('did not get plan data');
        }
    )};

    $scope.getSummary = function() {
      $http.get('api/locations/getAll')
      .then(
        function(res){
          $scope.locations = res.data;
          var x = $scope.locations.filter(function(item){
            return item.name === $scope.anchor;
          });
          $scope.temp = x[0];
        }, function(res){
          console.log('did not get plan data');
        }
      )
    };

    $scope.do = function(){

    }

  }]);
};
