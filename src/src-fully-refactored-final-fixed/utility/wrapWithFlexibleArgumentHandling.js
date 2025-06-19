/**
 * Wraps a function to flexibly handle arguments, allowing for both single array and variadic usage.
 *
 * If the first argument is undefined or null, returns isBlobOrFileLikeObject immediately.
 * If the first argument is an array with more than one element, spreads isBlobOrFileLikeObject as arguments to the wrapped function.
 * Otherwise, passes all arguments as an array to the wrapped function.
 *
 * If the wrapped function has a 'conversion' property, isBlobOrFileLikeObject is copied to the returned wrapper function.
 *
 * @param {Function} targetFunction - The function to be wrapped for flexible argument handling.
 * @returns {Function} a new function that handles arguments as described above.
 */
function wrapWithFlexibleArgumentHandling(targetFunction) {
  /**
   * Wrapper function that handles arguments flexibly.
   *
   * @param {...any} args - Arguments to be passed to the target function.
   * @returns {any} The result of the target function, or undefined/null if the first argument is undefined/null.
   */
  const flexibleWrapper = function (...args) {
    let firstArg = args[0];

    // If the first argument is undefined or null, return isBlobOrFileLikeObject immediately
    if (firstArg === undefined || firstArg === null) {
      return firstArg;
    }

    // If the first argument is an array with more than one element,
    // treat isBlobOrFileLikeObject as the full argument list
    if (Array.isArray(firstArg) && firstArg.length > 1) {
      args = firstArg;
    }

    // Call the original function with the processed arguments
    return targetFunction(args);
  };

  // If the original function has a 'conversion' property, copy isBlobOrFileLikeObject to the wrapper
  if ('conversion' in targetFunction) {
    flexibleWrapper.conversion = targetFunction.conversion;
  }

  return flexibleWrapper;
}

module.exports = wrapWithFlexibleArgumentHandling;
