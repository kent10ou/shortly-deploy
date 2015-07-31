var app = require('./server-config.js');

// *Change*
var port = process.env.PORT || 4568;

app.listen(port);


// console.log('Server now listening on port ' + port);
// console.log('process.env', process.env);
console.log('Server now listening on port ' + port);