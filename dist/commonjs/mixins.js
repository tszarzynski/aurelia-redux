'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});
var observableStore = {
    _observers: [],
    observe: function observe(listener, selector) {
        var _this = this;

        var index = this._observers.push({ selector: selector, listener: listener }) - 1;
        var unobserve = function unobserve() {
            delete _this._observers[index];
        };
        return unobserve;
    },
    update: function update(nextState, prevState) {

        this._observers.forEach(function (o) {

            if (o.selector(nextState) !== o.selector(prevState)) {
                console.log('Store updated!', o.selector);
                o.listener(nextState, prevState);
            }
        });
    }
};

exports.observableStore = observableStore;
var selectableStore = {
    select: function select(selector) {

        var selectorFunc = undefined;

        if (typeof selector === 'string') {
            selectorFunc = function (s) {
                var arr = selector.split('.');
                var obj = s[arr.shift()];
                while (obj && arr.length) obj = obj[arr.shift()];
                return obj;
            };
        } else if (typeof selector === 'function') {
            selectorFunc = selector;
        }

        return { store: this, selector: selectorFunc };
    }
};
exports.selectableStore = selectableStore;