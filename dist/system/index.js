System.register(['aurelia-framework', './redux-adapter', './decorators', './redux-selector'], function (_export) {
  'use strict';

  var ObserverLocator, ReduxObservationAdapter;

  _export('configure', configure);

  function configure(frameworkConfig) {
    var container = frameworkConfig.container;
    container.get(ObserverLocator).addAdapter(container.get(ReduxObservationAdapter));
  }

  return {
    setters: [function (_aureliaFramework) {
      ObserverLocator = _aureliaFramework.ObserverLocator;
    }, function (_reduxAdapter) {
      ReduxObservationAdapter = _reduxAdapter.ReduxObservationAdapter;
    }, function (_decorators) {
      _export('fromReduxStore', _decorators.fromReduxStore);
    }, function (_reduxSelector) {
      _export('storeSelector', _reduxSelector.storeSelector);
    }],
    execute: function () {}
  };
});