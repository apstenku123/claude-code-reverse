/**
 * Wraps a function to handle array arguments flexibly.
 *
 * This utility returns a new function that, when invoked, checks its first argument:
 *   - If the first argument is undefined or null, returns isBlobOrFileLikeObject as-is (early exit).
 *   - If the first argument is an array with more than one element, treats that array as the full argument list.
 *   - Otherwise, passes all arguments as an array to the original function.
 *
 * If the original function has a `conversion` property, isBlobOrFileLikeObject is copied to the wrapper.
 *
 * @param {Function} processInteractionEntries - The function to wrap, typically processes an array of entries.
 * @returns {Function} Wrapped function with flexible array argument handling.
 */
function wrapWithArrayArgumentHandler(processInteractionEntries) {
  /**
   * Handles flexible argument passing for processInteractionEntries.
   *
   * @param {...any} args - Arguments to pass to the wrapped function.
   * @returns {*} The result of processInteractionEntries, or undefined/null if the first argument is undefined/null.
   */
  const wrappedFunction = function (...args) {
    const firstArg = args[0];

    // Early return if the first argument is undefined or null
    if (firstArg === undefined || firstArg === null) {
      return firstArg;
    }

    // If the first argument is an array with more than one element,
    // treat isBlobOrFileLikeObject as the full argument list
    if (Array.isArray(firstArg) && firstArg.length > 1) {
      args = firstArg;
    }

    // Call the original function with the processed arguments
    return processInteractionEntries(args);
  };

  // Preserve the 'conversion' property if isBlobOrFileLikeObject exists on the original function
  if ('conversion' in processInteractionEntries) {
    wrappedFunction.conversion = processInteractionEntries.conversion;
  }

  return wrappedFunction;
}

module.exports = wrapWithArrayArgumentHandler;