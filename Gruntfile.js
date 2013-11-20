module.exports = function(grunt) {
  "use strict";

  require("load-grunt-tasks")(grunt, {
    pattern: [
      "grunt-*",
      "karma-*",
      "bbb",
      "jshint-stylish"
      ]
    });

  require("time-grunt")(grunt);

  grunt.initConfig({
    // Clear out previous builds and test reporting
    clean: [
      "dist/",
      "test/reports"
      ],

    // Run the app and tests through JSHint, using settings from the
    // .jshintrc file.
    jshint: {
      options: {
        jshintrc: ".jshintrc",
        reporter: require("jshint-stylish")
        },
        all: [
          "Gruntfile.js",
          "app/{,*/}*.js",
          "test/jasmine/specs/{,*/}*.js",
          "test/mocha/specs/{,*/}*.js",
          "test/qunit/specs/{,*/}*.js"
          ]
    },

    // This task uses James Burke's excellent r.js AMD builder to take all
    // modules and concatenate them into a single file.
    requirejs: {
      release: {
        options: {
          mainConfigFile: "app/config.js",
          generateSourceMaps: true,
          include: ["main"],
          insertRequire: ["main"],
          out: "dist/source.min.js",
          optimize: "uglify2",

          // App is bootstrapped with nested `require` calls. This option
          // allows R.js to find them.
          findNestedDependencies: true,

          // Include a minimal AMD implementation shim.
          name: "almond",

          // Setting base url to the distribution directory allows the Uglify
          // process to correctly map paths for source maps.
          baseUrl: "dist/app",

          // Wrap everything in an IIFE.
          wrap: true,

          // Do not preserve license comments when working with source maps.
          preserveLicenseComments: false
        }
      }
    },

    // less: {
    //   development: {
    //     options: {
    //       paths: ["vendor/bower/bootstrap"],
    //       relativeUrls: true
    //     },
    //     files: {
    //       "app/styles/index.css": "app/styles/index.less"
    //     }
    //   },
    //   dist: {
    //     options: {
    //       paths: ["vendor/bower/bootstrap"],
    //       relativeUrls: true,
    //       cleancss: true
    //     },
    //     files: {
    //       "app/styles/index.css": "app/styles/index.less"
    //     }
    //   }
    // },

    // This task simplifies working with CSS inside Backbone Boilerplate
    // projects. Instead of manually specifying your stylesheets inside the
    // HTML, you can use `@imports` and this task will concatenate only those
    // paths.
    styles: {
      // Output the concatenated contents of the following styles into the
      // development file path below.
      "dist/styles.css": {
        // Point this to your index.css.
        src: "app/styles/index.css",

        // The relative path to use for the @imports.
        paths: ["app/styles"],

        // Rewrite image paths during release to be relative to the `img`
        // directory.
        forceRelative: "/app/img/"
      }
    },

    // Minfiy the distribution CSS.
    cssmin: {
      release: {
        files: {
          "dist/styles.min.css": ["dist/styles.css"]
        }
      }
    },

    server: {
      options: {
        host: "0.0.0.0",
        port: 8000
      },

      development: {},

      release: {
        options: {
          prefix: "dist"
        }
      },

      test: {
        options: {
          forever: false,
          port: 8001
        }
      }
    },

    processhtml: {
      release: {
        files: {
          "dist/index.html": ["index.html"]
        }
      }
    },

    // Move vendor and app logic during build.
    copy: {
      release: {
        files: [
          { src: ["app/**"], dest: "dist/" },
          { src: "vendor/**", dest: "dist/" }
        ]
      }
    },

    concurrent: {
      target1: ["imagemin","svgmin"],
      target2: {
        tasks: ["nodemon", "watch"],
          options: {
            logConcurrentOutput: true
          }
      }
    },

    compress: {
      release: {
        options: {
          archive: "dist/source.min.js.gz"
        },

        files: ["dist/source.min.js"]
      }
    },

    // rev: {
    //   dist: {
    //     files: {
    //       src: [
    //         'dist/scripts/{,*/}*.js',
    //         'dist/styles/{,*/}*.css',
    //         'dist/images/{,*/}*.{png,jpg,jpeg,gif,webp}',
    //         'dist/styles/fonts/*'
    //       ]
    //     }
    //   }
    // },

    // Unit testing is provided by Karma. Change the two commented locations
    // below to either: mocha, jasmine, or qunit.
    karma: {
      options: {
        basePath: process.cwd(),
        singleRun: true,
        captureTimeout: 7000,
        autoWatch: true,
        logLevel: "ERROR",

        reporters: ["dots", "coverage"],
        browsers: ["PhantomJS"],

        // Change this to the framework you want to use.
        frameworks: ["mocha"],

        plugins: [
          "karma-jasmine",
          "karma-mocha",
          "karma-qunit",
          "karma-phantomjs-launcher",
          "karma-coverage"
        ],

        preprocessors: {
          "app/**/*.js": "coverage"
        },

        coverageReporter: {
          type: "lcov",
          dir: "test/coverage"
        },

        files: [
          // You can optionally remove this or swap out for a different expect.
          "vendor/bower/chai/chai.js",
          "vendor/bower/requirejs/require.js",
          "test/runner.js",

          { pattern: "app/**/*.*", included: false },
          // Derives test framework from Karma configuration.
          {
            pattern: "test/<%= karma.options.frameworks[0] %>/**/*.spec.js",
            included: false
          },
          { pattern: "vendor/**/*.js", included: false }
        ]
      },

      // This creates a server that will automatically run your tests when you
      // save a file and display results in the terminal.
      daemon: {
        options: {
          singleRun: false
        }
      },

      // This is useful for running the tests just once.
      run: {
        options: {
          singleRun: true
        }
      }
    },

    coveralls: {
      options: {
        coverage_dir: "test/coverage/PhantomJS 1.9.2 (Linux)/"
      }
    }
  });



  // Grunt contribution tasks.
  /*
  grunt.loadNpmTasks("grunt-contrib-clean");
  grunt.loadNpmTasks("grunt-contrib-jshint");
  grunt.loadNpmTasks("grunt-contrib-less");
  grunt.loadNpmTasks("grunt-contrib-cssmin");
  grunt.loadNpmTasks("grunt-contrib-copy");
  grunt.loadNpmTasks("grunt-contrib-compress");
  grunt.loadNpmTasks("grunt-contrib-watch");

  // Third-party tasks.
  grunt.loadNpmTasks("grunt-karma");
  grunt.loadNpmTasks("grunt-karma-coveralls");
  grunt.loadNpmTasks('grunt-concurrent');
  grunt.loadNpmTasks("grunt-processhtml");
  grunt.loadNpmTasks("grunt-rev");
  grunt.loadNpmTasks("grunt-svgmin");

  // Grunt BBB tasks.
  grunt.loadNpmTasks("grunt-bbb-server");
  grunt.loadNpmTasks("grunt-bbb-requirejs");
  grunt.loadNpmTasks("grunt-bbb-styles");
  */

  // When running the default Grunt command, just lint the code.
  grunt.registerTask("default", [
    "clean",
    "jshint",
    "processhtml",
    "copy",
    "requirejs",
    "styles",
    "cssmin"
  ]);

  grunt.registerTask("demotask", [
    "clean",
    //"less",
    "concurrent:target1",
    "jshint",
    "processhtml",
    "copy",
    "requirejs",
    "styles",
    "cssmin",
    //"rev:dist",
    //"usemin"
    ]);
};
