module.exports = function(app) {
  app.controller('locationCtrl', ['$scope', 'Resource', 'Gservice', function($scope, Resource, Gservice){
    $scope.locations = [];
    var locationResource = Resource('locations');
    var googleMapService = Gservice($scope.locations);

    $scope.getAll = function() {
      locationResource.getAll(function(err, data){
        if (err) return console.log(err);
        $scope.locations = data;
        googleMapService.initMap($scope.locations);
      });
    };

    $scope.createLocation = function(location) {
      locationResource.create(location, function(err, data){
        if (err) return console.log(err);
        $scope.locations.push(data);
        $scope.newLocation = null;
        googleMapService.setMarker(location);
      });
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


