var gulp = require('gulp');
var config = require('../config').webpack_dev;
var mocha = require('gulp-mocha');
var webpack = require('webpack-stream');

gulp.task('webpack_dev', function() {
  return gulp.src(config.src)
    .pipe(webpack({
      output: { filename: config.outputFilename }
    }))
    .pipe(gulp.dest(config.dest));
}); //webpack for the development


