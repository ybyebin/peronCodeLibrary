  module.exports = function(grunt) {
      grunt.initConfig({
          //读取package.json的内容，形成个json数据
          pkg: grunt.file.readJSON('package.json'),
          imagemin: {
              /* 压缩图片大小 */
              dist: {
                  options: {
                      optimizationLevel: 3 //定义 PNG 图片优化水平  
                  },
                  files: [{
                      expand: true,
                      cwd: 'images/',
                      src: ['**/*.{png,jpg,jpeg}'], // 优化 img 目录下所有 png/jpg/jpeg 图片  
                      dest: 'images/' // 优化后的图片保存位置，覆盖旧图片，并且不作提示  
                  }]
              }
          },
      });
      grunt.loadNpmTasks('grunt-contrib-imagemin');
      grunt.registerTask('default', ['imagemin']);
  };