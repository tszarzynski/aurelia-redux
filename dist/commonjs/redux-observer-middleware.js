"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.observerMiddleware = observerMiddleware;
var isStrictlyEqual = function isStrictlyEqual(obj1, obj2) {
    return obj1 === obj2;
};

exports.isStrictlyEqual = isStrictlyEqual;
var isJsonEqual = function isJsonEqual(obj1, obj2) {
    return JSON.stringify(obj1) === JSON.stringify(obj2);
};

exports.isJsonEqual = isJsonEqual;

function observerMiddleware(onUpdate) {
    var options = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];

    var isEqual = options.compareWith || isJsonEqual;

    return function (_ref) {
        var getState = _ref.getState;
        return function (next) {
            return function (action) {
                var prevState = getState();
                var returnValue = next(action);
                var nextState = getState();

                if (!isEqual(nextState, prevState)) {
                    onUpdate(nextState, prevState);
                }

                return returnValue;
            };
        };
    };
}