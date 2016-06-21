module.exports = function (config) {
  config.set({
    basePath: '..',
    frameworks: ['jasmine'],
    plugins: [
      require('karma-jasmine'),
      require('karma-chrome-launcher'),
      require('karma-coverage'),
      require('karma-spec-reporter'),
      require('karma-remap-istanbul')
    ],
    customLaunchers: {
      // chrome setup for travis CI using chromium
      Chrome_travis_ci: {
        base: 'Chrome',
        flags: ['--no-sandbox']
      }
    },
    files: [
      { pattern: 'dist/vendor/es6-shim/es6-shim.js', included: true, watched: false },
      { pattern: 'dist/vendor/zone.js/dist/zone.js', included: true, watched: false },
      { pattern: 'dist/vendor/reflect-metadata/Reflect.js', included: true, watched: false },
      { pattern: 'dist/vendor/systemjs/dist/system-polyfills.js', included: true, watched: false },
      { pattern: 'dist/vendor/systemjs/dist/system.src.js', included: true, watched: false },
      { pattern: 'dist/vendor/zone.js/dist/async-test.js', included: true, watched: false },
      { pattern: 'dist/vendor/zone.js/dist/fake-async-test.js', included: true, watched: false },

      { pattern: 'config/karma-test-shim.js', included: true, watched: true },

      // Distribution folder.
      { pattern: 'dist/**/*', included: false, watched: true }
    ],
    exclude: [
      // Vendor packages might include spec files. We don't want to use those.
      'dist/vendor/**/*.spec.js'
    ],
    preprocessors: {
      'dist/components/**/!(*spec|*vendor).js': ['coverage']
    },
    coverageReporter: {
      dir : 'coverage/',
      reporters: [
        { type: 'html' },
        { type: 'lcov' },
        { type: 'json',
          subdir: '.',
          file: 'coverage-final.json'
        }
      ]
    },
    remapIstanbulReporter: {
      src: 'coverage/coverage-final.json',
      reports: {
        html: 'coverage/coverage-remap',
        lcovonly: 'coverage/coverage-remap/lcov.info'
      },
      timeoutNotCreated: 1000,
      timeoutNoMoreFiles: 1000
    },
    reporters: ['spec', 'coverage', 'karma-remap-istanbul'],
    port: 9876,
    colors: true,
    logLevel: config.LOG_INFO,
    autoWatch: true,
    browsers: ['Chrome'],
    singleRun: false
  });
};
