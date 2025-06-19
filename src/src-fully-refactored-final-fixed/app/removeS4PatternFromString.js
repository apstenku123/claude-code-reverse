/**
 * Removes all occurrences of the S_4 pattern from the provided string.
 *
 * @param {string} inputString - The string from which to remove the S_4 pattern.
 * @returns {string} The input string with all S_4 pattern matches removed.
 * @throws {TypeError} If the input is not a string.
 */
function removeS4PatternFromString(inputString) {
  // Ensure the input is a string
  if (typeof inputString !== "string") {
    throw new TypeError(`Expected a \`string\`, got \`${typeof inputString}\``);
  }
  // Replace all occurrences of the S_4 pattern with an empty string
  return inputString.replace(S_4, "");
}

module.exports = removeS4PatternFromString;