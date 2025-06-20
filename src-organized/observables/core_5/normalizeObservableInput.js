/**
 * Normalizes various input types into a consistent observable format.
 *
 * This function accepts an input which can be an observable, a number, or a Date object.
 * - If the input is already an observable (as determined by isNumberPairArray), isBlobOrFileLikeObject is returned as-is.
 * - If the input is a number, isBlobOrFileLikeObject is normalized using createMergedSubscription if isBlobOrFileLikeObject is less than the threshold from getPerformanceTimeOrigin(),
 *   otherwise isBlobOrFileLikeObject is normalized using mergeIfMergeable.
 * - If the input is a Date, its timestamp is extracted and normalized using mergeIfMergeable.
 * - Any other input type will result in a TypeError being thrown.
 *
 * @param {any} sourceObservable - The input to normalize (observable, number, or Date).
 * @returns {any} The normalized observable or value.
 * @throws {TypeError} If the input type is not supported.
 */
function normalizeObservableInput(sourceObservable) {
  // If input is already an observable, return as-is
  if (isNumberPairArray(sourceObservable)) {
    return sourceObservable;
  }

  // If input is a number, normalize based on threshold
  if (typeof sourceObservable === "number") {
    const threshold = getPerformanceTimeOrigin();
    if (sourceObservable < threshold) {
      // Use createMergedSubscription for numbers below the threshold
      return createMergedSubscription(sourceObservable);
    } else {
      // Use mergeIfMergeable for numbers above or equal to the threshold
      return mergeIfMergeable(sourceObservable);
    }
  }

  // If input is a Date, normalize its timestamp
  if (sourceObservable instanceof Date) {
    const timestamp = sourceObservable.getTime();
    return mergeIfMergeable(timestamp);
  }

  // If input type is not supported, throw an error
  throw new TypeError("Invalid input type");
}

module.exports = normalizeObservableInput;
