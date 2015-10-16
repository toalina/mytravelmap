var gulp         = require('gulp');
var sass         = require('gulp-sass');
var neat         = require('node-neat');
var sourcemaps   = require('gulp-sourcemaps');
var handleErrors = require('../util/handleErrors');
var autoprefixer = require('gulp-autoprefixer');
var config = require('../config').sass;

gulp.task('sass', function () {
  return gulp.src(config.src)
    .pipe(sourcemaps.init())
    .pipe(sass({
    includePaths: [['sass'].concat(neat),
     require('node-bourbon').includePaths,
     require('node-neat').includePaths
    ]
    }))
    .pipe(sass(config.settings))

    .on('error', handleErrors)

    .pipe(sourcemaps.write())

    // .pipe(autoprefixer({ browsers: ['last 2 version'], cascade: false }))

    .pipe(gulp.dest(config.dest));
});


