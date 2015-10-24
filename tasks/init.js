module.exports = function(grunt) {
  var encrypt = require('cf-encrypt');
  var path = require('path');
  // Please see the Grunt documentation for more information regarding task
  // creation: http://gruntjs.com/creating-tasks

  grunt.registerMultiTask('init', 'The best Grunt plugin ever.', function() {
    // Merge task-specific and/or target-specific options with these defaults.
    var options = this.options();
    // Iterate over all specified file groups.
    this.files.forEach(function(f) {
      // Concat specified files.
      var src = f.src.filter(function(filepath) {
        // Warn on and remove invalid source files (if nonull was set).
        if (!grunt.file.exists(filepath)) {
          return false;
        } else {
          var newFilename = (grunt.file.isDir(options.dest) ? [filepath].join('.') : (options.ext) ? [options.dest, options.ext].join('.') : options.dest);
          var contents = encrypt[(options.decrypt) ? 'decrypt' : 'encrypt'](options.key, grunt.file.read(filepath), 'hex');
          grunt.file.write(newFilename, contents);
          return true;
        }
      });
    });
  });

};
