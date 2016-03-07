System.register(['./redux-adapter'], function (_export) {
  'use strict';

  var ReduxObservationAdapter;

  _export('configure', configure);

  function configure(frameworkConfig, config) {
    var container = frameworkConfig.container;
    var observerLocator = container.get(ObserverLocator);
    var adapter = container.get(ReduxObservationAdapter);
    observerLocator.addAdapter(adapter);
  }

  return {
    setters: [function (_reduxAdapter) {
      ReduxObservationAdapter = _reduxAdapter.ReduxObservationAdapter;
    }],
    execute: function () {}
  };
});