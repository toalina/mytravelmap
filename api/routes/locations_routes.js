var Location = require(__dirname + '/../models/location');
var express = require('express');
var jsonParser = require('body-parser').json();

var locationRouter = module.exports = exports = express.Router();

locationRouter.get('/getAll', function(req,res) {
  Location.find({}, function(err, data) {
    if (err) return err;
    res.json(data);
  });
});

locationRouter.post('/create', jsonParser, function(req,res) {
  var newLocation = new Location();
  newLocation.long = req.body.long;
  newLocation.lat = req.body.lat;
  newLocation.memo = req.body.memo;
  newLocation.name = req.body.name;
  newLocation.save = (function(err, data) {
    if (err) return err;
    res.json(data);
  });
});

locationRouter.put('/update/:location_id', jsonParser, function(req, res){
  Location.findOne({'_id': req.params.location_id}, function(err, location) {
    if (err) return err;
      location.long = req.body.long;
      location.lat = req.body.lat;
      location.memo = req.body.memo;
      location.name = req.body.name;
      location.save(function(err, data){
      if (err) return err; 
      res.json(data);
    });
  });
});

locationRouter.delete('/delete/:location_id', jsonParser, function(req, res){
  Location.remove({'': req.params.location_id}, function(err){
    if (err) return err;
    console.log('removed' + req.params.location_id);
    res.json({msg:'success'});
  });
});