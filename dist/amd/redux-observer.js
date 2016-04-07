define(['exports', 'aurelia-framework'], function (exports, _aureliaFramework) {
    'use strict';

    Object.defineProperty(exports, '__esModule', {
        value: true
    });

    var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

    function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

    var ReduxObserver = (function () {
        function ReduxObserver(obj, propertyName, descriptor) {
            _classCallCheck(this, _ReduxObserver);

            this.obj = obj;
            this.propertyName = propertyName;
            this.descriptor = descriptor;
        }

        _createClass(ReduxObserver, [{
            key: 'subscribe',
            value: function subscribe(context, callable) {
                var _this = this;

                if (!this.hasSubscribers()) {
                    var innerProperty = this.obj['__redux__' + this.propertyName];

                    if (innerProperty !== undefined) {
                        var store = innerProperty.store;
                        var selector = innerProperty.selector;

                        this.unobserve = store.observe(function (newValue, oldValue) {
                            _this.callSubscribers(newValue, oldValue);
                        }, selector);
                    }
                }

                this.addSubscriber(context, callable);
            }
        }, {
            key: 'unsubscribe',
            value: function unsubscribe(context, callable) {
                if (this.removeSubscriber(context, callable) && !this.hasSubscribers()) {
                    this.unobserve();
                }
            }
        }]);

        var _ReduxObserver = ReduxObserver;
        ReduxObserver = (0, _aureliaFramework.subscriberCollection)()(ReduxObserver) || ReduxObserver;
        return ReduxObserver;
    })();

    exports.ReduxObserver = ReduxObserver;
});