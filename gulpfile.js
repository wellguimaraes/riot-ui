var gulp = require('gulp');
var riot = require('gulp-riot');
var minify = require('gulp-minify');
var concat = require('gulp-concat');
var sourcemaps = require('gulp-sourcemaps');
var replace = require('gulp-replace');
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
    const tagFilter = filter('**/*.tag', {restore: true});

    gulp.src([paths.util, paths.tags])

        // Replace script type
        .pipe(tagFilter)
        .pipe(replace(/type="text\/ecmascript-6"/g, ''))
        .pipe(riot())
        .pipe(tagFilter.restore)

        // Concat in Rui
        .pipe(concat('rui.js'))
        .pipe(babel({presets: ['es2015']}))
        .pipe(minify())

        .pipe(sourcemaps.write('./'))

        .pipe(gulp.dest(paths.dest));
});


gulp.task('watch', () => {
    gulp.watch(paths.tags, ['tags']).on('change', browserSync.reload);
});

gulp.task('default', ['browser-sync', 'tags', 'watch']);