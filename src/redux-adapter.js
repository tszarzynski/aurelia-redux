import { TaskQueue, inject } from 'aurelia-framework';
import { ReduxObserver } from './redux-observer';

@inject(TaskQueue)
export class ReduxObservationAdapter {

  constructor(taskQueue) {
    this.taskQueue = taskQueue;
  }
  getObserver(object, propertyName, descriptor) {

    if (object[propertyName] && descriptor.get.store) {
      return new ReduxObserver(object, propertyName, descriptor, this.taskQueue);
    } else {
      delete descriptor.get;
      delete descriptor.set;
      descriptor.writable = true;
      Object.defineProperty(object, propertyName, descriptor);

      return null;
    }
  }
}
