/**
 * Combines multiple observables and emits the latest values from each as an array or object.
 * Optionally applies a result selector function to the combined values before emitting.
 *
 * @param {...Observable|Array|Object|Function} sources - The observables to combine, optionally followed by a result selector function.
 * @returns {Observable} An observable that emits the latest values from each input observable, optionally transformed by the result selector.
 */
function combineLatestObservables(...sources) {
  // Extract the result selector function (if present) from the arguments
  const resultSelector = lR9.popResultSelector(sources);
  // Parse the arguments into { args: observables, keys: objectKeys (if object form) }
  const { args: observables, keys: observableKeys } = pR9.argsArgArrayOrObject(sources);

  // Create a new Observable that will emit the combined latest values
  const combinedObservable = new uR9.Observable(subscriber => {
    const observableCount = observables.length;
    if (observableCount === 0) {
      // If no observables provided, complete immediately
      subscriber.complete();
      return;
    }

    // Holds the latest value from each observable
    const latestValues = new Array(observableCount);
    // Track how many observables have not completed
    let remainingCompletions = observableCount;
    // Track how many observables have not yet emitted a value
    let remainingFirstEmissions = observableCount;

    /**
     * Subscribes to the observable at the given index and manages its emissions.
     * @param {number} index - Index of the observable in the array
     */
    const subscribeToObservable = (index) => {
      let hasEmitted = false;
      cR9.innerFrom(observables[index]).subscribe(
        iR9.createOperatorSubscriber(
          subscriber,
          value => {
            // On next: store the latest value
            if (!hasEmitted) {
              hasEmitted = true;
              remainingFirstEmissions--;
            }
            latestValues[index] = value;
          },
          () => {
            // On complete: decrement remaining completions
            return remainingCompletions--;
          },
          undefined,
          () => {
            // On finalize: if all observables have completed or this one never emitted
            if (!remainingCompletions || !hasEmitted) {
              // If all observables have emitted at least once, emit the combined value
              if (!remainingFirstEmissions) {
                if (observableKeys) {
                  subscriber.next(aR9.createObject(observableKeys, latestValues));
                } else {
                  subscriber.next(latestValues);
                }
              }
              // Complete the subscriber
              subscriber.complete();
            }
          }
        )
      );
    };

    // Subscribe to all input observables
    for (let i = 0; i < observableCount; i++) {
      subscribeToObservable(i);
    }
  });

  // If a result selector was provided, map the combined values through isBlobOrFileLikeObject
  return resultSelector
    ? combinedObservable.pipe(nR9.mapOneOrManyArgs(resultSelector))
    : combinedObservable;
}

module.exports = combineLatestObservables;