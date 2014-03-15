var exec       = require('child_process').exec;
var watchify   = require('watchify');

var gulp       = require('gulp');
var jshint     = require('gulp-jshint');
var mocha      = require('gulp-mocha');
var rename     = require('gulp-rename');
var uglify     = require('gulp-uglify');
var concat     = require('gulp-concat'); 
var browserify = require('gulp-browserify');

// browserify all the things!
gulp.task('build-app', function() {
  return gulp.src('./client/app/main.js')
          .pipe(browserify({
            insertGlobals: true,
            debug: true
          }))
          //.pipe(uglify())
          .pipe(gulp.dest('./client/static/build'));
});

gulp.task('build-test', function() {
  return gulp.src('./client/test/spec/*.js')
          .pipe(concat('main.js'))
          .pipe(browserify({
            insertGlobals: true,
            debug: true
          }))
          //.pipe(uglify())
          .pipe(rename('index.js')) // :P
          .pipe(gulp.dest('./client/test'));
});

gulp.task('hint', function() {
  return gulp.src([
            './server/server.js',
            './server/db/*.js',
            './client/app/**/*.js', // models, views etc.
            './client/app/main.js',
            './client/test/spec/*.js',
            '!./client/node_modules/*', // exclude client modules
            '!./server/node_modules/*'  // exclude server modules
           ])
          .pipe(jshint())
          .pipe(jshint.reporter('default'));
});

gulp.task('test-client', function() {
    exec('firefox client/test/test.html'); 
});

gulp.task('test-server', function() {
  return gulp.src('./server/test/*.js')
              .pipe(mocha({ reporter: 'spec' }));
});

// Watch for changes in the background
gulp.task('watch', function() {
  exec('watchify client/test/spec/*.js -o client/test/index.js &');
  exec('watchify client/app/main.js -o client/static/build/main.js &');
});

// Test Client and Server
gulp.task('test', function() {
  gulp.start('test-client', 'test-server');
});

// Build the Client
gulp.task('build', function() {
  gulp.start('build-app', 'build-test');
});
