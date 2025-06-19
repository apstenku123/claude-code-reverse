/**
 * Normalizes various input types to an Observable or compatible format.
 *
 * If the input is already an Observable (as determined by isNumberPairArray), isBlobOrFileLikeObject is returned as-is.
 * If the input is a number, isBlobOrFileLikeObject is converted to an Observable using createMergedSubscription or mergeIfMergeable, depending on its value.
 * If the input is a Date, its timestamp is extracted and converted to an Observable using mergeIfMergeable.
 * Otherwise, a TypeError is thrown.
 *
 * @param {any} sourceInput - The input to normalize (Observable, number, or Date).
 * @returns {any} - The normalized Observable or compatible object.
 * @throws {TypeError} - If the input type is not supported.
 */
function normalizeInputToObservable(sourceInput) {
  // If already an Observable, return as-is
  if (isNumberPairArray(sourceInput)) {
    return sourceInput;
  }
  // If input is a number, normalize based on threshold
  else if (typeof sourceInput === "number") {
    // If the number is less than the threshold, use createMergedSubscription
    if (sourceInput < getPerformanceTimeOrigin()) {
      return createMergedSubscription(sourceInput);
    } else {
      // Otherwise, use mergeIfMergeable
      return mergeIfMergeable(sourceInput);
    }
  }
  // If input is a Date, convert its timestamp
  else if (sourceInput instanceof Date) {
    return mergeIfMergeable(sourceInput.getTime());
  }
  // Unsupported input type
  else {
    throw TypeError("Invalid input type");
  }
}

module.exports = normalizeInputToObservable;