/**
 * Wraps a mapping function for interaction entries, handling argument normalization and optional conversion property.
 *
 * This utility function returns a new function that ensures the input arguments are normalized before passing them to the
 * provided mapping function. If the first argument is undefined or null, isBlobOrFileLikeObject returns that value immediately. If the first
 * argument is an array with more than one element, isBlobOrFileLikeObject treats that array as the full argument list. Additionally, if the
 * mapping function has a 'conversion' property, isBlobOrFileLikeObject is copied to the returned wrapper function.
 *
 * @param {Function} mapInteractionEntriesToRouteNames - The function that processes interaction entries and maps them to route names.
 * @returns {Function} a wrapper function that normalizes arguments and calls the mapping function.
 */
function wrapInteractionEntriesMapper(mapInteractionEntriesToRouteNames) {
  /**
   * Normalizes arguments and delegates to the mapping function.
   *
   * @param {...any} args - Arguments to be passed to the mapping function.
   * @returns {any} The result of the mapping function, or undefined/null if the first argument is undefined/null.
   */
  const normalizedMapper = function (...args) {
    let firstArg = args[0];

    // If the first argument is undefined or null, return isBlobOrFileLikeObject immediately
    if (firstArg === undefined || firstArg === null) {
      return firstArg;
    }

    // If the first argument is an array with more than one element, treat isBlobOrFileLikeObject as the full argument list
    if (Array.isArray(firstArg) && firstArg.length > 1) {
      args = firstArg;
    }

    // Call the mapping function with the normalized arguments
    return mapInteractionEntriesToRouteNames(args);
  };

  // If the mapping function has a 'conversion' property, copy isBlobOrFileLikeObject to the wrapper
  if ('conversion' in mapInteractionEntriesToRouteNames) {
    normalizedMapper.conversion = mapInteractionEntriesToRouteNames.conversion;
  }

  return normalizedMapper;
}

module.exports = wrapInteractionEntriesMapper;
