var mongoose = require('mongoose');


var locationSchema = new mongoose.Schema({
  long: Number,
  lat: Number,
  memo: String,
  name: String
//  gallery: [Need to figure out Cloudinary stuff]
});

module.exports = mongoose.model('Location', locationSchema);
