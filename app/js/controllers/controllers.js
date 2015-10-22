module.exports = function(app) {
  require('./locations_controller.js')(app);
  require('./signin_controller.js')(app);
  require('./signup_controller.js')(app);
  require('./future_controller.js')(app);
  require('./photo_controller.js')(app);
  require('./dashboard_controller.js')(app);
  require('./past_controller.js')(app);
};
