var db = require('../config');
var crypto = require('crypto');

var Link = db.url;
var createCode = function() {
  var code = crypto.createHash('sha1');
  console.log('code from model', code);
  return code;
};
Link.code = createCode();

Link.visits = 0;


// var Link = db.Model.extend({
//   tableName: 'urls',
//   hasTimestamps: true,
//   defaults: {
//     visits: 0
//   },
//   initialize: function(){
//     this.on('creating', function(model, attrs, options){
//       var shasum = crypto.createHash('sha1');
//       shasum.update(model.get('url'));
//       model.set('code', shasum.digest('hex').slice(0, 5));
//     });
//   }
// });

module.exports = Link;
