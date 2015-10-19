require('angular/angular');
var angular = window.angular;

var mapsApp = angular.module('mapsApp', []);

require('./controllers/controllers')(mapsApp);
require('./services/services')(mapsApp);
require('./router')(mapsApp);


