

var mongoose = require('mongoose');


// create connection to mongoDB server, depending on local or azure
//   mongodb://MongoLab-pm:IJWFxqy8nveI.HVptFNPFzmWnYTvIc67IUifzx5ddBU-@ds036648.mongolab.com:36648/MongoLab-pm
mongoURI = 'mongodb://MongoLab-pm:IJWFxqy8nveI.HVptFNPFzmWnYTvIc67IUifzx5ddBU-@ds036648.mongolab.com:36648/MongoLab-pm' || 'mongodb://localhost/shortlydb';
mongoose.connect(mongoURI);

//Connection Events, listens for errors and open events
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
 console.log('Mongodb connection open');
});

module.exports = db;



