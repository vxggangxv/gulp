// Modules 호출
var gulp 			= require('gulp'),
		csslint   = require('gulp-csslint'),
		concatcss = require('gulp-concat-css'),
		uglifycss = require('gulp-uglifycss'),
		jshint    = require('gulp-jshint')
		uglify    = require('gulp-uglify')
		concat    = require('gulp-concat')
		rename    = require('gulp-rename');

/*
	환경설정
*/
// 검사, 병합, 압축 설정
var config = {
	concat: true,
	uglify: true,
	rename: true
}

// 파일 경로(Path) 설정
var path = {
	css: {
		src			: ['src/css/**/*.css', '!src/css/style.css'],
		dest		: 'dist/css/',
		filename: 'style.css'
	},
	js: {
		src			: 'src/js/libs/**/*.js',
		dest		: 'dist/js/',
		filename: 'DOMlibrary.js'
	}
};

// Javascript 파일들을 병합
gulp.task('scripts', function() {
	gulp
		// .src(['./src/domhelper-id.js', './src/domhelper-tag.js'])
		// .src('./src/*.js')
		// .src(['./src/domhelper-prevEl.js', './src/*.js'])
		// .pipe(concat('combined.js'))
		.src('./src/js/libs/**/*.js')
		.pipe(jshint())
		.pipe(jshint.reporter('jshint-stylish'))
		.pipe(concat('Domlibrary.js'))
		.pipe(gulp.dest('./dist'))
		.pipe(uglify({
			//mangle: false,
			//preserveComments: 'all'	// 'all', 'some'
		}))
		.pipe(rename('Domlibrary.min.js'))
		.pipe(gulp.dest('./dist'));
});		

gulp.task('styles', function() {
	gulp.src( path.css.src )
			// css 문법검사
			.pipe( csslint() )
			// css 파일 병합
			.pipe( gulpif( config.concat, concatcss( path.css.filename ) ) )
			.pipe( gulp.dest( path.css.dest ) )
			// css 압축
			.pipe( gulpif( config.uglify, uglifycss() ) )
			.pipe( gulpif( config.rename, rename({suffix: '.min'}) ) )
			.pipe( gulp.dest( path.css.dest ) );
});

// Gulp.task()를 사용해 기본(Default) 테스크 정의
gulp.task('default', function() {
	console.log('gulp default 일이 수행되었습니다.');
});

