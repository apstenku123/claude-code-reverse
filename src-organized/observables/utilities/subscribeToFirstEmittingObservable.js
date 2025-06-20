/**
 * Subscribes to an array of observables and emits the first value from the first observable to emit.
 * Once the first observable emits, all other subscriptions are unsubscribed to prevent further emissions.
 *
 * @param {Array<Observable>} sourceObservables - An array of observables to subscribe to.
 * @returns {function(subscriber: Subscriber): void} - a function that takes a subscriber and manages subscriptions.
 */
function subscribeToFirstEmittingObservable(sourceObservables) {
  return function (subscriber) {
    let subscriptions = [];

    /**
     * Handles subscription to a single observable at the given index.
     * @param {number} observableIndex - The index of the observable in the sourceObservables array.
     */
    const subscribeToObservableAtIndex = (observableIndex) => {
      const subscription = xNA.innerFrom(sourceObservables[observableIndex]).subscribe(
        oO9.createOperatorSubscriber(subscriber, (emittedValue) => {
          if (subscriptions) {
            // Unsubscribe from all other observables except the one that emitted first
            for (let i = 0; i < subscriptions.length; i++) {
              if (i !== observableIndex) {
                subscriptions[i].unsubscribe();
              }
            }
            // Prevent further unsubscriptions by nullifying the array
            subscriptions = null;
          }
          // Emit the value to the downstream subscriber
          subscriber.next(emittedValue);
        })
      );
      subscriptions.push(subscription);
    };

    // Subscribe to all observables unless already closed or a value has been emitted
    for (
      let observableIdx = 0;
      subscriptions && !subscriber.closed && observableIdx < sourceObservables.length;
      observableIdx++
    ) {
      subscribeToObservableAtIndex(observableIdx);
    }
  };
}

module.exports = subscribeToFirstEmittingObservable;