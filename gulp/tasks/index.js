var gulp = require("gulp");
var config = require('../config').index;

gulp.task('index', function() {
  return gulp.src(config.src)
  .pipe(gulp.dest(config.dest));
});
