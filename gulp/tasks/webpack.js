var gulp = require('gulp');
var config = require('../config').javascript;
var webpack = require('webpack-stream');

gulp.task('webpack', function(callback) {
  return gulp.src(config.entry)
  .pipe(webpack({
    output: {
      filename: config.outputFilename
    }
  }))
  .pipe(gulp.dest(config.dest));
});

