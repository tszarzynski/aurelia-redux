import {ReduxObservationAdapter} from './redux-adapter';

export function configure(rameworkConfig, config) {
    let container = frameworkConfig.container;
    let adapter = container.get(ReduxObservationAdapter);
    observerLocator.addAdapter(adapter);
}
