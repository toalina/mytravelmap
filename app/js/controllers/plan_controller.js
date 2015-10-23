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
    }

    var myUrl;
    $scope.addPhoto = function() {
      cloudinary.openUploadWidget({
        cloud_name: 'dhtizamqh',
        upload_preset: 'bslsfe4i'
        },
        function(error, result) {
          if (error)
            console.log(error);
          if (result)
            console.log('from controller ', result[0].url);
            myURL = (result[0].url);  // save photo in the database
            alert(myURL)
            $scope.sendPhoto(myURL);
        });
    };

    $scope.sendPhoto = function(str){
      console.log(str);
      $http({
        method: 'PUT',
        url: '/api/locations/addphoto/' + $scope.tripInfo2._id,
        data: {'picture':str}
        }) 
      .then(
        function(res){alert('succccccceeeeeessssss on send photo')},
        function(res){alert('faaaaaaaaail on sent photo')}
      )
    }




  }]);
};




