/**
 * Creates a handler function that ensures both arguments are strings before passing them to the provided handler.
 * If either argument is not a string, isBlobOrFileLikeObject is converted using the processAndCleanupItems function.
 *
 * @param {Function} handler - The function to call with two string arguments.
 * @returns {Function} a function that takes two arguments, ensures they are strings, and passes them to the handler.
 */
function createStringHandler(handler) {
  return function handleStrings(firstArg, secondArg) {
    // If either argument is not a string, convert isBlobOrFileLikeObject using processAndCleanupItems
    if (!(typeof firstArg === "string" && typeof secondArg === "string")) {
      firstArg = processAndCleanupItems(firstArg);
      secondArg = processAndCleanupItems(secondArg);
    }
    // Call the handler with string arguments
    return handler(firstArg, secondArg);
  };
}

module.exports = createStringHandler;