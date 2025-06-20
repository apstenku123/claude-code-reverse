/**
 * Subscribes to an array of observables and forwards the first emitted value to the destination observer.
 * Once the first observable emits, all other subscriptions are unsubscribed and cleaned up.
 *
 * @param {Array<Observable>} sourceObservables - An array of observables to subscribe to.
 * @returns {function(Observer): void} - a function that takes a destination observer and manages subscriptions.
 */
function subscribeToFirstEmittedObservable(sourceObservables) {
  return function (destinationObserver) {
    let subscriptions = [];

    /**
     * Subscribes to the observable at the given index and sets up logic to handle the first emission.
     * @param {number} observableIndex - Index of the observable in the sourceObservables array.
     */
    const subscribeToObservableAtIndex = (observableIndex) => {
      const subscription = xNA.innerFrom(sourceObservables[observableIndex]).subscribe(
        oO9.createOperatorSubscriber(
          destinationObserver,
          (emittedValue) => {
            // On first emission, unsubscribe from all other observables
            if (subscriptions) {
              for (let i = 0; i < subscriptions.length; i++) {
                if (i !== observableIndex) {
                  subscriptions[i].unsubscribe();
                }
              }
              subscriptions = null;
            }
            // Forward the emitted value to the destination observer
            destinationObserver.next(emittedValue);
          }
        )
      );
      subscriptions.push(subscription);
    };

    // Subscribe to each observable in the array, unless already closed or cleaned up
    for (
      let observableIdx = 0;
      subscriptions && !destinationObserver.closed && observableIdx < sourceObservables.length;
      observableIdx++
    ) {
      subscribeToObservableAtIndex(observableIdx);
    }
  };
}

module.exports = subscribeToFirstEmittedObservable;