// Modules 호출
var gulp   					= require('gulp'),
		csslint         = require('gulp-csslint'),
		concatcss       = require('gulp-concat-css'),
		uglifycss       = require('gulp-uglifycss'),
		jshint          = require('gulp-jshint'),
		uglify          = require('gulp-uglify'),
		concat          = require('gulp-concat'),
		rename          = require('gulp-rename'),
		gulpif          = require('gulp-if')
		del             = require('del'),
		config					= require('./config.json');


/* 
	-디렉터리 정리 후 조합 
	 기본(Default) & 관찰(Watch) 업무 정의
	 clean > styles > scripts 순으로 업무 실행
*/
gulp.task('default', ['clean', 'styles', 'scripts']);

// 지속적 관찰(Watch) 업무 정의 ('clean'생략가능)
// gulp.task('watch', 'clean', function() {
gulp.task('watch', function() {
	gulp.watch( config.path.css.src, ['styles'] );
	gulp.watch( config.path.js.src, ['scripts'] );
});
/*
	폴더/파일 제거
*/
gulp.task('clean', function() {
	del(['dist/*']);
});

/*
	Javascript
	NPM 설치 모듈: gulp-lint, gulp-concat, gulp-uglify
	문법 검사 > 병합 > 압축
*/
gulp.task('scripts', ['js:hint', 'js:concat', 'js:uglify']);

// JS 문법 검사
gulp.task('js:hint', function() {
	gulp.src( config.path.js.src )
			.pipe(jshint())
			.pipe(jshint.reporter('jshint-stylish'));
});

// JS 병합
gulp.task('js:concat', function() {
	gulp.src( config.path.js.src )
			.pipe(concat( config.path.js.filename ))
			.pipe(gulp.dest( config.path.js.dest ));
});

// JS 압축
gulp.task('js:uglify', function() {
	gulp.src( config.path.js.dest + config.path.js.filename )
			.pipe(uglify({mangle: false}))
			.pipe(rename( { suffix: '.min' } ))
			.pipe(gulp.dest( config.path.js.dest ));
});

/*
	css
	NPM 설치 모듈: gulp-csslint, gulp-concat-css, gulp-uglifycss
	문법검사 > 병합 > 압축
*/
gulp.task('styles', ['css:lint', 'css:concat', 'css:uglify']);

// CSS 문법검사
gulp.task('css:lint', function() {
	gulp.src( config.path.css.src )
			.pipe( csslint() );
});
// CSS 병합
gulp.task('css:concat', function() {
	gulp.src( config.path.css.src )
			.pipe( gulpif( config.concat, concatcss( config.path.css.filename ) ) )
			.pipe( gulp.dest( config.path.css.dest ) );
});
// CSs 압축
gulp.task('css:uglify', function() {
	gulp.src( config.path.css.dest + config.path.css.filename )
			.pipe( gulpif( config.uglify, uglifycss() ) )
			.pipe( gulpif( config.rename, rename({suffix: '.min'}) ) )
			.pipe( gulp.dest( config.path.css.dest ) );
});

