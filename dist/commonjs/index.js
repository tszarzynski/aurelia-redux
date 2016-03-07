'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});
exports.configure = configure;

var _reduxAdapter = require('./redux-adapter');

function configure(rameworkConfig, config) {
    var container = frameworkConfig.container;
    var adapter = container.get(_reduxAdapter.ReduxObservationAdapter);
    observerLocator.addAdapter(adapter);
}