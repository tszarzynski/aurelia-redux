define(['exports', 'aurelia-framework', './redux-observer'], function (exports, _aureliaFramework, _reduxObserver) {
  'use strict';

  Object.defineProperty(exports, '__esModule', {
    value: true
  });

  var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

  function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

  var ReduxObservationAdapter = (function () {
    function ReduxObservationAdapter(taskQueue) {
      _classCallCheck(this, _ReduxObservationAdapter);

      this.taskQueue = taskQueue;
    }

    _createClass(ReduxObservationAdapter, [{
      key: 'getObserver',
      value: function getObserver(object, propertyName, descriptor) {

        if (object[propertyName] && descriptor.get.store) {
          return new _reduxObserver.ReduxObserver(object, propertyName, descriptor, this.taskQueue);
        } else {
          delete descriptor.get;
          delete descriptor.set;
          descriptor.writable = true;
          Object.defineProperty(object, propertyName, descriptor);

          return null;
        }
      }
    }]);

    var _ReduxObservationAdapter = ReduxObservationAdapter;
    ReduxObservationAdapter = (0, _aureliaFramework.inject)(_aureliaFramework.TaskQueue)(ReduxObservationAdapter) || ReduxObservationAdapter;
    return ReduxObservationAdapter;
  })();

  exports.ReduxObservationAdapter = ReduxObservationAdapter;
});