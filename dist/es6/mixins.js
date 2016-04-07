export const observableStore = {
    _observers: [],
    observe(listener, selector) {

        let index = this._observers.push({selector, listener}) - 1;
        let unobserve = () => { delete this._observers[index]; };
        return unobserve;
    },
    update(nextState, prevState) {

        this._observers.forEach((o) => {

            if (o.selector(nextState) !== o.selector(prevState)) {
                console.log('Store updated!', o.selector);
                o.listener(nextState, prevState);
            }
        });

    }
};


export const selectableStore = {
    select(selector) {

        let selectorFunc;

        if (typeof selector === 'string') {
            selectorFunc = (s) => {
                const arr = selector.split('.');
                let obj = s[arr.shift()];
                while (obj && arr.length) obj = obj[arr.shift()];
                return obj;
            };
        } else if (typeof selector === 'function') {
            selectorFunc = selector;
        }

        return {store: this, selector: selectorFunc};
    }
};