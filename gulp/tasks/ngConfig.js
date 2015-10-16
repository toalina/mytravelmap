var gulp = require('gulp');
var ngConfig = require ('gulp-ng-config');

var config = require('../config').ngConfig;
var fs = require('fs');

gulp.task('ngConfig', function() {
  var tokenFile = config.dest + '/token.txt';

  // Create temp file with token stored in it
  fs.writeFileSync(tokenFile, '{"token": "' + process.env.GITHUBTOKEN + '"}');

  // Generate the token config file
  gulp.src(tokenFile)
  .pipe(ngConfig('gisty.config'))
  .pipe(gulp.dest(config.dest));

});
