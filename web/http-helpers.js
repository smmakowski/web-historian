var path = require('path');
var fs = require('fs');
var archive = require('../helpers/archive-helpers');

exports.headers = {
  'access-control-allow-origin': '*',
  'access-control-allow-methods': 'GET, POST, PUT, DELETE, OPTIONS',
  'access-control-allow-headers': 'content-type, accept',
  'access-control-max-age': 10, // Seconds.
  'Content-Type': 'text/html'
};

exports.serveAssets = function(res, asset, callback) {
  // Write some code here that helps serve up your static files!
  // (Static files are things like html (yours or archived from others...),
  // css, or anything that doesn't change often.)
};



// As you progress, keep thinking about what helper functions you can put here!

exports.getHandler = function(req, res, headers) {
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
    // check if url is in archives via path in url bar
    (archive.isUrlArchived(req.url.slice(1), function(boolean) {
      if (boolean) {
        fs.readFile(path.join(archive.paths.archivedSites, req.url.slice(1)), 'utf8', function(err, data) {
          // if (err) {
          //   res.writeHead(404, headers);
          //   res.end('FAIL');
          // } else {
          res.writeHead(200, headers);
          res.end(data, 'utf8');
          // }
        });

      } else {
        
        res.writeHead(404, headers);
        res.end('FAIL NOT ARCHIVED');

      }

    }));
  }
};

exports.postHandler = function (req, res, headers) {
  var formUrl;

  req.on('data', function(chunk) {
    formUrl = chunk.toString().split('=')[1];
  });

  req.on('end', function() {
    archive.isUrlArchived(formUrl, function(boolean) {
      console.log('boolean: ', boolean);
      console.log('formUrl: ', formUrl);
      console.log('req.url: ', req.url.slice(1));
    // console.log(path.paths.archivedSites);
      if (boolean) {
        fs.readFile(path.join(archive.paths.archivedSites, '/', formUrl), 'utf8', function(err, data) {
          console.log(path.join(archive.paths.archivedSites, '/', formUrl));
          if (err) {
            res.writeHead(404, headers);
            res.end('FAIL YEAH');
            // check to see if the 
          } else {
            res.writeHead(302, headers);
            res.end(data);
          }
        
        // fs.readFile(path.join(archive.paths.archivedSites, req.url.slice(1)), 'utf8', function(err, data) {
        //   if (err) {
        //     res.writeHead(404, headers);
        //     res.end('FAIL');
        //   } else {
        //     res.writeHead(302, headers);
        //     res.end(data, 'utf8');
        //   }
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

  });

};