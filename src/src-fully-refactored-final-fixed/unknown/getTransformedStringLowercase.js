/**
 * Transforms the input value using the V5 function and returns the result in lowercase.
 *
 * @param {string} inputValue - The value to be transformed and converted to lowercase.
 * @returns {string} The transformed string in lowercase.
 */
function getTransformedStringLowercase(inputValue) {
  // Apply the external V5 transformation and convert the result to lowercase
  return V5(inputValue).toLowerCase();
}

module.exports = getTransformedStringLowercase;