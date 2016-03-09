var gulp = require('gulp');
var riot = require('gulp-riot');
var minify = require('gulp-minify');
var concat = require('gulp-concat');
var sourcemaps = require('gulp-sourcemaps');
var babel = require('gulp-babel');
var filter = require('gulp-filter');
var browserSync = require('browser-sync').create();

var paths = {
    util: 'src/_common/util.js',
    tags: 'src/**/*.tag',
    dest: './dist/'
};

gulp.task('browser-sync', () => {
    browserSync.init({
        server: {
            baseDir: "./"
        }
    });
});

gulp.task('tags', () => {
    const tagFilter = filter('**/*.tag', {
        restore: true
    });

    gulp.src([paths.util, paths.tags])
        .pipe(tagFilter)
        .pipe(riot())
        .pipe(tagFilter.restore)
        .pipe(concat('rui.js'))
        .pipe(minify())
        .pipe(sourcemaps.write('./'))
        .pipe(gulp.dest(paths.dest));
});


gulp.task('watch', () => {
    gulp.watch(paths.tags, ['tags']).on('change', browserSync.reload);
});

gulp.task('default', ['tags', 'watch']);