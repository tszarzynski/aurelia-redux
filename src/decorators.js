import {ReduxObserver} from './redux-observer';

export function fromReduxStore(targetOrConfig, key, descriptor) {

    let decorate = function(target, key2, descriptor2) {

        let innerPropertyName = '__redux__' + key;
        let babel = descriptor2 !== undefined;

        if (babel) {
            if (typeof descriptor2.initializer === 'function') {
                target[innerPropertyName] = descriptor2.initializer();
            }
        } else {
            descriptor2 = {};
        }

        delete descriptor2.writable;
        delete descriptor2.initializer;

        function reduxGetter() {

            if (this[innerPropertyName] !== undefined) {
                return this[innerPropertyName].selector(this[innerPropertyName].store.getState());
            }

            return this[innerPropertyName];
        }

        function reduxSetter(newValue) {
            this[innerPropertyName] = newValue;
        }
        reduxGetter.getObserver = function(o) {
            return new ReduxObserver(o, key2, descriptor2);
        };

        descriptor2.get = reduxGetter;
        descriptor2.set = reduxSetter;

        if (!babel) {
            Object.defineProperty(target, key2, descriptor2);
        }
    };

    if (key) {
        let target = targetOrConfig;

        targetOrConfig = null;
        return decorate(target, key, descriptor);
    }

    return decorate;
}