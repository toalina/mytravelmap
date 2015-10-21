require('angular/angular');
var angular = window.angular;
require('angular-route');
require('angular-base64');
require('angular-cookies');

var mapsApp = angular.module('mapsApp', ['ngRoute', 'base64', 'ngCookies']);

require('./controllers/controllers')(mapsApp);
require('./services/services')(mapsApp);
//require('./directives/directives')(mapsApp);
require('./router')(mapsApp);
require('./logout')(mapsApp);




