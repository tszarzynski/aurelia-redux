define(['exports', './redux-adapter'], function (exports, _reduxAdapter) {
  'use strict';

  Object.defineProperty(exports, '__esModule', {
    value: true
  });
  exports.configure = configure;

  function configure(rameworkConfig, config) {
    var container = frameworkConfig.container;
    var observerLocator = container.get(ObserverLocator);
    var adapter = container.get(_reduxAdapter.ReduxObservationAdapter);
    observerLocator.addAdapter(adapter);
  }
});