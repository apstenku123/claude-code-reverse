/**
 * Combines multiple observables and emits the latest values from each, optionally applying a result selector function.
 *
 * @param {...Observable|Function|Object} sources - The source observables to combine. The last argument can optionally be a result selector function or an object with named observables.
 * @returns {Observable} An observable that emits either an array or an object of the latest values from each source, or the result of the selector function if provided.
 */
function combineLatestWithOptionalResultSelector(...sources) {
  // Extract result selector if present
  const resultSelector = lR9.popResultSelector(sources);
  // Parse arguments into { args: [observables], keys: [optional keys] }
  const { args: sourceObservables, keys: sourceKeys } = pR9.argsArgArrayOrObject(sources);

  // Create the combined observable
  const combinedObservable = new uR9.Observable((subscriber) => {
    const sourceCount = sourceObservables.length;
    if (sourceCount === 0) {
      subscriber.complete();
      return;
    }

    // Holds the latest value from each source observable
    const latestValues = new Array(sourceCount);
    // Track how many sources have completed
    let remainingCompletions = sourceCount;
    // Track how many sources have emitted at least once
    let remainingFirstEmissions = sourceCount;

    /**
     * Subscribes to a single source observable at the given index.
     * @param {number} index - The index of the source observable.
     */
    const subscribeToSource = (index) => {
      let hasEmitted = false;
      cR9.innerFrom(sourceObservables[index]).subscribe(
        iR9.createOperatorSubscriber(
          subscriber,
          (value) => {
            // On next: store the latest value and track first emission
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
            // On finalize: if all sources have completed or this one never emitted
            if (!remainingCompletions || !hasEmitted) {
              // If all sources have emitted at least once, emit the combined value
              if (!remainingFirstEmissions) {
                if (sourceKeys) {
                  subscriber.next(aR9.createObject(sourceKeys, latestValues));
                } else {
                  subscriber.next(latestValues);
                }
              }
              subscriber.complete();
            }
          }
        )
      );
    };

    // Subscribe to all source observables
    for (let i = 0; i < sourceCount; i++) {
      subscribeToSource(i);
    }
  });

  // If a result selector was provided, map the output through isBlobOrFileLikeObject
  return resultSelector
    ? combinedObservable.pipe(nR9.mapOneOrManyArgs(resultSelector))
    : combinedObservable;
}

module.exports = combineLatestWithOptionalResultSelector;