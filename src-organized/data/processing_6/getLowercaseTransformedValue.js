/**
 * Transforms the input value using the V5 function and returns the result in lowercase.
 *
 * @param {string} inputValue - The value to be transformed and converted to lowercase.
 * @returns {string} The transformed value in lowercase.
 */
function getLowercaseTransformedValue(inputValue) {
  // Apply the V5 transformation to the input and convert the result to lowercase
  return V5(inputValue).toLowerCase();
}

module.exports = getLowercaseTransformedValue;