System.register(['aurelia-framework', './redux-observer'], function (_export) {
  'use strict';

  var TaskQueue, inject, ReduxObserver, ReduxObservationAdapter;

  var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

  function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

  return {
    setters: [function (_aureliaFramework) {
      TaskQueue = _aureliaFramework.TaskQueue;
      inject = _aureliaFramework.inject;
    }, function (_reduxObserver) {
      ReduxObserver = _reduxObserver.ReduxObserver;
    }],
    execute: function () {
      ReduxObservationAdapter = (function () {
        function ReduxObservationAdapter(taskQueue) {
          _classCallCheck(this, _ReduxObservationAdapter);

          this.taskQueue = taskQueue;
        }

        _createClass(ReduxObservationAdapter, [{
          key: 'getObserver',
          value: function getObserver(object, propertyName, descriptor) {

            if (object[propertyName] && descriptor.get.store) {
              return new ReduxObserver(object, propertyName, descriptor, this.taskQueue);
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
        ReduxObservationAdapter = inject(TaskQueue)(ReduxObservationAdapter) || ReduxObservationAdapter;
        return ReduxObservationAdapter;
      })();

      _export('ReduxObservationAdapter', ReduxObservationAdapter);
    }
  };
});