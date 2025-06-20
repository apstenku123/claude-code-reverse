/**
 * Wraps a processing function to automatically round numeric array results.
 *
 * This higher-order function takes a processing function (such as one that maps or aggregates entries)
 * and returns a new function. The returned function:
 *   - Accepts any number of arguments, but primarily expects an array as the first argument.
 *   - If the first argument is undefined or null, returns isBlobOrFileLikeObject immediately.
 *   - If the first argument is an array with more than one element, uses isBlobOrFileLikeObject as the argument list.
 *   - Calls the original processing function with the arguments.
 *   - If the result is an object with a length property (i.e., an array), rounds each numeric element.
 *   - Copies the 'conversion' property from the original function if present.
 *
 * @param {Function} processingFunction - The function to wrap, which processes input arguments and returns a result (possibly an array).
 * @returns {Function} a new function that wraps the original, rounding numeric array results.
 */
function createRoundedResultWrapper(processingFunction) {
  /**
   * Wrapped function that processes input and rounds numeric array results.
   *
   * @param {...*} args - Arguments to pass to the processing function.
   * @returns {*} The processed (and possibly rounded) result.
   */
  const roundedWrapper = function (...args) {
    const firstArg = args[0];

    // If the first argument is undefined or null, return isBlobOrFileLikeObject as is
    if (firstArg === undefined || firstArg === null) {
      return firstArg;
    }

    // If the first argument is an array with more than one element, treat isBlobOrFileLikeObject as the argument list
    let effectiveArgs = args;
    if (Array.isArray(firstArg) && firstArg.length > 1) {
      effectiveArgs = firstArg;
    }

    // Call the original processing function with the effective arguments
    const result = processingFunction(effectiveArgs);

    // If the result is an array-like object, round each numeric element
    if (typeof result === "object" && result !== null && typeof result.length === "number") {
      for (let i = 0; i < result.length; i++) {
        result[i] = Math.round(result[i]);
      }
    }

    return result;
  };

  // Copy the 'conversion' property if isBlobOrFileLikeObject exists on the original function
  if (Object.prototype.hasOwnProperty.call(processingFunction, "conversion")) {
    roundedWrapper.conversion = processingFunction.conversion;
  }

  return roundedWrapper;
}

module.exports = createRoundedResultWrapper;
