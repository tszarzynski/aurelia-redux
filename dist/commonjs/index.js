'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});
exports.configure = configure;

var _aureliaFramework = require('aurelia-framework');

var _reduxAdapter = require('./redux-adapter');

var _decorators = require('./decorators');

Object.defineProperty(exports, 'fromReduxStore', {
  enumerable: true,
  get: function get() {
    return _decorators.fromReduxStore;
  }
});

var _reduxSelector = require('./redux-selector');

Object.defineProperty(exports, 'storeSelector', {
  enumerable: true,
  get: function get() {
    return _reduxSelector.storeSelector;
  }
});

function configure(frameworkConfig) {
  var container = frameworkConfig.container;
  container.get(_aureliaFramework.ObserverLocator).addAdapter(container.get(_reduxAdapter.ReduxObservationAdapter));
}