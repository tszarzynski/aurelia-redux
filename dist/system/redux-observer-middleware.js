System.register([], function (_export) {
    "use strict";

    var isStrictlyEqual, isJsonEqual;

    _export("observerMiddleware", observerMiddleware);

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

    return {
        setters: [],
        execute: function () {
            isStrictlyEqual = function isStrictlyEqual(obj1, obj2) {
                return obj1 === obj2;
            };

            _export("isStrictlyEqual", isStrictlyEqual);

            isJsonEqual = function isJsonEqual(obj1, obj2) {
                return JSON.stringify(obj1) === JSON.stringify(obj2);
            };

            _export("isJsonEqual", isJsonEqual);
        }
    };
});