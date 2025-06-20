/**
 * Maps provided arguments (observables, arrays, or objects) into a single Observable that emits
 * either an array or an object of the latest values from each input, optionally applying a result selector.
 *
 * @param {...any} sources - a variable number of source Observables, arrays, or objects.
 * @returns {Observable} An Observable that emits the combined latest values from all sources.
 */
function mapArgumentsToObservable(...sources) {
  // Extract an optional result selector function from the arguments
  const resultSelector = lR9.popResultSelector(sources);

  // Parse the arguments into { args: [sources], keys: [optional keys] }
  const { args: sourceObservables, keys: sourceKeys } = pR9.argsArgArrayOrObject(sources);

  // Create a new Observable that will subscribe to all sources and emit combined results
  const combinedObservable = new uR9.Observable(function subscribeToSources(subscriber) {
    const sourceCount = sourceObservables.length;
    if (sourceCount === 0) {
      // If there are no sources, complete immediately
      subscriber.complete();
      return;
    }

    // Array to hold the latest value from each source
    const latestValues = new Array(sourceCount);
    // Track how many sources have not yet completed
    let remainingCompletions = sourceCount;
    // Track how many sources have not yet emitted their first value
    let remainingFirstEmissions = sourceCount;

    /**
     * Subscribes to a single source Observable at the given index.
     * @param {number} index - Index of the source Observable
     */
    const subscribeToSource = (index) => {
      let hasEmitted = false;
      cR9.innerFrom(sourceObservables[index]).subscribe(
        iR9.createOperatorSubscriber(
          subscriber,
          (value) => {
            // On next: store the value and track first emission
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
            // On finalize: if all sources have completed or this source never emitted
            if (!remainingCompletions || !hasEmitted) {
              // If all sources have emitted at least once, emit the combined result
              if (!remainingFirstEmissions) {
                if (sourceKeys) {
                  subscriber.next(aR9.createObject(sourceKeys, latestValues));
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

    // Subscribe to all source Observables
    for (let i = 0; i < sourceCount; i++) {
      subscribeToSource(i);
    }
  });

  // If a result selector was provided, map the output through isBlobOrFileLikeObject
  return resultSelector
    ? combinedObservable.pipe(nR9.mapOneOrManyArgs(resultSelector))
    : combinedObservable;
}

module.exports = mapArgumentsToObservable;