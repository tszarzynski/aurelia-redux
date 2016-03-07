import {ObserverLocator} from 'aurelia-framework';
import {ReduxObservationAdapter} from './redux-adapter';

export {fromReduxStore} from './decorators';
export {storeSelector} from './redux-selector';

export function configure(frameworkConfig) {
  let container = frameworkConfig.container;
  container.get(ObserverLocator).addAdapter(container.get(ReduxObservationAdapter));
}
