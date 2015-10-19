var handleSuccess = function(callback) {
  return function(res) {
    callback(null, res.data);
  }
};
var handlFailure = function(callback) {
  return function(data) {
    callback(data);
  };
};

module.exports = function(app) {
  app.factory('Resource', ['$http', function($http) {
    var Resource = function(resourceName) {
      this.resourceName = resourceName;
    };

    Resource.prototype.create = function(resource, callback) {
      $http.post('/api/' + this.resourceName + '/create', resource)
        .then(handleSuccess(callback), handlFailure(callback));
    };

    Resource.prototype.getAll = function(callback) {
      $http.get('/api/' + this.resourceName + '/getAll')
        .then(handleSuccess(callback), handlFailure(callback));
    };

    Resource.prototype.update = function(resource, callback) {
      $http.put('/api/' + this.resourceName + '/update/' + resource._id, resource)
        .then(handleSuccess(callback), handlFailure(callback));
    };

    Resource.prototype.remove = function(resource, callback) {
      $http.delete('/api/' + this.resourceName +'/delete/' + resource._id)
        .then(handleSuccess(callback), handlFailure(callback));
    };

    return function(resourceName) {
      return new Resource(resourceName);
    };
  }]);
};