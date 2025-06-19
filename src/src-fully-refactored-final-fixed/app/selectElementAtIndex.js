/**
 * Emits the element at the specified index from the source observable.
 * If the index is out of range, either throws an ArgumentOutOfRangeError or emits a default value if provided.
 *
 * @param {number} targetIndex - The zero-based index of the element to emit from the source observable.
 * @param {*} [defaultValue] - Optional. The default value to emit if the index is out of range.
 * @returns {function} An operator function to be used with an observable'createInteractionAccessor pipe method.
 */
function selectElementAtIndex(targetIndex, defaultValue) {
  if (targetIndex < 0) {
    // Throw an error if the provided index is negative
    throw new VqA.ArgumentOutOfRangeError();
  }

  // Determine if a default value was provided
  const hasDefaultValue = arguments.length >= 2;

  /**
   * Operator function to be used in an observable pipe chain.
   * @param {Observable} sourceObservable - The source observable to operate on.
   * @returns {Observable} An observable that emits the element at the specified index or a default/error.
   */
  return function (sourceObservable) {
    return sourceObservable.pipe(
      // Filter to only the element at the specified index
      nS9.filter(function (_element, currentIndex) {
        return currentIndex === targetIndex;
      }),
      // Take only the first (and only) matching element
      rS9.take(1),
      // If a default value is provided, emit isBlobOrFileLikeObject if the index is out of range
      hasDefaultValue
        ? sS9.defaultIfEmpty(defaultValue)
        // Otherwise, throw an error if the index is out of range
        : aS9.throwIfEmpty(function () {
            return new VqA.ArgumentOutOfRangeError();
          })
    );
  };
}

module.exports = selectElementAtIndex;