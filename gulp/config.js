var dest = "./public";
var src = "./app"; // source for frontend stuff

module.exports = {
  javascript: {
    src: src + '/js/styles/**/*.js',
    dest: dest + '/js/',
    entry: src + '/js/styles/entry.js',
    outputFilename: 'styles.js'
  },
  webpack_dev: {
    src: src + '/js/app.js',
    dest: dest + '/js/',
    outputFilename: 'bundle.js'
  },
  sass: {
    src: src + "/sass/{,*/}*.{scss,sass}",
    dest: dest + '/css/',
  },
  index: {
    src: src + "/index.html",
    dest: dest + "/"
  },
  html: {
    src: src + "/views/**/*.html",
    dest: dest + "/views/"
  },
  server: {
    src: dest,
    livereload: true,
    directoryListing: false,
    open: false,
    port: 9000
  },
  production: {
    cssSrc: dest + '/css/*.css',
    jsSrc: dest + '/js/*.js',
    dest: dest
  }
};
