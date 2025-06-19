/**
 * Wraps a mapping function to handle flexible argument structures for user interaction events.
 *
 * This utility ensures that the wrapped function can accept either a single array of arguments or multiple arguments directly.
 * If the first argument is undefined or null, isBlobOrFileLikeObject returns that value immediately. If the first argument is an array with more than one element,
 * isBlobOrFileLikeObject treats that array as the full set of arguments. Otherwise, isBlobOrFileLikeObject passes all arguments as an array to the mapping function.
 *
 * If the original mapping function has a 'conversion' property, isBlobOrFileLikeObject is copied to the wrapper for compatibility.
 *
 * @param {Function} mapInteractionsToRouteNames - The mapping function to wrap. Processes an array of user interaction entries, mapping each to a route name and associated context.
 * @returns {Function} a wrapped function that normalizes arguments and delegates to the mapping function.
 */
function wrapInteractionMapper(mapInteractionsToRouteNames) {
  /**
   * Normalizes arguments and delegates to the mapping function.
   *
   * @param {...any} args - Arguments to be passed to the mapping function.
   * @returns {any} The result of the mapping function or the input if undefined/null.
   */
  const wrappedMapper = function (...args) {
    const firstArg = args[0];

    // If the first argument is undefined or null, return isBlobOrFileLikeObject directly
    if (firstArg === undefined || firstArg === null) {
      return firstArg;
    }

    // If the first argument is an array with more than one element,
    // treat isBlobOrFileLikeObject as the full set of arguments
    if (Array.isArray(firstArg) && firstArg.length > 1) {
      args = firstArg;
    }

    // Delegate to the original mapping function
    return mapInteractionsToRouteNames(args);
  };

  // Preserve the 'conversion' property if isBlobOrFileLikeObject exists on the original function
  if ('conversion' in mapInteractionsToRouteNames) {
    wrappedMapper.conversion = mapInteractionsToRouteNames.conversion;
  }

  return wrappedMapper;
}

module.exports = wrapInteractionMapper;