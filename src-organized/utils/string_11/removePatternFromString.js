/**
 * Removes all occurrences of a specific pattern from the input string.
 *
 * @param {string} inputString - The string from which the pattern will be removed.
 * @returns {string} The resulting string with the pattern removed.
 * @throws {TypeError} If the input is not a string.
 */
function removePatternFromString(inputString) {
  // Validate that the input is a string
  if (typeof inputString !== "string") {
    throw new TypeError(`Expected a \`string\`, got \`${typeof inputString}\``);
  }
  // Replace all occurrences of the pattern defined by S_4 with an empty string
  return inputString.replace(S_4, "");
}

module.exports = removePatternFromString;