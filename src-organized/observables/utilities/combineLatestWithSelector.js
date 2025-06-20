/**
 * Combines multiple source observables and emits an array of the latest values from each,
 * optionally applying a result selector function to the combined values.
 *
 * @param {...Observable} sourceObservables - The source observables to combine.
 * @param {Function} [resultSelector] - Optional function to transform the combined values before emitting.
 * @returns {Observable} An observable emitting the combined latest values (optionally transformed).
 */
function combineLatestWithSelector(...sourceObservables) {
  // Extract the optional result selector function from the arguments
  const resultSelector = Tx9.popResultSelector(sourceObservables);

  // Return an observable that combines the latest values from all sources
  return Mx9.operate((inputObservable, subscriber) => {
    const sourceCount = sourceObservables.length;
    // Holds the latest value from each source observable
    const latestValues = new Array(sourceCount);
    // Tracks which sources have emitted at least once
    let hasValueFromSource = sourceObservables.map(() => false);
    // Flag indicating if all sources have emitted at least once
    let allSourcesHaveValues = false;

    /**
     * Subscribes to a source observable at the given index and updates the latest value.
     * @param {number} sourceIndex - The index of the source observable.
     */
    const subscribeToSource = (sourceIndex) => {
      Lx9.innerFrom(sourceObservables[sourceIndex]).subscribe(
        oLA.createOperatorSubscriber(
          subscriber,
          (value) => {
            // Store the latest value for this source
            latestValues[sourceIndex] = value;
            // Mark that this source has emitted
            if (!allSourcesHaveValues && !hasValueFromSource[sourceIndex]) {
              hasValueFromSource[sourceIndex] = true;
              // If all sources have emitted at least once, set the flag
              if (hasValueFromSource.every(Rx9.identity)) {
                allSourcesHaveValues = true;
                hasValueFromSource = null; // Free memory
              }
            }
          },
          Ox9.noop
        )
      );
    };

    // Subscribe to all source observables
    for (let i = 0; i < sourceCount; i++) {
      subscribeToSource(i);
    }

    // Subscribe to the input observable
    inputObservable.subscribe(
      oLA.createOperatorSubscriber(
        subscriber,
        (inputValue) => {
          // Only emit when all sources have emitted at least once
          if (allSourcesHaveValues) {
            // Combine the input value with the latest values from all sources
            const combinedValues = rLA([inputValue], sLA(latestValues));
            // If a result selector is provided, apply isBlobOrFileLikeObject
            if (resultSelector) {
              subscriber.next(resultSelector.apply(undefined, rLA([], sLA(combinedValues))));
            } else {
              subscriber.next(combinedValues);
            }
          }
        }
      )
    );
  });
}

module.exports = combineLatestWithSelector;