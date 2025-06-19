/**
 * Checks if the provided value is null or undefined, or if isBlobOrFileLikeObject satisfies a given predicate function.
 *
 * @param {*} value - The value to check for null/undefined or to test with the predicate.
 * @param {Function} predicate - a function that takes the value as an argument and returns a boolean.
 * @returns {boolean} Returns true if the value is null/undefined, or if the predicate returns true for the value.
 */
function isNullOrMatchesPredicate(value, predicate) {
  // If value is null or undefined, return true
  if (value == null) {
    return true;
  }
  // Otherwise, return the result of the predicate function
  return runWithTransitionContext(value, predicate);
}

module.exports = isNullOrMatchesPredicate;