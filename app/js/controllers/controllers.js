module.exports = function(app) {
  require('./locations_controller.js')(app);
  require('./signin_controller.js')(app);
  require('./signup_controller.js')(app);
  require('./photo_controller.js')(app);
  require('./trips_controller.js')(app);
  require('./plan_controller')(app);
};
