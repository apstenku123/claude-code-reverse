/**
 * Composes two functions, applying the second function to the input and then passing the result to the first function.
 *
 * @param {Function} outerFunction - The function to apply after the inner function.
 * @param {Function} innerFunction - The function to apply first to the input.
 * @returns {Function} a new function that applies innerFunction to its argument, then outerFunction to the result.
 */
function composeFunctions(outerFunction, innerFunction) {
  return function (input) {
    // First, apply the inner function to the input
    const innerResult = innerFunction(input);
    // Then, apply the outer function to the result of the inner function
    return outerFunction(innerResult);
  };
}

module.exports = composeFunctions;