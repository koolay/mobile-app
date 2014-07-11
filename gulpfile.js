var gulp = require('gulp');
var gutil = require('gulp-util');
var bower = require('bower');
var concat = require('gulp-concat');
var sass = require('gulp-sass');
var minifyCss = require('gulp-minify-css');
var rename = require('gulp-rename');
var sh = require('shelljs');

var plugins     = require('gulp-load-plugins')({ lazy: false }),
    buffer      = require('vinyl-buffer'),
    source      = require('vinyl-source-stream'),
    watchify    = require('watchify'),
    runSequence = require('run-sequence'),
    connect     = require('connect'),
    livereload  = require('connect-livereload');

var paths = {
  sass: ['./scss/**/*.scss']
};

gulp.task('default', ['sass']);

gulp.task('sass', function(done) {
  gulp.src('./scss/ionic.app.scss')
    .pipe(sass())
    .pipe(gulp.dest('./www/css/'))
    .pipe(minifyCss({
      keepSpecialComments: 0
    }))
    .pipe(rename({ extname: '.min.css' }))
    .pipe(gulp.dest('./www/css/'))
    .on('end', done);
});

gulp.task('watch', function() {
  gulp.watch(paths.sass, ['sass']);
});

gulp.task('install', ['git-check'], function() {
  return bower.commands.install()
    .on('log', function(data) {
      gutil.log('bower', gutil.colors.cyan(data.id), data.message);
    });
});

gulp.task('git-check', function(done) {
  if (!sh.which('git')) {
    console.log(
      '  ' + gutil.colors.red('Git is not installed.'),
      '\n  Git, the version control system, is required to download Ionic.',
      '\n  Download git here:', gutil.colors.cyan('http://git-scm.com/downloads') + '.',
      '\n  Once git is installed, run \'' + gutil.colors.cyan('gulp install') + '\' again.'
    );
    process.exit(1);
  }
  done();
});

/*---------------------------------------------------------------*/

gulp.task('serve', function () {
    gulp.start('watch');
});

gulp.task('watch', function (done) {
    runSequence(
        'watchify',
        'connect'
    );
    //gulp.watch('lib/*.scss', ['sass']);
});

gulp.task('sass', function () {
    return gulp.src('./scss/*.scss')
        .pipe(plugins.sass())
        .pipe(gulp.dest('.tmp'));
});

gulp.task('livereload', function () {
    // start the live reload server
    var livereloadServer = plugins.livereload();
    // reload static files when changed
    return gulp.watch([
        './www/*',
        './www/!lib',
        './www/!node_modules',
        './www/!img',
        './www/js/*'
    ], function (event) {
        livereloadServer.changed(event.path);
    });
});

gulp.task('watchify', function () {
    var bundler = watchify('./www/js/app.js');

    var rebundle = function () {
        return bundler.bundle({
            insertGlobals: true,
            debug: true
        })
            .pipe(source('bundle.js'))
            .pipe(buffer())
            .pipe(gulp.dest('./www/js'))
            .on('end', plugins.util.log)
            .on('error', plugins.util.log);
    };

    bundler
        .on('update', rebundle)
        .on('error', plugins.util.log);

    return rebundle();
});

gulp.task('connect', function (done) {
    // start connect server
    connect()
        .use('/cordova.js', function (req, res) {
            res.setHeader('Content-Type', 'application/javascript');
            res.end('(function(){})();');
        })
        .use(connect.static('.tmp'))
        .use(connect.static('./www/'))
        .use('/fonts', connect.static('node_modules/ionic/release/fonts'))
        .listen(9000);
    done();
});

gulp.task('open', function () {
    // open the browser
    require('open')('http://localhost:9000');
});
