var app = require('./server-config.js');

// *Change*
// var port = 4568;
// process.env.PORT = 4568;

app.listen(process.env.PORT);
// app.listen(port);


// console.log('Server now listening on port ' + port);
console.log('process.env', process.env);
// console.log('Server now listening on port ' + process.env.PORT);