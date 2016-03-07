import {ObserverLocator} from 'aurelia-binding';
import {ReduxObservationAdapter} from './redux-adapter';

export function configure(frameworkConfig, config) {
  let container = frameworkConfig.container;
  let observerLocator = container.get(ObserverLocator);
  let adapter = container.get(ReduxObservationAdapter);
  observerLocator.addAdapter(adapter);
}
