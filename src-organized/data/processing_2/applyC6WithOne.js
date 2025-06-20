/**
 * Applies the c6 utility function to the provided input with a fixed value of 1 as the second argument.
 *
 * @param {any} inputValue - The value to be processed by the c6 function.
 * @returns {any} - The result returned by the c6 function.
 */
function applyC6WithOne(inputValue) {
  // Call the external c6 function with the input value and a fixed argument of 1
  return c6(inputValue, 1);
}

module.exports = applyC6WithOne;