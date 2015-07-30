var db = require('../config');
var crypto = require('crypto');
var mongoose = require('mongoose');

// Setting up fields for url links 
var linkSchema = mongoose.Schema({
  url: String,
  base_url: String,
  code: String,
  title: String,
  visits: Number,
  link: String
});

// Mongoose ORM model for urls
var Link = mongoose.model('Link', linkSchema);

// Create salt using SHA1
// Updating url to be base_url plus part of salt
// set code to be 5 digits from the salt
var createSha = function(url) {
  var shasum = crypto.createHash('sha1');
  shasum.update(url);
  return shasum.digest('hex').slice(0, 5);
};

// this '.pre' is a middle function that causes the code parameter to be set 
// whenever a save event is generated
linkSchema.pre('save', function(next){
  var code = createSha(this.url);
  this.code = code;
  next();
});

module.exports = Link;
