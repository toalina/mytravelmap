module.exports = function(app){
  app.controller('PlanController', ['$rootScope', '$scope', '$http', '$location', '$cookies', function($rootScope, $scope, $http, $location, $cookies){
    
    var eat = $cookies.get('eat');
    if (!(eat && eat.length))
      $location.path('/signup');
    
    $http.defaults.headers.common.token = eat;

    $scope.test = function(){
      console.log($scope.anchor);
    }

    var arr;
    $scope.tripInfo;
    $scope.tripInfo2;

    $scope.getPlan = function(){
      $http.get('/api/locations/getAll')
      .then(
        function(res){
          $scope.tripInfo = res.data;
          var x = $scope.tripInfo.filter(function(item){
            return item.name === $scope.anchor;
          });
          $scope.tripInfo2 = x[0];
        },
        function(res){
          console.log('did not get plan data');
        }

      )
    };

  }]);
};




