'use strict';
// =============================================================================
// Coming Soon:.................................................................
// =============================================================================
// .kss........... A methodology for documenting CSS and generate styleguide....
// .Sass.......... SASS for Gulp................................................
// .Bower......... Bower to help with Bootstrap stuff...........................
// .Pa11y......... Accessibility audit of the site using Gulp...................

// =============================================================================
// Setup Environment............................................................
// =============================================================================
var paths = {
  loc: {
      build:      './_01-build/',
      stage:      './_02-stage/',
      prod:       './_03-prod/'
  }
}
// =============================================================================
// Configuration................................................................
// =============================================================================
var config = {
  name:           'demo',
  instance:       'carbon',
  version:        '0.0.1',
  spr:            '000000',
  cmr:            'r11111',
  designer:       'Person One',
  developer:      'Person Two',
  analyst:        'Person Three',
  project:        'Person Four'
}
// =============================================================================
// DEPENDENCIES.................................................................
// =============================================================================
var gulp            = require('gulp'),
    uglify          = require('gulp-uglify'),
    concat          = require('gulp-concat'),
    jshint          = require('gulp-jshint'),
    jade            = require('gulp-jade'),
    csscomb         = require('gulp-csscomb'),
    stripCssComments= require('gulp-strip-css-comments'),
    autoprefixer    = require('gulp-autoprefixer'),
    minifyCSS       = require('gulp-minify-css'),
    watch           = require('gulp-watch'),
    plumber         = require('gulp-plumber'),
    clean           = require('gulp-clean'),
    gutil           = require('gulp-util'),
    imagemin        = require('gulp-imagemin'),
    spritesmith     = require('gulp.spritesmith'),
    csso            = require('gulp-csso'),
    merge           = require('merge-stream'),
    pngquant        = require('imagemin-pngquant'),
    batch           = require('gulp-batch'),
    notify          = require('gulp-notify');
// =============================================================================
// Starting the Tasks...........................................................
// =============================================================================
gulp.task('js', function(){
    gulp.src(paths.loc.build + 'scripts/*.js')
        .pipe(plumber())
        .pipe(jshint())
        .pipe(uglify())
        .pipe(concat((config.name) + ".app.min.js"))
        .pipe(gulp.dest((paths.loc.stage) + '/scripts'))
        .pipe(gulp.dest((paths.loc.prod) + '/scripts'))
        .pipe(notify({ message: 'JSHINT - Uglify - Concat JS Tasks have been completed and copied to Stage & Prod.' }));
});
gulp.task('sprite', function () {
    var spriteData = gulp.src(paths.loc.build + 'sprites/*.png').pipe(spritesmith({
        imgName: 'sprite.png',
        cssName: '99-sprite.css'
    }));
    var imgStream = spriteData.img
        .pipe(imagemin())
        .pipe(gulp.dest((paths.loc.build) + 'images/'));
    var cssStream = spriteData.css
        .pipe(csso())
        .pipe(gulp.dest((paths.loc.build) + 'css/'));
    return merge(imgStream, cssStream);
});
gulp.task('css', function () {
    gulp.src(paths.loc.build + 'css/*.css')
        .pipe(plumber())
        .pipe(csscomb())
        .pipe(concat((config.name) + ".local.min.css"))
        .pipe(stripCssComments())
        //.pipe(minifyCSS())
        .pipe(gulp.dest((paths.loc.stage) + 'css'))
        .pipe(gulp.dest((paths.loc.prod) + 'css'))
        .pipe(notify({ message: 'Concat & Minify CSS Tasks have been completed and copied to Stage & Prod.'}));
});
gulp.task('jade', function () {
    gulp.src(paths.loc.build + 'jade/*.jade')
        .pipe(plumber())
        .pipe(jade({
            pretty: true
        }))
        .pipe(gulp.dest((paths.loc.stage)))
        .pipe(gulp.dest((paths.loc.prod)))
        .pipe(notify({ message: 'We have magically created the boilerplate templates for you. Enjoy.'}));
});
gulp.task('images', function () {
    return gulp.src(paths.loc.build + 'images/**/*.*')
        .pipe(imagemin({
            progressive: true,
            svgoPlugins: [{removeViewBox: false}],
            use: [pngquant()]
        }))
        .pipe(gulp.dest((paths.loc.stage) + '/images'))
        .pipe(gulp.dest((paths.loc.prod) + '/images'))
        //.pipe(notify({ message: 'Finished Image minifier Task'}));
});
gulp.task('copyfonts', function() {
    gulp.src(paths.loc.build + 'fonts/**/*.*')
        .pipe(gulp.dest((paths.loc.stage) + 'fonts'))
        .pipe(gulp.dest((paths.loc.prod) + 'fonts'))
        .pipe(notify({ message: 'Fonts folder content has been copied!'}));
});
gulp.task('copybscss', function() {
    gulp.src(paths.loc.build + '/vendor/Bootstrap-330-busi.css')
        .pipe(gulp.dest((paths.loc.stage) + '/css'))
        .pipe(gulp.dest((paths.loc.prod) + '/css'))
        .pipe(notify({ message: 'Bootstrap Has been copied!'}));
});
gulp.task('copybsjs', function() {
    gulp.src(paths.loc.build + 'vendor/bootstrap.min.js')
        .pipe(gulp.dest((paths.loc.stage) + '/scripts'))
        .pipe(gulp.dest((paths.loc.prod) + '/scripts'))
        .pipe(notify({ message: 'Bootstrap Has been copied!'}));
});
gulp.task('jquery', function() {
    gulp.src(paths.loc.build + 'vendor/jquery17.min.js')
        .pipe(gulp.dest((paths.loc.stage) + '/scripts'))
        .pipe(gulp.dest((paths.loc.prod) + '/scripts'))
        .pipe(notify({ message: 'jQuery Has been copied!'}));
});
//gulp.task('working', function () { console.log('Working!'); });
// =============================================================================
// Watch For Changes............................................................
// =============================================================================
gulp.task('watch', function() {
    gulp.watch((paths.loc.build) + 'css/*.css', ['css']);
    gulp.watch((paths.loc.build) + 'sprites/*.*', ['sprites']);
    gulp.watch((paths.loc.build) + 'jade/*.jade', ['jade']);
    gulp.watch((paths.loc.build) + 'scripts/*.js', ['js']);
    gulp.watch((paths.loc.build) + 'fonts/*.*', ['copyfonts']);
    gulp.watch((paths.loc.build) + 'images/*.*', ['images']);
});

// Default Task
gulp.task('default', ['js', 'css', 'sprite', 'images', 'copyfonts', 'copybscss', 'copybsjs','jquery']);
