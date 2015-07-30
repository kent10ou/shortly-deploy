var Bookshelf = require('bookshelf');
var path = require('path');
var mongoose = require('mongoose');
var MongoClient = require('mongodb').MongoClient;

mongoose.connect('mongodb://localhost:27017');

var Schema = mongoose.Schema;

var Urls = new Schema({
  url: String,
  base_url: String,
  code: String,
  title: String,
  visits: Number,
  timeStamps: Date

});

var Users = new Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  timeStamps: Date
})

var Users = mongoose.model('Users', userSchema);
var Urls = mongoose.model('Urls', userSchema);

Users.create({username: 'shortly', password: '12345'});
// var db = Bookshelf.initialize({
//   client: 'sqlite3',
//   connection: {
//     host: '127.0.0.1',
//     user: 'your_database_user',
//     password: 'password',
//     database: 'shortlydb',
//     charset: 'utf8',
//     filename: path.join(__dirname, '../db/shortly.sqlite')
//   }
// });

// db.knex.schema.hasTable('urls').then(function(exists) {
//   if (!exists) {
//     db.knex.schema.createTable('urls', function (link) {
//       link.increments('id').primary();
//       link.string('url', 255);
//       link.string('base_url', 255);
//       link.string('code', 100);
//       link.string('title', 255);
//       link.integer('visits');
//       link.timestamps();
//     }).then(function (table) {
//       console.log('Created Table', table);
//     });
//   }
// });

// db.knex.schema.hasTable('users').then(function(exists) {
//   if (!exists) {
//     db.knex.schema.createTable('users', function (user) {
//       user.increments('id').primary();
//       user.string('username', 100).unique();
//       user.string('password', 100);
//       user.timestamps();
//     }).then(function (table) {
//       console.log('Created Table', table);
//     });
//   }
// });

// module.exports = db;





