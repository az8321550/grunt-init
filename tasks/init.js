module.exports = function(grunt) {
  var crypto = require('crypto');
  var path = require('path');

  grunt.registerMultiTask('init', 'The best Grunt plugin ever.', function() {
    var options = this.options();
    if (!options.key) {
      grunt.fail.warn('Missing key property.');
    }
    var key = options.key;

    this.files.forEach(function(f) {
      var src = f.src.filter(function(filepath) {
        if (!grunt.file.exists(filepath)) {
          return false;
        } else {
          var filename = path.basename(filepath);
          var newFilename = (grunt.file.isDir(options.dest) ? [filepath, 'encrypted'].join('.') : (options.ext) ? [options.dest, options.ext].join('.') : options.dest);
          var contents = grunt.file.read(filepath);

          if (!options.decrypt) {
            var cipher = crypto.createCipher('aes-256-cbc', key)
            cipher.update(contents, 'utf8', 'base64');
            contents = cipher.final('base64')
          }
          else {
            var decipher = crypto.createDecipher('aes-256-cbc', key);
            decipher.update(contents, 'base64', 'utf8');
            contents = decipher.final('utf8');
            var ext = filepath.split('.');
            ext = ext[ext.length - 1];
            newFilename = newFilename.split('.' + ext).join('');
          }
          grunt.file.write(newFilename, contents);
          return true;
        }
      });
    });
  });

};
