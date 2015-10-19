module.exports = function(app) {
  require('./googleMap_service.js')(app);
  require('./rest_service.js')(app);
};