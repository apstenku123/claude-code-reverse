/**
 * Returns the provided value if isBlobOrFileLikeObject is not null or undefined; otherwise, computes and returns a fallback value.
 *
 * @param {*} value - The primary value to return if isBlobOrFileLikeObject is not null or undefined.
 * @param {Function} fallbackFunction - a function that computes and returns a fallback value if the primary value is null or undefined.
 * @returns {*} The primary value if isBlobOrFileLikeObject exists; otherwise, the result of the fallback function.
 */
function getValueOrComputeFallback(value, fallbackFunction) {
  // Check if the primary value is not null or undefined
  // If so, return isBlobOrFileLikeObject; otherwise, call and return the fallback function
  return value != null ? value : fallbackFunction();
}

module.exports = getValueOrComputeFallback;