import {subscriberCollection} from 'aurelia-framework';

@subscriberCollection()
export class ReduxObserver {
    constructor(obj, propertyName, descriptor) {
        this.obj = obj;
        this.propertyName = propertyName;
        this.descriptor = descriptor;
    }

    // getValue() {
    //     return this.obj[this.propertyName];
    // }

    // setValue(newValue) {
    //     this.obj[this.propertyName] = newValue;
    // }

    subscribe(context, callable) {

        if (!this.hasSubscribers()) {
            let innerProperty = this.obj['__redux__' + this.propertyName];

            if (innerProperty !== undefined) {
                let store = innerProperty.store;
                let selector = innerProperty.selector;

                this.unobserve = store.observe((newValue, oldValue) => {
                    this.callSubscribers(newValue, oldValue);
                }, selector);
            }
        }

        this.addSubscriber(context, callable);
    }

    unsubscribe(context, callable) {
        if (this.removeSubscriber(context, callable) && !this.hasSubscribers()) {
            this.unobserve();
        }

    }
}
