// Gruntfile.js
module.exports = grunt => {
  const pkg = require('./package'),
    BUILD_DIR = pkg.dirs.build,
    ASSETS_DIR = pkg.dirs.assets,
    configFiles = [
      '*.js'
    ],
    lessMainFiles = [
      ASSETS_DIR + 'less/*.less',
    ],
    lessComponentAndPagesFiles = [
      ASSETS_DIR + 'less/components/*.less',
    ];

  require('load-grunt-tasks')(grunt);

  grunt.initConfig({
    jshint: {},

    bake: {
      build: {
        files: {
          'index.html': 'app/index.html'
        }
      }
    },

    clean: {
      build: [BUILD_DIR]
    },

    copy: {
      build: {
        files: [
          {
            expand: true,
            cwd: ASSETS_DIR,
            src: [
              '**/*',
              '!less',
            ],
            dest: BUILD_DIR
          }
        ]
      }
    },

    less: {
      dist: {
        files: {
          [`${BUILD_DIR}app.css`]: [`${ASSETS_DIR}less/main.less`]
        }
      },
      options: {
        livereload: false
      }
    },

    uglify: {
      build: {
        files: {
          [`${ASSETS_DIR}js/main.min.js`]: [`${ASSETS_DIR}js/main.js`]
        }
      }
    },

    watch: {
      options: {
        livereload: true,
      },
      configFiles: {
        files: configFiles,
        task: ['uglify'],
        livereload: true
      },
      less: {
        files: lessMainFiles,
        tasks: ['less:dist'],
        livereload: true
      },
      lessComponents: {
        files: lessComponentAndPagesFiles,
        tasks: ['less:dist', 'bake'],
        livereload: true
      },
      css: {
        files: [`${BUILD_DIR}app.css`],
        livereload: true
      },
      js: {
        files: ['src/assets/js/*.js'],
        tasks: ['build']
      },
      all: {
        files: ['app/*.html', 'app/**/*.html'],
        tasks: ['bake'],
        options: {
          livereload: true
        }
      }
    },

    connect: {
      server: {
        options: {
          port: 9000,
          base: '.',
          hostname: '0.0.0.0',
          protocol: 'http',
          livereload: true,
          open: true
        }
      }
    }
  });

  grunt.registerTask('server', ['connect', 'watch', /*'bake'*/]);
  grunt.registerTask('build', ['clean', 'uglify', 'copy', 'less', /*'bake'*/]);
};
