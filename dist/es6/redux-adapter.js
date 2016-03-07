import { TaskQueue } from 'aurelia-task-queue';

export default class ReduxObservationAdapter {
  static inject = [TaskQueue];

  constructor(taskQueue) {
    this.taskQueue = taskQueue;
  }
  getObserver(object, propertyName, descriptor) {
    if (descriptor.get.store) {
      return new ReduxObserver(object, propertyName, descriptor, this.taskQueue);
    }
    return null;
  }
}
