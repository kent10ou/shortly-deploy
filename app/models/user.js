
var bcrypt = require('bcrypt-nodejs');
var mongoose = require('mongoose');
var bluebird = require('bluebird');

// setting up fields for username/pw
var userSchema = mongoose.Schema({
  username: { type: String, required: true, index: { unique: true } },
  password: { type: String, required: true },
});

// creating a mongoose ORM model for User
var User = mongoose.model('User', userSchema);

// a prototype function to compare the submitted password and the pw on the DB
// 
User.comparePassword = function(candidatePassword, savedPassword, callback) {
  bcrypt.compare(candidatePassword, savedPassword, function(err, isMatch) {
    if (err) {
      return callback(err);
    } 
    callback(null, isMatch);
  });
}

// when the save event is generated, it is encrypting the pw, preparing it to be placed on DB
userSchema.pre('save', function (next) {
  var cipher = bluebird.promisify(bcrypt.hash);
  return cipher(this.password, null, null).bind(this)
  .then(function(hash) {
    this.password = hash;
    next();
  });
});

module.exports = User;
