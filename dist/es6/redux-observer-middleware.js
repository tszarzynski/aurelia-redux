export const isStrictlyEqual = (obj1, obj2) => obj1 === obj2;

export const isJsonEqual = (obj1, obj2) => {
    return JSON.stringify(obj1) === JSON.stringify(obj2);
};

export function observerMiddleware(onUpdate, options = {}) {
    const isEqual = options.compareWith || isJsonEqual;

    return ({ getState }) => next => action => {
        const prevState = getState();
        const returnValue = next(action);
        const nextState = getState();

        if (!isEqual(nextState, prevState)) {
            onUpdate(nextState, prevState);
        }

        return returnValue;
    };
}