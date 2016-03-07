define(['exports', 'aurelia-framework', './redux-adapter', './decorators', './redux-selector'], function (exports, _aureliaFramework, _reduxAdapter, _decorators, _reduxSelector) {
  'use strict';

  Object.defineProperty(exports, '__esModule', {
    value: true
  });
  exports.configure = configure;
  Object.defineProperty(exports, 'fromReduxStore', {
    enumerable: true,
    get: function get() {
      return _decorators.fromReduxStore;
    }
  });
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
});