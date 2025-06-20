/**
 * Composes two functions, applying the first function to the input and then passing the result to the second function.
 *
 * @function composeFunctions
 * @param {Function} firstFunction - The first function to apply to the input.
 * @param {Function} secondFunction - The second function to apply to the result of the first function.
 * @returns {Function} a new function that takes an input, applies firstFunction, then secondFunction.
 */
const composeFunctions = (firstFunction, secondFunction) => {
  return (input) => {
    // Apply the first function to the input, then pass the result to the second function
    return secondFunction(firstFunction(input));
  };
};

module.exports = composeFunctions;