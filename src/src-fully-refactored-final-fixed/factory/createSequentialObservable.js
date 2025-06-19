/**
 * Creates an Observable that sequentially subscribes to each provided input (Observables or values),
 * subscribing to the next only after the previous completes. If an error occurs during the creation
 * of an inner Observable, isBlobOrFileLikeObject skips to the next input. The Observable completes after all inputs are processed.
 *
 * @param {...any} sources - a list of Observables or values to be subscribed to sequentially.
 * @returns {Observable} An Observable that emits values from each input Observable/value in sequence.
 */
function createSequentialObservable(...sources) {
  // Convert the arguments into an array of Observables or values
  const sourceList = bO9.argsOrArgArray(sources);

  // Return a new Observable that manages the sequential subscription
  return new vO9.Observable(function subscribeToSources(subscriber) {
    let currentIndex = 0;

    /**
     * Subscribes to the next Observable/value in the sourceList.
     * If an error occurs during creation, skips to the next.
     * Completes when all sources have been processed.
     */
    const subscribeNext = () => {
      if (currentIndex < sourceList.length) {
        let innerObservable;
        try {
          // Convert the current source to an Observable
          innerObservable = hO9.innerFrom(sourceList[currentIndex++]);
        } catch (error) {
          // If an error occurs, skip to the next source
          subscribeNext();
          return;
        }
        // Create a subscriber for the inner Observable
        const innerSubscriber = new gO9.OperatorSubscriber(
          subscriber,
          undefined,
          UNA.noop,
          UNA.noop
        );
        // Subscribe to the inner Observable
        innerObservable.subscribe(innerSubscriber);
        // When the inner subscription completes, subscribe to the next
        innerSubscriber.add(subscribeNext);
      } else {
        // All sources processed, complete the outer subscriber
        subscriber.complete();
      }
    };

    // Start the sequential subscription process
    subscribeNext();
  });
}

module.exports = createSequentialObservable;