var mongoose = require('mongoose');
var User = require('./user');

var locationSchema = new mongoose.Schema({
  lat: Number,
  lng: Number,
  memo: String,
  name: String,
  type: String,
  start: Date,
  end: Date,
  duration: Number,
  gallery: Array
});

module.exports = mongoose.model('Location', locationSchema);
