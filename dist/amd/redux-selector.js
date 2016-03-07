define(['exports'], function (exports) {
    'use strict';

    Object.defineProperty(exports, '__esModule', {
        value: true
    });
    exports.storeSelector = storeSelector;

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