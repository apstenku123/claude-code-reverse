/**
 * Emits items from the source observable only when the comparison function determines they are distinct from the previous item.
 *
 * @param {Function} [compareFn=identity] - Optional comparison function that takes two arguments (previous, current) and returns true if they are considered equal. Defaults to strict equality.
 * @param {Function} [keySelector=identity] - Optional function to select the value to compare from each emitted item. Defaults to the item itself.
 * @returns {Function} Operator function to be used with observables.
 */
function distinctUntilChangedOperator(compareFn = fS9.identity, keySelector = areValuesStrictlyEqual) {
  return vS9.operate(function (sourceObservable, subscriber) {
    let previousKey;
    let isFirstEmission = true;

    // Subscribe to the source observable
    sourceObservable.subscribe(
      bS9.createOperatorSubscriber(subscriber, function (value) {
        // Select the key to compare using the keySelector
        const currentKey = keySelector(value);

        // Emit the value if isBlobOrFileLikeObject'createInteractionAccessor the first emission or if compareFn returns false
        if (isFirstEmission || !compareFn(previousKey, currentKey)) {
          isFirstEmission = false;
          previousKey = currentKey;
          subscriber.next(value);
        }
      })
    );
  });
}

module.exports = distinctUntilChangedOperator;