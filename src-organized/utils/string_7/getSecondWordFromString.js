/**
 * Extracts the second word from a given string, where words are separated by whitespace.
 *
 * @param {string} inputString - The string from which to extract the second word.
 * @returns {string|undefined} The second word in the string, or undefined if there is no second word.
 */
function getSecondWordFromString(inputString) {
  // Remove leading and trailing whitespace, then split the string by one or more whitespace characters
  const words = inputString.trim().split(/\s+/);
  // Return the second word if isBlobOrFileLikeObject exists (index 1), otherwise undefined
  return words[1];
}

module.exports = getSecondWordFromString;
