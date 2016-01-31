var gulp = require('gulp');
var riot = require('gulp-riot');
var minify = require('gulp-minify');
var cssnano = require('gulp-cssnano');
var concat = require('gulp-concat');
var sass = require('gulp-sass');
var sourcemaps = require('gulp-sourcemaps');
var rename = require('gulp-rename');
var replace = require('gulp-replace');
var babel = require('gulp-babel');
var filter = require('gulp-filter');

var paths = {
    util: 'src/_common/util.js',
    tags: 'src/**/*.tag',
    scss: 'src/**/*.scss',
    dest: {
        js: './dist/js/',
        css: './dist/css/'
    }
};

gulp.task('tags', () => {
    const tagFilter = filter('**/*.tag', {restore: true});

    gulp.src([paths.util, paths.tags])
        .pipe(tagFilter)
        .pipe(replace(/type="text\/ecmascript-6"/g, ''))
        .pipe(riot())
        .pipe(tagFilter.restore)
        .pipe(concat('rui.js'))
        .pipe(babel({presets: ['es2015']}))
        .pipe(minify())
        .pipe(sourcemaps.write())
        .pipe(gulp.dest(paths.dest.js));
});

gulp.task('scss', () =>
    gulp.src(paths.scss)
        .pipe(sass())
        .pipe(concat('rui.css'))
        .pipe(cssnano())
        .pipe(sourcemaps.write())
        .pipe(gulp.dest(paths.dest.css))
);

gulp.task('watch', () => {
    gulp.watch(paths.tags, ['tags']);
    gulp.watch(paths.scss, ['scss']);
});

gulp.task('default', ['tags','scss', 'watch']);