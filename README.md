# ab-test-service
[![Build Status][travis-image]][travis-url] [![Coveralls Status][coveralls-image]][coveralls-url] [![Dependency Status][depstat-image]][depstat-url] [![NPM version][npm-image]][npm-url] 

An AngularJS service for creating imperative A/B/n tests in your AngularJS projects. This service makes no assumptions
about how your application is set up or how you want to use it. While for most applications a single A/B test service
created at config time will be all you need. There's no reason you can't lazily create the A/B test service, or have
multiple instances.


## Install Choices
- `bower install ab-test-service`
- [download the zip](https://github.com/daniellmb/ab-test-service/archive/master.zip)


## Setup
1. Include the `ab-svc.js` script provided by this component into your app.
2. Add `ab.test.service` as a module dependency to your app.


## Usage

This module exposes a `abMfg` (factory), which is an API for instantiating
A/B tests that are integrated with Angular's digest cycle.


### Making an A/B Test Service Instance

```javascript
// create module with ab.test.service dependency
var demo = angular.module('demo', ['ab.test.service']);

// create a/b test service instance
demo.factory('ab', function(abMfg) {
  return abMfg();
});
```

With that, you can inject your `ab` service into controllers and
other services anywhere in your application!

### Using Your A/B Test Service Instance

Building on the example above ([see demo](https://github.com/daniellmb/ab-test-service/blob/master/demo/index.htm) for full context):

```javascript
// use ab test service in a controller
demo.controller('abTestCtrl', ['$scope', 'ab', function($scope, ab) {
  // look up the button element
  var btn = document.getElementById('example');

  // run a/b test to select css class name
  var cssClass = ab.test(['default','primary','success','info','warning','danger','link'], 1);

  // update the ui
  btn.className = 'btn btn-lg btn-' + cssClass;

  // log variant shown (example)
  //AB.log({shown:cssClass}, "http://www.example.com/log");

  // provide a go button to the repo
  $scope.go = function () {
    // log variant chosen & use optional callback to ensure the page is not left before log completes
    AB.log({chose:cssClass}, "http://www.example.com/log", function(e) {

      // example of checking the event type
      if (e.type === "error") {
        // unable to log a/b test results :(
      } else {
        // a/b test results logged! :)
      }

      // continue to the repo
      location = 'https://github.com/daniellmb/ab-test-service';
    });
  }
}]);
```

## The API
### See [ab.js documentation](https://github.com/daniellmb/ab.js#documentation) for the latest
The [ab.js library](https://github.com/daniellmb/ab.js) consists of two parts the A/B tester (ab.js) and the logger (log.js).
These are separate to enable you to choose the best tools based on your environment. Say for example you already have jQuery
on the page and want to use that for logging data, great, then all you need to include is ab.js.


## Testing
Run `npm install` to make sure you have all the development dependencies.
Run `npm test` to make run all the unit tests.
If you make changes to ab-svc.js file:
Run `npm run gulp` to update the .min.js and .map files.


## License
(The MIT License)

Copyright (c) 2014 Daniel Lamb <daniellmb.com>

Permission is hereby granted, free of charge, to any person obtaining
a copy of this software and associated documentation files (the
'Software'), to deal in the Software without restriction, including
without limitation the rights to use, copy, modify, merge, publish,
distribute, sublicense, and/or sell copies of the Software, and to
permit persons to whom the Software is furnished to do so, subject to
the following conditions:

The above copyright notice and this permission notice shall be
included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED 'AS IS', WITHOUT WARRANTY OF ANY KIND,
EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.
IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY
CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT,
TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE
SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.


[npm-url]: https://npmjs.org/package/ab-test-service
[npm-image]: https://badge.fury.io/js/ab-test-service.png
[travis-url]: https://travis-ci.org/daniellmb/ab-test-service
[travis-image]: https://travis-ci.org/daniellmb/ab-test-service.png?branch=master
[coveralls-url]: https://travis-ci.org/daniellmb/ab-test-service
[coveralls-image]: http://img.shields.io/badge/coverage-100%25-brightgreen.svg
[depstat-url]: https://david-dm.org/daniellmb/ab-test-service
[depstat-image]: https://david-dm.org/daniellmb/ab-test-service.png?theme=shields.io
