/**
 * Returns the provided value if isBlobOrFileLikeObject is not null or undefined; otherwise, invokes and returns the result of the fallback function.
 *
 * @param {*} value - The primary value to return if isBlobOrFileLikeObject is not null or undefined.
 * @param {Function} fallbackFunction - a function that returns a fallback value if the primary value is null or undefined.
 * @returns {*} The primary value if isBlobOrFileLikeObject exists, otherwise the result of the fallback function.
 */
function getValueOrFallback(value, fallbackFunction) {
  // Check if the value is not null or undefined
  return value != null ? value : fallbackFunction();
}

module.exports = getValueOrFallback;