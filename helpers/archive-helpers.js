var fs = require('fs');
var path = require('path');
var _ = require('underscore');

/*
 * You will need to reuse the same paths many times over in the course of this sprint.
 * Consider using the `paths` object below to store frequently used file paths. This way,
 * if you move any files, you'll only need to change your code in one place! Feel free to
 * customize it in any way you wish.
 */

exports.paths = {
  siteAssets: path.join(__dirname, '../web/public'),
  archivedSites: path.join(__dirname, '../archives/sites'),
  list: path.join(__dirname, '../archives/sites.txt')
};

// Used for stubbing paths for tests, do not modify
exports.initialize = function(pathsObj) {
  _.each(pathsObj, function(path, type) {
    exports.paths[type] = path;
  });
};

// The following function names are provided to you to suggest how you might
// modularize your code. Keep it clean!

exports.readListOfUrls = function(callback) {
  fs.readFile(exports.paths.list, 'utf8', function(err, content) {
    if (err) {
      throw err;
    } else {
      callback(content.split('\n'));
    }
  });
};

exports.isUrlInList = function(url, callback) {
  var inList = false;
  exports.readListOfUrls(function(data) {
    for (var i = 0; i < data.length; i++) {
      if (url === data[i]) {
        inList = true;
      }
    }
    callback(inList);
    // callback(_.contains(data, url));
  });
};

exports.addUrlToList = function(url, callback) {
  fs.appendFile(exports.paths.list, url, 'utf8', callback);  
};

exports.isUrlArchived = function(url, callback) {
  // var sitePath = path.join(exports.paths.archivedSites, url);

  // fs.exists(sitePath, function(exists) {
  //   callback(exists);
  // }); 
  var isArchived = false;
  fs.readdir(this.paths.archivedSites, function(err, files) {
    callback(_.contains(files, url));
    // for (var i = 0; i < files.length; i++) {
    //   if (url === files[i]) {
    //     isArchived = true;
    //   }
    // }
    // callback(isArchived);
  });
};

exports.downloadUrls = function(urls) {
  for (var i = 0; i < urls.length; i++) {
    // make an ajx GET request


    fs.writeFile(exports.paths.archivedSites + '/' + urls[i], 'rum ham', function(err) {
      if (err) {
        throw err;
      } else {
        console.log('File(s) added');
      }
    });
  }
};
