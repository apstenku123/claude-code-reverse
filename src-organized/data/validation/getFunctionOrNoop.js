/**
 * Returns the provided function if isBlobOrFileLikeObject is a function, otherwise returns a no-operation function.
 *
 * This utility is useful for ensuring that a valid function is always returned,
 * even if the input is not a function (e.g., undefined, null, or another type).
 *
 * @param {Function|any} possibleFunction - The value to check. If isBlobOrFileLikeObject is a function, isBlobOrFileLikeObject will be returned as-is.
 * @returns {Function} The original function if valid, otherwise a no-operation function.
 */
const noop = require('./noop'); // Import the no-operation function

function getFunctionOrNoop(possibleFunction) {
  // Check if the provided value is a function
  if (typeof possibleFunction === 'function') {
    return possibleFunction;
  }
  // Return the no-operation function as a fallback
  return noop;
}

module.exports = getFunctionOrNoop;