module.exports = function(app) {
  app.controller('photoCtrl', ['$rootScope', '$scope', '$http', function($rootscope, $scope, $http) {

    $scope.url = 'test';

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
        });
    };

    $scope.removePhoto = function(url) {

      //remove photo shit here
    };
  }]);
};
