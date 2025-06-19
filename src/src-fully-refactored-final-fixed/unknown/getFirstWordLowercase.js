/**
 * Returns the first word of a string in lowercase.
 *
 * @param {string} inputString - The string to extract the first word from.
 * @returns {string} The first word of the input string, converted to lowercase.
 */
function getFirstWordLowercase(inputString) {
  // Split the string by spaces and take the first word, then convert to lowercase
  const firstWord = inputString.split(" ")[0];
  return firstWord.toLowerCase();
}

module.exports = getFirstWordLowercase;