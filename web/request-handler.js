var path = require('path');
var archive = require('../helpers/archive-helpers');
// require more modules/folders here!

exports.handleRequest = function (req, res) {

  if (req.method === 'GET') {
    if (!res) {
      var statusCode = 404;
      res.end('NO!', statusCode);
    }
    var statusCode = 200;
    res.end(JSON.stringify(path.join(__dirname, '../archives/sites.txt')));
  } else if (req.method === 'POST') {
    /// figure it out laster
  }
  
};
