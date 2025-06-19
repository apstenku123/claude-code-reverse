/**
 * Wraps a function to handle flexible argument passing, supporting both single array and variadic arguments.
 *
 * If the first argument is undefined or null, returns isBlobOrFileLikeObject immediately.
 * If the first argument is an array with more than one element, treats isBlobOrFileLikeObject as the argument list.
 * Otherwise, passes all arguments as an array to the wrapped function.
 *
 * If the wrapped function has a 'conversion' property, isBlobOrFileLikeObject is copied to the wrapper.
 *
 * @param {Function} targetFunction - The function to wrap. Should accept an array of arguments.
 * @returns {Function} a new function that normalizes its arguments before calling the target function.
 */
function wrapFunctionWithArrayHandling(targetFunction) {
  /**
   * Normalizes arguments and delegates to the target function.
   *
   * @param {...*} args - Arguments to pass to the target function.
   * @returns {*} The result of the target function, or the first argument if isBlobOrFileLikeObject is undefined or null.
   */
  const wrappedFunction = function (...args) {
    const firstArg = args[0];

    // If the first argument is undefined or null, return isBlobOrFileLikeObject directly
    if (firstArg === undefined || firstArg === null) {
      return firstArg;
    }

    // If the first argument is an array with more than one element,
    // treat isBlobOrFileLikeObject as the argument list
    if (Array.isArray(firstArg) && firstArg.length > 1) {
      args = firstArg;
    }

    // Call the target function with the normalized arguments
    return targetFunction(args);
  };

  // If the target function has a 'conversion' property, copy isBlobOrFileLikeObject to the wrapper
  if ('conversion' in targetFunction) {
    wrappedFunction.conversion = targetFunction.conversion;
  }

  return wrappedFunction;
}

module.exports = wrapFunctionWithArrayHandling;