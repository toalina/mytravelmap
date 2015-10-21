module.exports = function(app) {
  app.run(['$rootScope', '$cookies', '$location', '$http', function($scope, $cookies, $location, $http) {
    $scope.loggedIn = function() {
      var eat = $cookies.get('eat');
      return eat && eat.length;
    };

    $scope.logOut = function() {
      $cookies.remove('eat');
      $location.path('/landing');
    };

    $scope.getUserName = function(callback) {
      var eat = $cookies.get('eat');
      if (!(eat && eat.length))
        callback(new Error('not logged in'));

      $http({
        method: 'GET',
        url: '/api/username',
        headers: {
          token: eat
        }
      }) 
      .then(
        function(res) {
        $scope.username = res.data.username;
        }, 
        function(res) {
          callback(res);
        });
    };

    if ($scope.loggedIn())
      $scope.getUserName();
  }])
};
