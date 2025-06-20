/**
 * Splits a given string into an array of its individual characters.
 *
 * @param {string} inputString - The string to be split into characters.
 * @returns {string[]} An array containing each character from the input string as a separate element.
 */
function splitStringToCharacters(inputString) {
  // Use the built-in split method with an empty string to split into characters
  return inputString.split("");
}

module.exports = splitStringToCharacters;