module.exports = function(grunt) {

  grunt.initConfig({

    pkg: grunt.file.readJSON('package.json'),

    concat: {
      options: {
        separator: "\n\n"
      },
      dist: {
        src: [
          'app/**/*.js'
        ],
        dest: 'dist/<%= pkg.name.replace(".js", "") %>.js'
      }
    },
    uglify: {
      options: {
        banner: '/*! <%= pkg.name.replace(".js", "") %> <%= grunt.template.today("dd-mm-yyyy") %> */\n'
      },
      dist: {
        files: {
          'dist/<%= pkg.name.replace(".js", "") %>.min.js': ['<%= concat.dist.dest %>']
        }
      }
    },

    jshint: {
      files: ['dist/factory-bot.js'],
      options: {
        globals: {
          console: true,
          module: true,
          document: true
        },
        jshintrc: '.jshintrc'
      }
    },

    watch: {
      // files: ['<%= jshint.files %>'],
      // tasks: ['concat', 'jshint', 'qunit'],
      js: {
        files: ['app/js/main.js'],
        tasks: ['copy:js']
      },
      css: {
        files: ['app/css/main.css'],
        tasks: ['copy:css']
      }
    },

    copy: {
      js: {
        src: 'app/js/main.js',
        dest: 'example/app/scripts/main.js'
      },
      css: {
        src: 'app/css/main.css',
        dest: 'example/app/styles/main.css'
      }
    }

  });

  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-qunit');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-copy');

  grunt.registerTask('test', ['jshint', 'qunit']);
  grunt.registerTask('default', ['concat', 'jshint', 'qunit', 'uglify']);
  grunt.registerTask('example', ['concat', 'copy']);
  grunt.registerTask('dev', ['watch']);
};