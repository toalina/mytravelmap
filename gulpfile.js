// var gulp = require('gulp');
// var mocha = require('gulp-mocha');
// var webpack = require('webpack-stream');

// gulp.task('webpack:dev', function() {
//   return gulp.src('./app/js/app.js')
//     .pipe(webpack({
//       output: { filename: 'bundle.js'}
//     }))
//     .pipe(gulp.dest('build/'));
// }); //webpack for the development

// gulp.task('staticfiles:dev', function() {
//   return gulp.src('./app/**/*.html')
//     .pipe(gulp.dest('build'))
// });


var requireDir = require('require-dir');

// Require all tasks in gulp/tasks, including subfolders
requireDir('./gulp/tasks', { recurse: true });
