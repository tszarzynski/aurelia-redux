define(['exports', 'aurelia-binding', './redux-adapter'], function (exports, _aureliaBinding, _reduxAdapter) {
  'use strict';

  Object.defineProperty(exports, '__esModule', {
    value: true
  });
  exports.configure = configure;

  function configure(frameworkConfig, config) {
    var container = frameworkConfig.container;
    var observerLocator = container.get(_aureliaBinding.ObserverLocator);
    var adapter = container.get(_reduxAdapter.ReduxObservationAdapter);
    observerLocator.addAdapter(adapter);

    config.globalResources('./decorators', './redux-adapter', './redux-observer', './redux-selector');
  }
});