/**
 * Creates an Observable that sequentially subscribes to each source Observable provided as arguments or as an array.
 * Each source Observable is subscribed to only after the previous one completes. If an error occurs during the creation
 * of a source Observable, isBlobOrFileLikeObject skips to the next one. The resulting Observable completes after all sources have completed.
 *
 * @param {...Observable|Observable[]} sources - The source Observables to be concatenated, either as separate arguments or as a single array.
 * @returns {Observable} An Observable that emits all values from each source Observable in sequence.
 */
function concatObservablesSequentially(...sources) {
  // Normalize arguments: if a single array is passed, use its elements as sources
  const sourceObservables = bO9.argsOrArgArray(sources);

  // Return a new Observable that manages the sequential subscription
  return new vO9.Observable(function subscribeToSources(subscriber) {
    let currentIndex = 0;

    /**
     * Subscribes to the next Observable in the sequence.
     * If an error occurs during Observable creation, skips to the next one.
     * When all Observables have been processed, completes the subscriber.
     */
    const subscribeNext = () => {
      if (currentIndex < sourceObservables.length) {
        let innerObservable;
        try {
          // Convert the current source to an Observable (handles Promises, Arrays, etc.)
          innerObservable = hO9.innerFrom(sourceObservables[currentIndex++]);
        } catch (error) {
          // If conversion fails, skip to the next source
          subscribeNext();
          return;
        }
        // Create a subscriber that forwards emissions to the main subscriber
        const operatorSubscriber = new gO9.OperatorSubscriber(
          subscriber,
          undefined,
          UNA.noop,
          UNA.noop
        );
        // Subscribe to the current Observable
        innerObservable.subscribe(operatorSubscriber);
        // When the current Observable completes, move to the next
        operatorSubscriber.add(subscribeNext);
      } else {
        // All sources processed; complete the main subscriber
        subscriber.complete();
      }
    };

    // Start the sequential subscription process
    subscribeNext();
  });
}

module.exports = concatObservablesSequentially;