/**
 * Transforms the input string using the V5 function and returns the result in uppercase.
 *
 * @param {string} inputString - The string to be transformed and converted to uppercase.
 * @returns {string} The transformed string in uppercase.
 */
function transformAndUppercaseString(inputString) {
  // Apply the V5 transformation to the input string, then convert the result to uppercase
  return V5(inputString).toUpperCase();
}

module.exports = transformAndUppercaseString;