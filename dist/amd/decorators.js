define(['exports', 'module'], function (exports, module) {
  'use strict';

  module.exports = fromReduxStore;

  function fromReduxStore(targetOrConfig, key, descriptor) {

    var deco = function deco(target, key2, descriptor2) {
      var innerPropertyName = '__redux__' + key2;
      var babel = descriptor2 !== undefined;

      if (babel) {
        if (typeof descriptor2.initializer === 'function') {
          target[innerPropertyName] = descriptor2.initializer();
        }
      } else {
        descriptor2 = {};
      }

      delete descriptor2.writable;
      delete descriptor2.initializer;

      descriptor2.get = function () {
        return this[innerPropertyName];
      };
      descriptor2.set = function (newValue) {
        this[innerPropertyName] = newValue;
      };

      descriptor2.get.store = true;
      descriptor2.set.store = true;

      if (!babel) {
        Object.defineProperty(target, key2, descriptor2);
      }
    };

    if (key) {
      var target = targetOrConfig;
      targetOrConfig = null;
      return deco(target, key, descriptor);
    }

    return deco;
  }
});