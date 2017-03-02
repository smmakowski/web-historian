var path = require('path');
var archive = require('../helpers/archive-helpers');
var fs = require('fs');
var httpHelpers = require('./http-helpers.js');
// require more modules/folders here!

exports.handleRequest = function (req, res) {
  var headers = httpHelpers.headers;
  // console.log(headers);
  if (req.method === 'GET') {
    if (req.url === '/') {
      fs.readFile(path.join(__dirname, '/public/index.html'), 'utf8', function(err, data) {
        if (err) {
          throw err;
        } else {
          res.writeHead(200, headers);
          res.end(JSON.stringify(data));
        }
      });
    } else {
      (archive.isUrlArchived(req.url, function(boolean) {
        if (boolean === true) {
    
     
        } else {
  
        }
      }));
    }

  } else if (req.method === 'POST') {
    res.writeHead(302, headers);
    res.end(JSON.stringify('rum ham post'));
  }
  
};
