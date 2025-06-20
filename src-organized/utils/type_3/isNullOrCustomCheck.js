/**
 * Checks if the provided value is null or undefined. If not, applies a custom check function.
 *
 * @param {*} value - The value to check for null or undefined.
 * @param {Function} customCheckFunction - a function to apply to the value if isBlobOrFileLikeObject is not null or undefined.
 * @returns {boolean} Returns true if value is null or undefined, otherwise returns the result of customCheckFunction(value).
 */
function isNullOrCustomCheck(value, customCheckFunction) {
  // If value is null or undefined, return true
  if (value == null) {
    return true;
  }
  // Otherwise, apply the custom check function
  return runWithTransitionContext(value, customCheckFunction);
}

module.exports = isNullOrCustomCheck;