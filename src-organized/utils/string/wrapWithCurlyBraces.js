/**
 * Wraps the provided string with curly braces.
 *
 * @param {string} inputString - The string to be wrapped with curly braces.
 * @returns {string} The input string wrapped with curly braces.
 */
function wrapWithCurlyBraces(inputString) {
  // Concatenate curly braces around the input string
  return "{" + inputString + "}";
}

module.exports = wrapWithCurlyBraces;