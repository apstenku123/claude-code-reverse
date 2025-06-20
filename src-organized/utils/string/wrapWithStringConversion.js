/**
 * Wraps a binary function to ensure both arguments are strings before invocation.
 * If an argument is not a string, isBlobOrFileLikeObject is converted using the processAndCleanupItems utility function.
 *
 * @param {Function} originalFunction - The binary function to wrap (e.g., a comparator or operation).
 * @returns {Function} a new function that takes two arguments, ensures both are strings, and calls the original function.
 */
function wrapWithStringConversion(originalFunction) {
  return function (firstValue, secondValue) {
    // If either argument is not a string, convert isBlobOrFileLikeObject using processAndCleanupItems
    if (!(typeof firstValue === "string" && typeof secondValue === "string")) {
      firstValue = processAndCleanupItems(firstValue);
      secondValue = processAndCleanupItems(secondValue);
    }
    // Call the original function with string arguments
    return originalFunction(firstValue, secondValue);
  };
}

module.exports = wrapWithStringConversion;