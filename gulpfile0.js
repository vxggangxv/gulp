// Modules 호출
var gulp = require('gulp'),
		jshint = require('gulp-jshint')
		uglify = require('gulp-uglify')
		concat = require('gulp-concat')
		rename = require('gulp-rename');

/*
	Javascript
	문법 검사 > 병합 > 압축
*/
gulp.task('scripts', ['js:hint', 'js:concat', 'js:uglify']);

// JS 문법 검사
gulp.task('js:hint', function() {
	gulp.src('src/js/libs/**/*.js')
			.pipe(jshint())
			.pipe(jshint.reporter('jshint-stylish'));
});

// JS 병합
gulp.task('js:concat', function() {
	gulp.src('src/js/libs/**/*.js')
			.pipe(concat('DOMlibrary.js'))
			.pipe(gulp.dest('./dist'));
});

// JS 압축
gulp.task('js:uglify', function() {
	gulp.src('dist/DOMlibrary.js')
			.pipe(uglify({
				mangle: false,
				preserveComments: 'some'
			}))
			.pipe(rename('DOMlibrary.min.js'))
			.pipe(gulp.dest('./dist'));
});