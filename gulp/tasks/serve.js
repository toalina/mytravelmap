var gulp = require('gulp');
var config = require('../config').server;
var webserver = require('gulp-webserver');

gulp.task('serve', function() {
  console.log(config.src);

  gulp.src(config.src)
    .pipe(webserver({
      livereload: config.livereload,
      directoryListing: config.directoryListing,
      open: config.open,
      port: config.port
    }));
});
