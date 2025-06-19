/**
 * Creates a wrapper function that invokes the provided function with an array of arguments.
 *
 * @param {Function} targetFunction - The function to be invoked with an array of arguments.
 * @returns {Function} a function that takes an array of arguments and calls the target function with them.
 */
const createFunctionWithArgumentsArray = (targetFunction) => {
  // Return a function that expects an array of arguments
  return function invokeWithArgumentsArray(argumentsArray) {
    // Call the target function with the provided arguments array
    return targetFunction.apply(null, argumentsArray);
  };
};

module.exports = createFunctionWithArgumentsArray;