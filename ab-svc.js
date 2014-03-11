/*
 * @license
 * ab-test-service v0.0.1
 * (c) 2014 Daniel Lamb http://daniellmb.com
 * License: MIT
 */

'use strict';

angular.module('ab.test.service', [])
.provider('abMfg', function () {

  this.$get = function (AB) {
    return function abMfg(options) {
      options = options || {};
      var abjs = options.ab || AB;

      // quick sanity check
      if (!abjs) {
        throw new Error('ab.js JavaScript library not provided');
      }

      // public API
      return {
        /**
         Runs an a/b test with the variants and frequency provided.
         @method test
         @param {Array} variants to choose from
         @param {Number} frequency float between 0.0001 and 1
         **/
        test: function (variants, frequency) {
          return abjs.test(variants, frequency);
        },

        /**
         Logs data to the given url for processing.
         @method log
         @param {Object} data to send
         @param {String} url to send the data to
         @param {Function} optional callback
         **/
        log: function (data, url, optional) {
          return abjs.log(data, url, optional);
        }
      };
    };
  };
})
// provide' global variable dependency (so it can be mocked);
.value('AB', window.AB);
