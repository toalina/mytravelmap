module.exports = function(app){
  app.directive('planSummary', function() {
    return {
      restrict: 'E',
      templateUrl: '../views/plan.html', // See below
    };
  });
};

