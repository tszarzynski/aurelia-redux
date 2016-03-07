System.register(['aurelia-binding'], function (_export) {
  'use strict';

  var subscriberCollection, ReduxObserver;

  var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

  function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

  return {
    setters: [function (_aureliaBinding) {
      subscriberCollection = _aureliaBinding.subscriberCollection;
    }],
    execute: function () {
      ReduxObserver = (function () {
        function ReduxObserver(obj, propertyName, descriptor, taskQueue) {
          _classCallCheck(this, _ReduxObserver);

          this.obj = obj;
          this.propertyName = propertyName;
          this.descriptor = descriptor;
          this.taskQueue = taskQueue;

          this.queued = false;
          this.observing = false;
        }

        _createClass(ReduxObserver, [{
          key: 'getValue',
          value: function getValue() {
            return this.obj[this.propertyName];
          }
        }, {
          key: 'setValue',
          value: function setValue(newValue) {
            this.obj[this.propertyName] = newValue;
          }
        }, {
          key: 'getterValue',
          value: function getterValue() {
            return this.currentValue;
          }
        }, {
          key: 'setterValue',
          value: function setterValue(newValue) {
            var oldValue = this.currentValue;

            if (oldValue !== newValue) {
              if (!this.queued) {
                this.oldValue = oldValue;
                this.queued = true;
                this.taskQueue.queueMicroTask(this);
              }
            }

            this.currentValue = newValue;
          }
        }, {
          key: 'call',
          value: function call(context) {
            var oldValue = this.oldValue;
            var newValue = this.currentValue;

            this.queued = false;

            this.callSubscribers(newValue, oldValue);
          }
        }, {
          key: 'subscribe',
          value: function subscribe(context, callable) {

            if (!this.observing) {
              this.setValue = this.setterValue;
              this.getValue = this.getterValue;

              try {
                Object.defineProperty(this.obj[this.propertyName], '__redux__', {
                  configurable: true,
                  enumerable: true,
                  get: this.getValue.bind(this),
                  set: this.setValue.bind(this)
                });
              } catch (_) {
                throw new Error('Cannot override setters!');
              }
            }

            this.addSubscriber(context, callable);
          }
        }, {
          key: 'unsubscribe',
          value: function unsubscribe(context, callable) {
            this.removeSubscriber(context, callable);
          }
        }]);

        var _ReduxObserver = ReduxObserver;
        ReduxObserver = subscriberCollection()(ReduxObserver) || ReduxObserver;
        return ReduxObserver;
      })();

      _export('ReduxObserver', ReduxObserver);
    }
  };
});