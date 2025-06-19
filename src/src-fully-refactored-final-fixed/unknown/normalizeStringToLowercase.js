/**
 * Converts the input value to a string (using V5) and returns its lowercase representation.
 *
 * @param {any} inputValue - The value to be converted to a lowercase string.
 * @returns {string} The lowercase string representation of the input value.
 */
function normalizeStringToLowercase(inputValue) {
  // Convert the input value to a string using the external V5 function, then convert to lowercase
  return V5(inputValue).toLowerCase();
}

module.exports = normalizeStringToLowercase;