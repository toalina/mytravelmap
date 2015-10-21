require('angular/angular');
var angular = window.angular;
require('angular-route');
require('angular-animate');

var mapsApp = angular.module('mapsApp', ['ngRoute', 'ngAnimate']);

require('./controllers/controllers')(mapsApp);
require('./services/services')(mapsApp);
require('./router')(mapsApp);


