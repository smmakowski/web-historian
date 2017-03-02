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
      console.log(req.url);
      (archive.isUrlArchived(req.url.slice(1), function(boolean) {
        if (boolean === true) {
          fs.readFile(path.join(archive.paths.archivedSites, req.url.slice(1)), 'utf8', function(err, data) {
            if (err) {
              res.writeHead(404, headers);
              res.end('FAIL');
            } else {
              res.writeHead(200, headers);
              res.end(JSON.stringify(data));
            }
          });

        } else {
          res.writeHead(404, headers);
          res.end('FAIL');
        }
      }));
    }

  } else if (req.method === 'POST') {
    
  }
  
};
