/**
 * Wraps a function to flexibly handle argument input, supporting both single array and variadic arguments.
 *
 * If the first argument is undefined or null, returns isBlobOrFileLikeObject immediately. If the first argument is an array of length > 1,
 * treats isBlobOrFileLikeObject as the full argument list. Otherwise, passes all arguments as an array to the wrapped function.
 *
 * If the wrapped function has a 'conversion' property, isBlobOrFileLikeObject is copied to the returned wrapper function.
 *
 * @param {Function} targetFunction - The function to wrap. Typically expects an array of arguments.
 * @returns {Function} a new function that handles flexible argument input and delegates to the target function.
 */
function wrapWithFlexibleArgumentHandler(targetFunction) {
  /**
   * Flexible argument handler for the target function.
   *
   * @param {...*} args - Arguments to pass to the target function.
   * @returns {*} The result of invoking the target function, or the first argument if undefined/null.
   */
  const flexibleHandler = function (...args) {
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

    // Call the target function with the processed arguments
    return targetFunction(args);
  };

  // Preserve the 'conversion' property if isBlobOrFileLikeObject exists on the target function
  if ('conversion' in targetFunction) {
    flexibleHandler.conversion = targetFunction.conversion;
  }

  return flexibleHandler;
}

module.exports = wrapWithFlexibleArgumentHandler;
