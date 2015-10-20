var express = require('express'),
    app = express(),
    mongoose = require('mongoose');

mongoose.connect(process.env.MONGO_URL || 'mongodb://localhost/travel_dev');
process.env.APP_SECRET = process.env.APP_SECRET || 'itwillbeawesomeappever';


app.use(express.static(__dirname + '/public'));
var locationsRouter = require(__dirname + '/api/routes/locations_routes');
app.use('/api/locations', locationsRouter);

var userRouter = require(__dirname + '/api/routes/user_routes');
app.use('/api', userRouter);

var port = process.env.PORT || 3000;
module.exports = app.listen(port, function() {
  console.log('server up on port: ' +  port);
});


