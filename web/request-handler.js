var path = require('path');
var archive = require('../helpers/archive-helpers');
var fs = require('fs');
var httpHelpers = require('./http-helpers.js');
var $ = require('jQuery');
// require more modules/folders here!

exports.handleRequest = function (req, res) {
  var headers = httpHelpers.headers;

  if (req.method === 'GET') {
    httpHelpers.getHandler(req, res, headers);
  } else if (req.method === 'POST') {
    // send a request to post url from bar
    // url is submitted to server and server checks if file is in archives
      // if not in archives append url to sites.txt && tell worker to go and feth it for archives/sites/
        // reroute user to loading
      // if it is there
        // reroute user to saved webpage
    httpHelpers.postHandler(req, res, headers);
    
  }
  
};
