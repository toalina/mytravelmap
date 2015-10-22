  var Location = require(__dirname + '/../models/location');
var express = require('express');
var jsonParser = require('body-parser').json();
var eatAuth = require(__dirname + '/../lib/eat_auth');

var locationRouter = module.exports = exports = express.Router();

locationRouter.get('/getAll', eatAuth, function(req,res) {
  console.log('before query');
  Location.find({}, function(err, data) {
    if (err) return err;
    console.log(data);
    res.json(data);
  });
});

locationRouter.post('/create', jsonParser, function(req,res) {
  var newLocation = new Location();
  newLocation.lng = req.body.lng;
  newLocation.lat = req.body.lat;
  newLocation.memo = req.body.memo;
  newLocation.name = req.body.name;
  newLocation.save(function(err, data) {
    if (err) return err;
    res.json(data);
  });
});

locationRouter.put('/update/:location_id', jsonParser, function(req, res){
  Location.findOne({'_id': req.params.location_id}, function(err, location) {
    if (err) return err;
      if(req.body.lng) location.lng = req.body.lng;
      if(req.body.lat)  location.lat = req.body.lat;
      if(req.body.memo) location.memo = req.body.memo;
      if(req.body.name) location.name = req.body.name;
      location.save(function(err, data){
      if (err) return err;
      res.json(data);
    });
  });
});

locationRouter.delete('/delete/:location_id', jsonParser, function(req, res){
  Location.remove({'_id': req.params.location_id}, function(err){
    if (err) return err;
    console.log('removed' + req.params.location_id);
    res.json({msg:'success'});
  });
});
