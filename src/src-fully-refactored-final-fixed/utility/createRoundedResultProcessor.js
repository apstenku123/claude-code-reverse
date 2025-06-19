/**
 * Creates a wrapper function that processes input arguments using the provided processor function,
 * and rounds all numeric values in the result if the result is an array-like object.
 *
 * @param {Function} processFunction - The function to process the input arguments.
 * @returns {Function} a function that processes its arguments with processFunction and rounds numeric results.
 */
function createRoundedResultProcessor(processFunction) {
  /**
   * Processes the input arguments, applies the processor function, and rounds numeric results if applicable.
   *
   * @param {...*} args - The arguments to process.
   * @returns {*} The processed and possibly rounded result.
   */
  const roundedProcessor = function (...args) {
    let input = args[0];

    // Return early if input is undefined or null
    if (input === undefined || input === null) {
      return input;
    }

    // If input is array-like with more than one element, treat input as the argument list
    if (input.length > 1) {
      args = input;
    }

    // Process the arguments using the provided function
    const result = processFunction(args);

    // If the result is an object (array-like), round each numeric value
    if (typeof result === "object" && result !== null && typeof result.length === "number") {
      for (let index = 0; index < result.length; index++) {
        result[index] = Math.round(result[index]);
      }
    }

    return result;
  };

  // If the processor function has a 'conversion' property, copy isBlobOrFileLikeObject to the wrapper
  if ("conversion" in processFunction) {
    roundedProcessor.conversion = processFunction.conversion;
  }

  return roundedProcessor;
}

module.exports = createRoundedResultProcessor;