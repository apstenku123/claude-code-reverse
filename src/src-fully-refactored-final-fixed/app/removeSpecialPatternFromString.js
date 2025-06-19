/**
 * Removes all occurrences of a specific pattern from the input string.
 *
 * @param {string} inputString - The string from which to remove the pattern.
 * @returns {string} The input string with the pattern removed.
 * @throws {TypeError} If the input is not a string.
 */
function removeSpecialPatternFromString(inputString) {
  // Ensure the input is a string
  if (typeof inputString !== "string") {
    throw new TypeError(`Expected a \`string\`, got \`${typeof inputString}\``);
  }

  // S_4 is assumed to be a RegExp pattern defined elsewhere in the module
  // Replace all occurrences of the pattern with an empty string
  return inputString.replace(S_4, "");
}

module.exports = removeSpecialPatternFromString;