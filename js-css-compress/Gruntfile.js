module.exports = function (grunt) {

    // 构建任务配置
    grunt.initConfig({

        //读取package.json的内容，形成个json数据
        pkg: grunt.file.readJSON('package.json'),

        //压缩js
        uglify: {
            //文件头部输出信息
            options: {
                banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n'
            },
            my_target: {
                files: [
                    {
                        expand: true,
                        //相对路径
                        cwd: 'src/',
                        src: '**/*.js',
                       //src: ['**/*.js', '!**/*.min.js'],  //不包含某个js,某个文件夹下的js
                        dest: 'dist/js/',
                        rename: function (dest, src) {  
                                  var folder = src.substring(0, src.lastIndexOf('/'));  
                                  var filename = src.substring(src.lastIndexOf('/'), src.length);  
                                  //  var filename=src;  
                                  filename = filename.substring(0, filename.lastIndexOf('.'));  
                                  var fileresult=dest + folder + filename + '.js';  
                                  grunt.log.writeln("现处理文件："+src+"  处理后文件："+fileresult);  

                                  return fileresult;  
                                  //return  filename + '.min.js';  
                              } 
                    }
                ]
            }
        },

        //压缩css
        cssmin: {
            //文件头部输出信息
            options: {
                banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n',
                //美化代码
                beautify: {
                    //中文ascii化，非常有用！防止中文乱码的神配置
                    ascii_only: true
                }
            },
            my_target: {
                files: [
                    {
                        expand: true,
                        //相对路径
                        cwd: 'src/',
                        src: '**/*.css',
                        dest: 'dist/css/',
                        rename: function (dest, src) {  
                                var folder = src.substring(0, src.lastIndexOf('/'));  
                                var filename = src.substring(src.lastIndexOf('/'), src.length);  
                                //  var filename=src;  
                                filename = filename.substring(0, filename.lastIndexOf('.'));  
                                var fileresult=dest + folder + filename + '.css';  
                                grunt.log.writeln("现处理文件："+src+"  处理后文件："+fileresult);  

                                return fileresult;  
                              //return  filename + '.min.js';
                                }
                    }
                ]
            }
        },

        // 压缩 image
        imagemin: {
              /* 压缩图片大小 */
              dist: {
                  options: {
                      optimizationLevel: 3 //定义 PNG 图片优化水平  
                  },
                  files: [{
                      expand: true,
                      cwd: 'src/',
                      src: ['**/*.{png,jpg,jpeg}'], // 优化 img 目录下所有 png/jpg/jpeg 图片  
                      dest: 'dist/images/' // 优化后的图片保存位置，覆盖旧图片，并且不作提示  
                  }]
              }
          },
        // watch
        watch:{
            build:{
                files:['src/**/*.js','src/**/*.css'],
                tasks:['uglify','cssmin'],
                options:{
                    spawn:false
                }
            }
        }

    });

    // 加载指定插件任务
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-imagemin');
    grunt.loadNpmTasks('grunt-contrib-watch');
    // 默认执行的任务
    grunt.registerTask('default', ['uglify','cssmin','imagemin','watch']);

};