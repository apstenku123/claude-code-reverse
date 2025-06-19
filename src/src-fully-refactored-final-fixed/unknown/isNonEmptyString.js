/**
 * Checks whether the provided string is not empty.
 *
 * @param {string} inputString - The string to check for emptiness.
 * @returns {boolean} Returns true if the string is not empty, otherwise false.
 */
function isNonEmptyString(inputString) {
  // Return true if inputString is not an empty string
  return inputString !== "";
}

module.exports = isNonEmptyString;