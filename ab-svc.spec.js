/*
 * @license
 * ab-test-service v0.0.1
 * (c) 2014 Daniel Lamb http://daniellmb.com
 * License: MIT
 */

'use strict';

describe('ab-svc.js', function () {

  var abMfg, abSvc, mockAB, MockABJS = function () {
    this.test = jasmine.createSpy('test');
    this.log = jasmine.createSpy('log');
    return this;
  };

  // Use to provide any mocks needed
  function _provide(callback) {
    // Execute callback with $provide
    module(function ($provide) {
      callback($provide);
    });
  }

  // Use to inject the code under test
  function _inject() {
    inject(function (_abMfg_) {
      abMfg = _abMfg_;
    });
  }

  // Call this before each test, except where you are testing for edge-cases
  function _setup() {
    // Mock the expected values
    _provide(function (provide) {
      mockAB = new MockABJS();
      provide.value('AB', mockAB);
    });
    // Inject the code under test
    _inject();
  }

  beforeEach(function () {
    // Load the service's module
    module('ab.test.service');
  });

  describe('the service factory', function () {
    beforeEach(function () {
      // Inject with expected values
      _setup();
    });

    it('should exist', function () {
      expect(!!abMfg).toBe(true);
    });
  });

  describe('the service api', function () {
    beforeEach(function () {
      // Inject with expected values
      _setup();
      // create a/b test service
      abSvc = abMfg({
        scope: {}
      });
    });

    it('should exist', function () {
      expect(!!abSvc).toBe(true);
    });

    it('should provide a test method', function () {
      expect(typeof abSvc.test).toBe('function');
    });

    it('should provide a log method', function () {
      expect(typeof abSvc.log).toBe('function');
    });

    describe('the test method', function () {
      it('should should call the ab.js test method', function () {
        expect(mockAB.test.callCount).toBe(0);
        abSvc.test();
        expect(mockAB.test.callCount).toBe(1);
      });
      it('should should call the ab.js test method with proper arguments', function () {
        abSvc.test('foo', 'bar');
        expect(mockAB.test).toHaveBeenCalledWith('foo', 'bar');
      });
    });

    describe('the log method', function () {
      it('should should call the ab.js log method', function () {
        expect(mockAB.log.callCount).toBe(0);
        abSvc.log();
        expect(mockAB.log.callCount).toBe(1);
      });
      it('should should call the ab.js log method with proper arguments', function () {
        abSvc.log('foo', 'bar', 'baz');
        expect(mockAB.log).toHaveBeenCalledWith('foo', 'bar', 'baz');
      });
    });

  });

  describe('service errors', function () {
    it('should throw an error when required dependency is missing', function () {
      // Use an anonymous function to wrap the code that will fail
      function wrapper() {
        //inject WITHOUT providing required values
        _inject();
        // create a/b test service
        abSvc = abMfg();
      }
      expect(wrapper).toThrow('ab.js JavaScript library not provided');
    });
  });
});