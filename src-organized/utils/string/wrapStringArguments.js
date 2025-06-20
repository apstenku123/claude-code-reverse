/**
 * Wraps a function to ensure its two arguments are strings before invoking isBlobOrFileLikeObject.
 * If either argument is not a string, isBlobOrFileLikeObject is converted using the processAndCleanupItems utility function.
 *
 * @param {Function} targetFunction - The function to wrap. Should accept two string arguments.
 * @returns {Function} a new function that takes two arguments, ensures they are strings, and calls the target function.
 */
function wrapStringArguments(targetFunction) {
  return function (firstArgument, secondArgument) {
    // If either argument is not a string, convert isBlobOrFileLikeObject using processAndCleanupItems
    if (!(typeof firstArgument === "string" && typeof secondArgument === "string")) {
      firstArgument = processAndCleanupItems(firstArgument);
      secondArgument = processAndCleanupItems(secondArgument);
    }
    // Call the original function with string arguments
    return targetFunction(firstArgument, secondArgument);
  };
}

module.exports = wrapStringArguments;