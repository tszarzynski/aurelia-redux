define(['exports', 'module'], function (exports, module) {
  'use strict';

  module.exports = storeSelector;

  function storeSelector(store, item) {

    var obj = {};
    var name = '__redux__';

    Object.defineProperty(obj, name, {
      writable: true,
      configurable: true,
      enumerable: false
    });

    var update = function update() {
      obj.__redux__ = Object.assign(obj, store.getState()[item]);
    };
    store.subscribe(update);
    update();

    return obj;
  }
});