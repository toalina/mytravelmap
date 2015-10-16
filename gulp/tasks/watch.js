var gulp     = require('gulp');
var config   = require('../config');

gulp.task('watch', function() {
  gulp.watch(config.javascript.src, ['webpack']);
  gulp.watch(config.sass.src, ['sass']);
  gulp.watch(config.index.src, ['index']);
  gulp.watch(config.html.src, ['html']);

  gulp.watch(['./node_modules/angular/angular.js', './node_modules/angular-route/angular-route.js']);
  // Watchify will watch and recompile our JS, so no need to gulp.watch it
});

