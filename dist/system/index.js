System.register(['./decorators', './redux-observer-middleware', './mixins'], function (_export) {
  'use strict';

  return {
    setters: [function (_decorators) {
      _export('fromReduxStore', _decorators.fromReduxStore);
    }, function (_reduxObserverMiddleware) {
      _export('observerMiddleware', _reduxObserverMiddleware.observerMiddleware);
    }, function (_mixins) {
      _export('observableStore', _mixins.observableStore);

      _export('selectableStore', _mixins.selectableStore);
    }],
    execute: function () {}
  };
});