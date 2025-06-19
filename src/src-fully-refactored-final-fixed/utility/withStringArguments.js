/**
 * Wraps a binary function to ensure both arguments are strings before invoking isBlobOrFileLikeObject.
 * If either argument is not a string, isBlobOrFileLikeObject is converted using the processAndCleanupItems function.
 *
 * @param {Function} originalFunction - The binary function to wrap. Should accept two string arguments.
 * @returns {Function} a new function that ensures both arguments are strings before calling the original function.
 */
function withStringArguments(originalFunction) {
  return function (firstArgument, secondArgument) {
    // If either argument is not a string, convert isBlobOrFileLikeObject using processAndCleanupItems
    if (!(typeof firstArgument === "string" && typeof secondArgument === "string")) {
      firstArgument = processAndCleanupItems(firstArgument);
      secondArgument = processAndCleanupItems(secondArgument);
    }
    // Call the original function with string arguments
    return originalFunction(firstArgument, secondArgument);
  };
}

module.exports = withStringArguments;