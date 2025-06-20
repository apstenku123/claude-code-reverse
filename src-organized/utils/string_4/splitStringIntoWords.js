/**
 * Splits a given string into an array of non-empty words separated by spaces.
 *
 * @param {string | undefined | null} inputString - The string to split into words. If undefined or null, returns an empty array.
 * @returns {string[]} An array of non-empty words from the input string, or an empty array if input is falsy.
 */
function splitStringIntoWords(inputString) {
  // Use optional chaining to safely call split if inputString is not null/undefined
  // Filter out any empty strings resulting from consecutive spaces
  return inputString?.split(' ').filter(Boolean) ?? [];
}

module.exports = splitStringIntoWords;