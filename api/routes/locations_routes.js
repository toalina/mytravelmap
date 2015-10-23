  var Location = require(__dirname + '/../models/location');
var express = require('express');
var jsonParser = require('body-parser').json();
var eatAuth = require(__dirname + '/../lib/eat_auth');

var locationRouter = module.exports = exports = express.Router();

locationRouter.get('/getAll', eatAuth, function(req,res) {
  console.log('before query');
  Location.find({user: req.user.username}, function(err, data) {
    if (err) return err;
    console.log(data);
    res.json(data);
  });
});

locationRouter.post('/create', jsonParser, eatAuth, function(req,res) {
  console.log(req.body);
  var newLocation = new Location();
  newLocation.lng = req.body.lng; 
  newLocation.lat = req.body.lat;
  newLocation.user = req.user.username;
  newLocation.memo = req.body.memo;
  newLocation.name = req.body.name;
  newLocation.start = req.body.start;
  newLocation.end = req.body.end;
  newLocation.type = req.body.type;
  newLocation.save(function(err, data) {
    console.log('asdasd');
    console.log(data);
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
      if(req.body.plan) location.plan = req.body.plan;
      if(req.body.name) location.name = req.body.name;
      if(req.body.duration) location.duration = req.body.duration;
      if(req.body.start) location.start = req.body.start;
      if(req.body.end) location.end = req.body.end;
      if(req.body.url) location.gallery.push(req.body.url);
      location.save(function(err, data){
      if (err) return err;
      res.json(data);
    });
  });
});

// locationRouter.put('/addphoto/:location_id', jsonParser, function(req, res){
//   Location.update({'_id': req.params.location_id},{$pushAll: } function(err, location) {
//       if (err) return err;
//       if(req.body.url){
//         console.log(req.body.url);
//         location.gallery.push(req.body.url);
//         location.save(function(err, data){
//       if (err) return err;
//       res.json(data);
//     });
//   });
// });

  locationRouter.put('/addphoto/:location_id', jsonParser, function(req, res){
    Location.findByIdAndUpdate(
    req.params.location_id,
    {$push: {"gallery": req.body.picture}},
    {safe: true, upsert: true},
    function(err, model) {
        console.log(err);
    }
    );  
  });

locationRouter.delete('/delete/:location_id', jsonParser, function(req, res){
  Location.remove({'_id': req.params.location_id}, function(err){
    if (err) return err;
    console.log('removed' + req.params.location_id);
    res.json({msg:'success'});
  });
});
