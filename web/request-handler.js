var path = require('path');
var archive = require('../helpers/archive-helpers');
var fs = require('fs');
var httpHelpers = require('./http-helpers.js');
var $ = require('jQuery');
// require more modules/folders here!

exports.handleRequest = function (req, res) {
  var headers = httpHelpers.headers;

  if (req.method === 'GET') {
    
    if (req.url === '/') {
      // console.log('__dirname ', __dirname);
      fs.readFile(path.join(__dirname, '/public/index.html'), 'utf8', function(err, data) {
        
        if (err) {
          throw err;
        } else {
          res.writeHead(200, headers);
          res.end(data, 'utf8');
        }

      });

    } else {
      // console.log('req url: ', req.url);
      (archive.isUrlArchived(req.url.slice(1), function(boolean) {
        if (boolean === true) {
          fs.readFile(path.join(archive.paths.archivedSites, req.url.slice(1)), 'utf8', function(err, data) {
            if (err) {
              res.writeHead(404, headers);
              res.end('FAIL');
            } else {
              res.writeHead(200, headers);
              res.end(data, 'utf8');
            }
          });

        } else {
          
          res.writeHead(404, headers);
          res.end('FAIL');

        }

      }));
    }

  } else if (req.method === 'POST') {
    // send a request to post url from bar
    // url is submitted to server and server checks if file is in archives
      // if not in archives POST url to sites.txt && tell worker to go and feth it for archives/sites/
        // reroute user to loading
      // if it is there
        // send GET request for file with name of url
    console.log('this is a post!');
    console.log('req.url :', req.url);

    var formUrl;

    req.on('data', function(chunk) {
      formUrl = chunk.toString().split('=')[1];
      console.log('chunk: ', chunk.toString().split('=')[1]);
    });

    archive.isUrlArchived(formUrl, function(boolean) {
      if (boolean) {
        fs.readFile(path.join(archive.paths.archivedSites, req.url.slice(1)), 'utf8', function(err, data) {
          if (err) {
            res.writeHead(404, headers);
            res.end('FAIL');
          } else {
            res.writeHead(302, headers);
            res.end(data, 'utf8');
          }
        });
      } else {

        archive.addUrlToList(formUrl + '\n', function() {
          console.log('successfully added url to list');
        });

        fs.readFile(path.join(__dirname, '/public/loading.html'), 'utf8', function(err, data) {
        
          if (err) {
            throw err;
          } else {
            res.writeHead(302, headers);
            res.end(data, 'utf8');
          }

        });
      }

    });
    
  } 
  
};
