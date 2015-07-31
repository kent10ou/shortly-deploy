var request = require('request');
var crypto = require('crypto');
var bcrypt = require('bcrypt-nodejs');
var util = require('../lib/utility');

var db = require('../app/config');
var User = require('../app/models/user');
var Link = require('../app/models/link');

// Mongoose does not use collections, Models/Collections are the same
// var Users = require('../app/collections/users');
// var Links = require('../app/collections/links');

exports.renderIndex = function(req, res) {
  res.render('index');
};

exports.signupUserForm = function(req, res) {
  res.render('signup');
};

exports.loginUserForm = function(req, res) {
  res.render('login');
};

exports.logoutUser = function(req, res) {
  req.session.destroy(function(){
    res.redirect('/login');
  });
};

exports.fetchLinks = function(req, res) {
  Links.find({}).exec(function(err, links) {
    if (err) {
      res.send(500, err)
    } else {
      res.send(200, links);
    }
  })
};

exports.saveLink = function(req, res) {
  var uri = req.body.url;

  // uses helper func to check if it is a valid url
  if (!util.isValidUrl(uri)) {
    console.log('Not a valid url: ', uri);
    return res.send(404);
  }

  // Query links db and look for existing
  Link.findOne({ url: uri }).exec(function(found) {
    // if link exists, return it
    if (found) {
      res.send(200, found);
    }
    // Save new link to db 
    else {
      // Checks validity of title
      util.getUrlTitle(uri, function(err, title) {
        if (err) {
          console.log('Error reading URL heading: ', err);
          return res.send(404);
        }
        // Create a new link for storage
        var newLink = new Link({
          url: uri,
          title: title,
          base_url: req.headers.origin,
          visits: 0
        });

        //stores link in database
        newLink.save(function(err, link) {
          if (err) {
            res.send(500, err)
          } else {
            res.send(200, link)
          }  
        });
      })
    }
  }); 
};

exports.loginUser = function(req, res) {
  var username = req.body.username;
  var password = req.body.password;

  User.findOne({ username: username })
  .exec(function (err, user) {
    // if not username is not found
    if (!user) {
      // redirect to login page
      res.redirect('/login');

    } else {
      // create a var
      var savedPw = user.password;
    // if username matches, compare the input pw to the db pw
    User.comparePassword(password, savedPw, function(err, match) {
        // if pw matches, create a new session
        if (match) {
          util.createSession(req, res, user);
        } else {
        // if pw does not match, redirect to login page
        res.redirect('/login');
      }
    })
  }
});
};

exports.signupUser = function(req, res) {
  var username = req.body.username;
  var password = req.body.password;

  User.findOne({ username: username })
  .exec(function(err, user) {
    if (!user) {
    // if user is not found, create a new User with passed in username/pw from req obj
    var newUser = new User({
      username: username,
      password: password
    });
      // save new User to DB
      newUser.save(function(err, newUser) {
        if (err) {
          res.send(500, err);
        }
        // create a new session
        util.createSession(req, res, newUser);
      });
    } else {
      // if username is taken, redirect to signup page again
      console.log('Account already exists');
      res.redirect('/signup');
    }
  });
};

//navigates to saved links in dB
exports.navToLink = function(req, res) {
  Link.findOne({ code: req.params[0] })
  .exec(function(err, link) {
    if (!link) {
      // if no link found, redirect to home page
      res.redirect('/');
    } else {
      // increase visits count, save link? and redirect to the link
      link.visits++;
      link.save(function(err, link) {
        res.redirect(link.url);
        return;
      });
    }
  });
};