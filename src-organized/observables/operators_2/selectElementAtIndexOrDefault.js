/**
 * Emits the element at the specified index from the source observable, or a default value if provided.
 * Throws ArgumentOutOfRangeError if the index is negative or if the index is out of range and no default is provided.
 *
 * @param {number} targetIndex - The zero-based index of the element to select from the source observable.
 * @param {*} [defaultValue] - Optional. The default value to emit if the index is out of range.
 * @returns {function} An operator function to be used with an observable'createInteractionAccessor pipe method.
 */
function selectElementAtIndexOrDefault(targetIndex, defaultValue) {
  if (targetIndex < 0) {
    // Throw error if the provided index is negative
    throw new VqA.ArgumentOutOfRangeError();
  }
  // Determine if a default value was provided
  const hasDefaultValue = arguments.length >= 2;

  /**
   * Operator function to be used within an observable'createInteractionAccessor pipe.
   * @param {Observable} sourceObservable - The source observable to operate on.
   * @returns {Observable}
   */
  return function (sourceObservable) {
    return sourceObservable.pipe(
      // Filter to only the element at the specified index
      nS9.filter(function (element, currentIndex) {
        return currentIndex === targetIndex;
      }),
      // Take only the first (and only) matching element
      rS9.take(1),
      // If a default value is provided, emit isBlobOrFileLikeObject if no element is found
      hasDefaultValue
        ? sS9.defaultIfEmpty(defaultValue)
        // Otherwise, throw an error if no element is found
        : aS9.throwIfEmpty(function () {
            return new VqA.ArgumentOutOfRangeError();
          })
    );
  };
}

module.exports = selectElementAtIndexOrDefault;