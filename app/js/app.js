require('angular/angular');
var angular = window.angular;
require('angular-route');

var mapsApp = angular.module('mapsApp', ['ngRoute']);

require('./controllers/controllers')(mapsApp);
require('./services/services')(mapsApp);
require('./directives/directives')(mapsApp);
require('./router')(mapsApp);



