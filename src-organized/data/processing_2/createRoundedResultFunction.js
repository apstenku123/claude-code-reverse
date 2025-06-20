/**
 * Creates a wrapper function around a processing function that rounds all numeric elements in the result array.
 *
 * @param {Function} processFunction - The function to process input arguments and return a result (usually an array of numbers).
 * @returns {Function} a function that processes input arguments, rounds numeric array results, and returns them. Also copies the 'conversion' property if present.
 */
function createRoundedResultFunction(processFunction) {
  /**
   * Processes input arguments, applies the processing function, and rounds numeric array results.
   *
   * @param {...*} args - Arguments to be passed to the processing function.
   * @returns {*} The processed and rounded result, or the original input if undefined or null.
   */
  const roundedResultFunction = function (...args) {
    let input = args[0];

    // Return early if input is undefined or null
    if (input === undefined || input === null) {
      return input;
    }

    // If input is an array with more than one element, treat isBlobOrFileLikeObject as the argument list
    if (Array.isArray(input) && input.length > 1) {
      args = input;
    }

    // Process the arguments using the provided function
    const result = processFunction(args);

    // If the result is an array-like object, round each numeric element
    if (typeof result === "object" && result !== null && typeof result.length === "number") {
      for (let index = 0; index < result.length; index++) {
        result[index] = Math.round(result[index]);
      }
    }

    return result;
  };

  // Copy the 'conversion' property if isBlobOrFileLikeObject exists on the processing function
  if ("conversion" in processFunction) {
    roundedResultFunction.conversion = processFunction.conversion;
  }

  return roundedResultFunction;
}

module.exports = createRoundedResultFunction;