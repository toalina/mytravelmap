module.exports = function(app) {
  app.controller('deleteCtrl', ['$rootScope','$scope', '$http', '$base64', '$location', '$cookies', function($rootScope, $scope, $http, $base64, $location, $cookies) {
    $scope.name;

    $rootScope.$on('markerOpening', function(event, tempName){
      $scope.$apply(function(){
      $scope.name = tempName;
      alert($scope.name);
      console.log($scope.name);
      });
    });


  }]);
};
