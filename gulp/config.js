var dest = "./public";
var src = "./app"; // source for frontend stuff
var devSrc = ".api"; // source for backend stuff
// add dev tasks configs below!

module.exports = {
  javascript: {
    src: src + '/js/**/*.js',
    dest: dest + '/js/',
    entry: src + '/js/entry.js',
    outputFilename: 'packed.js'
  },
  sass: {
    src: src + "/sass/{,*/}*.{scss,sass}",
    dest: dest + '/css/',
    // settings: {
    //   indentedSyntax: true,
    // }
  },
  index: {
    src: src + "/index.html",
    dest: dest + "/"
  },
  html: {
    src: src + "/html/**/*.html",
    dest: dest + "/html/"
  },
  ngConfig: {
    dest: dest + '/js/'
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
