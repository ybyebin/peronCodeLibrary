// 引入 gulp
var gulp = require('gulp');

// 引入组件

var htmlmin = require('gulp-htmlmin'); //压缩html
var minifycss = require('gulp-minify-css'); //压缩css
var uglify = require('gulp-uglify'); //压缩js
var concat = require('gulp-concat'); //合并文件
var image = require('gulp-imagemin'); //压缩图片
var useref = require('gulp-useref');
var gulpif = require('gulp-if');
// var clean = require('gulp-clean');
var del = require('del');
var filter = require('gulp-filter');
var RevAll = require('gulp-rev-all');


// 检查脚本
// gulp.task('lint', function() {
//     gulp.src('./js/*.js')
//         .pipe(jshint())
//         .pipe(jshint.reporter('default'));
// });
var jsFilter = filter('src/**/*.js', {
        restore: true
    }),
    cssFilter = filter('src**/*.css', {
        restore: true
    }),
    htmlFilter = filter(['src**/*.html'], {
        restore: true
    });
gulp.task('clean', function(cb) {
  return  del(['dist'],cb);
});
gulp.task('htmls', function() {
    return gulp.src('src/**/*.html')
        .pipe(useref())
        .pipe(jsFilter)
        .pipe(gulpif('*.js', uglify()))
        .pipe(jsFilter.restore)
        .pipe(cssFilter)
        .pipe(gulpif('*.css', minifycss()))
        .pipe(cssFilter.restore)
        .pipe(RevAll.revision({ // 生成版本号
            dontRenameFile: ['.html'], // 不给 html 文件添加版本号 
            dontUpdateReference: ['.html'] // 不给文件里链接的html加版本号
        }))
        .pipe(htmlFilter) // 过滤所有html
        .pipe(htmlmin()) // 压缩html
        .pipe(htmlFilter.restore)
        .pipe(gulp.dest('dist'))
        .on('data', function(file) {
            console.log('查看压缩html:' + file.history[0])
        });
});

//执行任务
gulp.task('html', function() {
    gulp.src('src/**/*.html')
        .pipe(htmlmin({
            collapseWhitespace: true
        }))
        .pipe(gulp.dest('dist'))
        .on('data', function(file) {
            console.log(file.history[0])
        });
})

gulp.task('css', function() {
    gulp.src('src/**/*.css') //这里是指src目录下所有的css后缀文件
        .pipe(minifycss()) //压缩css
        .pipe(gulp.dest('dist'))
        .on('data', function(file) {
            console.log(file.history[0])
        });
})

gulp.task('js', function() {
    gulp.src('src/**/*.js')
        .pipe(uglify({
                compress: {
                    drop_console: true //去掉console.log
                }
            
        }))
        .pipe(gulp.dest('dist'))
        .on('data', function(file) {
            console.log(file.history[0])
        });
})

gulp.task('img', function() {
    gulp.src('src/images/**/*') //压缩图片路径
        .pipe(image()) //压缩图片
        .pipe(gulp.dest('dist/images')) //压缩图片输出路径
});


//监听所有打包之后的文件变动，自动刷新页面
gulp.task('watch',function() {
     gulp.watch('src/**/*.js', ['js']).on('change', function(event) {
        // console.log('File ' + event.path + ' was ' + event.type + ', running tasks...');
    });
     gulp.watch('src/**/*.css', ['css']).on('change', function(event) {
        // console.log('File ' + event.path + ' was ' + event.type + ', running tasks...');
    });
     gulp.watch('src/*.html', ['html']).on('change', function(event) {
        // console.log('File ' + event.path + ' was ' + event.type + ', running tasks...');
    });

    // gulp.watch(['src/**/*.js','src/**/*.css','src/*.html'],['htmls']).on('change',function(event){
    //     console.log('File ' + event.path + ' was ' + event.type + ', running tasks...');
    // });
});


gulp.task('default', ['clean'], function(){
    gulp.start('js', 'css', 'img', 'htmls','watch');
    // gulp.start('htmls');

});


// gulp.task('default', ['js', 'css', 'img', 'htmls','watch']);
// gulp.task('default', ['htmls']); //运行所有任务

// var watchhtmls = gulp.watch()
// var watchimg = gulp.watch('src/img/*',['img']);
// watcherjs.on('change', function(event) {
//     console.log('File ' + event.path + ' was ' + event.type + ', running tasks...');
// });

// watchercss.on('change', function(event) {
//     console.log('File ' + event.path + ' was ' + event.type + ', running tasks...');
// });

// watchhtml.on('change', function(event) {
//     console.log('File ' + event.path + ' was ' + event.type + ', running tasks...');
// });

// watchimg.on('change', function(event) {
//   console.log('File ' + event.path + ' was ' + event.type + ', running tasks...');
// });