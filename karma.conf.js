// Karma configuration
module.exports = function (config) {
  config.set({
    basePath: '',
    files: [
      'bower_components/angular/angular.js',
      'bower_components/angular-mocks/angular-mocks.js',
      'ab-svc.js',
      '*.spec.js'
    ],

    preprocessors: {
      'ab-svc.js': ['coverage']
    },

    reporters: ['dots', 'coverage'],

    coverageReporter: {
      reporters: [{
        type: 'text'
      }, {
        type: 'lcov',
        dir: 'coverage/'
      }]
    },
    port: 9876,
    colors: true,

    logLevel: config.LOG_INFO,

    browsers: ['Firefox'],
    frameworks: ['jasmine'],

    captureTimeout: 60000,

    autoWatch: true,
    singleRun: false
  });

  // have travis publish to coveralls
  if (process.env.TRAVIS) {
    config.reporters.push('coveralls');
  }
};