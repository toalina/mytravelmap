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

    $scope.updatePlan = function(updateForm){
      alert($scope.tripInfo2._id);
      $http.put('/api/locations/update/' + $scope.tripInfo2._id, updateForm)
      .then(
        function(res){console.log('Update Successful!!!')},
        function(res){console.log('Failed to update record')}
      )
    };

    $scope.photo0 = "https://res-4.cloudinary.com/dhtizamqh/image/upload/t_media_lib_thumb/v1445453242/q9l0fccwgmei03pywurd.jpg";
    $scope.photo1 = "https://res-4.cloudinary.com/dhtizamqh/image/upload/t_media_lib_thumb/v1445453242/q9l0fccwgmei03pywurd.jpg";
    $scope.photo2 = "https://res-4.cloudinary.com/dhtizamqh/image/upload/t_media_lib_thumb/v1445453242/q9l0fccwgmei03pywurd.jpg";
    $scope.photo3 = "https://res-4.cloudinary.com/dhtizamqh/image/upload/t_media_lib_thumb/v1445469204/lpyfude00vt1ihsvlyej.jpg";
    $scope.photo4 = "https://res-4.cloudinary.com/dhtizamqh/image/upload/t_media_lib_thumb/v1445453242/q9l0fccwgmei03pywurd.jpg";
    $scope.photo5 = "https://res-4.cloudinary.com/dhtizamqh/image/upload/t_media_lib_thumb/v1445453242/q9l0fccwgmei03pywurd.jpg";

    $scope.photoPopulater = function(){

    };



  }]);
};




