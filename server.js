var express = require('express');
var app = express();
var mongoose = require('mongoose');
mongoose.connect(process.env.MONGO_URL || 'mongodb://localhost/travel_map');
process.env.APP_SECRET = process.env.APP_SECRET || 'crazyawesome';

// app.use(express.static(__dirname + '/build'));

var userRouter = require(__dirname + '/api/routes/user_routes');
app.use('/api', userRouter);


var port = process.env.PORT || 3000;
app.listen(port, function (){
  console.log('the server is running at port ' + port);
});

