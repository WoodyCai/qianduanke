var gulp = require('gulp'),
    sass = require('gulp-sass'),
    autoprefixer = require('gulp-autoprefixer'),
    sourcemaps = require('gulp-sourcemaps'),
    livereload = require('gulp-livereload'),
    plumber = require('gulp-plumber'),  // 异常报错
    notify = require('gulp-notify');

// sass编译+监测
gulp.task('watch-sass',function(){
	gulp.watch('cases/sass/*.scss',function(file){
		gulp.src(file.path)
		.pipe(plumber({errorHandler: notify.onError('Error: <%= error.message %>')}))
		.pipe(sourcemaps.init())
		.pipe(sass())
		.pipe(autoprefixer({
            browsers: ['last 2 versions', 'Android >= 4.0'],
            cascade: true, //是否美化属性值 默认：true 像这样：
            //-webkit-transform: rotate(45deg);
            //        transform: rotate(45deg);
            remove:true //是否去掉不必要的前缀 默认：true
        }))
		.pipe(sourcemaps.write('./maps'))
		.pipe(gulp.dest('cases/css'));
	});
});

// 监听css文件
gulp.task('watch-css',function(){
	livereload.listen();
	gulp.watch('cases/css/*.css',function(file){
		livereload.changed(file.path);
	});
})


// 页面文件发生变化刷新浏览器
gulp.task('watch-html',function(){
	livereload.listen();
	gulp.watch(['**/*.html','**/*.shtml'],function(file){
		livereload.changed(file.path);
	});
})

// 自动刷新
gulp.task('watch',['watch-sass','watch-css','watch-html'])
