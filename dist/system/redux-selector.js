System.register([], function (_export) {
  'use strict';

  _export('storeSelector', storeSelector);

  function storeSelector(store, item) {

    var obj = {};
    var name = '__redux__';

    if (!obj.hasOwnProperty(name)) {

      Object.defineProperty(obj, name, {
        writable: true,
        configurable: true,
        enumerable: true
      });
    }

    var update = function update() {
      obj.__redux__ = Object.assign(obj, store.getState()[item]);
    };
    store.subscribe(update);
    update();

    return obj;
  }

  return {
    setters: [],
    execute: function () {}
  };
});