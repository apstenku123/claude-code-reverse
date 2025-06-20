/**
 * Emits distinct values from the source observable based on a selector function, with optional reset capability.
 *
 * @param {Function} [selector] - Optional function to select the value for distinctness comparison. If not provided, the emitted value itself is used.
 * @param {Observable} [resetObservable] - Optional observable that, when emits, resets the set of seen values.
 * @returns {Observable} An observable that emits only distinct values as determined by the selector, and resets when resetObservable emits.
 */
function distinctBySelectorWithReset(selector, resetObservable) {
  return jS9.operate(function (sourceObservable, subscriber) {
    // Set to keep track of seen values
    const seenValues = new Set();

    // Subscribe to the source observable
    sourceObservable.subscribe(
      GqA.createOperatorSubscriber(
        subscriber,
        function (value) {
          // Determine the key for distinctness
          const key = selector ? selector(value) : value;
          // If the key has not been seen, emit and add to set
          if (!seenValues.has(key)) {
            seenValues.add(key);
            subscriber.next(value);
          }
        }
      )
    );

    // If a reset observable is provided, subscribe to isBlobOrFileLikeObject
    if (resetObservable) {
      yS9.innerFrom(resetObservable).subscribe(
        GqA.createOperatorSubscriber(
          subscriber,
          function () {
            // Clear the set of seen values on reset
            return seenValues.clear();
          },
          kS9.noop // No-op for complete/error handlers
        )
      );
    }
  });
}

module.exports = distinctBySelectorWithReset;