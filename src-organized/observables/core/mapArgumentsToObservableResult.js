/**
 * Maps provided arguments (observables or values) into a single observable that emits
 * either an array or an object of the latest values from each input, optionally applying a result selector.
 *
 * @param {...any} args - a variable number of observables, values, or a configuration object.
 * @returns {Observable} An observable that emits the combined result when all sources have emitted at least once.
 */
function mapArgumentsToObservableResult(...args) {
  // Extract an optional result selector function from the arguments
  const resultSelector = lR9.popResultSelector(args);
  // Parse the arguments into an array of sources and optional keys
  const { args: sourceObservables, keys: objectKeys } = pR9.argsArgArrayOrObject(args);

  // Create a new Observable that will emit the combined results
  const combinedObservable = new uR9.Observable((subscriber) => {
    const sourceCount = sourceObservables.length;
    if (sourceCount === 0) {
      // If there are no sources, complete immediately
      subscriber.complete();
      return;
    }

    // Array to store the latest value from each source
    const latestValues = new Array(sourceCount);
    // Track how many sources have not yet completed
    let remainingCompletions = sourceCount;
    // Track how many sources have not yet emitted a value
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
            // On next: store the value and track first emission
            if (!hasEmitted) {
              hasEmitted = true;
              remainingFirstEmissions--;
            }
            latestValues[index] = value;
          },
          () => {
            // On complete: decrement remaining completions
            return --remainingCompletions;
          },
          undefined,
          () => {
            // On finalize: if all sources have completed or this source never emitted
            if (remainingCompletions === 0 || !hasEmitted) {
              // If all sources have emitted at least once, emit the result
              if (remainingFirstEmissions === 0) {
                if (objectKeys) {
                  subscriber.next(aR9.createObject(objectKeys, latestValues));
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

module.exports = mapArgumentsToObservableResult;