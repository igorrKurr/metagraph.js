module.exports = function(grunt) {

  grunt.initConfig({

    pkg: grunt.file.readJSON('package.json'),

    concat: {
      options: {
        separator: "\n\n"
      },
      dist: {
        src: [
          'lib/**/*.js'
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
      files: ['lib/**/*.js'],
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
      js: {
        files: ['app/js/main.js'],
        tasks: ['copy:js']
      },
      css: {
        files: ['app/css/main.css'],
        tasks: ['copy:css']
      },
      dev: {
        files: ['lib/*.js'],
        tasks: ['requirejs', 'copy:dev']
      }
    },

    copy: {
      rails: {
        src: 'dist/metagraph.js',
        dest: '../metagraph/vendor/metagraph.js'
      },
      dev: {
        src: 'dist/metagraph.js',
        dest: 'test/dummy/metagraph.js'
      }
    },

    qunit: {
      all: ['tests/tests.html']
    },

    testem: {
      test: {
        // src: ['lib/**/*.js', "test/**/*.js", 'test/helpers/**/*.js'],
        options: {
          parallel: 8,
          test_page: 'test/tests.html',
          launch_in_ci: ['PhantomJS'],
          launch_in_dev: ['Chrome']
        }
      }
    },

    requirejs: {
      compile: {
        options: {
          name: "metagraph",
          baseUrl: "lib/",
          mainConfigFile: "config.js",
          // name: "path/to/almond", // assumes a production build using almond
          out: "dist/metagraph.js"
        }
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-qunit');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-testem');
  grunt.loadNpmTasks('grunt-contrib-requirejs');

  grunt.registerTask('test', ['concat', 'jshint', 'testem:test:ci']);
  grunt.registerTask('default', ['concat', 'jshint', 'qunit', 'uglify']);
  grunt.registerTask('build', ['test', 'requirejs']);
  grunt.registerTask('prepare', ['requirejs', 'copy:dev']);
  grunt.registerTask('dev', ['watch:dev']);

  // grunt.registerTask('dev', ['watch']);
};