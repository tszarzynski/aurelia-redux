System.register(['aurelia-task-queue'], function (_export) {
  'use strict';

  var TaskQueue, ReduxObservationAdapter;

  var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

  function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

  return {
    setters: [function (_aureliaTaskQueue) {
      TaskQueue = _aureliaTaskQueue.TaskQueue;
    }],
    execute: function () {
      ReduxObservationAdapter = (function () {
        _createClass(ReduxObservationAdapter, null, [{
          key: 'inject',
          value: [TaskQueue],
          enumerable: true
        }]);

        function ReduxObservationAdapter(taskQueue) {
          _classCallCheck(this, ReduxObservationAdapter);

          this.taskQueue = taskQueue;
        }

        _createClass(ReduxObservationAdapter, [{
          key: 'getObserver',
          value: function getObserver(object, propertyName, descriptor) {
            if (descriptor.get.store) {
              return new ReduxObserver(object, propertyName, descriptor, this.taskQueue);
            }
            return null;
          }
        }]);

        return ReduxObservationAdapter;
      })();

      _export('default', ReduxObservationAdapter);
    }
  };
});