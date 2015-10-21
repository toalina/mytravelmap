var handleSuccess = function(callback) {
  return function(res) {
    callback(null, res.data);
  };
};

var handleFailure = function(callback) {
  return function(data) {
    callback(data);
  };
};

module.exports = function(app) {
  app.factory('Resource', ['$scope', '$rootScope', '$routeParams', '$location', '$upload',
    function($scope, $rootScope, $routeParams, $location, $upload) {
      var Resource = function(resourceName) {
      this.resourceName = resourceName;
    };

    Resource.prototype.upload = function(resource) {
      var d = new Date();
      $scope.title = "Image (" + d.getDate() + "-" + d.getHours() + ":" + d.getSecods() = ")";
      $scope.uploadFiles = function(files) {
        $scope.files = files;
        if (!$scope.files) return;
        angular.forEach(files, function(file) {
          if (file && !file.error) {
            file.upload = $upload.upload({
              url: "https://api.cloudinary.com/v1-1/" + $.cloudinary.config().cloud_name + "/upload",
              fields: {
                upload_preset: $.cloudinary.config().upload_preset,
                tags: 'myPhotoAlbum',
                context: 'photo=' $scope.title
              },
              file: file
            }).progress(function (e) {
              file.progress = Math.round((e.loaded * 100.0) /e.total);
              file.status = "Uploading..." + file.progress + "%";
            }).success(function (data, status, headers, config) {
              $rootScope.photos = $rootScope || [];
              data.context = {custom: {photo: $scope.title}};
              file.result = data;
              $rootScope.photos.push(data);
            }).error(function (data, status, headers, config) {
              file.result = data;
            });
          }
        });
      }
    };
  }]);
};
