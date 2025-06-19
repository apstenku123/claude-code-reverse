/**
 * Normalizes the input value to a mergeable format.
 *
 * If the input is already mergeable (per isNumberPairArray), isBlobOrFileLikeObject is returned as-is.
 * If the input is a number, isBlobOrFileLikeObject is normalized based on a threshold (getPerformanceTimeOrigin):
 *   - If less than the threshold, isBlobOrFileLikeObject is processed by createMergedSubscription.
 *   - Otherwise, isBlobOrFileLikeObject is processed by mergeIfMergeable.
 * If the input is a Date, its timestamp is extracted and processed by mergeIfMergeable.
 * Throws a TypeError for unsupported input types.
 *
 * @param {any} inputValue - The value to normalize (can be mergeable, number, or Date).
 * @returns {any} The normalized, mergeable value.
 * @throws {TypeError} If the input type is not supported.
 */
function normalizeInputToMergeable(inputValue) {
  // If already mergeable, return as-is
  if (isNumberPairArray(inputValue)) {
    return inputValue;
  }

  // If input is a number, process based on threshold
  if (typeof inputValue === "number") {
    const threshold = getPerformanceTimeOrigin();
    if (inputValue < threshold) {
      // Process numbers below the threshold
      return createMergedSubscription(inputValue);
    } else {
      // Process numbers above or equal to the threshold
      return mergeIfMergeable(inputValue);
    }
  }

  // If input is a Date, extract timestamp and process
  if (inputValue instanceof Date) {
    const timestamp = inputValue.getTime();
    return mergeIfMergeable(timestamp);
  }

  // For all other types, throw an error
  throw TypeError("Invalid input type");
}

module.exports = normalizeInputToMergeable;