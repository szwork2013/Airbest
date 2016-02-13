/// <binding ProjectOpened='watch' />

var gulp = require("gulp"),
    autoprefixer = require("gulp-autoprefixer"),
    rename = require('gulp-rename'),
    less = require("gulp-less"),
    concat = require('gulp-concat');

var cssnano = require('gulp-cssnano');
var sourcemaps = require('gulp-sourcemaps');

gulp.task('less', function () {
    return gulp.src('Content/themes/src/*.less')
        .pipe(less({}))
        .pipe(autoprefixer('safari 5', 'ie 8', 'ie 9', 'opera 12.1', 'ios 6', 'android 4'))
        .pipe(gulp.dest("Content/themes/dist"))
        .pipe(cssnano())
        .pipe(rename({ suffix: '.min' }))
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest("Content/themes/dist"));
});

gulp.task('minifyjs', function () {
    var srcDir = "Content/modules/src/";
    var modules = ["utils", "bmap", "services", "directives", "main", "manage"];

    var srcs = [];
    for (var i = 0; i != modules.length; ++i) {
        srcs.push(srcDir + modules[i] + "/module.js");
        srcs.push(srcDir + modules[i] + "/**/*.js");
    }

    srcs.push(srcDir + "**/*.js");

    return gulp.src(srcs)
        .pipe(concat('app.js'))
        .pipe(gulp.dest('Content/modules/dist'));
});

gulp.task('watch', function () {
    gulp.watch('Content/themes/src/**/*.less', ['less'], function () {});
    gulp.watch('Content/modules/src/**/*.js', ['minifyjs'], function () { });
});