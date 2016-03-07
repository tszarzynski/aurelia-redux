System.register(['aurelia-binding', './redux-adapter'], function (_export) {
  'use strict';

  var ObserverLocator, ReduxObservationAdapter;

  _export('configure', configure);

  function configure(frameworkConfig, config) {
    var container = frameworkConfig.container;
    var observerLocator = container.get(ObserverLocator);
    var adapter = container.get(ReduxObservationAdapter);
    observerLocator.addAdapter(adapter);

    config.globalResources('./decorators.js', './redux-adapter.js', './redux-observer.js', './redux-selector.js');
  }

  return {
    setters: [function (_aureliaBinding) {
      ObserverLocator = _aureliaBinding.ObserverLocator;
    }, function (_reduxAdapter) {
      ReduxObservationAdapter = _reduxAdapter.ReduxObservationAdapter;
    }],
    execute: function () {}
  };
});