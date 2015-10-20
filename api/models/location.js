var mongoose = require('mongoose');
var User = require('./user');


var locationSchema = new mongoose.Schema({
  lat: Number,
  lng: Number,
  memo: String,
  name: String,
  user_id: {type: mongoose.Schema.Types.ObjectId, ref: 'User'}

//  gallery: [Need to figure out Cloudinary stuff]
});

module.exports = mongoose.model('Location', locationSchema);
