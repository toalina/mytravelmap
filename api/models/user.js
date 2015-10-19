var mongoose = require('mongoose');
// var Place = require(__dirname + '/place');
var bcrypt = require('bcrypt');
var eat = require('eat')

var userSchema = new mongoose.Schema({
  username: { type: String, index: {unique:true}},
  basic: {
    username: String,
    password: String
  },

  placesHasBeen: [{type: ObjectId, ref: 'Place'}],

  placesToGo: [{type: ObjectId, ref: 'Place'}],

  placesHasBeen: {
    place: {type: mongoose.Schema.Types.ObjectId, ref: 'Place'}
  },

  placesToGo: {
    place: {type: mongoose.Schema.Types.ObjectId, ref: 'Place'}
  }

});

userSchema.methods.generateHash = function(password, callback) {
  bcrypt.hash(password, 8, function(err, hash) {
    if (err) return callback(err);
    this.basic.password = hash;
    callback(null, hash);
  }.bind(this));
};


userSchema.methods.generateToken = function(callback) {
  eat.encode({id: this._id}, process.env.APP_SECRET, callback);
}

userSchema.methods.compareHash = function(password, callback) {
  bcrypt.compare(password, this.basic.password, callback);
};

module.exports = exports = mongoose.model('User', userSchema);
