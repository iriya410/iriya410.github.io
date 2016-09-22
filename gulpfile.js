var gulp = require('gulp');
var uglify = require('gulp-uglify');
var concat = require('gulp-concat');
var sass = require('gulp-sass');
var gulpif = require('gulp-if');
var sourcemaps = require('gulp-sourcemaps');
var babel = require('gulp-babel');
var runSequence = require('run-sequence');
var del = require('del');

global.isProd = false;

/**
 * @name dev
 * @description dev mode gulp task
 * @type {Function}
 */
gulp.task('dev', function () {
	global.isProd = false;

	runSequence(['clean', 'uglify', 'sass'], 'watch');
});

/**
 * @name prod
 * @description prod mode gulp task
 * @type {function}
 */
gulp.task('prod', ['clean'], function () {
	global.isProd = true;

	runSequence(['uglify', 'sass']);
});

/**
 * @name clean
 * @description clean dist folder
 * @type {function}
 */
gulp.task('clean', function () {
	del(['dist']);
});

/**
 * @name uglify
 * @description js file build
 * @type {function}
 */
gulp.task('uglify', function() {
	gulp.src('src/js/*.js')
		.pipe(gulpif(!global.isProd, sourcemaps.init()))
		.pipe(babel({
			presets : ['es2015']	//es 2015 converting
		}))
		.pipe(concat('3d_slider.min.js'))
		.pipe(gulpif(global.isProd, uglify()))
		.pipe(gulpif(!global.isProd, sourcemaps.write()))
		.pipe(gulp.dest('dist'));
});

/**
 * @name sass
 * @description sass converting
 * @type {function}
 */
gulp.task('sass', function() {
	gulp.src('src/sass/*.sass')
		.pipe(sass())
		.pipe(gulp.dest('dist/css'));
});

/**
 * @name watch
 * @description watch task
 * @type {function}
 */
gulp.task('watch', function() {
	gulp.watch('src/sass/*.sass', ['sass']);
	gulp.watch('src/js/*.js', ['uglify']);
});

//gulp.task('default', ['dev']);
