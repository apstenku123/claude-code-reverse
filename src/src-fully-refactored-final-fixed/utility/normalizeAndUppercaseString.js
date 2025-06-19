/**
 * Normalizes the input string using the V5 utility and converts the result to uppercase.
 *
 * @param {string} inputString - The string to be normalized and converted to uppercase.
 * @returns {string} The normalized and uppercased string.
 */
function normalizeAndUppercaseString(inputString) {
  // Normalize the string using the external V5 utility, then convert to uppercase
  return V5(inputString).toUpperCase();
}

module.exports = normalizeAndUppercaseString;