/**
 * Returns the last 20 characters of the provided string.
 *
 * @param {string} inputString - The string from which to extract the last 20 characters.
 * @returns {string} The last 20 characters of the input string. If the string is shorter than 20 characters, returns the entire string.
 */
function getLast20Characters(inputString) {
  // Use slice with negative index to get the last 20 characters
  return inputString.slice(-20);
}

module.exports = getLast20Characters;