// 引入 gulp
var gulp = require('gulp'); 

// 引入组件

var htmlmin = require('gulp-htmlmin'); //压缩html
var minifycss = require('gulp-minify-css');//压缩css
var uglify = require('gulp-uglify');  //压缩js
// var concat = require('gulp-concat');    //合并文件
var image = require('gulp-imagemin');   //压缩图片

// 检查脚本
// gulp.task('lint', function() {
//     gulp.src('./js/*.js')
//         .pipe(jshint())
//         .pipe(jshint.reporter('default'));
// });


//执行任务
gulp.task('html',function(){
    gulp.src('src/**/*.html')  
    .pipe(htmlmin({collapseWhitespace: true}))
    .pipe(gulp.dest('dist'))
})

gulp.task('css',function(){
    gulp.src('src/**/*.css')  //这里是指src目录下所有的css后缀文件
    .pipe(minifycss())           //压缩css
    .pipe(gulp.dest('dist'))
})

gulp.task('js',function(){
    gulp.src('src/**/*.js')  
    .pipe(uglify())    
    .pipe(gulp.dest('dist'))
})

gulp.task('img',function(){
    gulp.src('src/img/*')            //压缩图片路径
    .pipe(image())               //压缩图片
    .pipe(gulp.dest('dist/image'))  //压缩图片输出路径
});


//监听所有打包之后的文件变动，自动刷新页面
gulp.task('watch', function () {
// Create LiveReload server
livereload.listen();
// Watch any files in dist/, reload on change
gulp.watch(['src/**']).on('change', livereload.changed);
});

gulp.task('default',['css','js','img','watch']) ; //运行所有任务
var watcherjs = gulp.watch('src/**/*.js', ['js']);
var watchercss = gulp.watch('src/**/*.css', ['css']);
var watchhtml = gulp.watch('src/*.html',['html']);
var watchimg = gulp.watch('src/img/*',['img']);
watcherjs.on('change', function(event) {
  console.log('File ' + event.path + ' was ' + event.type + ', running tasks...');
});

watchercss.on('change', function(event) {
  console.log('File ' + event.path + ' was ' + event.type + ', running tasks...');
});

watchhtml.on('change', function(event) {
  console.log('File ' + event.path + ' was ' + event.type + ', running tasks...');
});

watchimg.on('change', function(event) {
  console.log('File ' + event.path + ' was ' + event.type + ', running tasks...');
});

