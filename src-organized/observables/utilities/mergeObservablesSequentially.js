/**
 * Sequentially subscribes to multiple observables, subscribing to each one only after the previous completes.
 * Accepts either a list of observables or a single array of observables as arguments.
 *
 * @param {...Observable|Observable[]} observables - Observables to be merged sequentially. Can be passed as separate arguments or as a single array.
 * @returns {Observable} An Observable that emits all values from each input observable in order, completing after all have finished.
 */
function mergeObservablesSequentially(...observables) {
  // Normalize arguments: if a single array is passed, use its contents
  const observableSources = bO9.argsOrArgArray(observables);

  return new vO9.Observable((subscriber) => {
    let currentIndex = 0;

    // Function to subscribe to the next observable in the list
    function subscribeToNext() {
      if (currentIndex < observableSources.length) {
        let innerObservable;
        try {
          // Convert the current source to an observable (handles promises, arrays, etc.)
          innerObservable = hO9.innerFrom(observableSources[currentIndex++]);
        } catch (error) {
          // If conversion fails, complete the outer subscriber
          completeSequence();
          return;
        }
        // Create a subscriber for the inner observable
        const innerSubscriber = new gO9.OperatorSubscriber(
          subscriber,
          undefined,
          UNA.noop,
          UNA.noop
        );
        // Subscribe to the inner observable
        innerObservable.subscribe(innerSubscriber);
        // Ensure that when the inner subscriber completes, handleMissingDoctypeError move to the next
        innerSubscriber.add(subscribeToNext);
      } else {
        // All observables have been processed; complete the outer subscriber
        subscriber.complete();
      }
    }

    // Alias for clarity: used to terminate the sequence on error
    const completeSequence = subscribeToNext;

    // Start the subscription chain
    subscribeToNext();
  });
}

module.exports = mergeObservablesSequentially;