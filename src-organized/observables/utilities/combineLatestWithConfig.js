/**
 * Combines multiple source observables and emits an array of their latest values whenever any source emits.
 *
 * @param {Array} sourceObservables - Array of source observables to combine.
 * @param {any} config - Configuration or context passed to helper functions (e.g., executeScheduleOrFallback, LUA.from).
 * @param {Function} [project=RUA.identity] - Optional projection function to transform the array of latest values before emitting.
 * @returns {Function} Operator function that takes a subscriber and manages the combined subscription.
 */
function combineLatestWithConfig(sourceObservables, config, project = RUA.identity) {
  return function (subscriber) {
    // Run the operation within the context of executeScheduleOrFallback(possibly a scheduler or context manager)
    executeScheduleOrFallback(config, function () {
      const sourceCount = sourceObservables.length;
      const latestValues = new Array(sourceCount); // Holds the latest value from each source
      let remainingFirstEmissions = sourceCount;   // Number of sources yet to emit their first value
      let remainingCompletions = sourceCount;      // Number of sources yet to complete

      /**
       * Subscribes to a single source observable at the given index.
       * @param {number} index - Index of the source observable.
       */
      const subscribeToSource = function (index) {
        executeScheduleOrFallback(config, function () {
          // Create an observable from the source using LUA.from
          const observable = LUA.from(sourceObservables[index], config);
          let hasEmitted = false; // Tracks if this source has emitted at least once

          // Subscribe to the observable
          observable.subscribe(
            VR9.createOperatorSubscriber(
              subscriber,
              function (value) {
                // Store the latest value for this source
                latestValues[index] = value;
                // If this is the first emission from this source, decrement the counter
                if (!hasEmitted) {
                  hasEmitted = true;
                  remainingFirstEmissions--;
                }
                // Only emit when all sources have emitted at least once
                if (remainingFirstEmissions === 0) {
                  // Emit a shallow copy of the latest values, possibly transformed by project
                  subscriber.next(project(latestValues.slice()));
                }
              },
              function () {
                // When this source completes, decrement the completion counter
                if (--remainingCompletions === 0) {
                  subscriber.complete();
                }
              }
            )
          );
        }, subscriber);
      };

      // Subscribe to all source observables
      for (let i = 0; i < sourceCount; i++) {
        subscribeToSource(i);
      }
    }, subscriber);
  };
}

module.exports = combineLatestWithConfig;