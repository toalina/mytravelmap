var mongoose = require('mongoose');
var User = require('./user');

var locationSchema = new mongoose.Schema({
  lat: Number,
  lng: Number,
  memo: String,
  name: String,
  type: String,
  user: {type: String, required: true},
  start: Date,
  end: Date,
  plan: String,
  duration: Number
//gallery: [Need to figure out Cloudinary stuff]
});

module.exports = mongoose.model('Location', locationSchema);
