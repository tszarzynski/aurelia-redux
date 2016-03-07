import {subscriberCollection} from 'aurelia-binding';

@subscriberCollection()
export class ReduxObserver {
  constructor(obj, propertyName, descriptor, taskQueue) {
    this.obj = obj;
    this.propertyName = propertyName;
    this.descriptor = descriptor;
    this.taskQueue = taskQueue;

    this.queued = false;
    this.observing = false;
  }

  getValue() {
    return this.obj[this.propertyName];
  }

  setValue(newValue) {
    this.obj[this.propertyName] = newValue;
  }

  getterValue() {
    return this.currentValue;
  }

  setterValue(newValue) {
    let oldValue = this.currentValue;

    if (oldValue !== newValue) {
      if (!this.queued) {
        this.oldValue = oldValue;
        this.queued = true;
        this.taskQueue.queueMicroTask(this);
      }
    }

    this.currentValue = newValue;
  }

  call(context) {
    let oldValue = this.oldValue;
    let newValue = this.currentValue;

    this.queued = false;

    this.callSubscribers(newValue, oldValue);
  }

  subscribe(context, callable) {

    if (!this.observing) {
      this.setValue = this.setterValue;
      this.getValue = this.getterValue;

      try {
        Object.defineProperty(this.obj[this.propertyName], '__redux__', {
          configurable: true,
          enumerable: true,
          get: this.getValue.bind(this),
          set: this.setValue.bind(this)
        });
      } catch (_) {
        throw new Error('Cannot override setters!');
      }
    }

    this.addSubscriber(context, callable);
  }

  unsubscribe(context, callable) {
    this.removeSubscriber(context, callable);
  }

}
