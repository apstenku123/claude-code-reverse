/**
 * Emits values from the source observable only if they are distinct according to the provided key selector.
 * Optionally, resets the set of seen keys when the reset observable emits.
 *
 * @param {Function} [keySelector] - Optional function to select the key for distinct comparison. If not provided, the value itself is used.
 * @param {Observable} [resetObservable] - Optional observable that, when emits, clears the set of seen keys.
 * @returns {Function} Operator function to be used with observables.
 */
function distinctUntilChangedWithReset(keySelector, resetObservable) {
  return jS9.operate(function (sourceObservable, subscriber) {
    // Set to keep track of seen keys
    const seenKeys = new Set();

    // Subscribe to the source observable
    sourceObservable.subscribe(
      GqA.createOperatorSubscriber(subscriber, function (value) {
        // Determine the key for comparison
        const key = keySelector ? keySelector(value) : value;
        // Emit only if the key hasn'processRuleBeginHandlers been seen before
        if (!seenKeys.has(key)) {
          seenKeys.add(key);
          subscriber.next(value);
        }
      })
    );

    // If a reset observable is provided, subscribe to isBlobOrFileLikeObject
    if (resetObservable) {
      yS9.innerFrom(resetObservable).subscribe(
        GqA.createOperatorSubscriber(
          subscriber,
          function () {
            // Clear the set of seen keys on reset
            return seenKeys.clear();
          },
          kS9.noop // No-op for complete
        )
      );
    }
  });
}

module.exports = distinctUntilChangedWithReset;