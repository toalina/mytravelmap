var gulp = require('gulp');

gulp.task('default', ['webpack_dev', 'sass', 'html', 'index', 'webpack', 'watch', 'serve']);

// gulp.task('styles', []);

